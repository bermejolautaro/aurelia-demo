import { ComponentBind, ComponentAttached, ComponentCreated, ComponentDetached, ComponentUnbind, View, bindable } from 'aurelia-framework';

export class ChildComponent implements ComponentBind, ComponentAttached, ComponentCreated, ComponentDetached, ComponentUnbind {
  @bindable name: string = 'default';

  private names: string[] = [];

  public bind(bindingContext: any, overrideContext: any): void {
    console.log('Bind')
    console.log(bindingContext);
    console.log(overrideContext);
    // this.names.push(this.name);
  }

  public created(owningView: View, myView: View): void {
    console.log('Created')
    console.log(this.name);
  }

  public attached(): void {
    console.log('Attached')
  }
  
  public unbind(): void {
    console.log('Unbind');
  }

  public detached(): void {
    console.log('Detached')
  }
}
