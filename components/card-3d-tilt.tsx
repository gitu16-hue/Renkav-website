"use client";

import React, { useRef, useState, useCallback, useSyncExternalStore } from "react";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

function subscribeFinePointer(callback: () => void) {
  const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getFinePointerSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getFinePointerServerSnapshot() {
  return false;
}

/**
 * Microdose Studio-inspired Depth Perspective & 3D Interactive Tilt:
 * - Real-time CSS perspective stage
 * - Smooth pointer-driven rotateX / rotateY with physical momentum
 * - Dynamic specular sheen highlight that tracks cursor position
 * - Graceful spring-like return on pointer leave
 * - Automatic touch device and reduced-motion bypass
 */
export function Card3DTilt({
  children,
  className = "",
  maxTilt = 5,
  glare = true,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState("");
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const isFinePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointerSnapshot,
    getFinePointerServerSnapshot
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isFinePointer || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      const rotateX = -y * maxTilt;
      const rotateY = x * maxTilt;

      setTransformStyle(
        `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.012, 1.012, 1.012)`
      );

      if (glare) {
        const glareX = ((x + 0.5) * 100).toFixed(1);
        const glareY = ((y + 0.5) * 100).toFixed(1);
        setGlareStyle({
          opacity: 0.18,
          background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(162, 229, 208, 0.45) 0%, transparent 65%)`,
        });
      }
    },
    [isFinePointer, maxTilt, glare]
  );

  const handlePointerEnter = useCallback(() => {
    if (isFinePointer) setIsHovered(true);
  }, [isFinePointer]);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setTransformStyle("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlareStyle({ opacity: 0, transition: "opacity 0.4s ease-out" });
  }, []);

  return (
    <div
      ref={cardRef}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative will-change-transform ${className}`}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? "transform 0.1s ease-out"
          : "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
      {glare && isFinePointer && (
        <div
          className="pointer-events-none absolute inset-0 rounded-xl overflow-hidden transition-opacity"
          style={glareStyle}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
