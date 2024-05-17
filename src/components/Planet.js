import * as THREE from "three";

class Planet extends THREE.Object3D {
  constructor(name, color, distance, size, speed) {
    super();
    this.name = name;
    this.color = color;
    this.distance = distance;
    this.size = size;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = speed;

    const geometry = new THREE.SphereGeometry(size, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color });
    const mesh = new THREE.Mesh(geometry, material);
    this.add(mesh);
  }

  updateSpeed(newSpeed) {
    this.speed = newSpeed;
  }

  update() {
    this.angle += this.speed * 0.1;  // Increase the speed factor here
    this.position.set(
      Math.cos(this.angle) * this.distance,
      0,
      Math.sin(this.angle) * this.distance
    );
  }
}

export default Planet;
