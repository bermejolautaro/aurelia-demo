import { observable } from 'aurelia-framework';
import { Person } from 'person';

export class ObservableDemo {
  private static MAX_HISTORY_LENGTH = 3;

  // Primite Value Without Observable
  public primitiveValueWithoutObservableDecorator: string = ''
  public primitiveValueWithoutObservableDecoratorHistory: string[] = [];

  // Primitive Value With Observable
  @observable() public primitiveValueWithObservableDecorator: string = '';
  public primitiveValueWithObservableDecoratorHistory: string[] = [];
  public primitiveValueWithObservableDecoratorHistoryFromChanged: string[] = [];

  // Reference Value Without Observable
  public referenceValueWithoutObservableDecorator: Person = { age: 24, name: 'John Doe' };
  public referenceValueWithoutObservableDecoratorHistory: Person[] = [];

  // Reference Value With Observable
  @observable() public referenceValueWithObservableDecorator: Person = { age: 24, name: 'John Doe' };
  public referenceValueWithObservableDecoratorHistory: Person[] = [];
  public referenceValueWithObservableDecoratorHistoryFromChanged: Person[] = [];

  public constructor() { }

  public onChangePrimitiveValueWithoutObservableDecorator(event: InputEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    this.primitiveValueWithoutObservableDecoratorHistory.push(target.value);
    this.primitiveValueWithoutObservableDecoratorHistory =
      this.primitiveValueWithoutObservableDecoratorHistory.slice(-ObservableDemo.MAX_HISTORY_LENGTH);
  }

  public onChangePrimitiveValueWithObservableDecorator(event: InputEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement
    this.primitiveValueWithObservableDecoratorHistory.push(target.value);
    this.primitiveValueWithObservableDecoratorHistory =
      this.primitiveValueWithObservableDecoratorHistory.slice(-ObservableDemo.MAX_HISTORY_LENGTH);
  }

  public primitiveValueWithoutObservableDecoratorChanged(): void {
    throw new Error('This should never be called by Aurelia because it doesn\'t have an observable decorator');
  }

  public primitiveValueWithObservableDecoratorChanged(): void {
    if (!this.primitiveValueWithObservableDecoratorHistoryFromChanged) {
      return;
    }

    this.primitiveValueWithObservableDecoratorHistoryFromChanged.push(this.primitiveValueWithObservableDecorator);
    this.primitiveValueWithObservableDecoratorHistoryFromChanged =
      this.primitiveValueWithObservableDecoratorHistoryFromChanged.slice(-ObservableDemo.MAX_HISTORY_LENGTH);
  }

  public onChangeReferenceValueAgeWithoutObservableDecorator(event: InputEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: Person = { age: +target.value, name: this.referenceValueWithoutObservableDecorator.name };
    this.referenceValueWithoutObservableDecoratorHistory.push(value);
    this.referenceValueWithoutObservableDecoratorHistory =
      this.referenceValueWithoutObservableDecoratorHistory.slice(-ObservableDemo.MAX_HISTORY_LENGTH);
  }

  public onChangeReferenceValueNameWithoutObservableDecorator(event: InputEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: Person = {
      age: this.referenceValueWithoutObservableDecorator.age,
      name: target.value
    };
    this.referenceValueWithoutObservableDecoratorHistory.push(value);
    this.referenceValueWithoutObservableDecoratorHistory =
      this.referenceValueWithoutObservableDecoratorHistory.slice(-ObservableDemo.MAX_HISTORY_LENGTH);

  }

  public onChangeReferenceValueAgeWithObservableDecorator(event: InputEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: Person = { age: +target.value, name: this.referenceValueWithoutObservableDecorator.name };
    this.referenceValueWithObservableDecoratorHistory.push(value);
    this.referenceValueWithObservableDecoratorHistory =
      this.referenceValueWithObservableDecoratorHistory.slice(-ObservableDemo.MAX_HISTORY_LENGTH);
  }

  public onChangeReferenceValueNameWithObservableDecorator(event: InputEvent) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const value: Person = {
      age: this.referenceValueWithoutObservableDecorator.age,
      name: target.value
    };
    this.referenceValueWithObservableDecoratorHistory.push(value);
    this.referenceValueWithObservableDecoratorHistory =
      this.referenceValueWithObservableDecoratorHistory.slice(-ObservableDemo.MAX_HISTORY_LENGTH);
  }

  public onClickCreateNewInstance(): void {
    this.referenceValueWithObservableDecorator = {
      age: this.referenceValueWithObservableDecorator.age,
      name: this.referenceValueWithObservableDecorator.name
    }
  }

  // This method only triggers when the reference change, and not when the value of one of it's
  // properties changes.
  public referenceValueWithObservableDecoratorChanged(): void {
    if (!this.referenceValueWithObservableDecoratorHistoryFromChanged) {
      return;
    }

    this.referenceValueWithObservableDecoratorHistoryFromChanged.push(this.referenceValueWithObservableDecorator);
    this.referenceValueWithObservableDecoratorHistoryFromChanged =
      this.referenceValueWithObservableDecoratorHistoryFromChanged.slice(-ObservableDemo.MAX_HISTORY_LENGTH);

  }
}
