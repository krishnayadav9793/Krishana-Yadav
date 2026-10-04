"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const containerRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Verify WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      });
    } catch {
      setWebglSupported(false);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Group holding the entire interconnected system
    const systemGroup = new THREE.Group();
    scene.add(systemGroup);

    // 1. Central Core: High-tech wireframe Icosahedron (Algorithm Core)
    const coreGeometry = new THREE.IcosahedronGeometry(1.6, 2);
    const coreWireframe = new THREE.WireframeGeometry(coreGeometry);
    const coreMaterial = new THREE.LineBasicMaterial({
      color: 0x818cf8, // Indigo-400
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const coreLine = new THREE.LineSegments(coreWireframe, coreMaterial);
    systemGroup.add(coreLine);

    // Inner glowing geometric core
    const innerGeom = new THREE.OctahedronGeometry(0.8, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4, // Cyan-500
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    systemGroup.add(innerMesh);

    // 2. Network Nodes (Interconnected Data Points)
    const nodeCount = 65;
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeVelocities = [];
    const radius = 2.8;

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * (0.65 + Math.random() * 0.7);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;

      nodeVelocities.push({
        x: (Math.random() - 0.5) * 0.003,
        y: (Math.random() - 0.5) * 0.003,
        z: (Math.random() - 0.5) * 0.003
      });
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    // Custom circle texture for soft glowing particles
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.3, "rgba(129, 140, 248, 0.8)");
    gradient.addColorStop(0.7, "rgba(6, 182, 212, 0.3)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const nodeMaterial = new THREE.PointsMaterial({
      size: 0.16,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const nodes = new THREE.Points(nodeGeometry, nodeMaterial);
    systemGroup.add(nodes);

    // 3. Dynamic Connecting Lines between nearby nodes
    const maxConnections = 120;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    systemGroup.add(lines);

    // 4. Outer Orbital Particle Ring (Representing Global Distributed Network)
    const ringCount = 180;
    const ringPositions = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const ringRadius = 3.6 + (Math.random() - 0.5) * 0.4;
      ringPositions[i * 3] = Math.cos(angle) * ringRadius;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.35;
      ringPositions[i * 3 + 2] = Math.sin(angle) * ringRadius;
    }
    const ringGeometry = new THREE.BufferGeometry();
    ringGeometry.setAttribute("position", new THREE.BufferAttribute(ringPositions, 3));

    const ringMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const orbitalRing = new THREE.Points(ringGeometry, ringMaterial);
    orbitalRing.rotation.x = 0.55;
    orbitalRing.rotation.z = -0.2;
    systemGroup.add(orbitalRing);

    // Mouse Interaction Tracking with Smooth Damping
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.8;
      mouse.targetY = y * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Scroll Reaction
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY * 0.001;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // FPS calculation
      frameCount++;
      const now = performance.now();
      if (now - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = now;
      }

      if (!prefersReducedMotion) {
        // Smooth mouse interpolation
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        // Rotate system group
        systemGroup.rotation.y = elapsedTime * 0.15 + mouse.x * 0.6;
        systemGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.15 - mouse.y * 0.6 + scrollY;

        // Counter-rotate inner core
        innerMesh.rotation.y = -elapsedTime * 0.4;
        innerMesh.rotation.x = elapsedTime * 0.2;

        // Orbit ring rotation
        orbitalRing.rotation.y = -elapsedTime * 0.1;

        // Subtle core pulsing
        const scale = 1 + Math.sin(elapsedTime * 1.5) * 0.04;
        coreLine.scale.set(scale, scale, scale);

        // Update node positions and dynamic network connections
        const positions = nodeGeometry.attributes.position.array;
        let connectionCount = 0;
        const linePos = lineGeometry.attributes.position.array;
        const lineCol = lineGeometry.attributes.color.array;

        for (let i = 0; i < nodeCount; i++) {
          positions[i * 3] += nodeVelocities[i].x;
          positions[i * 3 + 1] += nodeVelocities[i].y;
          positions[i * 3 + 2] += nodeVelocities[i].z;

          // Boundary bounce within sphere
          const distSq =
            positions[i * 3] ** 2 +
            positions[i * 3 + 1] ** 2 +
            positions[i * 3 + 2] ** 2;
          if (distSq > 11.0 || distSq < 2.0) {
            nodeVelocities[i].x *= -1;
            nodeVelocities[i].y *= -1;
            nodeVelocities[i].z *= -1;
          }

          // Check line connections to other nodes
          for (let j = i + 1; j < nodeCount; j++) {
            if (connectionCount >= maxConnections) break;

            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 1.3) {
              const alpha = 1.0 - dist / 1.3;
              const idx = connectionCount * 6;

              linePos[idx] = positions[i * 3];
              linePos[idx + 1] = positions[i * 3 + 1];
              linePos[idx + 2] = positions[i * 3 + 2];

              linePos[idx + 3] = positions[j * 3];
              linePos[idx + 4] = positions[j * 3 + 1];
              linePos[idx + 5] = positions[j * 3 + 2];

              lineCol[idx] = 0.5 * alpha;
              lineCol[idx + 1] = 0.55 * alpha;
              lineCol[idx + 2] = 0.95 * alpha;

              lineCol[idx + 3] = 0.1 * alpha;
              lineCol[idx + 4] = 0.7 * alpha;
              lineCol[idx + 5] = 0.85 * alpha;

              connectionCount++;
            }
          }
        }

        nodeGeometry.attributes.position.needsUpdate = true;
        lineGeometry.setDrawRange(0, connectionCount * 2);
        lineGeometry.attributes.position.needsUpdate = true;
        lineGeometry.attributes.color.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      resizeObserver.disconnect();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      coreGeometry.dispose();
      coreMaterial.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webglSupported) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl bg-neutral-900/60 border border-border/40 p-8 text-center text-muted-foreground">
        <div className="w-12 h-12 rounded-full border border-indigo-500/40 flex items-center justify-center text-indigo-400 mb-3 animate-pulse">
          ⚡
        </div>
        <p className="font-mono text-xs text-foreground font-semibold">CORE_ALGORITHM_NETWORK</p>
        <p className="font-sans text-xs text-muted-foreground mt-1">WebGL disabled or unavailable</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[380px] sm:h-[450px] lg:h-[500px] flex items-center justify-center">
      {/* 3D WebGL Canvas Container */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Technical Telemetry HUD Overlays */}
      <div className="absolute top-4 left-4 pointer-events-none flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        <span>SYS_NODE: ACTIVE</span>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
        <span>FPS: {fps}</span>
      </div>

      <div className="absolute bottom-4 left-4 pointer-events-none flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-400">
        <span className="text-indigo-400">●</span>
        <span>LATENCY: 12ms</span>
      </div>

      <div className="absolute bottom-4 right-4 pointer-events-none px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-400">
        <span>NODES: 65 // GRAPH_CONN</span>
      </div>
    </div>
  );
}
