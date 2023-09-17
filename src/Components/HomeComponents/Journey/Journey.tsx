import EarthImage from './assets/earthTexture.jpg'

import Rocket, { LevelDescriptions } from "./Rocket/Rocket";
import { timeline } from "./utils/timeline";
import { useEffect, useRef,useState } from "react";
import gsap from "gsap";
import Style from "./Journey.module.css";
import { ScrollTrigger, MotionPathPlugin } from "gsap/all";
import ThreeD from "./R3F/R3F";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
const Journey = () => {
  const JourneyCont = useRef<HTMLElement>(null);
  const JourneyHead = useRef<HTMLHeadingElement>(null);
  // Rocket Container Reference
  const RocketRef = useRef<HTMLDivElement>(null);
  // Rocket Layers Reference
  const RocketLayer1 = useRef<HTMLImageElement>(null);
  const RocketLayer2 = useRef<HTMLImageElement>(null);
  const RocketLayer3 = useRef<HTMLImageElement>(null);
  const RocketLayer4 = useRef<HTMLImageElement>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const RocketLayer = [RocketLayer1, RocketLayer2, RocketLayer3, RocketLayer4];
  // Level Descriptions Reference
  const LevelDesc1 = useRef<HTMLDivElement>(null);
  const LevelDesc2 = useRef<HTMLDivElement>(null);
  const LevelDesc3 = useRef<HTMLDivElement>(null);
  const LevelDesc4 = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const LevelDesc = [LevelDesc1, LevelDesc2, LevelDesc3, LevelDesc4];

  const Earth = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: JourneyCont.current,
          start: "top top",
          end: "bottom+=3000 top",
          markers: true,
          pin: true,
          scrub: true,
        },
      });
      gsap.from(JourneyHead.current, {
        scrollTrigger: {
          trigger: JourneyCont.current,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
        yPercent: -250,
      });
      tl.add(timeline({ Rocket: RocketRef, Earth, RocketLayer, LevelDesc }));
    });
    return () => ctx.revert();
  }, [LevelDesc, RocketLayer]);
  const [rocketHeightState, setH] = useState(0);
  const rocketHeight = JourneyHead.current?.offsetHeight; 
  const windowHeight = window.innerHeight;
  useEffect(() => {
    setH(windowHeight-(rocketHeight?rocketHeight:0));
  }, [rocketHeight, windowHeight]);
  return (
    <section className={Style.Journey} ref={JourneyCont}>
      <div className={Style.canvasContainer}>
        <ThreeD Journey={JourneyCont} />
      </div>
      <h2 className={Style.headerText} ref={JourneyHead}>
        Journey at µLearn
      </h2>
      <div className={Style.journeyBodyContainer} >
        <div className={Style.journeyBody} style={{ height: rocketHeightState }}>
          <img src={EarthImage} alt="Earth" className={Style.earth} id='earth' ref={Earth} />
          <Rocket rocket={RocketRef} RocketLayer={RocketLayer} />
          <LevelDescriptions LevelDesc={LevelDesc} Rocket={RocketRef} />
        </div>
      </div>
    </section>
  );
};

export default Journey;
