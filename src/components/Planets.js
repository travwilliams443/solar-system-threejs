import * as THREE from 'three';

const Planet = ({ size, color, distance, speed }) => {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color });
  const mesh = new THREE.Mesh(geometry, material);

  const updatePosition = (time, speedFactor) => {
    mesh.position.x = distance * Math.cos(time * 0.001 * speed * speedFactor);
    mesh.position.z = distance * Math.sin(time * 0.001 * speed * speedFactor);
  };

  return { mesh, updatePosition };
};

const Planets = () => {
  const planetData = [
    { size: 0.2, color: 0xaaaaaa, distance: 2, speed: 0.5 }, // Mercury
    { size: 0.4, color: 0xffa500, distance: 3, speed: 0.4 }, // Venus
    { size: 0.4, color: 0x0000ff, distance: 4, speed: 0.3 }, // Earth
    { size: 0.3, color: 0xff0000, distance: 5, speed: 0.2 }, // Mars
    { size: 0.9, color: 0xffa500, distance: 7, speed: 0.1 }, // Jupiter
    { size: 0.8, color: 0xffff00, distance: 9, speed: 0.08 }, // Saturn
    { size: 0.7, color: 0x00ff00, distance: 11, speed: 0.05 }, // Uranus
    { size: 0.6, color: 0x00bfff, distance: 13, speed: 0.03 }, // Neptune
  ];

  return planetData.map((data) => {
    const { mesh, updatePosition } = Planet(data);
    mesh.updatePosition = updatePosition;
    return mesh;
  });
};

export default Planets;
