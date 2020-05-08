import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {OrderReportViewService} from '../../../service/order-report-view-service'
import {OrderReportView} from '../../../model/order-report-view'

@inject (Router, OrderReportViewService)
export class Orders{

  orderReportViews: OrderReportView [] = []

  constructor(private router: Router, private orderReportViewService: OrderReportViewService) {
    this.loadOrderReportView()
  }

  loadOrderReportView() {
    this.orderReportViewService.getAll()
      .then((orderReportViews) => this.orderReportViews = orderReportViews)
      .then(() => console.log(this.orderReportViews));
  }

  detailView(orderReportView: OrderReportView){
    //this.router.navigateToRoute('detail', {id:0})
    this.router.navigateToRoute('detail', {id: orderReportView.orderId})
  }
}
