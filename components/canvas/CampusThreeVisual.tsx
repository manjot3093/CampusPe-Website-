'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CampusThreeVisualProps {
  className?: string;
  theme?: 'light' | 'dark';
}

export default function CampusThreeVisual({
  className = '',
  theme = 'light',
}: CampusThreeVisualProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 700;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 36);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const isDark = theme === 'dark';
    const primaryColor = isDark ? 0x38bdf8 : 0x0062ff;
    const secondaryColor = isDark ? 0x818cf8 : 0x635bff;
    const accentColor = isDark ? 0xf59e0b : 0xff542e;
    const filamentColor = isDark ? 0x1e293b : 0x0062ff;

    // 1. Campus Network Nodes (Students, Colleges, Employers)
    const nodeCount = 42;
    interface NetworkNode {
      position: THREE.Vector3;
      velocity: THREE.Vector3;
      type: 'college' | 'student' | 'employer';
      mesh: THREE.Mesh;
    }

    const nodes: NetworkNode[] = [];
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // Distinct geometries for different campus entities
    const collegeGeo = new THREE.OctahedronGeometry(0.7, 0);
    const studentGeo = new THREE.SphereGeometry(0.35, 8, 8);
    const employerGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    geometriesToDispose.push(collegeGeo, studentGeo, employerGeo);

    const collegeMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.8 : 0.7,
    });
    const studentMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: isDark ? 0.7 : 0.55,
    });
    const employerMat = new THREE.MeshBasicMaterial({
      color: accentColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.85 : 0.75,
    });
    materialsToDispose.push(collegeMat, studentMat, employerMat);

    for (let i = 0; i < nodeCount; i++) {
      const type = i % 7 === 0 ? 'college' : i % 5 === 0 ? 'employer' : 'student';
      const geo = type === 'college' ? collegeGeo : type === 'employer' ? employerGeo : studentGeo;
      const mat = type === 'college' ? collegeMat : type === 'employer' ? employerMat : studentMat;
      const mesh = new THREE.Mesh(geo, mat);

      const pos = new THREE.Vector3(
        (Math.random() - 0.5) * 44,
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 16
      );
      mesh.position.copy(pos);
      nodeGroup.add(mesh);

      nodes.push({
        position: pos,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.015,
          (Math.random() - 0.5) * 0.008
        ),
        type,
        mesh,
      });
    }

    // 2. Connecting Neural Filaments
    const maxConnections = 70;
    const linePositions = new Float32Array(maxConnections * 2 * 3);
    const lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    geometriesToDispose.push(lineGeo);

    const lineMat = new THREE.LineBasicMaterial({
      color: filamentColor,
      transparent: true,
      opacity: isDark ? 0.22 : 0.14,
    });
    materialsToDispose.push(lineMat);

    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // 3. Subtle Concentric Orbital Paths (The Campus Orbit)
    const orbitalGroup = new THREE.Group();
    scene.add(orbitalGroup);

    [14, 22].forEach((radius, i) => {
      const curve = new THREE.EllipseCurve(0, 0, radius, radius * 0.65, 0, 2 * Math.PI, false, 0);
      const points = curve.getPoints(72);
      const orbitGeo = new THREE.BufferGeometry().setFromPoints(
        points.map((p) => new THREE.Vector3(p.x, p.y, 0))
      );
      geometriesToDispose.push(orbitGeo);

      const orbitMat = new THREE.LineBasicMaterial({
        color: primaryColor,
        transparent: true,
        opacity: isDark ? 0.18 : 0.09,
      });
      materialsToDispose.push(orbitMat);

      const orbitLine = new THREE.Line(orbitGeo, orbitMat);
      orbitLine.rotation.x = Math.PI * 0.32 + i * 0.2;
      orbitLine.rotation.y = i * 0.4;
      orbitalGroup.add(orbitLine);
    });

    // 4. Subtle Background Particles
    const particleCount = 90;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 55;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    geometriesToDispose.push(particleGeo);

    const particleMat = new THREE.PointsMaterial({
      color: primaryColor,
      size: 0.14,
      transparent: true,
      opacity: isDark ? 0.35 : 0.2,
    });
    materialsToDispose.push(particleMat);

    const points = new THREE.Points(particleGeo, particleMat);
    scene.add(points);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.35;
      targetY = y * 0.35;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Window Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // IntersectionObserver to pause rendering when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Dynamic Connection Density based on Scroll
    let scrollConnectionsDistance = 11;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // As user scrolls, connections become more tight and networked
      scrollConnectionsDistance = Math.min(15, 11 + (scrollY / 600) * 3);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Render Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const motionFactor = prefersReducedMotion ? 0.1 : 1;

      // Mouse Lerp
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      nodeGroup.rotation.y += 0.0008 * motionFactor;
      nodeGroup.rotation.x = currentY * 0.3;
      nodeGroup.rotation.z = currentX * 0.3;

      orbitalGroup.rotation.z += 0.0005 * motionFactor;
      points.rotation.y += 0.0003 * motionFactor;

      // Update Node Positions & Bounds Checking
      const boundX = 22;
      const boundY = 14;
      const boundZ = 8;

      nodes.forEach((node) => {
        node.position.addScaledVector(node.velocity, motionFactor);

        if (Math.abs(node.position.x) > boundX) node.velocity.x *= -1;
        if (Math.abs(node.position.y) > boundY) node.velocity.y *= -1;
        if (Math.abs(node.position.z) > boundZ) node.velocity.z *= -1;

        node.mesh.position.copy(node.position);
        node.mesh.rotation.x += 0.01 * motionFactor;
        node.mesh.rotation.y += 0.012 * motionFactor;
      });

      // Update Interconnecting Lines
      let lineIndex = 0;
      const posArray = lineGeo.attributes.position.array as Float32Array;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (lineIndex >= maxConnections) break;

          const dist = nodes[i].position.distanceTo(nodes[j].position);
          if (dist < scrollConnectionsDistance) {
            const idx = lineIndex * 6;
            posArray[idx] = nodes[i].position.x;
            posArray[idx + 1] = nodes[i].position.y;
            posArray[idx + 2] = nodes[i].position.z;
            posArray[idx + 3] = nodes[j].position.x;
            posArray[idx + 4] = nodes[j].position.y;
            posArray[idx + 5] = nodes[j].position.z;
            lineIndex++;
          }
        }
      }

      // Clear remaining line coordinates
      for (let i = lineIndex * 6; i < maxConnections * 6; i++) {
        posArray[i] = 0;
      }
      lineGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    />
  );
}
