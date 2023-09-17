import level4 from "../assets/level4.png";
import level3 from "../assets/level3.png";
import level2 from "../assets/level2.png";
import level1 from "../assets/level1.png";
import pointer from "../assets/pointer.svg";
import RStyle from "./Rocket.module.css";
import LStyle from "./LevelDesc.module.css";
import { levels } from "./LevelData";
import { FC, useEffect, useState } from "react";
import { DivElement, DivElementArray, ImageElementArray } from "../utils/types";

interface RocketProps {
  rocket: DivElement;
  RocketLayer: ImageElementArray;
}
const Rocket = ({ rocket, RocketLayer }: RocketProps) => {
  const [RocketLayer1, RocketLayer2, RocketLayer3, RocketLayer4] = RocketLayer;
  return (
    <div className={RStyle.rocket} id="rocket" ref={rocket}>
      <img
        src={level4}
        alt="Rocket Level 4"
        className={RStyle.rocketLayer}
        ref={RocketLayer4}
      />
      <img
        src={level3}
        alt="Rocket Level 3"
        className={RStyle.rocketLayer}
        ref={RocketLayer3}
      />
      <img
        src={level2}
        alt="Rocket Level 2"
        className={RStyle.rocketLayer}
        ref={RocketLayer2}
      />
      <img
        src={level1}
        alt="Rocket Level 1"
        className={RStyle.rocketLayer}
        ref={RocketLayer1}
      />
    </div>
  );
};
interface LevelDescProps {
  LevelDesc: DivElementArray;
  Rocket: DivElement;
}

export const LevelDescriptions: FC<LevelDescProps> = ({
  LevelDesc,
  Rocket,
}) => {
  const [h, setH] = useState(0);
  const rocketHeight = Rocket.current?.offsetHeight;
  useEffect(() => {
    setH(rocketHeight as number);
  }, [rocketHeight]);
  return (
    <div className={LStyle.listLevelDescContainer} style={{ height: h }}>
      {levels.map((leveled) => (
        <div
          key={leveled.id}
          className={LStyle.levelDescContainer}
          id={LStyle[`levelDesc${leveled.level}`]}
          ref={LevelDesc[leveled.level - 1]}
        >
          <img src={pointer} className={LStyle.pointer} alt="pointer" />
          <h3>{`Level ${leveled.level}`}</h3>
          <div className={LStyle.levelDescContainerSub}>
            <h4>{leveled.heading}</h4>
            <p>{leveled.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Rocket;
