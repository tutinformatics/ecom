
import { PLATFORM } from 'aurelia-pal';
import {Router} from "aurelia-router";

export class Customers {
  router: Router;

  configureRouter(config, router) {
    config.title = 'Customers';
    config.options.pushState = true;
    // config.options.root = '/';
    config.map([
      { route: [''], moduleId: PLATFORM.moduleName('./list/customers-list'), name: 'list' },
      { route: ['/:id/detail'], moduleId: PLATFORM.moduleName('./detail/customers-detail'), name: 'detail' },
    ]);
    this.router = router;
  }
}
