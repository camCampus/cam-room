import * as THREE from "three";
import GSAP from "gsap";
import Experience from "../Experience.js";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }
  setModel() {
    this.actualRoom.scale.set(0.35, 0.35, 0.35);

    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupchild) => {
          groupchild.castShadow = true;
          groupchild.receiveShadow = true;
        });
      }

      if (child.name === "AquaGlass") {
        child.material = new THREE.MeshPhysicalMaterial();
        child.material.roughness = 0;
        child.material.color.set(0x0277bd);
        child.material.ior = 3;
        child.material.transmission = 1;
        child.material.opacity = 1;
      }

      if (child.name === "lava") {
        let lavaglass = child.children[0];
        lavaglass.material = new THREE.MeshPhysicalMaterial();
        lavaglass.material.roughness = 0;
        lavaglass.material.color.set(0xffffff);
        lavaglass.material.ior = 3;
        lavaglass.material.transmission = 1;
        lavaglass.material.opacity = 1;
      }

      if (child.name === "Screen") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.screen,
        });
      }

      if (child.name === "acarcadeScreen") {
      }
    });

    const backTvwidth = 1;
    const backTvheight = 0.3;
    const backTvintensity = 2;
    const backTvColor = 0xff21ea;
    const backTv = new THREE.RectAreaLight(
      backTvColor,
      backTvintensity,
      backTvwidth,
      backTvheight
    );
    backTv.position.set(3, 2.2, 0.3);
    backTv.rotation.y = -Math.PI / 2.8;
    backTv.name = "backTv";
    this.actualRoom.add(backTv);

    /*     const backTvrectLightHelper = new RectAreaLightHelper(backTv);
    backTv.add(backTvrectLightHelper); */

    this.scene.add(this.actualRoom);

    const faceTvwidth = 1;
    const faceTvheight = 0.5;
    const faceTvintensity = 2;
    const faceTv = new THREE.RectAreaLight(
      0xffffff,
      faceTvintensity,
      faceTvwidth,
      faceTvheight
    );
    faceTv.position.set(3, 1.6, 0.3);
    faceTv.rotation.y = Math.PI / 1.55;
    faceTv.name = "faceTv";
    this.actualRoom.add(faceTv);

    const lavaLight = new THREE.PointLight(0xff0000, 1, 1);
    lavaLight.position.set(-2.8, 2.1, -1.6);
    lavaLight.name = "lavaLight";
    this.actualRoom.add(lavaLight);
  }

  setAnimation() {
    /*         this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[0]);
        this.swim.play(); */
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.2;
    });
  }
  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    this.actualRoom.rotation.y = this.lerp.current;

    //this.mixer.update(this.time.delta);
  }
}
