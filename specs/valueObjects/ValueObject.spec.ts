import { Money } from './Money';
import { OtherValueObject } from './OtherValueObject';
import { SomeInformation } from './SomeInformation';

describe('[ValueObject]', () => {
    describe('When 2 value objects have same values', () => {
        describe('When the values are simple', () => {
            it('should return true', () => {
                // Arrange
                const valueObject1 = Money.create({ amount: 5, currency: '€' });
                const valueObject2 = Money.create({ amount: 5, currency: '€' });

                // Act
                const result = valueObject1.equals(valueObject2);

                // Assert
                expect(result).toEqual(true);
            });
        });

        describe('When the values are null', () => {
            it('should return true', () => {
                // Arrange
                const valueObject1 = OtherValueObject.create();
                const valueObject2 = OtherValueObject.create();

                // Act
                const result = valueObject1.equals(valueObject2);

                // Assert
                expect(result).toEqual(true);
            });
        });

        describe('When the values are more complex', () => {
            it('should return true', () => {
                // Arrange
                const valueObject1 = SomeInformation.create({
                    name: 'fakeName1',
                    information: {
                        author: 'fakeName1',
                        year: '2019-05-01',
                    },
                });
                const valueObject2 = SomeInformation.create({
                    name: 'fakeName1',
                    information: {
                        author: 'fakeName1',
                        year: '2019-05-01',
                    },
                });

                // Act
                const result = valueObject1.equals(valueObject2);

                // Assert
                expect(result).toEqual(true);
            });
        });
    });

    describe('When trying to mutate a nested property', () => {
        it('should throw an error', () => {
            // Arrange
            const valueObject = SomeInformation.create({
                name: 'fakeName1',
                information: {
                    author: 'fakeName1',
                    year: '2019-05-01',
                },
            });

            // Act & Assert
            expect(() => {
                const information = valueObject.get('information') as {
                    author: string;
                    year?: string;
                };
                information.author = 'fakeName2';
            }).toThrowError(`Cannot assign to read only property 'author'`);
        });
    });

    describe(`When 2 value objects don't have the same values`, () => {
        describe('When the values are simple', () => {
            it('should return true', () => {
                // Arrange
                const valueObject1 = Money.create({ amount: 5, currency: '€' });
                const valueObject2 = Money.create({
                    amount: 10,
                    currency: '$',
                });

                // Act
                const result = valueObject1.equals(valueObject2);

                // Assert
                expect(result).toEqual(false);
            });
        });

        describe('When the values are more complex', () => {
            it('should return false', () => {
                // Arrange
                const valueObject1 = SomeInformation.create({
                    name: 'fakeName1',
                    information: {
                        author: 'fakeName1',
                        year: '2019-05-01',
                    },
                });

                const valueObject2 = SomeInformation.create({
                    name: 'fakeName1',
                    information: {
                        author: 'fakeName1',
                        year: '2019-05-02',
                    },
                });

                // Act
                const result = valueObject1.equals(valueObject2);

                // Assert
                expect(result).toEqual(false);
            });
        });

        describe('When a value is missing', () => {
            it('should return false', () => {
                // Arrange
                const valueObject1 = SomeInformation.create({
                    name: 'fakeName1',
                    information: {
                        author: 'fakeName1',
                        year: '2019-05-01',
                    },
                });

                const valueObject2 = SomeInformation.create({
                    name: 'fakeName1',
                    information: {
                        author: 'fakeName1',
                    },
                });

                // Act
                const result = valueObject1.equals(valueObject2);

                // Assert
                expect(result).toEqual(false);
            });
        });

        describe('When comparing to not existing object', () => {
            it('should return false', () => {
                // Arrange
                const valueObject1 = SomeInformation.create({
                    name: 'fakeName1',
                    information: {
                        author: 'fakeName1',
                        year: '2019-05-01',
                    },
                });

                const valueObject2 = undefined as unknown as SomeInformation;

                // Act
                const result = valueObject1.equals(valueObject2);

                // Assert
                expect(result).toEqual(false);
            });
        });
    });

    describe('When comparing an object with a primitive value', () => {
        it('should return false', () => {
            // Arrange
            const valueObject1 = SomeInformation.create({
                name: 'fakeName1',
                information: {
                    author: 'fakeName1',
                    year: '2019-05-01',
                },
            });

            const primitiveValue = 'fakeName1';

            // Act
            const result = valueObject1.equals(
                primitiveValue as unknown as SomeInformation
            );

            // Assert
            expect(result).toEqual(false);
        });
    });
});
