import {Service} from "./service";
import {OrderProductAndParty} from "../model/order-product-and-party";
import {Model} from "../model/model";

export class OrderProductAndPartyService extends Service<OrderProductAndParty> {
  getAll(): Promise<OrderProductAndParty[]> {
    return this.get<OrderProductAndParty[]>("/entities/OrderAndPartyContactMech",
      (data) => Model.arrayFromJson(data as Object[], OrderProductAndParty),
      {_depth: 1}
    );
  }

  getSingle(id: string): Promise<OrderProductAndParty[]> {
    return this.get<OrderProductAndParty[]>("/entities/OrderAndPartyContactMecht",
      (data) => Model.arrayFromJson(data as Object[], OrderProductAndParty),
      {orderId: id, _depth: 1}
    );
  }

  // createOrderProductAndPartyService(orderProductAndParty: OrderProductAndParty): Promise<OrderProductAndParty> {
  //   return this.post("/services/createOrderAndPartyContactMech",
  //     orderProductAndParty,
  //     (data) => Model.fromJson(data as Object[], OrderProductAndParty)
  //   );
  // }
}
