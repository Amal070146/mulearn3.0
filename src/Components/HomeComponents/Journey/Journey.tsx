import Rocket, { LevelDescriptions } from "./Rocket/Rocket";
import { useEffect, useRef,useState } from "react";
import Style from "./Journey.module.css";
import ThreeD, { ThreeDProps } from "./R3F/R3F";

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
  const Container= useRef<HTMLDivElement>(null);
  
  const props: ThreeDProps ={
    Journey:JourneyCont,
    JourneyHead,
    RocketRef,
    RocketLayer,
    LevelDesc,
    Container
  }
  const [rocketHeightState, setH] = useState(0);
  const rocketHeight = JourneyHead.current?.offsetHeight; 
  const windowHeight = window.innerHeight;
  useEffect(() => {
    setH(windowHeight-(rocketHeight?rocketHeight:0));
  }, [rocketHeight, windowHeight]);
  return (
    <section className={Style.Journey} ref={JourneyCont}>
      <div className={Style.canvasContainer}>
        <ThreeD {...props} />
      </div>
      <h2 className={Style.headerText} ref={JourneyHead}>
        Journey at µLearn
      </h2>
      <div className={Style.journeyBodyContainer} >
        <div className={Style.journeyBody} style={{ height: rocketHeightState }} ref={Container}>
          <Rocket rocket={RocketRef} RocketLayer={RocketLayer} />
          <LevelDescriptions LevelDesc={LevelDesc} Rocket={RocketRef} />
        </div>
      </div>
    </section>
  );
};

export default Journey;
