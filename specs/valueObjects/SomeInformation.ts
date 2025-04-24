import { ValueObject } from '@/valueObject/ValueObject';

interface SomeInformationData {
    name: string | null;
    information: {
        author: string;
        year?: string;
    } | null;
}

export class SomeInformation extends ValueObject<SomeInformationData> {
    static create(data: SomeInformationData): SomeInformation {
        // Validation rules here
        return new SomeInformation(data);
    }
}
