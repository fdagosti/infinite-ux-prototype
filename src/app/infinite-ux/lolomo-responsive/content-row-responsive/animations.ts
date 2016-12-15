import {trigger, state, transition, animate, style} from "@angular/core";

export const animTable = {}

const transitionDetails = ".75s ease 0s";
const percentages = [0,100, 116, 120, 125, 133, 150];
const transitions = [];

percentages.forEach(percentage => {

  let nextAnimState = "next"+percentage;
  let prevAnimState = "previous"+percentage;

  animTable[percentage ] = {
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


