import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Setup Scene, Camera, Renderer
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

    // Group for mouse parallax
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // 1. Central Geometric Icosahedron Cage (Wireframe & Inner Polyhedron)
    const geometry = new THREE.IcosahedronGeometry(6.5, 2);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const outerMesh = new THREE.Mesh(geometry, wireframeMaterial);
    masterGroup.add(outerMesh);

    // Inner Glowing Core (Tetrahedron / Octahedron)
    const innerGeometry = new THREE.OctahedronGeometry(3.6, 1);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      roughness: 0.2,
      metalness: 0.8,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    masterGroup.add(innerMesh);

    // 2. Vertex Points (Cyber Node Grid)
    const positions = geometry.attributes.position.array;
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.16,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    masterGroup.add(nodePoints);

    // 3. Ambient Orbiting Particle Dust
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 9 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.1,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    masterGroup.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x3b82f6, 3, 50);
    pointLight1.position.set(15, 12, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00f0ff, 2.5, 50);
    pointLight2.position.set(-15, -10, 10);
    scene.add(pointLight2);

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

    // Handle Window Resize
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
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous subtle rotation
        outerMesh.rotation.y = elapsedTime * 0.08;
        outerMesh.rotation.x = elapsedTime * 0.04;

        innerMesh.rotation.y = -elapsedTime * 0.12;
        innerMesh.rotation.z = elapsedTime * 0.06;

        nodePoints.rotation.y = elapsedTime * 0.08;
        nodePoints.rotation.x = elapsedTime * 0.04;

        particleSystem.rotation.y = elapsedTime * 0.03;

        // Subtle floating pulse
        masterGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.25;

        // Smooth Lerp Mouse Parallax
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        masterGroup.rotation.y += currentX * 0.03;
        masterGroup.rotation.x += currentY * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose Geometries and Materials
      geometry.dispose();
      innerGeometry.dispose();
      nodeGeometry.dispose();
      particleGeometry.dispose();
      wireframeMaterial.dispose();
      innerMaterial.dispose();
      nodeMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-70 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
