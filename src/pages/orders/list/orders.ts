import {Router} from 'aurelia-router';
import {inject} from 'aurelia-framework'
import {OrderReportViewService} from '../../../service/order-report-view-service'
import {OrderReportView} from '../../../model/order-report-view'
import {TimeUtils} from "../../../util/time-utils";

@inject (Router, OrderReportViewService)
export class Orders{
  date: Date;
  dateDict: Map<String, String> = new Map<String, String>()

  orderReportViews: OrderReportView [] = []
  orderDate = null

  constructor(private router: Router, private orderReportViewService: OrderReportViewService) {
    this.loadOrderReportView()
  }



  loadOrderReportView() {
    this.orderReportViewService.getAll()
      .then((orderReportViews) => this.orderReportViews = orderReportViews)
      .then(() => this.covertTime());
  }

  newView(){
    this.router.navigateToRoute('new')
}

  detailView(orderReportView: OrderReportView){
    //this.router.navigateToRoute('detail', {id:0})
    this.router.navigateToRoute('detail', {id: orderReportView.orderId})
  }

  covertTime(){
    var i;
    for (i in this.orderReportViews) {
      this.date = TimeUtils.parse(this.orderReportViews[i].orderDate.toString())
      var newDate = this.date.toString().split(" ")
      var toUseDate = newDate[1] + " " + newDate[2] + " " + newDate[3]
      this.dateDict[this.orderReportViews[i].orderId.toString()] = toUseDate
    }
  }
}
