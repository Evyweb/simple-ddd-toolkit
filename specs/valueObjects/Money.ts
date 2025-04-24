import { ValueObject } from '@/valueObject/ValueObject';

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
