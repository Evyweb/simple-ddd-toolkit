import {Container} from "@/container/Container";
import {FakeClass} from "./FakeClass";

describe('Container', () => {

    describe('When the dependency is a literal object', () => {
        it('should return the bind object', () => {
            // Arrange
            const container = new Container();
            container.bind('test', () => {
                return {
                    test: 'test'
                };
            });

            // Act
            const instance = container.get('test');

            // Assert
            expect(instance).toEqual({
                test: 'test'
            });
        });
    });

    describe('When asking multiple times for the same dependency', () => {
        it('should return the same instance', () => {
            // Arrange
            const container = new Container();
            container.bind('fake', () => new FakeClass());
            container.get('fake');

            // Act
            container.get('fake');

            // Assert
            expect(FakeClass.counter).toEqual(1);
        });
    });

    describe('When no binding is found', () => {
        it('should throw an error', () => {
            // Arrange
            const container = new Container();
            // Act & Assert
            expect(() => container.get('unknown')).toThrowError('No binding found for unknown');
        });
    });

    describe('When a dependency already exist but a new one in bind', () => {
        it('should return the new one', () => {
            // Arrange
            const container = new Container();
            container.bind('fake', () => {
                return {
                    test: 'test1'
                };
            });
            container.get('fake');
            container.bind('fake', () => {
                return {
                    test: 'test2'
                };
            });

            // Act
            container.get('fake');

            // Assert
            expect(container.get('fake')).toEqual({
                test: 'test2'
            });
        });
    });
});