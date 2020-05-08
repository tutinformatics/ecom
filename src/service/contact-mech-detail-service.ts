import {Service} from "./service";
import {Party} from "../model/party";
import {Model} from "../model/model";
import {OnePerson} from "../model/one-person";

export class OnePersonService extends Service<OnePerson> {
  //getAll(): Promise<Party[]> {
  //  return this.get<Party[]>("/entities/Party",
  //    (data) => Model.arrayFromJson(data as Object[], Party),
  //    {_depth: 1}
  //  );
  //}

  createOnePerson(onePerson: OnePerson): Promise<OnePerson> {
    return this.post("/services/createPerson",
      onePerson,
      (data) => Model.fromJson(data as Object[], OnePerson)
    );
  }

  //getSingle(id: string): Promise<Party[]> {
  //  return this.get<Party[]>("/entities/Party",
  //    (data) => Model.arrayFromJson(data as Object[], Party),
  //    {productId: id, _depth: 1}
  //  );
  //}
}
