import {PLATFORM} from 'aurelia-pal';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  public router: Router | undefined;

  public configureRouter(config: RouterConfiguration, router: Router): Promise<void> | PromiseLike<void> | void {
    config.title = 'Aurelia';
    config.map([
      {
        route: '',
        redirect: 'observable-demo'
      },
      {
        route: 'observable-demo',
        name: 'observable-demo',
        moduleId: PLATFORM.moduleName('./observable-demo/observable-demo'),
        nav: true,
        title: 'Observable Demo'
      },
      {
        route: 'bindable-demo',
        name: 'bindable-demo',
        moduleId: PLATFORM.moduleName('./bindable-demo/bindable-demo'),
        nav: true,
        title: 'Bindable Demo'
      },
      {
        route: 'event-aggregator-demo',
        name: 'event-aggregator-demo',
        moduleId: PLATFORM.moduleName('./event-aggregator-demo/event-aggregator-demo'),
        nav: true,
        title: 'Event Aggregator Demo'
      },
      {
        route: 'aurelia-validation-demo',
        name: 'aurelia-validation-demo',
        moduleId: PLATFORM.moduleName('./aurelia-validation-demo/aurelia-validation-demo'),
        nav: true,
        title: 'Aurelia Validation Demo'
      },
      {
        route: 'lifecycle-demo',
        name: 'lifecycle-demo',
        moduleId: PLATFORM.moduleName('./lifecycle-demo/lifecycle-demo'),
        nav: true,
        title: 'Lifecycle Demo'
      },
      {
        route: 'partner-digital',
        name: 'partner-digital',
        moduleId: PLATFORM.moduleName('./partner-digital/partner-digital'),
        nav: true,
        title: 'Partner Digital'
      },
      {
        route: 'stop-propagation-demo',
        name: 'stop-propagation-demo',
        moduleId: PLATFORM.moduleName('./stop-propagation-demo/stop-propagation-demo'),
        nav: true,
        title: 'Stop Propagation Demo'
      }
    ]);

    this.router = router;
  }
}
