import {Service} from "./service";
import {OrderProductAndParty} from "../model/order-product-and-party";
import {Model} from "../model/model";
import {Party} from "../model/party";

export class OrderProductAndPartyService extends Service<Party> {
  getAll(): Promise<Party[]> {
    return this.get<Party[]>("/entities/OrderAndPartyContactMech",
      (data) => Model.arrayFromJson(data as Object[], Party),
      {_depth: 1}
    );
  }

  // createOrderProductAndPartyService(party: Party): Promise<Party> {
  //   return this.post("/services/createOrderAndPartyContactMech",
  //     party,
  //     (data) => Model.fromJson(data as Object[], Party)
  //   );
  // }
}
