import {ValueObject} from "../../src";

interface MoneyData {
  amount: number;
  currency: string;
}

export class Money extends ValueObject<MoneyData> {
  static create(moneyData: MoneyData) {
    // Validation rules here
    return new Money(moneyData);
  }
}
