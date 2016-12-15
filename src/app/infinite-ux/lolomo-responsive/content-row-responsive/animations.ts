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


