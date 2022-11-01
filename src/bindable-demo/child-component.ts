import { bindable } from 'aurelia-framework';
import { Person } from 'person';

export class ChildComponent {
  @bindable() public readonly title: string = '';

  public primitiveValueWithoutBindable: string = 'primitiveValueWithoutBindable';
  @bindable() public primitiveValueWithBindable: string = 'primitiveValueWithBindable';

  public referenceValueWithoutBindable: Person = { age: 24, name: 'ChildComponent'}
  @bindable() public referenceValueWithBindable: Person = { age: 24, name: 'ChildComponent'}

  @bindable() public numberValue: number = 0; 

  public constructor() {
    console.log(this.numberValue);
   }

  public onClickChangePrimitiveValue(input: HTMLInputElement) {
    this.primitiveValueWithBindable = input.value;
  }

  public onClickChangeReferenceValue(ageInput: HTMLInputElement, nameInput: HTMLInputElement) {
    this.referenceValueWithBindable.age = +ageInput.value;
    this.referenceValueWithBindable.name = nameInput.value;
  }

  public onClickChangeReferenceValue2(ageInput: HTMLInputElement, nameInput: HTMLInputElement) {
    this.referenceValueWithBindable = {
      age: +ageInput.value,
      name: nameInput.value
    };
  }

  public printNumberValue(): void {
    console.log(this.numberValue);
  }
}
