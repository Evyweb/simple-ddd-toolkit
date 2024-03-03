import {IResponse} from "../../src/query/IResponse";

export interface FakeResponse extends IResponse {
  upperCaseName: string;
}
