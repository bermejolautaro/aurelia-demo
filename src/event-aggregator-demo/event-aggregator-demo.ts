import { IsValidEvent } from './events';
import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject } from 'aurelia-framework';

@autoinject()
export class EventAggregatorDemo {
  public isValidEvents: boolean[] = [];
  
  public constructor(ea: EventAggregator) {
    ea.subscribe(IsValidEvent, (payload: IsValidEvent) => {
      this.isValidEvents.push(payload.isValid);
    })
  }
}
