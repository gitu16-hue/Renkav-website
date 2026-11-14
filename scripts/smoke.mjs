import { spawn } from "node:child_process";
import assert from "node:assert/strict";
import { setTimeout as delay } from "node:timers/promises";

// Test the actual production server. Bind only to loopback; stop it on completion.
const port = 31479;
const origin = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  {
    stdio: ["ignore", "pipe", "pipe"],
    env: {
      ...process.env,
      NODE_ENV: "production",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
);
let logs = "";
server.stdout.on("data", (chunk) => {
  logs += chunk;
});
server.stderr.on("data", (chunk) => {
  logs += chunk;
});
try {
  let ready = false;
  for (let i = 0; i < 60; i++) {
    if (server.exitCode !== null) throw new Error(logs);
    try {
      const response = await fetch(origin);
      if (response.ok) {
        ready = true;
        break;
      }
    } catch {}
    await delay(250);
  }
  assert.ok(ready, `Production server did not start: ${logs}`);
  const nonces = new Set();
  for (const route of [
    "/",
    "/about",
    "/ventures",
    "/leadership",
    "/contact",
    "/privacy",
  ]) {
    const response = await fetch(origin + route);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const policy = response.headers.get("content-security-policy");
    assert.ok(
      policy?.includes("frame-ancestors 'none'"),
      `${route}: frame protection`,
    );
    assert.ok(
      policy?.includes("form-action 'none'"),
      `${route}: native form transmission blocked`,
    );
    assert.ok(
      !policy.includes("'unsafe-eval'"),
      `${route}: no production eval`,
    );
    const nonce = policy.match(/'nonce-([^']+)'/)?.[1];
    assert.ok(nonce && !nonces.has(nonce), `${route}: unique nonce`);
    nonces.add(nonce);
    for (const script of html.matchAll(/<script\b([^>]*)>/g))
      assert.ok(
        script[1].includes(`nonce="${nonce}"`),
        `${route}: script nonce matches policy`,
      );
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("referrer-policy"), "no-referrer");
    assert.ok(response.headers.get("cache-control")?.includes("no-store"));
    assert.equal(response.headers.get("x-powered-by"), null);
    assert.ok(html.includes("noindex"));
    assert.equal(
      (html.match(/<h1\b/g) ?? []).length,
      1,
      `${route}: one page heading`,
    );
    assert.ok(html.includes("Skip to main content"));
    assert.ok(html.includes("Reduce motion"));
    if (route === "/") {
      assert.ok(html.includes("sculpture-ring"));
      assert.ok(html.includes("AI that helps you"));
      const assets = [
        ...html.matchAll(
          /(?:src|href)="([^" ]+\.(?:css|js|woff2)(?:\?[^" ]*)?)"/g,
        ),
      ].map((m) => m[1]);
      for (const asset of new Set(assets)) {
        assert.ok(asset.startsWith("/"), `Asset must be same-origin: ${asset}`);
        assert.equal(
          (await fetch(origin + asset.replaceAll("&amp;", "&"))).status,
          200,
          asset,
        );
      }
    }
    if (route === "/about") {
      assert.ok(html.includes("Why we started RENKAV."));
    }
    if (route === "/ventures") {
      assert.ok(html.includes("One assistant for work that continues."));
      assert.ok(html.includes("A realistic workflow"));
      assert.ok(html.includes("Development priorities"));
      assert.ok(html.includes("Frequently asked questions"));
    }
    if (route === "/leadership") {
      assert.ok(html.includes("The founders behind RENKAV."));
      assert.ok(html.includes("Gitanshu Damade"));
      assert.ok(html.includes("Yashika Pawar"));
    }
    if (route === "/contact") {
      assert.ok(html.includes("Open email draft"));
      assert.ok(html.includes("mailto:gitanshu@renkav.online"));
    }
    console.log(
      `PASS ${route}: response, CSP, unique nonce, headers, semantics and local assets`,
    );
  }
  assert.equal(
    (await fetch(origin + "/this-route-does-not-exist")).status,
    404,
  );
  console.log("PASS unknown route: 404");
} finally {
  server.kill("SIGTERM");
  await new Promise((resolve) => {
    if (server.exitCode !== null) resolve();
    else server.once("exit", resolve);
  });
}
