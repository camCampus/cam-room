import * as THREE from "three";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Experience from "../Experience.js";
let rl;
export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    this.room.children.forEach((child) => {
      if (child.type === "backTv") {
        this.backTv = child;
        rl = this.backTv;
      }
      if (child.name === "faceTv") {
        this.faceTv = child;
      }
      if (child.name === "lavaLight") {
        this.lavaLight = child;
      }
    });
    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    let mm = GSAP.matchMedia();

    mm.add("(min-width: 969px)", () => {
      console.log("desktop");

      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      this.firstMoveTimeline.to(this.room.position, {
        x: () => {
          return this.sizes.width * 0.0014;
        },
      });
    });

    // Second section -------------------
    this.secondMoveTimeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: ".second-move",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    this.secondMoveTimeline.to(
      this.room.position,
      {
        x: () => {
          return -1;
        },
        z: () => {
          return this.sizes.height * 0.0032;
        },
      },
      "same"
    );
    this.secondMoveTimeline.to(
      this.room.scale,
      {
        x: 0.9,
        y: 0.9,
        z: 0.9,
      },
      "same"
    );
    this.secondMoveTimeline.to(
      this.faceTv,
      {
        width: 1.5 * 9,
        height: 0.5 * 9,
      },
      "same"
    );
    this.secondMoveTimeline.to(
      this.backTv,
      {
        width: 3.5 * 9,
        height: 0.1 * 9,
      },
      "same"
    );
    this.secondMoveTimeline.to(
      this.lavaLight,
      {
        width: 3.5 * 9,
        height: 0.1 * 9,
      },
      "same"
    );

    // Third section --------------------------------
    this.thirdMoveTimeline = new GSAP.timeline({
      scrollTrigger: {
        trigger: ".third-move",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        invalidateOnRefresh: true,
      },
    });
    this.thirdMoveTimeline.to(this.camera.orthographicCamera.position, {
      y: 1,
      x: -2.5,
      z: 2,
    });

    mm.add("(max-width: 968px)", () => {
      console.log("mobile");

      //Resets
      this.room.scale.set(0.19, 0.19, 0.19);


      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.room.scale, {
        x: 0.22,
        y: 0.22,
        z: 0.22,
      });
      
      // Second section -------------------
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      // Third section --------------------------------
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });
  }

  resize() {}

  update() {}
}

/*         this.curve.getPointAt(this.lerp.current % 1, this.position);
        this.camera.orthographicCamera.position.copy(this.position);

        this.directionalVector.subVectors(
            this.curve.getPointAt((this.lerp.current%1)+0.000001),
             this.position
        );

        this.directionalVector.normalize();
        this.crossVector.crossVectors(
            this.directionalVector,
            this.staticVector
        );
        this.camera.orthographicCamera.lookAt(this.crossVector); */
/*         if(this.back){
            this.lerp.target -=0.001;
        } else {
            this.lerp.target +=0.001;
        }
        
        this.lerp.target = GSAP.utils.clamp(0, 1, this.lerp.target);
        this.lerp.current = GSAP.utils.clamp(0, 1, this.lerp.target);

        this.curve.getPointAt(this.lerp.current, this.position);
        this.camera.orthographicCamera.position.copy(this.position); */
/*         this.progress = 0;
        this.dummyCurve = new THREE.Vector3(0,0,0); */

/*         this.position = new THREE.Vector3(0, 0, 0);
        this.lookAtPosition = new THREE.Vector3(0, 0, 0);

        this.directionalVector = new THREE.Vector3(0, 0, 0);
        this.staticVector = new THREE.Vector3(0, 1, 0);
        this.crossVector = new THREE.Vector3(0, 0, 0);


        this.setPath();
        this.onWheel(); */

/* setPath(){
            //Create a closed wavey loop
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 )
        ], true );
        
        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );

        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

        // Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );
        this.scene.add(curveObject);
    }

    onWheel(){
        window.addEventListener('wheel', (e) => {
            if(e.deltaY > 0){
                this.lerp.target += 0.01;
                this.back = false;
            } else {
                this.lerp.target -= 0.01;
                this.back = true;
            }
        })
    } */
