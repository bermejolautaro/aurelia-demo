import { ComponentAttached, autoinject } from 'aurelia-framework';
import { Controller, View } from 'aurelia-templating';
import { TaskQueue } from 'aurelia-task-queue';

@autoinject()
export class StopPropagationDemo implements ComponentAttached {
  private childComponentElement: HTMLElement | null = null;
  private childComponentController: Controller | null = null;
  private childComponentView: View | null = null;


  public constructor(private readonly taskQueue: TaskQueue) { }

  public onParentClick(): void {
    console.log('CLICK FROM PARENT');
  }

  public attached(): void {
    console.log(this.childComponentElement);
    console.log(this.childComponentController);
    console.log(this.childComponentView);
    // this.childComponentElement?.addEventListener('click', () => console.log('CLICK FROM PARENT 2'), { capture: true });
    // this.childComponentElement?.firstChild?.addEventListener('click', () => console.log('CLICK FROM PARENT 3'), { capture: true });
    // this.childComponentElement?.querySelector('input')?.addEventListener('click', () => console.log('CLICK FROM PARENT 4'), { capture: true })
  }
}
