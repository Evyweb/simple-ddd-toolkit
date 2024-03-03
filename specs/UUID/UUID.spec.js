import { Uuid, UuidFrom } from "../../src";
import { UUID } from "../../src";
import { describe, it, expect } from "vitest";
describe('UUID', () => {
    it('should be able to create a valid UUID', () => {
        // Arrange
        const UUID_FORMAT = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/;
        // Act
        const uuid = Uuid();
        // Assert
        expect(uuid.get('value')).toMatch(UUID_FORMAT);
    });
    it('should be able to create a UID from a value', () => {
        // Arrange
        const value = '123e4567-e89b-12d3-a456-426614174000';
        // Act
        const uid = UuidFrom(value);
        // Assert
        expect(uid.get('value')).toBe(value);
    });
    describe('When 2 UIDs are created with the same value', () => {
        it('should return true when comparing them', () => {
            // Arrange
            const uid1 = UuidFrom('123e4567-e89b-12d3-a456-426614174000');
            const uid2 = UuidFrom('123e4567-e89b-12d3-a456-426614174000');
            // Act
            const equality = uid1.equals(uid2);
            // Assert
            expect(equality).toBe(true);
        });
    });
    describe('When 2 UIDs are created with different values', () => {
        it('should return false when comparing them', () => {
            // Arrange
            const uuid1 = UuidFrom('123e4567-e89b-12d3-a456-426614174000');
            const uuid2 = UuidFrom('123e4567-e89b-12d3-a456-426614174001');
            // Act
            const equality = uuid1.equals(uuid2);
            // Assert
            expect(equality).toBe(false);
        });
    });
    describe('When a UID is created with an invalid value', () => {
        it('should throw an error', () => {
            // Arrange
            const value = 'invalid-uuid';
            // Act
            const result = UuidFrom(value);
            // Assert
            expect(result.isValid()).toBe(false);
            expect(UUID.isValid(value)).toBe(false);
        });
    });
    describe('When a UID has a valid value', () => {
        it('should return true', () => {
            // Arrange
            const value = '123e4567-e89b-12d3-a456-426614174000';
            // Act
            const result = UuidFrom(value);
            // Assert
            expect(result.isValid()).toBe(true);
            expect(UUID.isValid(value)).toBe(true);
        });
    });
    describe('[isNew]', () => {
        describe('When a UID is newly created', () => {
            it('should return true', () => {
                // Act
                const uuid = Uuid();
                // Assert
                expect(uuid.isNew()).toBe(true);
            });
        });
        describe('When a UID is created with a value', () => {
            it('should return false', () => {
                // Act
                const uuid = UuidFrom('EXISTING-ID');
                // Assert
                expect(uuid.isNew()).toBe(false);
            });
        });
    });
});
//# sourceMappingURL=UUID.spec.js.map