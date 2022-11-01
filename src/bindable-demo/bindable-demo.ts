import { Person } from "person";

export class BindableDemo {
  public primitiveValueOneWay: string = 'oneWayDemo';
  public primitiveValueTwoWay: string = 'twoWayDemo';

  public referenceValueOneWay: Person = { age: 24, name: 'John Doe' }
  public referenceValueTwoWay: Person = { age: 24, name: 'John Doe' }

  public constructor() { }
}
