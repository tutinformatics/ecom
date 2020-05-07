import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework'

@inject (Router)
export class List {
  message: string;

  constructor(private router: Router) {
    this.message = 'Hello world';
  }

  goToProducts() {
    this.router.navigateToRoute('products')
  }
}
