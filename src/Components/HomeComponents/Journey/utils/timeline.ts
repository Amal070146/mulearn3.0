import gsap from "gsap";
import { levelAnimate } from "./levelAnimate";
// import { level2 } from './level2'
// import { level3 } from './level3'
// import { level4 } from './level4'
import {
  DivElement,
  DivElementArray,
  ImageElement,
  ImageElementArray,
} from "./types";
import { Power1 } from "gsap";

export type TimelineProps = {
  RocketLayer: ImageElementArray;
  LevelDesc: DivElementArray;
  Earth: ImageElement;
  Rocket: DivElement;
};

export const timeline = ({
  Rocket,
  Earth,
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
    .add(levelAnimate({ RocketLayer: RocketLayer[3], LevelDesc: LevelDesc[3] }))
    .add(planetEntry(Earth));
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
function planetEntry(Earth: DivElement) {
  const tl = gsap.timeline();
  try {
    tl.fromTo(
      Earth.current,{opacity:0},{opacity:0}
    )
    tl.from(Earth.current,
      {
        opacity: 0,
        yPercent: -50,
        xPercent: -50,
        scale: 0,
        rotate: -360,
      },
      "-=0.5"
    );
  } catch (error) {
    console.log(error);
  }
  return tl;
}
