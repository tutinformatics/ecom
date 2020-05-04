import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework'

@inject (Router)
export class Orders{

  constructor(private router: Router) {
  }

  detailView(event){
    this.router.navigateToRoute('orders-detail', {id: 0})
  }
}
