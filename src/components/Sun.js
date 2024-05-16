import * as THREE from 'three';

const Sun = () => {
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const sun = new THREE.Mesh(geometry, material);

  return sun;
};

export default Sun;
