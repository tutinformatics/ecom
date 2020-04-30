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
      {route:[ "dashboard", "dashboard"], name: 'dashboard', moduleId: PLATFORM.moduleName('pages/dashboard/dashboard'), nav: false, title:'Dashboard'},
      {route:[ "products", "products"], name: 'products', moduleId: PLATFORM.moduleName('pages/products/list/products'), nav: false, title:'Products'},
      {route:[ "products/detail", "detail"], name: 'products-detail', moduleId: PLATFORM.moduleName('pages/products/detail/detail'), nav: false, title:'Detail'},
    ]);

    this.router = router;
    this.router.refreshNavigation();

  }
}
