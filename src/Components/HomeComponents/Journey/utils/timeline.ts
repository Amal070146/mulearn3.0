import gsap from "gsap";
import { levelAnimate } from "./levelAnimate";

import {
  DivElement,
  DivElementArray,
  ImageElement,
  ImageElementArray,
} from "./types";

export type TimelineProps = {
  RocketLayer: ImageElementArray;
  LevelDesc: DivElementArray;
  Rocket: DivElement;
};

export const timeline = ({
  Rocket,
  RocketLayer,
  LevelDesc,
}: TimelineProps) => {
  const tl = gsap.timeline();
  tl.add(rocketEntry(Rocket))
    .add(levelAnimate({ RocketLayer: RocketLayer[0], LevelDesc: LevelDesc[0] }))
    .add(breakOff(RocketLayer[0]))
    .add(vibrate(Rocket),'-=2')
    .add(levelAnimate({ RocketLayer: RocketLayer[1], LevelDesc: LevelDesc[1] }))
    .add(breakOff(RocketLayer[1]))
    .add(vibrate(Rocket),'-=2')
    .add(levelAnimate({ RocketLayer: RocketLayer[2], LevelDesc: LevelDesc[2] }))
    .add(breakOff(RocketLayer[2]))
    .add(vibrate(Rocket),'-=2')
    .add(levelAnimate({ RocketLayer: RocketLayer[3], LevelDesc: LevelDesc[3] }),'+=2')
  return tl;
};

function rocketEntry(Rocket: DivElement) {
  const tl = gsap.timeline();
  tl.from(Rocket.current, {
    yPercent: 150,
  });
  return tl;
}
export function vibrate(Rocket:DivElement){
  const timeline = gsap.timeline()
  timeline.to(Rocket.current,{
      keyframes:[
          {x:'-=1',rotate:'-=1'},
          {x:'+=1',rotate:'+=1'},
      ],
      yoyo:true,
      repeat:5,
      duration:0.5
  })
  return timeline
}
function breakOff(RocketLayer: ImageElement) {
  return gsap.timeline().to(RocketLayer?.current, {
    keyframes: [
      {scale:0.8,y:"+=10",rotate:'-=2',x:'-=10'},
      {scale:0.6,y:"+=10",rotate:'-=2',x:'-=10'},
      {scale:0.4,y:"+=10",rotate:'-=2',x:'-=10'},
      {scale:0.2,y:"+=10",rotate:'-=2',x:'-=10'},
      {scale:0,y:"+=10",rotate:'-=2',x:'-=10'},
    ],
    
  });
}

