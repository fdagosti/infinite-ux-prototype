import {trigger, state, transition, animate, style} from "@angular/core";

const transitionDetails = ".75s ease 0s"

export const horizontalScroll = trigger('horizontalScroll', [

  state('next',style({})),
  state('previous',   style({})),
  state('stop',   style({})),
  transition('* => next0', [
    animate(transitionDetails, style({transform: 'translate3d(-100%,0px, 0px)'}))
  ]),
  transition('* => next100', [
    animate(transitionDetails, style({transform: 'translate3d(-200%,0px, 0px)'}))
  ]),
  transition('* => next116', [
    animate(transitionDetails, style({transform: 'translate3d(-216.66666666%,0px, 0px)'}))
  ]),
  transition('* => next120', [
    animate(transitionDetails, style({transform: 'translate3d(-220%,0px, 0px)'}))
  ]),
  transition('* => next125', [
    animate(transitionDetails, style({transform: 'translate3d(-225%,0px, 0px)'}))
  ]),
  transition('* => next133', [
    animate(transitionDetails, style({transform: 'translate3d(-233.3333333%,0px, 0px)'}))
  ]),
  transition('* => next150', [
    animate(transitionDetails, style({transform: 'translate3d(-250%,0px, 0px)'}))
  ]),
  transition('* => previous0', [
    animate(transitionDetails, style({transform: 'translate3d(0%,0px, 0px)'}))
  ]),
  transition('* => previous100', [
    animate(transitionDetails, style({transform: 'translate3d(0%,0px, 0px)'}))
  ]),
  transition('* => previous116', [
    animate(transitionDetails, style({transform: 'translate3d(-16.66666666%,0px, 0px)'}))
  ]),
  transition('* => previous120', [
    animate(transitionDetails, style({transform: 'translate3d(-20%,0px, 0px)'}))
  ]),
  transition('* => previous125', [
    animate(transitionDetails, style({transform: 'translate3d(-25%,0px, 0px)'}))
  ]),
  transition('* => previous133', [
    animate(transitionDetails, style({transform: 'translate3d(-33.333333%,0px, 0px)'}))
  ]),
  transition('* => previous150', [
    animate(transitionDetails, style({transform: 'translate3d(-50%,0px, 0px)'}))
  ]),
])

export const nextAnim = {
  "0":"next0",
  "100":"next100",
  "116":"next116",
  "120":"next120",
  "125":"next125",
  "133":"next133",
  "150":"next150",
}
export const prevAnim = {
  "0":"previous0",
  "100":"previous100",
  "116":"previous116",
  "120":"previous120",
  "125":"previous125",
  "133":"previous133",
  "150":"previous150",
}
