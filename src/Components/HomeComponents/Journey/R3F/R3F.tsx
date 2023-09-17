import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import gsap from "gsap";
import { Texture, TextureLoader, Color } from "three";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import earthTextureSrc from "../assets/earthTexture.jpg";

gsap.registerPlugin(ScrollTrigger);
interface ThreeDProps {
  Journey: React.RefObject<HTMLElement>;
}
const ThreeD: React.FC<ThreeDProps> = ({ Journey }) => {
  return (
    <Canvas camera={{ position: [0, 0, 30] }}>
      <Stars radius={300} />
      <CanvasAnimation Journey={Journey} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[1, 1, 1]} />
    </Canvas>
  );
};

const CanvasAnimation: React.FC<ThreeDProps> = ({ Journey }) => {
  const Earth = useRef(null);
  const { scene, gl, camera } = useThree();
  const mesh = scene.children.find((child) => child.type === "Mesh");
  const [earthTexture, setEarthTexture] = useState<Texture>();
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: Journey.current,
          start: "top top",
          end: "bottom+=3000 top",
          scrub: true,
        },
      });
      tl.fromTo(
        camera.position,
        {
          y: -300,
        },
        {
          y: 300,
        }
      );
    });
    return () => ctx.revert();
  }, [Journey, camera]);
  useFrame(() => {
    if (mesh) {
      // mesh.rotation.x += 0.0011;
      mesh.rotation.y += 0.005;
    }
  });

  useEffect(() => {
    // Load the Earth texture
    const loader = new TextureLoader();
    loader.load(earthTextureSrc, (texture) => {
      setEarthTexture(texture);
    });

    // Set the background color of the renderer
    gl.setClearColor(new Color("#000000"));
  }, [gl]);

  return (
    <>
      {/* Sun (Directional Light) */}
      <directionalLight position={[5, 0, 0]} intensity={0.2} />

      {/* Ambient Light */}
      <ambientLight intensity={0.05} />

      <pointLight
        position={[-1.1, 0, 0]}
        distance={0.5}
        intensity={0.5}
        color="#aaffff"
      />

      <mesh position={[0, 300, -28]} ref={Earth}>
        <sphereGeometry args={[20, 64, 64]} />
        {earthTexture && <meshStandardMaterial map={earthTexture} />}
      </mesh>
    </>
  );
};

export default ThreeD;
