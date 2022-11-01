import { IsValidEvent } from './events';
import { EventAggregator } from 'aurelia-event-aggregator';
import { autoinject, ComponentBind, bindable } from 'aurelia-framework';

@autoinject()
export class ChildComponent implements ComponentBind {

  @bindable() public readonly listenForEvents: boolean = false;
  public isValidEvents: boolean[] = [];

  public constructor(
    private ea: EventAggregator) {

  }

  public bind(_bindingContext: unknown, _overrideContext: unknown): void {
    if (this.listenForEvents) {
      this.ea.subscribe(IsValidEvent, (payload: IsValidEvent) => {
        this.isValidEvents.push(payload.isValid);
      })
    }
  }

  public onInput(event: InputEvent): void {
    const value: string = (event.target as HTMLInputElement).value;

    if (value.length > 5) {
      this.ea.publish(new IsValidEvent(false));
    } else {
      this.ea.publish(new IsValidEvent(true));
    }
  }
}
