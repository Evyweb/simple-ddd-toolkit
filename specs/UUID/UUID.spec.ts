import { UUID } from '@/valueObject/uuid/UUID';
import { Uuid, UuidFrom } from '@/valueObject/uuid/UUIDFactory';

describe('UUID', () => {
    it('should be able to create a valid UUID', () => {
        // Arrange
        const UUID_FORMAT = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;

        // Act
        const id = Uuid('123e4567-e89b-12d3-a456-426614174000');

        // Assert
        expect(id.get('value')).toMatch(UUID_FORMAT);
    });

    it('should be able to create a UUID from a value', () => {
        // Arrange
        const value = '123e4567-e89b-12d3-a456-426614174000';

        // Act
        const id = UuidFrom(value);

        // Assert
        expect(id.get('value')).toBe(value);
    });

    describe('When 2 UUIDs are created with the same value', () => {
        it('should return true when comparing them', () => {
            // Arrange
            const id1 = UuidFrom('123e4567-e89b-12d3-a456-426614174000');
            const id2 = UuidFrom('123e4567-e89b-12d3-a456-426614174000');

            // Act
            const equality = id1.equals(id2);

            // Assert
            expect(equality).toBe(true);
        });
    });

    describe('When 2 UUIDs are created with different values', () => {
        it('should return false when comparing them', () => {
            // Arrange
            const id1 = UuidFrom('123e4567-e89b-12d3-a456-426614174000');
            const id2 = UuidFrom('123e4567-e89b-12d3-a456-426614174001');

            // Act
            const equality = id1.equals(id2);

            // Assert
            expect(equality).toBe(false);
        });
    });

    describe('When a UUID is created with an invalid value', () => {
        it('should throw an error', () => {
            // Arrange
            const value = 'invalid-uuid';

            // Act
            const idCreation = () => UuidFrom(value);

            // Assert
            expect(idCreation).toThrowError('Invalid UUID');
        });
    });

    describe('When a UUID has a valid value', () => {
        it('should return true', () => {
            // Arrange
            const value = '123e4567-e89b-12d3-a456-426614174000';

            // Act
            const result = UuidFrom(value);

            // Assert
            expect(UUID.isValid(result.get('value'))).toBe(true);
        });
    });

    describe('[isNew]', () => {
        describe('When a UUID is newly created', () => {
            it('should return true', () => {
                // Act
                const uuid = Uuid('123e4567-e89b-12d3-a456-426614174000');

                // Assert
                expect(uuid.isNew()).toBe(true);
            });
        });

        describe('When a UUID is created with a value', () => {
            it('should return false', () => {
                expect(
                    UuidFrom('123e4567-e89b-12d3-a456-426614174000').isNew()
                ).toBe(false);
                expect(
                    Uuid('123e4567-e89b-12d3-a456-426614174000', false).isNew()
                ).toBe(false);
            });
        });
    });
});
