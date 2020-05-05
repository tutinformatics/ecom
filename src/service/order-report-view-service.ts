import {Service} from "./service";
import {OrderReportView} from "../model/order-report-view";
import {Model} from "../model/model";
import {Party} from "../model/party";

export class OrderReportViewService extends Service<Party> {
  getAll(): Promise<Party[]> {
    return this.get<Party[]>("/entities/OrderReportView",
      (data) => Model.arrayFromJson(data as Object[], Party),
      {_depth: 1}
    );
  }

  // createOrderReportViewService(party: Party): Promise<Party> {
  //   return this.post("/services/createOrderAndPartyContactMech",
  //     party,
  //     (data) => Model.fromJson(data as Object[], Party)
  //   );
  // }
}
