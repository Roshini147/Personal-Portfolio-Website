import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Global3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04161a, 0.012);

    const camera = new THREE.PerspectiveCamera(
      48,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 32);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Color definitions
    const COLOR_CORAL = 0xff6f61;
    const COLOR_TEAL = 0x2dd4bf;
    const COLOR_CREAM = 0xfaf7f2;
    const COLOR_DEEP_TEAL = 0x092830;

    // ==========================================
    // 1. 3D MOTION UNDULATING BACKGROUND IMAGE
    // ==========================================
    let imageMesh: THREE.Mesh | null = null;
    let originalPositions: Float32Array | null = null;
    const planeGeo = new THREE.PlaneGeometry(80, 60, 50, 50);
    const textureLoader = new THREE.TextureLoader();

    textureLoader.load(
      '/assets/background/isometric-bg.jpg',
      (texture) => {
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;

        const planeMat = new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.35,
          metalness: 0.4,
          transparent: true,
          opacity: 0.48,
          side: THREE.DoubleSide,
          depthWrite: false,
        });

        imageMesh = new THREE.Mesh(planeGeo, planeMat);
        // Tilt into deep isometric perspective
        imageMesh.position.set(2, 0, -12);
        imageMesh.rotation.set(-0.35, 0.2, -0.06);

        // Store original vertex coordinates for sine-wave motion displacement
        const posAttr = planeGeo.attributes.position;
        originalPositions = new Float32Array(posAttr.array);

        worldGroup.add(imageMesh);
      },
      undefined,
      (err) => {
        console.warn('Background texture fallback:', err);
      }
    );

    // ==========================================
    // 2. FLOATING 3D ISOMETRIC GEOMETRIC OBJECTS
    // Distributed along the vertical scroll depth
    // ==========================================
    const floatingObjects: Array<{
      mesh: THREE.Object3D;
      rotSpeedX: number;
      rotSpeedY: number;
      rotSpeedZ: number;
      initialY: number;
      floatSpeed: number;
      floatOffset: number;
    }> = [];

    const geometries = [
      new THREE.OctahedronGeometry(2.2, 0),
      new THREE.IcosahedronGeometry(2.0, 0),
      new THREE.TetrahedronGeometry(2.4, 0),
      new THREE.TorusGeometry(2.8, 0.12, 16, 48),
      new THREE.BoxGeometry(2.0, 2.0, 2.0),
    ];

    const materials = [
      new THREE.MeshStandardMaterial({
        color: COLOR_CORAL,
        wireframe: true,
        transparent: true,
        opacity: 0.55,
        roughness: 0.2,
        metalness: 0.8,
      }),
      new THREE.MeshStandardMaterial({
        color: COLOR_TEAL,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        roughness: 0.2,
        metalness: 0.8,
      }),
      new THREE.MeshStandardMaterial({
        color: COLOR_CREAM,
        wireframe: true,
        transparent: true,
        opacity: 0.45,
        roughness: 0.1,
      }),
      new THREE.MeshStandardMaterial({
        color: COLOR_DEEP_TEAL,
        transparent: true,
        opacity: 0.7,
        roughness: 0.4,
        metalness: 0.6,
      }),
    ];

    // Distribute 18 floating 3D objects down the scroll axis
    const objectCount = 18;
    for (let i = 0; i < objectCount; i++) {
      const geo = geometries[i % geometries.length];
      const mat = materials[i % materials.length];
      const mesh = new THREE.Mesh(geo, mat);

      // Add a glowing inner wireframe / node point to make each object look high-tech
      if (i % 2 === 0) {
        const wireGeo = geo.clone();
        const wireMat = new THREE.MeshBasicMaterial({
          color: i % 4 === 0 ? COLOR_CORAL : COLOR_TEAL,
          wireframe: true,
          transparent: true,
          opacity: 0.8,
        });
        const innerMesh = new THREE.Mesh(wireGeo, wireMat);
        innerMesh.scale.setScalar(0.75);
        mesh.add(innerMesh);
      }

      // Spread along X, Y (down the full height), and Z depth
      const side = i % 2 === 0 ? 1 : -1;
      const x = side * (14 + Math.random() * 12);
      const y = 10 - i * 8.5; // spans down to ~ -145 for deep page scroll
      const z = -6 + (Math.random() - 0.5) * 16;

      mesh.position.set(x, y, z);
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      worldGroup.add(mesh);

      floatingObjects.push({
        mesh,
        rotSpeedX: (Math.random() - 0.5) * 0.015,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.01,
        initialY: y,
        floatSpeed: 0.8 + Math.random() * 0.8,
        floatOffset: Math.random() * Math.PI * 2,
      });
    }

    // ==========================================
    // 3. 3D PARTICLE FIELD WITH DEPTH
    // ==========================================
    const particleCount = 380;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cCoral = new THREE.Color(COLOR_CORAL);
    const cTeal = new THREE.Color(COLOR_TEAL);
    const cCream = new THREE.Color(COLOR_CREAM);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 1] = 20 - Math.random() * 180; // covers full scroll range
      positions[i * 3 + 2] = -25 + Math.random() * 50;

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
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    worldGroup.add(particleSystem);

    // ==========================================
    // 4. DYNAMIC LIGHTING THAT TRACKS SCENE
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const cursorCoralLight = new THREE.PointLight(COLOR_CORAL, 3.5, 60);
    scene.add(cursorCoralLight);

    const rovingTealLight = new THREE.PointLight(COLOR_TEAL, 3.0, 70);
    scene.add(rovingTealLight);

    // Directional light for isometric specular shine
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(15, 20, 25);
    scene.add(dirLight);

    // ==========================================
    // 5. MOUSE & SCROLL TRACKING
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
    // 6. CONTINUOUS 3D MOTION ANIMATION LOOP
    // ==========================================
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth lerping for mouse & scroll
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
        scrollY += (targetScrollY - scrollY) * 0.06;

        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const scrollFraction = scrollY / maxScroll;

        // Camera smoothly glides down the 3D space with page scroll
        camera.position.y = -scrollFraction * 135;
        camera.position.x = mouseX * 2.8;
        camera.rotation.y = mouseX * 0.05;
        camera.rotation.x = -mouseY * 0.035;

        // 1. Undulating 3D wave motion on the background image mesh
        if (imageMesh && originalPositions) {
          const posAttr = planeGeo.attributes.position;
          const posArray = posAttr.array as Float32Array;

          for (let i = 0; i < posArray.length; i += 3) {
            const ox = originalPositions[i];
            const oy = originalPositions[i + 1];

            // Harmonic 3D wave equation
            posArray[i + 2] =
              Math.sin(ox * 0.12 + elapsed * 1.4) * 1.8 +
              Math.cos(oy * 0.12 + elapsed * 1.1) * 1.4 +
              Math.sin((ox + oy) * 0.08 + elapsed * 0.7) * 1.0;
          }
          posAttr.needsUpdate = true;

          // Parallax tracking with scroll & cursor
          imageMesh.position.y = camera.position.y + 2;
          imageMesh.rotation.y = 0.2 + mouseX * 0.08;
          imageMesh.rotation.x = -0.35 + mouseY * 0.06;
        }

        // 2. Rotate & bob all floating 3D objects
        for (let i = 0; i < floatingObjects.length; i++) {
          const item = floatingObjects[i];
          item.mesh.rotation.x += item.rotSpeedX;
          item.mesh.rotation.y += item.rotSpeedY;
          item.mesh.rotation.z += item.rotSpeedZ;

          // Smooth floating levitation
          item.mesh.position.y =
            item.initialY +
            Math.sin(elapsed * item.floatSpeed + item.floatOffset) * 0.9;
        }

        // 3. Move dynamic 3D light sources
        cursorCoralLight.position.set(
          mouseX * 18,
          camera.position.y - mouseY * 12 + 2,
          10
        );

        rovingTealLight.position.set(
          Math.sin(elapsed * 0.6) * 22,
          camera.position.y + Math.cos(elapsed * 0.8) * 18,
          6
        );

        // 4. Subtle rotation on the particle web
        particleSystem.rotation.y = elapsed * 0.015;
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

      planeGeo.dispose();
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
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
