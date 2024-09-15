import {IResponse} from "@/bus/query/IResponse";

export interface FakeResponse extends IResponse {
  upperCaseName: string;
}
