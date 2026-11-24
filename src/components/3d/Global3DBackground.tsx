import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Global3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Cinematic Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04161a, 0.015);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 36);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Color definitions
    const COLOR_CORAL = 0xff6f61;
    const COLOR_TEAL = 0x2dd4bf;
    const COLOR_CREAM = 0xfaf7f2;
    const COLOR_DEEP_TEAL = 0x092830;

    // ==========================================
    // 2. PROCEDURAL 3D FLOWING WAVE GRID (CYBER HORIZON)
    // ==========================================
    const gridCols = 55;
    const gridRows = 55;
    const waveGeo = new THREE.PlaneGeometry(100, 100, gridCols, gridRows);
    
    // Wireframe Mesh for flowing digital terrain
    const waveMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      roughness: 0.3,
      metalness: 0.8,
    });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);
    waveMesh.rotation.x = -Math.PI / 2.6; // Angled futuristic horizon
    waveMesh.position.set(0, -14, -8);
    masterGroup.add(waveMesh);

    // Glowing Node Points on the Wave Vertices
    const wavePointsGeo = waveGeo.clone();
    const wavePointsMat = new THREE.PointsMaterial({
      color: COLOR_CORAL,
      size: 0.18,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const wavePoints = new THREE.Points(wavePointsGeo, wavePointsMat);
    wavePoints.rotation.x = -Math.PI / 2.6;
    wavePoints.position.set(0, -14, -8);
    masterGroup.add(wavePoints);

    const originalWavePositions = new Float32Array(waveGeo.attributes.position.array);

    // ==========================================
    // 3. FLOATING 3D MINIMALIST POLYHEDRAL SCULPTURES
    // Spaced down the vertical scroll axis to frame content
    // ==========================================
    const floatingEntities: Array<{
      group: THREE.Group;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      initialY: number;
      floatSpeed: number;
      floatOffset: number;
    }> = [];

    const polyGeos = [
      new THREE.IcosahedronGeometry(2.2, 0),
      new THREE.OctahedronGeometry(2.4, 0),
      new THREE.DodecahedronGeometry(2.0, 0),
      new THREE.TorusGeometry(2.6, 0.08, 16, 48),
      new THREE.TetrahedronGeometry(2.5, 0),
    ];

    const entityCount = 16;
    for (let i = 0; i < entityCount; i++) {
      const entityGroup = new THREE.Group();
      const geo = polyGeos[i % polyGeos.length];

      // Outer wireframe cage
      const cageMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? COLOR_CORAL : COLOR_TEAL,
        wireframe: true,
        transparent: true,
        opacity: 0.5,
        roughness: 0.2,
        metalness: 0.8,
      });
      const cageMesh = new THREE.Mesh(geo, cageMat);
      entityGroup.add(cageMesh);

      // Inner glowing core
      const innerGeo = geo.clone();
      const innerMat = new THREE.MeshStandardMaterial({
        color: i % 3 === 0 ? COLOR_CREAM : COLOR_DEEP_TEAL,
        wireframe: false,
        transparent: true,
        opacity: 0.35,
        roughness: 0.4,
        metalness: 0.7,
      });
      const innerMesh = new THREE.Mesh(innerGeo, innerMat);
      innerMesh.scale.setScalar(0.65);
      entityGroup.add(innerMesh);

      // Orbiting micro-ring
      const microRingGeo = new THREE.TorusGeometry(3.2, 0.04, 12, 36);
      const microRingMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? COLOR_TEAL : COLOR_CORAL,
        transparent: true,
        opacity: 0.4,
      });
      const microRing = new THREE.Mesh(microRingGeo, microRingMat);
      microRing.rotation.x = Math.PI / 3;
      entityGroup.add(microRing);

      // Position along the flanks (left & right margins) and vertically down the page
      const side = i % 2 === 0 ? 1 : -1;
      const x = side * (16 + Math.random() * 10);
      const y = 12 - i * 9.5; // Spans deep down the entire scroll length
      const z = -4 + (Math.random() - 0.5) * 14;

      entityGroup.position.set(x, y, z);
      masterGroup.add(entityGroup);

      floatingEntities.push({
        group: entityGroup,
        rotSpeedX: (Math.random() - 0.5) * 0.012,
        rotSpeedY: (Math.random() - 0.5) * 0.018,
        rotSpeedZ: (Math.random() - 0.5) * 0.008,
        initialY: y,
        floatSpeed: 0.7 + Math.random() * 0.7,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    // ==========================================
    // 4. PARTICLES & DIGITAL STARDUST
    // ==========================================
    const particleCount = 340;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cCoral = new THREE.Color(COLOR_CORAL);
    const cTeal = new THREE.Color(COLOR_TEAL);
    const cCream = new THREE.Color(COLOR_CREAM);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 115;
      positions[i * 3 + 1] = 25 - Math.random() * 185;
      positions[i * 3 + 2] = -20 + Math.random() * 45;

      const rand = Math.random();
      let col = cCream;
      if (rand < 0.45) col = cCoral;
      else if (rand < 0.8) col = cTeal;

      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleCloud = new THREE.Points(particleGeo, particleMat);
    masterGroup.add(particleCloud);

    // ==========================================
    // 5. CINEMATIC LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.75);
    scene.add(ambientLight);

    const cursorLight = new THREE.PointLight(COLOR_CORAL, 3.8, 65);
    scene.add(cursorLight);

    const orbitalLight = new THREE.PointLight(COLOR_TEAL, 3.2, 70);
    scene.add(orbitalLight);

    const keyDirectional = new THREE.DirectionalLight(COLOR_CREAM, 0.7);
    keyDirectional.position.set(10, 20, 20);
    scene.add(keyDirectional);

    // ==========================================
    // 6. MOUSE & SCROLL LERP ENGINE
    // ==========================================
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let scrollY = 0;
    let targetScrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // ==========================================
    // 7. ANIMATION TICK (60FPS)
    // ==========================================
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth lerping
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
        scrollY += (targetScrollY - scrollY) * 0.06;

        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const scrollFraction = scrollY / maxScroll;

        // Camera smoothly glides down the 3D space with page scroll
        camera.position.y = -scrollFraction * 140;
        camera.position.x = mouseX * 2.5;
        camera.rotation.y = mouseX * 0.04;
        camera.rotation.x = -mouseY * 0.03;

        // 1. Procedural 3D Wave Motion
        const wavePos = waveGeo.attributes.position;
        const wavePointsPos = wavePointsGeo.attributes.position;
        const posArray = wavePos.array as Float32Array;
        const pointsArray = wavePointsPos.array as Float32Array;

        for (let i = 0; i < posArray.length; i += 3) {
          const ox = originalWavePositions[i];
          const oy = originalWavePositions[i + 1];

          // Dual-frequency mathematical fluid displacement
          const z =
            Math.sin(ox * 0.12 + elapsed * 1.3) * 2.2 +
            Math.cos(oy * 0.14 + elapsed * 1.0) * 1.8 +
            Math.sin((ox + oy) * 0.08 + elapsed * 0.7) * 1.2;

          posArray[i + 2] = z;
          pointsArray[i + 2] = z;
        }
        wavePos.needsUpdate = true;
        wavePointsPos.needsUpdate = true;

        // Follow camera down with subtle offset
        waveMesh.position.y = camera.position.y - 14;
        wavePoints.position.y = camera.position.y - 14;

        // 2. Rotate & bob 3D Floating Sculptures
        for (let i = 0; i < floatingEntities.length; i++) {
          const entity = floatingEntities[i];
          entity.group.rotation.x += entity.rotSpeedX;
          entity.group.rotation.y += entity.rotSpeedY;
          entity.group.rotation.z += entity.rotSpeedZ;

          entity.group.position.y =
            entity.initialY +
            Math.sin(elapsed * entity.floatSpeed + entity.floatOffset) * 0.85;
        }

        // 3. Move Interactive 3D Lights
        cursorLight.position.set(
          mouseX * 16,
          camera.position.y - mouseY * 10 + 2,
          10
        );

        orbitalLight.position.set(
          Math.sin(elapsed * 0.5) * 20,
          camera.position.y + Math.cos(elapsed * 0.7) * 15,
          8
        );

        // 4. Subtle drift of particle constellation
        particleCloud.rotation.y = elapsed * 0.012;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      waveGeo.dispose();
      waveMat.dispose();
      wavePointsGeo.dispose();
      wavePointsMat.dispose();
      polyGeos.forEach((g) => g.dispose());
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90"
      aria-hidden="true"
    />
  );
};
