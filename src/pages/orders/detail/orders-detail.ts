import {inject} from 'aurelia-framework'
import {OrderContact} from "../../../model/order-contact";
import {OrderContactService} from "../../../service/order-contact-service";
import {OrderReportView} from "../../../model/order-report-view";
import {OrderReportViewService} from "../../../service/order-report-view-service";

@inject (OrderContactService, OrderReportViewService)
export class OrdersDetail {

  orderContacts: OrderContact [] = []
  orderReportViews: OrderReportView [] = []

  constructor(private orderContactService: OrderContactService, private orderReportViewService: OrderReportViewService){
  }

  activate(params) {
    this.loadOrderContacts(params.id)
    this.loadOrderReportView(params.id)
  }

  loadOrderContacts(id) {
    this.orderContactService.getSingle(id)
      .then((orderContact) => this.orderContacts = orderContact)
      .then(() => console.log(this.orderContacts));
  }

  loadOrderReportView(id) {
    this.orderReportViewService.getSingle(id)
      .then((orderReportViews) => this.orderReportViews = orderReportViews)
      .then(() => console.log(this.orderReportViews));
  }
}
