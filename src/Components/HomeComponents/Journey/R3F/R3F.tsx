import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Texture, TextureLoader } from "three";

import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import earthTextureSrc from "../assets/earthTexture.jpg";
import { timeline } from "../utils/timeline";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export interface ThreeDProps {
  Journey: React.RefObject<HTMLElement>;
  JourneyHead: React.RefObject<HTMLHeadingElement>;
  RocketRef: React.RefObject<HTMLDivElement>;
  RocketLayer: React.RefObject<HTMLImageElement>[];
  LevelDesc: React.RefObject<HTMLDivElement>[];
  Container: React.RefObject<HTMLDivElement>;
}
const ThreeD: React.FC<ThreeDProps> = (props) => {
  return (
    <Canvas camera={{ position: [0, 0, 30] }}  > 
      <CanvasAnimation {...props} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} />
    </Canvas>
  );
};


const CanvasAnimation: React.FC<ThreeDProps> = (props) => {
  const { 
    Journey,
    JourneyHead,
    RocketRef,
    Container,
    RocketLayer
  }= props;
  const Earth = useRef(null);
  const { scene,camera } = useThree();
  const mesh = scene.children.find((child) => child.type === "Mesh");
  const [earthTexture, setEarthTexture] = useState<Texture>();
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: Journey.current,
          start: "top top",
          end: "bottom+=3000 top",
          markers: true,
          pin: true,
          scrub: true,
        },
      });
      gsap.from(JourneyHead.current, {
        scrollTrigger: {
          trigger: Journey.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        yPercent: -250,
      });
      tl.add(timeline({ Rocket: RocketRef,...props }))
      .fromTo(camera.position,{
        x: -800,
        z:1000
      }, {
        keyframes: [
          {x: -800,z: 600,},
          {x: -600,z: 400,},
          {x: -400,z: 200,},
          {x: -200,z: 100,},
          {x: 0,z: 28,},
        ]
      })
      .to(Container.current, {
        onStart: () => {
          gsap.to([RocketLayer[0].current, RocketLayer[1].current, RocketLayer[2].current], {
            position:'absolute',
            opacity:1
          })
          gsap.to(RocketRef.current, {
            transformOrigin: `${(Container.current?.offsetHeight as number)/2}px 0`,
            height:'fit-content',
          })
          
        },
        onReverseComplete: () => {
          gsap.to([RocketLayer[0].current, RocketLayer[1].current, RocketLayer[2].current], {
            position:'relative'
          })
        },
        keyframes: [
          {rotate:'+=72'},
          {rotate:'+=72'},
          {rotate:'+=72'},
          {rotate:'+=72'},
          {rotate:'+=72'},
        ],
        duration:1
      },'-=0.2')
    })
    return () => ctx.revert();
  }, []);
  useFrame(() => {
    if (mesh) {
      mesh.rotation.y += 0.01;
    }
  });

  useEffect(() => {
    // Load the Earth texture
    const loader = new TextureLoader();
    loader.load(earthTextureSrc, (texture) => {
      setEarthTexture(texture);
    });

  }, []);

  return (
    <>
      <mesh position={[0, 0, -28]} ref={Earth}>
        <sphereGeometry args={[20, 64, 64]} />
        {earthTexture && <meshStandardMaterial map={earthTexture} />}
      </mesh>
    </>
  );
};

export default ThreeD;
