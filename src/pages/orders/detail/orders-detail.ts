import {inject} from 'aurelia-framework'
import {OrderContact} from "../../../model/order-contact";
import {OrderContactService} from "../../../service/order-contact-service";
import {OrderReportView} from "../../../model/order-report-view";
import {OrderReportViewService} from "../../../service/order-report-view-service";
import {OrderButton} from "../../../model/order-button";

@inject(OrderContactService, OrderReportViewService)
export class OrdersDetail {

  orderButton: OrderButton
  orderContacts: OrderContact [] = []
  orderReportViews: OrderReportView [] = []

  constructor(private orderContactService: OrderContactService, private orderReportViewService: OrderReportViewService) {
  }

  activate(params) {
    this.loadOrderContacts(params.id)
    this.loadOrderReportView(params.id)
    this.orderButton = new OrderButton()
  }

  loadOrderStatus() {
    var element = <HTMLInputElement> document.getElementById("completeButton");
    if (this.orderReportViews[0].orderStatus == "Created") {
      this.orderButton.orderStatus = "Kinnita"
    } else {
      this.orderButton.orderStatus = "Võta tagasi"
    }
    if (this.orderReportViews[0].orderStatus != "Approved") {
      element.disabled = true;
    }
  }

  loadItemStatus() {
    var element = <HTMLInputElement> document.getElementById("completeButton");
    if (this.orderReportViews[0].itemStatus == "Created") {
      this.orderButton.itemStatus = "Kinnita"
    } else {
      this.orderButton.itemStatus = "Võta tagasi"
    }
    if (this.orderReportViews[0].itemStatus != "Approved") {
      element.disabled = true;
    }
  }

  changeOrderStatus() {
    if (this.orderReportViews[0].orderStatus == "Created") {
      this.orderReportViews[0].orderStatus = "Approved"
      this.orderButton.orderStatus = "Võta tagasi"
    }
    if (this.orderReportViews[0].orderStatus == "Approved") {
      this.orderReportViews[0].orderStatus = "Created"
      this.orderButton.orderStatus = "Kinnita"
    }
    if (this.orderReportViews[0].orderStatus == "Completed") {
      this.orderReportViews[0].orderStatus = "Approved"
      this.orderButton.orderStatus = "Võta tagasi"
    }
  }

  changeItemStatus() {
    if (this.orderReportViews[0].itemStatus == "Created") {
      this.orderReportViews[0].itemStatus = "Approved"
      this.orderButton.orderStatus = "Võta tagasi"
    }
    if (this.orderReportViews[0].itemStatus == "Approved") {
      this.orderReportViews[0].itemStatus = "Created"
      this.orderButton.orderStatus = "Kinnita"
    }
    if (this.orderReportViews[0].itemStatus == "Completed") {
      this.orderReportViews[0].itemStatus = "Approved"
      this.orderButton.itemStatus = "Võta tagasi"
    }
  }

  loadOrderContacts(id) {
    this.orderContactService.getSingle(id)
      .then((orderContact) => this.orderContacts = orderContact)
      .then(() => console.log(this.orderContacts))
      .then(() => this.loadOrderStatus());
  }

  loadOrderReportView(id) {
    this.orderReportViewService.getSingle(id)
      .then((orderReportViews) => this.orderReportViews = orderReportViews)
      .then(() => console.log(this.orderReportViews))
      .then(() => this.loadItemStatus());
  }
}
