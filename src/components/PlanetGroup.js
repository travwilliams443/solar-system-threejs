import * as THREE from "three";
import Planet from "./Planet";

const planetsData = [
  { name: "Mercury", color: 0xffcc00, distance: 50, size: 2, speed: 2 },
  { name: "Venus", color: 0xff9933, distance: 70, size: 3, speed: 1.5 },
  { name: "Earth", color: 0x0033cc, distance: 100, size: 3.5, speed: 1 },
  { name: "Mars", color: 0xff3300, distance: 140, size: 3, speed: 0.8 },
  { name: "Jupiter", color: 0xffcc66, distance: 190, size: 8, speed: 0.5 },
  { name: "Saturn", color: 0xffcc99, distance: 230, size: 7, speed: 0.4 },
  { name: "Uranus", color: 0x66ccff, distance: 270, size: 6, speed: 0.3 },
  { name: "Neptune", color: 0x3366ff, distance: 310, size: 6, speed: 0.2 }
];

class PlanetGroup extends THREE.Group {
  constructor(speed) {
    super();
    this.speed = speed;

    // Sun
    const sunGeometry = new THREE.SphereGeometry(10, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    this.add(sun);

    // Planets
    this.planets = planetsData.map((planetData) => {
      const planet = new Planet(planetData.name, planetData.color, planetData.distance, planetData.size, planetData.speed * this.speed);
      this.add(planet);
      return planet;
    });
  }

  updateSpeed(newSpeed) {
    this.speed = newSpeed;
    this.planets.forEach((planet, index) => {
      planet.updateSpeed(planetsData[index].speed * this.speed);
    });
  }

  update() {
    this.planets.forEach((planet) => planet.update());
  }
}

export default PlanetGroup;
