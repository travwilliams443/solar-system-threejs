import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SolarSystem = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene
    const scene = new THREE.Scene();

    // Set up the camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    // Set up the renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Set up the orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 10;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;

    // Create the sun
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Function to create planets
    const createPlanet = (size, color, distance) => {
      const geometry = new THREE.SphereGeometry(size, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color });
      const planet = new THREE.Mesh(geometry, material);
      planet.position.x = distance;
      return planet;
    };

    // Adding planets
    const mercury = createPlanet(0.2, 0xaaaaaa, 2);
    const venus = createPlanet(0.4, 0xffa500, 3);
    const earth = createPlanet(0.4, 0x0000ff, 4);
    const mars = createPlanet(0.3, 0xff0000, 5);
    const jupiter = createPlanet(0.9, 0xffa500, 7);
    const saturn = createPlanet(0.8, 0xffff00, 9);
    const uranus = createPlanet(0.6, 0x00ffff, 11);
    const neptune = createPlanet(0.6, 0x0000ff, 13);
    const pluto = createPlanet(0.1, 0xffffff, 15);

    scene.add(mercury);
    scene.add(venus);
    scene.add(earth);
    scene.add(mars);
    scene.add(jupiter);
    scene.add(saturn);
    scene.add(uranus);
    scene.add(neptune);
    scene.add(pluto);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate the sun
      sun.rotation.y += 0.01;

      // Move the planets around the sun
      const time = Date.now() * 0.0001;
      mercury.position.x = 2 * Math.cos(time);
      mercury.position.z = 2 * Math.sin(time);

      venus.position.x = 3 * Math.cos(time * 0.9);
      venus.position.z = 3 * Math.sin(time * 0.9);

      earth.position.x = 4 * Math.cos(time * 0.8);
      earth.position.z = 4 * Math.sin(time * 0.8);

      mars.position.x = 5 * Math.cos(time * 0.7);
      mars.position.z = 5 * Math.sin(time * 0.7);

      jupiter.position.x = 7 * Math.cos(time * 0.6);
      jupiter.position.z = 7 * Math.sin(time * 0.6);

      saturn.position.x = 9 * Math.cos(time * 0.5);
      saturn.position.z = 9 * Math.sin(time * 0.5);

      uranus.position.x = 11 * Math.cos(time * 0.4);
      uranus.position.z = 11 * Math.sin(time * 0.4);

      neptune.position.x = 13 * Math.cos(time * 0.3);
      neptune.position.z = 13 * Math.sin(time * 0.3);

      pluto.position.x = 15 * Math.cos(time * 0.2);
      pluto.position.z = 15 * Math.sin(time * 0.2);

      controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

      renderer.render(scene, camera);
    };
    animate();

    // Clean up on unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
};

export default SolarSystem;
