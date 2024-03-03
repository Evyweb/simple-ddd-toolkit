import {ValueObject} from "../../src";

interface SomeInformationData {
  name: string;
  information: {
    author: string;
    year?: string;
  };
}

export class SomeInformation extends ValueObject<SomeInformationData> {
  static create(data: SomeInformationData): SomeInformation {
    // Validation rules here
    return new SomeInformation(data);
  }
}
