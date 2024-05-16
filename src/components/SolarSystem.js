import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Sun from './Sun';
import Planet from './Planet';

const SolarSystem = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentMount.appendChild(renderer.domElement);

    // Set up the orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    // Create the sun
    const sun = Sun();
    scene.add(sun);

    // Adding planets
    const planetData = [
      { size: 0.2, color: 0xaaaaaa, distance: 2, speed: 0.5 },
      { size: 0.4, color: 0xffa500, distance: 3, speed: 0.4 },
      { size: 0.4, color: 0x0000ff, distance: 4, speed: 0.3 },
      { size: 0.3, color: 0xff0000, distance: 5, speed: 0.2 },
      { size: 0.9, color: 0xffa500, distance: 7, speed: 0.1 },
      { size: 0.8, color: 0xffff00, distance: 9, speed: 0.08 },
      { size: 0.7, color: 0x00ff00, distance: 11, speed: 0.05 },
      { size: 0.6, color: 0x0000ff, distance: 13, speed: 0.03 },
    ];

    const planets = planetData.map((data) => {
      const planet = Planet(data);
      scene.add(planet);
      return planet;
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      planets.forEach((planet, index) => {
        const { distance, speed } = planetData[index];
        planet.position.x = distance * Math.cos(Date.now() * 0.001 * speed);
        planet.position.z = distance * Math.sin(Date.now() * 0.001 * speed);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      controls.dispose();
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default SolarSystem;
