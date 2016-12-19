import {trigger, state, transition, animate, style} from "@angular/core";

export const animTable = {}

const transitionDetails = ".75s ease 0s";
const percentages = [0,100, 116.666667, 120, 125, 133.33333333, 150];
const transitions = [];

percentages.forEach(percentage => {

  let inPercentage = Math.floor(percentage)

  let nextAnimState = "next"+inPercentage;
  let prevAnimState = "previous"+inPercentage;

  animTable[inPercentage] = {
    animNext : nextAnimState,
    animPrev : prevAnimState,
  };
  transitions.push(transition('* => '+nextAnimState, [
    animate(transitionDetails, style({transform: `translate3d(${-percentage-100}%,0px, 0px)`}))
  ]));

  // special case for previous anim on first page
  if (percentage == 0) return;

  transitions.push(transition('* => '+prevAnimState, [
    animate(transitionDetails, style({transform: `translate3d(${-percentage+100}%,0px, 0px)`}))
  ]));
});

export const horizontalScroll = trigger('horizontalScroll', transitions)




const zoomAnimate = [
  animate(".4s 300ms cubic-bezier(0.5, 0, 0.1, 1)")
];


export const zoomAnimation = trigger('ZoomItem', [
  state("itemOpenedLeft", style({
    transform: `translate3d(-40%,0px, 0px)`
  })),
  state("itemOpenedRight", style({
    transform: `translate3d(40%,0px, 0px)`
  })),
  state("itemOpenedRightFromBeginning", style({
    transform: `translate3d(80%,0px, 0px)`
  })),
  state("itemOpenedLeftFromEnd", style({
    transform: `translate3d(-80%,0px, 0px)`
  })),
  state("zoomSelectedItem", style({
    transform: `scale(1.8)`
  })),
  state("zoomSelectedItemBeginning", style({
    transform: `scale(1.8) translate3d(22%,0px, 0px)`
  })),
  state("zoomSelectedItemEnd", style({
    transform: `scale(1.8) translate3d(-22%,0px, 0px)`
  })),

  state("portraitItemOpenedLeft", style({
    transform: `translate3d(-11%,0px, 0px)`
  })),
  state("portraitItemOpenedRight", style({
    transform: `translate3d(11%,0px, 0px)`
  })),
  state("portraitItemOpenedRightFromBeginning", style({
    transform: `translate3d(22%,0px, 0px)`
  })),
  state("portraitItemOpenedLeftFromEnd", style({
    transform: `translate3d(-22%,0px, 0px)`
  })),
  state("portraitZoomSelectedItem", style({
    transform: `scale(1.2)`
  })),
  state("portraitZoomSelectedItemBeginning", style({
    transform: `scale(1.2) translate3d(9%,0px, 0px)`
  })),
  state("portraitZoomSelectedItemEnd", style({
    transform: `scale(1.2) translate3d(-9%,0px, 0px)`
  })),

  // transition('* => stop', [animate(".4s cubic-bezier(0.5, 0, 0.1, 1)")]),
  transition('* => stop', []),
  transition('* => void', []),
  transition('* => *', zoomAnimate)
])
