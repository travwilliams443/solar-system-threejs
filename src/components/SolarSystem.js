import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import PlanetGroup from "./PlanetGroup";
import SpeedSlider from "./SpeedSlider";
import './SolarSystem.css';

const SolarSystem = () => {
  const mountRef = useRef(null);
  const [speed, setSpeed] = useState(0.01);
  const solarSystemGroupRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    const currentMount = mountRef.current;
    currentMount.appendChild(renderer.domElement);
  
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
  
    camera.position.z = 400;
    camera.position.y = 100;
  
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
  
    window.addEventListener("resize", handleResize);
  
    const solarSystemGroup = new PlanetGroup(speed);
    solarSystemGroupRef.current = solarSystemGroup;
    scene.add(solarSystemGroup);
  
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      solarSystemGroup.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
  
    };
  }, [speed]);
  
  
  useEffect(() => {
    if (solarSystemGroupRef.current) {
      solarSystemGroupRef.current.updateSpeed(speed);
    }
  }, [speed]);

  return (
    <div className="solar-system-container">
      <div className="solar-system-controls">
        <SpeedSlider speed={speed} onSpeedChange={setSpeed} />
      </div>
      <div ref={mountRef}></div>
    </div>
  );
};

export default SolarSystem;
