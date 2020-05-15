import {Service} from "./service";
import {Party} from "../model/party";
import {Model} from "../model/model";
import {Person} from "../model/person";

export class OnePersonService extends Service<Person> {
  //getAll(): Promise<Party[]> {
  //  return this.get<Party[]>("/entities/Party",
  //    (data) => Model.arrayFromJson(data as Object[], Party),
  //    {_depth: 1}
  //  );
  //}

  createOnePerson(onePerson: Person): Promise<Person> {
    return this.post("/services/createPerson",
      onePerson,
      (data) => Model.fromJson(data as Object[], Person)
    );
  }

  //getSingle(id: string): Promise<Party[]> {
  //  return this.get<Party[]>("/entities/Party",
  //    (data) => Model.arrayFromJson(data as Object[], Party),
  //    {productId: id, _depth: 1}
  //  );
  //}
}
