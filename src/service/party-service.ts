import {Service} from "./service";
import {Party} from "../model/party";
import {Model} from "../model/model";

export class PartyService extends Service<Party> {
  getAllPersons(): Promise<Party[]> {
    return this.get<Party[]>("/entities/Party",
      (data) => Model.arrayFromJson(data as Object[], Party),
      { partyTypeId: 'PERSON', _depth: 1}
    );
  }

  createParty(party: Party): Promise<Party> {
    return this.post("/services/createParty",
      party,
      (data) => Model.fromJson(data as Object[], Party)
    );
  }

  getSingle(id: string): Promise<Party[]> {
    return this.get<Party[]>("/entities/Party",
      (data) => Model.arrayFromJson(data as Object[], Party),
      {productId: id, _depth: 1}
    );
  }
}
