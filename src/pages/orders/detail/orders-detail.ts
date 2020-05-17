import {inject} from 'aurelia-framework'
import {OrderContact} from "../../../model/order-contact";
import {OrderContactService} from "../../../service/order-contact-service";
import {OrderReportView} from "../../../model/order-report-view";
import {OrderReportViewService} from "../../../service/order-report-view-service";
import {OrderButton} from "../../../model/order-button";

@inject (OrderContactService, OrderReportViewService)
export class OrdersDetail {

  orderButton: OrderButton
  orderContacts: OrderContact [] = []
  orderReportViews: OrderReportView [] = []

  constructor(private orderContactService: OrderContactService, private orderReportViewService: OrderReportViewService){
    this.orderButton = new OrderButton()
  }

  activate(params) {
    this.loadOrderContacts(params.id)
    this.loadOrderReportView(params.id)
    if (this.orderReportViews[params.id].orderStatus == "Approved"
      || this.orderReportViews[params.id].orderStatus == "Created") {
      this.orderButton.orderStatus = "Kinnita"
    } else {
      this.orderButton.orderStatus = "Võta tagasi"
    }
    if (this.orderReportViews[params.id].itemStatus == "Approved"
      || this.orderReportViews[params.id].itemStatus == "Created") {
      this.orderButton.itemStatus = "Kinnita"
    } else {
      this.orderButton.itemStatus = "Võta tagasi"
    }
  }

  changeOrderStatus() {

  }

  changeItemStatus() {

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
