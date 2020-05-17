import {inject} from 'aurelia-framework'
import {OrderContact} from "../../../model/order-contact";
import {OrderContactService} from "../../../service/order-contact-service";
import {OrderReportView} from "../../../model/order-report-view";
import {OrderReportViewService} from "../../../service/order-report-view-service";
import {OrderButton} from "../../../model/order-button";
import {OrderHeaderService} from "../../../service/order-header-service";
import {OrderHeader} from "../../../model/order-header";

@inject(OrderContactService, OrderReportViewService, OrderHeaderService)
export class OrdersDetail {

  orderButton: OrderButton
  orderContacts: OrderContact [] = []
  orderReportViews: OrderReportView [] = []
  orderHeader: OrderHeader [] = []

  constructor(private orderContactService: OrderContactService, private orderReportViewService: OrderReportViewService
    , private orderHeaderService: OrderHeaderService) {
  }

  activate(params) {
    this.loadOrderContacts(params.id)
    this.loadOrderReportView(params.id)
    this.loadOrderHeader(params.id)
    this.orderButton = new OrderButton()
  }

  completeButtonStatus() {
    var element = <HTMLInputElement>document.getElementById("completeButton");
    if (this.orderReportViews[0].itemStatus == "Approved" && this.orderReportViews[0].orderStatus == "Approved") {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  }

  loadOrderStatus() {
    if (this.orderReportViews[0].orderStatus == "Created") {
      this.orderButton.orderStatus = "Kinnita"
    } else {
      this.orderButton.orderStatus = "Võta tagasi"
    }
    this.completeButtonStatus()
  }

  loadItemStatus() {
    if (this.orderReportViews[0].itemStatus == "Created") {
      this.orderButton.itemStatus = "Kinnita"
    } else {
      this.orderButton.itemStatus = "Võta tagasi"
    }
    this.completeButtonStatus()
  }

  completeAllStatus() {
    this.orderButton.itemStatus = "Võta tagasi"
    this.orderButton.orderStatus = "Võta tagasi"
    this.orderHeader[0].orderId = "ORDER_COMPLETED"
    this.completeButtonStatus()
  }

  changeOrderStatus() {
    if (this.orderReportViews[0].orderStatus == "Created"
      || this.orderReportViews[0].orderStatus == "Completed") {
      this.orderHeader[0].orderId = "ORDER_APPROVED"
      this.orderButton.orderStatus = "Võta tagasi"
    } else if (this.orderReportViews[0].orderStatus == "Approved") {
      this.orderHeader[0].orderId = "ORDER_CREATED"
      this.orderButton.orderStatus = "Kinnita"
      this.completeButtonStatus()
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

  loadOrderHeader(id) {
    this.orderHeaderService.getSingle(id)
      .then((orderHeader) => this.orderHeader = orderHeader)
      .then(() => console.log(this.orderHeader))
      .then(() => this.loadItemStatus());
  }

  updateHeader() {
    this.orderHeaderService.updateOrderHeader(this.orderHeader[0])
      .then((product) => console.log(product))
      .then(() => this.loadOrderReportView(this.orderHeader[0].orderId));
  }
}
