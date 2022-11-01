export class ChildComponent {
  public constructor() { }

  public async onChildClick(event: Event): Promise<void> {
    event.stopPropagation();
    await this.print();
  }

  public async print(): Promise<void> {
    console.log('CLICK FROM CHILD')
  }
}
