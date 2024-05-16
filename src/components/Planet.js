import * as THREE from 'three';

const Planet = ({ size, color, distance }) => {
  const geometry = new THREE.SphereGeometry(size, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color });
  const planet = new THREE.Mesh(geometry, material);

  planet.position.x = distance;

  return planet;
};

export default Planet;
