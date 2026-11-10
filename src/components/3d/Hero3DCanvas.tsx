import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Outer Geometric Icosahedron Cage
    const geometry = new THREE.IcosahedronGeometry(7, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const outerMesh = new THREE.Mesh(geometry, wireframeMaterial);
    masterGroup.add(outerMesh);

    // 2. Inner Polyhedron Core
    const innerGeometry = new THREE.OctahedronGeometry(4, 1);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      roughness: 0.3,
      metalness: 0.7,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    masterGroup.add(innerMesh);

    // 3. Glowing Node Vertices
    const positions = geometry.attributes.position.array;
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.18,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    masterGroup.add(nodePoints);

    // 4. Orbiting Ambient Ring
    const ringGeo = new THREE.TorusGeometry(8.5, 0.08, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    masterGroup.add(ringMesh);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x3b82f6, 3, 40);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (event.clientX / innerWidth - 0.5) * 1.5;
      targetY = (event.clientY / innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        outerMesh.rotation.y = elapsedTime * 0.09;
        outerMesh.rotation.x = elapsedTime * 0.05;

        innerMesh.rotation.y = -elapsedTime * 0.14;
        innerMesh.rotation.z = elapsedTime * 0.07;

        nodePoints.rotation.y = elapsedTime * 0.09;
        nodePoints.rotation.x = elapsedTime * 0.05;

        ringMesh.rotation.z = elapsedTime * 0.08;

        // Floating pulse
        masterGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.3;

        // Mouse Lerp
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        masterGroup.rotation.y += currentX * 0.03;
        masterGroup.rotation.x += currentY * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      innerGeometry.dispose();
      nodeGeometry.dispose();
      ringGeo.dispose();
      wireframeMaterial.dispose();
      innerMaterial.dispose();
      nodeMaterial.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-70"
      aria-hidden="true"
    />
  );
};
