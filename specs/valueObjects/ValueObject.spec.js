import { Money } from "./Money";
import { SomeInformation } from "./SomeInformation";
import { describe, it, expect } from "vitest";
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
    describe(`When 2 value objects don't have the same values`, () => {
        describe('When the values are simple', () => {
            it('should return true', () => {
                // Arrange
                const valueObject1 = Money.create({ amount: 5, currency: '€' });
                const valueObject2 = Money.create({ amount: 10, currency: '$' });
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
                const valueObject2 = undefined;
                // Act
                const result = valueObject1.equals(valueObject2);
                // Assert
                expect(result).toEqual(false);
            });
        });
    });
});
//# sourceMappingURL=ValueObject.spec.js.map