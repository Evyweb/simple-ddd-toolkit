import {FakeUserEntity} from "./FakeUserEntity";
import {UuidFrom} from "@/valueObject/uuid/UUIDFactory";
import {UUID} from "@/valueObject/uuid/UUID";

describe('Entity', () => {
    describe('When an entity is created', () => {
        it('should have the correct values', () => {
            // Arrange
            const id = UuidFrom('123e4567-e89b-12d3-a456-426614174000');

            // Act
            const entity = FakeUserEntity.create({id, name: 'fakeName'});

            // Assert
            expect(entity.id()).toEqual('123e4567-e89b-12d3-a456-426614174000');
            expect(entity.get('id')).toEqual(id);
            expect(entity.get('name')).toEqual('fakeName');
        });
    });

    describe('When two entities are compared', () => {
        describe('And they have the same id', () => {
            it('should return true', () => {
                // Arrange
                const id = UuidFrom('123e4567-e89b-12d3-a456-426614174000');
                const entity1 = FakeUserEntity.create({id, name: 'fakeName1'});
                const entity2 = FakeUserEntity.create({id, name: 'fakeName2'});

                // Act
                const areEquals = entity1.equals(entity2);

                // Assert
                expect(areEquals).toBe(true);
            });
        });

        describe('And they have different ids', () => {
            it('should return false', () => {
                // Arrange
                const id1 = UuidFrom('11111111-1111-1111-1111-111111111111');
                const entity1 = FakeUserEntity.create({id: id1, name: 'fakeName1'});

                const id2 = UuidFrom('22222222-2222-2222-2222-222222222222');
                const entity2 = FakeUserEntity.create({id: id2, name: 'fakeName2'});

                // Act
                const areEquals = entity1.equals(entity2);

                // Assert
                expect(areEquals).toBe(false);
            });
        });
    });

    describe('When an entity is updated', () => {
        it('should have the correct values', () => {
            // Arrange
            const id = UuidFrom('00000000-0000-0000-0000-000000000000');
            const entity = FakeUserEntity.create({id, name: 'fakeName'});

            // Act
            entity.set('id', UuidFrom('11111111-1111-1111-1111-111111111111'));
            entity.set('name', 'newFakeName');

            // Assert
            expect(entity.get('id').get('value')).toEqual('11111111-1111-1111-1111-111111111111');
            expect(entity.get('name')).toEqual('newFakeName');
        });
    });

    describe('When an entity is converted to an object', () => {
        it('should have the correct values', () => {
            // Arrange
            const id = UuidFrom('00000000-0000-0000-0000-000000000000');
            const entity = FakeUserEntity.create({id, name: 'fakeName'});

            // Act
            const userObject = entity.toObject();

            // Assert
            expect(userObject.id).toEqual(id);
            expect(userObject.name).toEqual('fakeName');
        });
    });

    describe('When ID is new', () => {
        it('should return true', () => {
            // Arrange
            const id = UUID.create('123e4567-e89b-12d3-a456-426614174000');
            const entity = FakeUserEntity.create({id, name: 'fakeName'});

            // Act
            const isNew = entity.isNew();

            // Assert
            expect(isNew).toBe(true);
        });
    });

    describe('When ID is not new', () => {
        it('should return false', () => {
            // Arrange
            const id = UUID.createFrom('123e4567-e89b-12d3-a456-426614174000');
            const entity = FakeUserEntity.create({id, name: 'fakeName'});

            // Act
            const isNew = entity.isNew();

            // Assert
            expect(isNew).toBe(false);
        });
    });
});
