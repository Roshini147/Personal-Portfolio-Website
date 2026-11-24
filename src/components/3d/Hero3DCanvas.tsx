import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Isometric-angled perspective
    const scene = new THREE.Scene();
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 1000);
    // Angled isometric viewpoint
    camera.position.set(16, 12, 18);
    camera.lookAt(0, 0, 0);

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

    // Color definitions
    const COLOR_DEEP_TEAL = 0x0b2d35;
    const COLOR_TEAL_ACCENT = 0x14b8a6;
    const COLOR_CORAL = 0xff6f61;
    const COLOR_CREAM = 0xfaf7f2;

    // 1. Isometric Layered Platform 1 (Bottom Tier)
    const basePlateGeo = new THREE.CylinderGeometry(7.5, 8.5, 0.35, 6);
    const basePlateMat = new THREE.MeshStandardMaterial({
      color: COLOR_DEEP_TEAL,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.4,
      wireframe: false,
    });
    const basePlate = new THREE.Mesh(basePlateGeo, basePlateMat);
    basePlate.position.y = -3;
    masterGroup.add(basePlate);

    const basePlateWireMat = new THREE.MeshBasicMaterial({
      color: COLOR_TEAL_ACCENT,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const basePlateWire = new THREE.Mesh(basePlateGeo, basePlateWireMat);
    basePlateWire.position.y = -3;
    masterGroup.add(basePlateWire);

    // 2. Middle Floating Isometric Platform
    const midPlateGeo = new THREE.CylinderGeometry(5.2, 5.8, 0.25, 6);
    const midPlateMat = new THREE.MeshStandardMaterial({
      color: 0x103943,
      roughness: 0.3,
      metalness: 0.7,
      transparent: true,
      opacity: 0.5,
    });
    const midPlate = new THREE.Mesh(midPlateGeo, midPlateMat);
    midPlate.position.y = -1;
    masterGroup.add(midPlate);

    const midPlateWireMat = new THREE.MeshBasicMaterial({
      color: COLOR_CORAL,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const midPlateWire = new THREE.Mesh(midPlateGeo, midPlateWireMat);
    midPlateWire.position.y = -1;
    masterGroup.add(midPlateWire);

    // 3. Central Isometric Crystal / Tech Core
    const coreGeo = new THREE.OctahedronGeometry(2.4, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: COLOR_CORAL,
      roughness: 0.2,
      metalness: 0.8,
      transparent: true,
      opacity: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 1.2;
    masterGroup.add(coreMesh);

    const coreWireMat = new THREE.MeshBasicMaterial({
      color: COLOR_CREAM,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const coreWire = new THREE.Mesh(coreGeo, coreWireMat);
    coreWire.position.y = 1.2;
    masterGroup.add(coreWire);

    // 4. Orbiting Isometric Ring in Coral
    const ringGeo = new THREE.TorusGeometry(5, 0.06, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: COLOR_CORAL,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.5;
    ringMesh.position.y = 1.2;
    masterGroup.add(ringMesh);

    // 5. Floating Isometric Data Cubes / Pillars
    const cubeGroup = new THREE.Group();
    const cubeGeo = new THREE.BoxGeometry(0.7, 1.4, 0.7);
    const cubeCount = 6;
    const cubes: THREE.Mesh[] = [];

    for (let i = 0; i < cubeCount; i++) {
      const angle = (i / cubeCount) * Math.PI * 2;
      const radius = 4.2;
      const cubeMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? COLOR_TEAL_ACCENT : COLOR_CORAL,
        roughness: 0.3,
        metalness: 0.7,
        transparent: true,
        opacity: 0.75,
      });
      const cube = new THREE.Mesh(cubeGeo, cubeMat);
      cube.position.set(Math.cos(angle) * radius, 0.2, Math.sin(angle) * radius);
      cube.rotation.y = angle;
      cubeGroup.add(cube);
      cubes.push(cube);
    }
    masterGroup.add(cubeGroup);

    // 6. Constellation nodes on isometric perimeter
    const nodeCount = 36;
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2;
      const r = 6.8 + (Math.sin(i * 3) * 0.8);
      nodePositions[i * 3] = Math.cos(angle) * r;
      nodePositions[i * 3 + 1] = -2.2 + (Math.sin(i * 2) * 0.8);
      nodePositions[i * 3 + 2] = Math.sin(angle) * r;
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    const nodeMat = new THREE.PointsMaterial({
      color: COLOR_CREAM,
      size: 0.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    masterGroup.add(nodePoints);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const coralLight = new THREE.PointLight(COLOR_CORAL, 3.5, 30);
    coralLight.position.set(8, 12, 10);
    scene.add(coralLight);

    const tealLight = new THREE.PointLight(COLOR_TEAL_ACCENT, 2.5, 30);
    tealLight.position.set(-10, -5, -8);
    scene.add(tealLight);

    // Mouse Interaction
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (event.clientX / innerWidth - 0.5) * 1.2;
      targetY = (event.clientY / innerHeight - 0.5) * 1.2;
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
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Slow isometric rotation
        basePlate.rotation.y = elapsed * 0.04;
        basePlateWire.rotation.y = elapsed * 0.04;

        midPlate.rotation.y = -elapsed * 0.07;
        midPlateWire.rotation.y = -elapsed * 0.07;

        coreMesh.rotation.y = elapsed * 0.18;
        coreMesh.rotation.z = elapsed * 0.12;
        coreWire.rotation.y = elapsed * 0.18;
        coreWire.rotation.z = elapsed * 0.12;

        ringMesh.rotation.z = elapsed * 0.15;

        cubeGroup.rotation.y = elapsed * 0.06;
        cubes.forEach((cube, idx) => {
          cube.position.y = 0.2 + Math.sin(elapsed * 2 + idx) * 0.35;
        });

        nodePoints.rotation.y = -elapsed * 0.05;

        // Subtle levitation
        masterGroup.position.y = Math.sin(elapsed * 0.8) * 0.25;

        // Smooth mouse lerping
        currentX += (targetX - currentX) * 0.04;
        currentY += (targetY - currentY) * 0.04;
        masterGroup.rotation.y = currentX * 0.35;
        masterGroup.rotation.x = currentY * 0.2;
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

      basePlateGeo.dispose();
      basePlateMat.dispose();
      basePlateWireMat.dispose();
      midPlateGeo.dispose();
      midPlateMat.dispose();
      midPlateWireMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      coreWireMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      cubeGeo.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-75"
      aria-hidden="true"
    />
  );
};
