import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {OrderReportViewService} from '../../../service/order-report-view-service'
import {OrderReportView} from '../../../model/order-report-view'
import {TimeUtils} from "../../../util/time-utils";

@inject (Router, OrderReportViewService)
export class Orders{

  orderReportViews: OrderReportView [] = []
  orderDate = null

  constructor(private router: Router, private orderReportViewService: OrderReportViewService) {
    this.loadOrderReportView()
    this.covertTime()
  }

  covertTime(){
    var i;
    for (i in this.orderReportViews) {
      console.log(i.orderDate)
      i.orderDate = TimeUtils.parse(i.orderDate)
    }
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
