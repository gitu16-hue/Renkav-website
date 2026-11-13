import * as THREE from 'three';
import { animationsEnabled } from './motion';

/** A local, procedural sculpture. No textures, external assets, or tracking. */
export async function initOrbit(container: HTMLElement) {
  const canvas = container.querySelector<HTMLCanvasElement>('canvas');
  if (!canvas) return;
  const paused = () => !animationsEnabled();
  try {
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x0a1e2e, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 10.5);
    const sculpture = new THREE.Group();
    scene.add(sculpture);
    scene.add(new THREE.AmbientLight(0xa2e5d0, 1.5));
    const key = new THREE.DirectionalLight(0xe5fff1, 5);
    key.position.set(-4, 5, 4);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x67ccb4, 3.5);
    rim.position.set(5, 1, -2);
    scene.add(rim);
    const fill = new THREE.DirectionalLight(0x72a7d5, 2);
    fill.position.set(1, -3, 4);
    scene.add(fill);
    const pale = new THREE.MeshStandardMaterial({
      color: 0x93d6ba,
      metalness: 0.65,
      roughness: 0.26,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: 0x325f58,
      metalness: 0.72,
      roughness: 0.25,
    });
    const bright = new THREE.MeshStandardMaterial({
      color: 0xd3ebcf,
      metalness: 0.55,
      roughness: 0.22,
    });
    const outer = new THREE.Mesh(
      new THREE.TorusGeometry(2.17, 0.105, 16, 128),
      pale,
    );
    outer.rotation.set(0.85, 0.35, -0.55);
    sculpture.add(outer);
    const middle = new THREE.Mesh(
      new THREE.TorusGeometry(1.82, 0.16, 20, 128),
      bright,
    );
    middle.rotation.set(-0.45, 1.08, 0.35);
    sculpture.add(middle);
    const inner = new THREE.Mesh(
      new THREE.TorusGeometry(1.42, 0.075, 16, 100),
      pale,
    );
    inner.rotation.set(1.15, -0.45, 0.45);
    sculpture.add(inner);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.84, 48, 32), dark);
    sculpture.add(core);
    // Longitude rings turn the central sphere into an instrument, rather than a planet.
    for (let i = 0; i < 6; i++) {
      const meridian = new THREE.Mesh(
        new THREE.TorusGeometry(0.85, 0.009, 5, 70),
        pale,
      );
      meridian.rotation.y = (Math.PI / 6) * i;
      sculpture.add(meridian);
    }
    const equator = new THREE.Mesh(
      new THREE.TorusGeometry(0.85, 0.014, 6, 80),
      bright,
    );
    equator.rotation.x = Math.PI / 2;
    sculpture.add(equator);
    const satellites = new THREE.Group();
    sculpture.add(satellites);
    [
      [2.1, 0.2, 0.7, 0.15],
      [-1.65, -1.3, 0.5, 0.12],
      [0.3, 1.95, -0.7, 0.08],
    ].forEach(([x, y, z, r]) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 16), bright);
      node.position.set(x, y, z);
      satellites.add(node);
    });
    // Distant fine orbits provide depth without obscuring the sculpture.
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x79aa9e,
      transparent: true,
      opacity: 0.2,
    });
    [2.62, 2.85].forEach((radius, i) => {
      const wire = new THREE.Mesh(
        new THREE.TorusGeometry(radius, 0.006, 4, 150),
        wireMaterial,
      );
      wire.rotation.set(0.8 + i * 0.6, -0.35, -0.25 + i);
      sculpture.add(wire);
    });
    let visible = true;
    let destroyed = false;
    let frame = 0;
    let previousTime = 0;
    let elapsed = 0;
    let pointerX = 0;
    let pointerY = 0;
    const render = () => {
      renderer.render(scene, camera);
      container.classList.add('is-rendered');
      container.dataset.renderer = 'webgl';
    };
    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 0.85 ? 12.8 : 10.5;
      camera.updateProjectionMatrix();
      render();
    };
    function tick(time: number) {
      frame = 0;
      if (destroyed || !visible || document.hidden || paused()) return;
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      elapsed += delta;
      const scroll = Math.min(window.scrollY / window.innerHeight, 1);
      sculpture.rotation.y +=
        (elapsed * 0.18 +
          pointerX * 0.38 +
          scroll * 0.95 -
          sculpture.rotation.y) *
        0.035;
      sculpture.rotation.x +=
        (-0.12 + pointerY * 0.13 + scroll * 0.28 - sculpture.rotation.x) *
        0.035;
      sculpture.position.y = Math.sin(elapsed * 0.6) * 0.075;
      // A circular ring spinning around its normal looks stationary. Tilt its plane.
      outer.rotation.x = 0.85 + Math.sin(elapsed * 0.45) * 0.6;
      outer.rotation.y = 0.35 + elapsed * 0.25;
      middle.rotation.y = 1.08 - elapsed * 0.2;
      middle.rotation.x = -0.45 + Math.sin(elapsed * 0.55) * 0.4;
      inner.rotation.y = -0.45 - elapsed * 0.32;
      satellites.rotation.y = elapsed * 0.45;
      render();
      frame = requestAnimationFrame(tick);
    }
    function schedule() {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (destroyed) return;
      if (visible && !document.hidden && !paused()) {
        previousTime = performance.now();
        frame = requestAnimationFrame(tick);
      } else if (visible && !document.hidden) render();
    }
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || paused()) return;
      const rect = container.getBoundingClientRect();
      pointerX = Math.max(
        -1,
        Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
      );
      pointerY = Math.max(
        -1,
        Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
      );
    };
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      schedule();
    });
    observer.observe(container);
    const resizer = new ResizeObserver(resize);
    resizer.observe(container);
    window.addEventListener('pointermove', pointer, { passive: true });
    document.addEventListener('visibilitychange', schedule);
    window.addEventListener('renkav:motion', schedule);
    sculpture.rotation.set(-0.12, -0.15, 0.06);
    resize();
    schedule();
    canvas.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      destroyed = true;
      cancelAnimationFrame(frame);
      container.classList.remove('is-rendered');
      container.dataset.renderer = 'css';
      canvas.hidden = true;
    });
    window.addEventListener(
      'pagehide',
      (event) => {
        if (event.persisted) return;
        destroyed = true;
        cancelAnimationFrame(frame);
        observer.disconnect();
        resizer.disconnect();
        window.removeEventListener('pointermove', pointer);
        document.removeEventListener('visibilitychange', schedule);
        window.removeEventListener('renkav:motion', schedule);
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) object.geometry.dispose();
        });
        pale.dispose();
        dark.dispose();
        bright.dispose();
        wireMaterial.dispose();
        renderer.dispose();
      },
      { once: true },
    );
  } catch {
    // The CSS sculpture is also the fallback when WebGL is unavailable.
    container.dataset.renderer = 'css';
    canvas.hidden = true;
  }
}
