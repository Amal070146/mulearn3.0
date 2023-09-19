import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { Texture, TextureLoader } from "three";

import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import earthTextureSrc from "../assets/earthTexture.jpg";
import moonTextureSrc from '../assets/neptune.jpg'
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
    RocketLayer,
    LevelDesc
  }= props;
  const Earth = useRef(null);
  const { scene,camera } = useThree();
  const meshes = scene.children.filter((child) => child.type === "Mesh");
  const mesh=meshes[0]
  const Planet2 = meshes[1]
  const [earthTexture, setEarthTexture] = useState<Texture>();
  const [moonTexture,setMoonTexture]=useState<Texture>();
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
      })

      gsap.from(JourneyHead.current, {
        scrollTrigger: {
          trigger: Journey.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        yPercent: -250,
      })

      tl.add(timeline({ Rocket: RocketRef,...props }))
      .fromTo(camera.position,{
        x: -300
      }, {
        keyframes: [
          {x: -250},
          {x: -100},
          {x: -50},
          {x: -25},
          {x: 3},
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
          gsap.to(RocketLayer[3].current,{
            scale:0.5
          })
        },
        onReverseComplete: () => {
          gsap.to([RocketLayer[0].current, RocketLayer[1].current, RocketLayer[2].current], {
            position:'relative'
          })
          gsap.to(RocketLayer[3].current,{
            scale:1
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
      .from(LevelDesc[4].current, {
        x:'+=100',
      })
      .to(LevelDesc[4].current, {
        opacity:1,
        x:'-=100',
      })
      .to(LevelDesc[4].current,{
        opacity:0,
        x:'+=100'
      },'+=2')
      .to(RocketLayer[3].current,{
        scale:1
      })
      .to(Container.current,{
        rotate:'+=360',
      },'<')
      .to(camera.position,{
        keyframes:[
          {x:100,y:25,z:40},
          {x:150,y:50,z:60},
          {x:200,y:100,z:80},
          {x:250,y:150,z:100},
        ]
      },'<+=0.01')
      .to(Container.current,{
          rotate:'+=360',duration:1
      },'<')
      .to(Container.current,{
        keyframes:[
          {rotate:'+=90',duration:0.25,onStart:()=>{
            gsap.to(RocketLayer[3].current,{
              scale:0.875
            })
          }},
          {rotate:'+=270',duration:0.75,onStart:()=>{
            gsap.to(RocketLayer[3].current,{
              scale:0.5
            })
          }}
        ]
      },'>')
      .to(camera.position,{
        keyframes:[
          {x:300,y:210},
          {x:350},
          {x:400},
          {x:450},
          {x:500},
        ]
      },'-=0.5')
      .to(LevelDesc[5].current,{
        opacity:1
      })
      .to(LevelDesc[5].current,{
        opacity:0
      },'+=1')
    })
    
    return () => ctx.revert();
  }, []);
  useFrame(() => {
      if (mesh) {
        mesh.rotation.y += 0.005;
      }
      if(Planet2) Planet2.rotation.y+=0.01
  });

  useEffect(() => {
    // Load the Earth texture
    const loader = new TextureLoader();
    loader.load(earthTextureSrc, (texture) => {
      setEarthTexture(texture);
    });
    loader.load(moonTextureSrc,(texture)=>{
      setMoonTexture(texture)
    })

  }, []);

  return (
    <>
      <mesh position={[0, 0, -28]} >
        <sphereGeometry args={[20, 64, 64]} />
        {earthTexture && <meshStandardMaterial map={earthTexture} />}
      </mesh>
      <mesh position={[500, 200, 30]} >
        <sphereGeometry args={[20, 64, 64]} />
        {moonTexture && <meshStandardMaterial map={moonTexture} />}
      </mesh>
    </>
  );
};

export default ThreeD;
