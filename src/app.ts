import { autoinject } from "aurelia-framework";
import {PLATFORM} from 'aurelia-pal';
import {RouterConfiguration, Router} from 'aurelia-router';

@autoinject
export class app {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router): void {
    console.log('configureRouter');
    this.router = router;
    config.title = "Router Test";
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route:[ "", "home"], name: 'home', moduleId: PLATFORM.moduleName('pages/index/index'), nav: false, title:'Home'},
    ]);

    this.router = router;
    this.router.refreshNavigation();

  }
}
