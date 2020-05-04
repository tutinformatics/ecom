import {Service} from "./service";
import {Party} from "../model/party";
import {Product} from "../model/product";
import {Model} from "../model/model";

export class PartyService extends Service<Party> {
  getAll(): Promise<Party[]> {
    return this.get<Party[]>("/entities/Party",
      (data) => Model.arrayFromJson(data as Object[], Party),
      {_depth: 1}
    );
  }

  createParty(party: Party): Promise<Party> {
    return this.post("/services/createParty",
      party,
      (data) => Model.fromJson(data as Object[], Party)
    );
  }
}
