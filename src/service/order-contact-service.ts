import {Service} from "./service";
import {OrderContact} from "../model/order-contact";
import {Model} from "../model/model";
import {Party} from "../model/party";

export class OrderContactService extends Service<Party> {
  getAll(): Promise<Party[]> {
    return this.get<Party[]>("/entities/OrderAndContactMech",
      (data) => Model.arrayFromJson(data as Object[], Party),
      {_depth: 1}
    );
  }

  // createOrderContact(party: Party): Promise<Party> {
  //   return this.post("/services/createOrderAndContactMech",
  //     party,
  //     (data) => Model.fromJson(data as Object[], Party)
  //   );
  // }
}
