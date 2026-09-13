'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function PreloaderScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    mount.appendChild(renderer.domElement);

    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.5, 1),
      new THREE.MeshBasicMaterial({ color: 0xe10600, wireframe: true, transparent: true, opacity: 0.35 })
    );
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 0),
      new THREE.MeshBasicMaterial({ color: 0xff3b30, wireframe: true })
    );
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2, 0.006, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0xe10600, transparent: true, opacity: 0.5 })
    );
    ring.rotation.x = Math.PI / 2;

    scene.add(shell, core, ring);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      core.rotation.y += delta * 0.5;
      core.rotation.x += delta * 0.15;
      shell.rotation.y -= delta * 0.25;
      ring.rotation.z += delta * 0.6;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      shell.geometry.dispose();
      (shell.material as THREE.Material).dispose();
      core.geometry.dispose();
      (core.material as THREE.Material).dispose();
      ring.geometry.dispose();
      (ring.material as THREE.Material).dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
