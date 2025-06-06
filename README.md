# Simple DDD Toolkit 🛠️

[![NPM Version](https://img.shields.io/npm/v/%40evyweb%2Fsimple-ddd-toolkit.svg?style=flat)]()
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/evyweb/simple-ddd-toolkit/main.yml)
[![codecov](https://codecov.io/gh/Evyweb/simple-ddd-toolkit/graph/badge.svg?token=A3Z8UCNHDY)](https://codecov.io/gh/Evyweb/simple-ddd-toolkit)

![NPM Downloads](https://img.shields.io/npm/dm/%40evyweb%2Fsimple-ddd-toolkit)
[![NPM Downloads](https://img.shields.io/npm/dt/%40evyweb%2Fsimple-ddd-toolkit.svg?style=flat)]()

A simple Domain Driven Design Toolkit created to help developers understand how to implement DDD concepts. It also contains some useful stuff not directly related to DDD, like a command bus or result pattern.

This toolkit is not a library, it's just a set of classes and interfaces that you can use, and it has no dependency.

🚧🦺
**WARNING: This toolkit is still under development and not intended to be used in production. All classes and interfaces are subject to change and may provoke breaking changes**.
🦺🚧
## Installation

```bash
npm install --save @evyweb/simple-ddd-toolkit
```

## Features

- [x] Aggregate - A cluster of domain objects that can be treated as a single unit
- [x] Command - A request to perform an action or change the state of the system
- [x] Command handler - Processes commands and updates the system's state
- [x] Command bus - Routes commands to the appropriate command handlers
- [x] Domain events - Notifications about changes in the domain
- [x] Entity - An object with a distinct identity that runs throughout its lifecycle
- [x] Errors - Custom error types for domain and technical errors
- [x] Event bus - Decouples components by allowing them to communicate through events
- [x] Middleware - Adds additional behavior to commands and queries
- [x] Query - A request for data from the system
- [x] Query handler - Processes queries and returns the requested information
- [x] Query bus - Routes queries to the appropriate query handlers
- [x] Result - A pattern to handle errors and success cases in a more explicit way
- [x] Use case - Encapsulates application-specific business rules
- [x] Value object - An object that measures, quantifies, or describes aspects of a domain

# Value Object

## What is a value object?

In the book "**Implementing Domain-Driven Design**" by **Vaughn Vernon**, a `Value Object` is described as an object that measures, quantifies or describes certain aspects of a domain without having a conceptual identity.

The key characteristics of a value object include:

- **Immutability**: Once created, it cannot be altered. Any change to the properties of a value object should result in the creation of a new object.
- **Equality Based on Attributes**: Two instances of value objects are considered equal not based on their identity, but if all their properties have the same values.
- **Replaceability**: They can be replaced by other instances with the same values without disrupting the integrity of the domain.
- **Lack of Identity**: Value objects do not have a distinct identity that distinguishes them.
- **Design by Contract**: They can validate conditions that must be true throughout the lifetime of the object (e.g., an email address must contain an "@" symbol).

## Some examples of value objects

-   `Address`
-   `Email`
-   `PhoneNumber`
-   `DateRange`
-   `Color`
-   `Weight`
-   `Height`
-   `Temperature`
-   `Money`
-   etc...

## How is a value object different from an entity?

An `Entity` is an object that has a distinct identity that runs throughout its lifecycle. It is defined by its attributes and its identity. An entity can be mutable, and its identity is not based on its attributes.

A `Value Object`, on the other hand, is defined by its attributes and not by its identity. It is immutable and can be replaced by another instance with the same values without disrupting the integrity of the domain.

## Let's consider an example

We can say that a `Color` is defined by its `red`, `green`, and `blue` values which are numbers.

### Immutability

Once a `Color` object is created, it cannot be altered. Any change to the properties of a `Color` object should result in the creation of a new color.

### Equality Based on Attributes

That's the combination of the `red`, `green`, and `blue` values that define a `color`.

Two colors are considered equal if they have the same amount of `red`, `green`, and `blue`.

### Replaceability

A `Color` object can be replaced by another instance with the same values.

### Lack of Identity

A `Color` object does not have a distinct identity that distinguishes it.

Note that it can depend on the context. For example, in a graphic design application, a color may have an identity if it is used to represent a specific color in a palette.
But let's consider the `Color` object as a value object for this example.

### Design by Contract

A `Color` object can validate conditions that must be true throughout its lifetime. For example, the `red`, `green`, and `blue` values must be between 0 and 255.

## How to implement this value object

We can create the color value object by extending the `ValueObject` class provided by the `simple-ddd-toolkit` package.

```typescript
import { ValueObject } from "@evyweb/simple-ddd-toolkit";

export class Color extends ValueObject<{ red: number; green: number; blue: number }> {}
```

You can also create a type or an interface to define the `red`, `green`, and `blue` values.

```typescript
interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

export class Color extends ValueObject<RGBColor> {}
```

By default, you will not be able to create an instance of the `Color` class because its constructor is protected.

```typescript
const color = new Color({ red: 255, green: 0, blue: 0 }); // Error
```

To create a new instance of the `Color` class, you need to create a **static factory method** that will validate the `red`, `green`, and `blue` values before creating the instance.

A possible implementation to do that can be:

```typescript
import { ValueObject } from "@evyweb/simple-ddd-toolkit";

interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

export class Color extends ValueObject<RGBColor> {
  static create({ red, green, blue }: RGBColor): Color {
    // Validate the red, green, and blue values here
    Color.validateRGBColorFormat(red);
    Color.validateRGBColorFormat(green);
    Color.validateRGBColorFormat(blue);

    return new Color({ red, green, blue });
  }

  private static validateRGBColorFormat(value: number): void {
    if (value < 0 || value > 255) {
      throw new Error("RGB color value must be between 0 and 255.");
    }
  }
}
```

Now you can create a new instance of the `Color` class using the `create` method.

```typescript
const color = Color.create({ red: 255, green: 0, blue: 0 });
```

By using a factory method, you can ensure that the `Color` object is created with valid values.

You can also easily create different static factory methods to create colors based on different criteria.

```typescript
const color1 = Color.fromRGB({ red: 255, green: 0, blue: 0 });
const color2 = Color.fromHEX("#FF0000");
```

Note that the `fromRGB` and `fromHEX` methods are just static method names, you can choose any name that makes sense for you.
The important thing is that they are static factory methods that create a `Color` object and validate the input values before creating the object.

The word 'from' is a common convention to indicate that the method creates an object from a specific format.

Now that the value object is created, you can use the `equals` method provided by the `ValueObject` class, you can compare two `Color` objects.

```typescript
const color1 = Color.fromRGB({ red: 255, green: 0, blue: 0 });
const color2 = Color.fromHEX("#FF0000");

console.log(color1.equals(color2)); // true
```

Here is the full implementation of the `Color` class:

```typescript
import { ValueObject } from "@evyweb/simple-ddd-toolkit";

interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

export class Color extends ValueObject<RGBColor> {
  static fromRGB({ red, green, blue }: RGBColor): Color {
    Color.validateRGBColorFormat(red);
    Color.validateRGBColorFormat(green);
    Color.validateRGBColorFormat(blue);

    return new Color({ red, green, blue });
  }

  static fromHEX(hexValue: string): Color {
    Color.validateHexColorFormat(hexValue);

    return Color.fromRGB({
      red: parseInt(hexValue.substring(1, 3), 16),
      green: parseInt(hexValue.substring(3, 5), 16),
      blue: parseInt(hexValue.substring(5, 7), 16),
    });
  }

  private static validateRGBColorFormat(value: number): void {
    if (value < 0 || value > 255) {
      throw new Error("RGB color value must be between 0 and 255.");
    }
  }

  private static validateHexColorFormat(hex: string) {
    if (!/^#[0-9A-F]{6}$/i.test(hex)) {
      throw new Error("Invalid HEX color format.");
    }
  }
}
```

When the color object is created, it is automatically immutable. You will not be able to change the `red`, `green`, and `blue` values of the color object.

## Get the value(s) of the value object

You can retrieve the `red`, `green`, and `blue` values of the color object using the `get` method provided by the `ValueObject` class.

```typescript
const color = Color.fromRGB({ red: 255, green: 255, blue: 255 });

color.get("red"); // 255
color.get("green"); // 255
color.get("blue"); // 255
```

You will get autocomplete suggestions for the `get` method based on the properties of the `Color` class.

## Update the value(s) of the value object

As mentioned earlier, a value object is immutable. You cannot change the `red`, `green`, and `blue` values of the color object directly.
You will need to create a new color object with the updated values.

```typescript
const color = Color.fromRGB({ red: 255, green: 255, blue: 255 });
const newColor = color.removeRed();

class Color extends ValueObject<RGBColor> {
  // ...
  removeRed(): Color {
    return Color.fromRGB({
      red: 0,
      green: this.get("green"),
      blue: this.get("blue"),
    });
  }
}
```

In this example, the `removeRed` method creates a new color object with the `red` value set to 0 and the `green` and `blue` values copied from the original color object.

## Using directly the constructor (not recommended)

If you want to use a constructor instead of a static factory method, you can simply make the constructor public.

```typescript
export class Color extends ValueObject<RGBColor> {
  constructor({ red, green, blue }: RGBColor) {
    // Validate the red, green, and blue values here
    super({ red, green, blue });
  }

  // Other methods
}
```

Now you can create a new instance of the `Color` class using the constructor directly.

```typescript
const color = new Color({ red: 255, green: 0, blue: 0 });
```

However, it is highly recommended to use static factory methods instead of constructors to create value objects. This way, you can ensure that the value object is always created with valid values.

## Nested values (not recommended)

It is recommended to avoid nested values in the value object.
Try to keep the value object as flat as possible and simple to use.
If you need to store complex data, consider creating a separate value object for that data.

# Result Pattern

The `Result` pattern is a way to handle errors and success cases in a more explicit way.

It is a simple pattern that consists of two possible outcomes: `Ok` and `Fail`.

The `Ok` outcome represents a successful operation and contains the result of the operation.

The `Fail` outcome represents a failed operation and contains an error object that describes the reason for the failure.

## How to use the Result pattern

The `Result` class provided by the `simple-ddd-toolkit` package can be used to create `Ok` and `Fail` outcomes.

```typescript
import { Result } from "@evyweb/simple-ddd-toolkit";

const successResult = Result.ok("Operation successful");
const errorResult = Result.fail(new Error("Operation failed"));
```

You can check if the result is successful using the `isOk` method.

```typescript
if (currentResult.isOk()) {
  console.log(currentResult.getValue());
}
```

You can check if the result is a failure using the `isFail` method.

```typescript
if (currentResult.isFail()) {
  console.log(currentResult.getError());
}
```

Note that you cannot have both a value and an error in the same result object. It is either an `Ok` outcome with a value or a `Fail` outcome with an error.

## Combine factory methods with result pattern

Note that you can `combine the value object factory method with the result pattern` to return a result object that contains the created value object or an error.
It can be useful to handle validation errors when creating the value object.

```typescript
interface RGBColor {
  red: number;
  green: number;
  blue: number;
}

class InvalidRGBColorError extends Error {
  constructor() {
    super("Invalid RGB color format.");
  }
}

export class Color extends ValueObject<RGBColor> {
  static fromRGB(rgbColor: RGBColor): Result<Color, InvalidRGBColorError> {
    if (Color.isInvalidRGBColor(rgbColor)) {
      return Result.fail(new InvalidRGBColorError());
    }

    return Result.ok(new Color(rgbColor));
  }

  private static isInvalidRGBColor(rgbColor: RGBColor): boolean {
      return rgbColor.red < 0 || rgbColor.red > 255 ||
             rgbColor.green < 0 || rgbColor.green > 255 ||
             rgbColor.blue < 0 || rgbColor.blue > 255;
  }
}

const colorCreation = Color.fromRGB({ red: 255, green: 255, blue: 255 });
if (colorCreation.isOk()) {
  // Do something with the color
  console.log(colorCreation.getValue())
} else {
  // Handle the error
  console.error(colorCreation.getError())
}
```

Note the return type of the `fromRGB` method: `Result<Color, InvalidRGBColorError>`.

That means that the `fromRGB` method can return an `Ok` outcome with a `Color` object or a `Fail` outcome with an `InvalidRGBColorError` object.

# Errors

In the `simple-ddd-toolkit`, errors are represented as classes that extend the `Error` class.

To help you create more explicit errors, we gave you 3 classes `TechnicalError`, `DomainError` and `CustomError` that you can extend to create your custom errors.
Note: `TechnicalError` and `DomainError` extend the `CustomError` class.

This way, you can create different types of errors based on the context in which they occur and react differently if the error is a technical error or a domain error.

## How to create a domain error

To create a domain error, you can extend the `DomainError` class provided by the `simple-ddd-toolkit` package.

```typescript
import { DomainError } from "@evyweb/simple-ddd-toolkit";

export class AnyDomainError extends DomainError {
  public readonly __TAG = "AnyDomainError";

  constructor() {
    super("Any domain related error message"); // Can be also a translation key
  }
}
```

When you will create the error object, you will have access to two helpers methods `isDomainError` and `isTechnicalError` to check the type of the error more easily.

```typescript
const error = new AnyDomainError();

if (error.isDomainError()) {
  // Handle domain error
} else if (error.isTechnicalError()) {
  // Handle technical error
}
```

These are helper methods that allow you to quickly determine if an error is a domain error or a technical error.

## How to create a technical error

To create a technical error, you can extend the `TechnicalError` class provided by the `simple-ddd-toolkit` package.

```typescript
import { TechnicalError } from "@evyweb/simple-ddd-toolkit";

export class AnyTechnicalError extends TechnicalError {
  public readonly __TAG = "AnyTechnicalError";

  constructor() {
    super("Any technical related error message"); // Can be also a translation key
  }
}
```

When you will create the error object, you will have access to two helpers methods `isDomainError` and `isTechnicalError` to check the type of the error more easily.

```typescript
const error = new AnyTechnicalError();

if (error.isDomainError()) {
  // Handle domain error
} else if (error.isTechnicalError()) {
  // Handle technical error
}
```

## How to create a custom error

The `CustomError` class provided by the `simple-ddd-toolkit` package can be used to create custom errors.

```typescript
import { CustomError } from "@evyweb/simple-ddd-toolkit";

export class AnyCustomError extends CustomError {
  public readonly __TAG = "AnyCustomError";

  constructor() {
    super("Any custom error message"); // Can be also a translation key
  }

  isDomainError(): boolean {
    return false;
  }

  isTechnicalError(): boolean {
    return true;
  }
}
```

When you define the custom error class, you will need to:
1. Define a `__TAG` property to identify the error type
2. Override the `isDomainError` and `isTechnicalError` methods to specify the type of error

# Entity

An `Entity` is an object encapsulating domain logic and data, and it has a distinct identity that runs throughout its lifecycle.

"We design a domain concept as an `Entity` when we care about its individuality, when distinguishing it from all other objects in a system is a mandatory constraint.
An entity is a unique thing and is capable of being changed continuously over a long period of time" - Vaughn Vernon

### Difference between `Entity` and `Value Object`

It is the unique identity and mutability that distinguishes an `Entity` from a `Value Object`.

### Identity

Value objects can serve as holders of unique identity. They are immutable, which ensures identity stability, and any behavior specific to the kind of identity is centralized.

## Some examples of entities

- `User`
- `Order`
- `Product`
- `Customer`
- `Account`
- `Invoice`

## How to implement an entity

To create an entity, you can extend the `Entity` class provided by the `simple-ddd-toolkit` package.

```typescript
import { Entity } from "@evyweb/simple-ddd-toolkit";
import { UUID } from "@evyweb/simple-ddd-toolkit";

interface UserData {
  id: UUID;
  name: string;
}

export class User extends Entity<UserData> {
  static create(userData: UserData): User {
    // Validation rules here
    return new User(userData);
  }
}
```

Here `UUID` is a type that represents a universally unique identifier. It is exposed by the `simple-ddd-toolkit` package as a ready to use Value Object.

Just like the `ValueObject` class, the `Entity` class has a protected constructor, which means you cannot create an instance of the `User` class directly.

```typescript
const user = new User({ id: UUID.create(), name: "John Doe" }); // Error
```

To create a new instance of the `User` class, you need to use a static factory method.

```typescript
const user = User.create({ id: UUID.create(), name: "John Doe" });
```

This way, you can ensure that the entity is created with valid data.

Similarly to the `ValueObject` class, the `Entity` factory functions can be combined with the `Result` pattern to handle validation errors.

```typescript
import { Result, DomainError } from "@evyweb/simple-ddd-toolkit";
import { UUID } from "@evyweb/simple-ddd-toolkit";

interface UserData {
  id: UUID;
  name: string;
}

class InvalidUserNameError extends DomainError {
  constructor() {
    super("Username cannot contain special characters.");
  }
}

export class User extends Entity<UserData> {
  static create(userData: UserData): Result<User, InvalidUserNameError> {
    if (User.isInvalidUserName(userData.name)) {
      return Result.fail(new InvalidUserNameError());
    }

    return Result.ok(new User(userData));
  }

  private static isInvalidUserName(name: string): boolean {
    return /[^a-zA-Z0-9]/.test(name);
  }
}
```

In this example, the `create` method returns a `Result` object that contains either a `User` entity or an `InvalidUserNameError` error.

## Get the properties of an entity

You can retrieve the `id` and `name` values of the user entity using the `get` method provided by the `Entity` class.

```typescript
const user = User.create({ id: UUID.create(), name: "John Doe" });

user.get("id"); // UUID
user.get("name"); // 'John Doe'
```

Note that the `id` returned by the `get` method is a `UUID` value object.
To get the actual value of the `UUID` object, you can use the `get('value')` method provided by the `UUID` class.

```typescript
const userId = user.get("id").get("value");
```

You can also use the shortcut method `id()` to get the `id` value directly.

```typescript
const userId = user.id(); // Similar to user.get('id').get('value')
```

## Update entity properties

An entity is mutable, which means you can change its properties. 
Note that the setter method is protected, so you can only update the entity properties using the methods provided by the entity class.

```typescript
class User extends Entity<UserData> {
  // ...
  renameTo(newName: string): void {
    this.set("name", newName);
  }
  // ...
}

const user = User.create({ id: UUID.create(), name: "John Doe" });

user.renameTo("Jane Doe");
```

In this example, the `name` property of the user entity is updated to 'Jane Doe'.

## Identity comparison

Entities are compared based on their identity, not their attributes.

```typescript
const userId = UUID.create();
const user1 = User.create({ id: userId, name: "John Doe" });
const user2 = User.create({ id: userId, name: "Jane Doe" });

console.log(user1.equals(user2)); // true
```

In this example, even though the `name` properties of the two user entities are different, they are considered as the same because they have the same identities.

## toObject() helper method

You can convert an entity to a plain JavaScript object using the `toObject` method provided by the `Entity` class.

```typescript
const user = User.create({ id: UUID.create(), name: "John Doe" });

user.toObject(); // { id: '...', name: 'John Doe' }
```

The `toObject` method returns an object with the properties of the entity.

# Aggregate

An `Aggregate` is a cluster of domain objects that can be treated as a single unit.

It is an important concept in Domain-Driven Design (DDD) that helps to maintain consistency and integrity in the domain model.

An aggregate has the following characteristics:

- **Root Entity**: An aggregate has a root entity that acts as the entry point to the aggregate. The root entity is responsible for maintaining the consistency of the aggregate.
- **Boundary**: An aggregate defines a boundary within which all domain objects are consistent with each other. The root entity enforces the consistency of the aggregate by controlling access to its internal objects.
- **Transaction**: An aggregate is treated as a single unit in a transaction. All changes to the aggregate are made atomically, ensuring that the aggregate remains in a consistent state.
- **Identity**: An aggregate has a unique identity that distinguishes it from other aggregates in the system.
- **Encapsulation**: An aggregate encapsulates its internal objects and exposes only the root entity to the outside world.
- **Invariants**: An aggregate enforces invariants that must be true for the aggregate to be in a valid state.

## How to implement an aggregate

To create an aggregate, you can extend the `Aggregate` class provided by the `simple-ddd-toolkit` package.

```typescript
import { Aggregate, UUID } from "@evyweb/simple-ddd-toolkit";

interface OrderItem {
    productId: string;
    quantity: number;
}

interface OrderData {
  id: UUID;
  items: OrderItem[];
  date: Date;
}

export class Order extends Aggregate<OrderData> {
  static create(orderData: OrderData): Order {
    // Validation rules here
    return new Order(orderData);
  }

  addItem(productId: string, quantity: number): void {
    if (this.get("items").length >= 10) {
      throw new Error("An order cannot contain more than 10 items.");
    }
    const item = {productId, quantity};
    this.get("items").push(item);
  }
}

const order = await orderRepository.getById("order-id");
order.addItem("product1", 2);
orderRepository.save(order);
```

In this example, the `Order` class extends the `Aggregate` class and defines a `create` method to create a new order.

The `addItem` method adds a new item to the order. It checks if the order already contains 10 items and throws an error if the limit is reached.

The `Order` class can be used to create and manage orders in the domain model.

The `Order` is then saved to the repository using the `save` method provided by the repository.

## Domain events

An aggregate can emit domain events to notify other parts of the system about changes in its state.

### How to create a domain event

To create a domain event, you can extend the `DomainEvent` class provided by the `simple-ddd-toolkit` package.

```typescript
import { DomainEvent } from "@evyweb/simple-ddd-toolkit";
import { v4 as uuidv4 } from 'uuid';

export class ProductAddedToOrderEvent extends DomainEvent {
  public readonly __TAG = "ProductAddedToOrderEvent";

  constructor(
    public readonly orderId: string,
    public readonly productId: string,
    public readonly quantity: number
  ) {
    super({
      eventId: uuidv4(),
      metadata: {
        orderId,
        productId,
        quantity: quantity.toString()
      }
    });
  }
}
```

In this example, the `ProductAddedToOrderEvent` class extends the `DomainEvent` class and defines the metadata for the event.

When creating a `DomainEvent`, the following data are available and can be provided in the constructor:

- **eventId**: A unique identifier for the event. Required when creating a domain event.
- **__TAG**: The type of the event, must be defined as a property in the class.
- **occurredOn**: The date and time when the event occurred. Generated automatically if not provided.
- **metadata**: Additional data related to the event. Empty by default.
- **payload**: The data related to the event. Empty by default

### Emitting domain events

To emit domain events from an aggregate, you need to add the events to the queue first.
To do so, you can use the `addEvent` method provided by the `Aggregate` class.

```typescript
const order = await orderRepository.getById("order-id");
order.addItem("product1", 2);

order.addEvent(new ProductAddedToOrderEvent(order.id(), "product1", 2));

orderRepository.save(order);

eventBus.dispatchEvents(order.getEvents());
```

Then you need to dispatch the events to the event bus using the `dispatchEvents` method provided by the event bus.
You need to inject the event bus into the commandHandler to be able to use it.

```typescript
import { CommandHandler, EventBus, Command, DomainEvent } from "@evyweb/simple-ddd-toolkit";

export class AddProductToOrderCommandHandler extends CommandHandler<
  AddProductToOrderCommand,
  void
> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly eventBus: EventBus
  ) {
    super();
  }

  async handle(command: AddProductToOrderCommand): Promise<void> {
    const order = await this.orderRepository.getById(command.orderId);
    order.addItem(command.productId, command.quantity);

    order.addEvent(
      new ProductAddedToOrderEvent(order.id(), command.productId, command.quantity)
    );

    this.orderRepository.save(order);
    this.eventBus.dispatchEvents(order.getEvents());
  }
}
```

In this example, the `AddProductToOrderCommandHandler` class injects the event bus and dispatches the events after saving the order.

The event bus is responsible for dispatching the events to the appropriate event handlers.

# Commands

A `Command` is a request to perform an action or change the state of the system.

It encapsulates the data required to perform the action and is sent to a `Command Handler` to execute the action.

The `Command Handler` is responsible for processing the command and updating the system's state accordingly.

## How to create a command

To create a command, you can extend the `Command` class provided by the `simple-ddd-toolkit` package.

```typescript
import { Command } from "@evyweb/simple-ddd-toolkit";

export class CreateCharacterCommand extends Command {
  public readonly __TAG = "CreateCharacterCommand";
  public readonly name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
```
It is important to define the `__TAG` property for each command. This tag is used to identify the command and to register the corresponding command handler.

### How to create a command handler

To create a command handler, you can extend the `CommandHandler` class provided by the `simple-ddd-toolkit` package.

```typescript
import { CommandHandler } from "@evyweb/simple-ddd-toolkit";

export class CreateCharacterCommandHandler extends CommandHandler<
  CreateCharacterCommand,
  void
> {
  public readonly __TAG = "CreateCharacterCommandHandler";

  async handle(command: CreateCharacterCommand): Promise<void> {
    // Process the command here
  }
}
```

It is important to define the `__TAG` property for each command handler. This tag is used to identify the command handler and must match the pattern `{CommandName}Handler` where `{CommandName}` is the `__TAG` property of the command.

Most of the time, a command handler will not return anything, so the second type parameter of the `CommandHandler` class is `void`.
But it can return a value if needed (e.g., the id of the created element).

### How to dispatch a command

Commands are dispatched to the appropriate command handler using a `Command Bus`.

To dispatch a command, you can use the `execute` method provided by the command bus.

```typescript
const command = new CreateCharacterCommand(name);
await commandBus.execute(command);
```

The command bus is responsible for routing the command to the correct command handler and executing the handler.

### Registering command handlers

To register a command handler with the command bus, you can use the `register` method provided by the command bus.

```typescript
import { Bus, Command } from "@evyweb/simple-ddd-toolkit";

const commandBus = new Bus<Command>();
commandBus.register(() => new CreateCharacterCommandHandler());
```

Make sure to use the `__TAG` property of the command as the key when registering the command handler. For example, if the command's `__TAG` is "CreateCharacterCommand", then the key should be "CreateCharacterCommand".

You can also use an ioc container (like inversify or simple-ddd-toolkit) to resolve the command handler.

```typescript
commandBus.register(() => container.get(DI.CreateCharacterCommandHandler));
```

# Query

A `Query` is a request for data from the system.

It encapsulates the data required to retrieve information and is sent to a `Query Handler` to fetch the data.

The `Query Handler` is responsible for processing the query and returning the requested information.

## How to create a query

To create a query, you can extend the `Query` class provided by the `simple-ddd-toolkit` package.

```typescript
import { Query } from "@evyweb/simple-ddd-toolkit";

export class LoadCharacterCreationDialogQuery extends Query {
    public readonly __TAG = "LoadCharacterCreationDialogQuery";
}
```

It is important to define the `__TAG` property for each query. This tag is used to identify the query and to register the corresponding query handler.

### How to create a query handler

To create a query handler, you can extend the `QueryHandler` class provided by the `simple-ddd-toolkit` package.

```typescript
import { QueryHandler, IResponse } from "@evyweb/simple-ddd-toolkit";

export class LoadCharacterCreationDialogQueryHandler extends QueryHandler<
  LoadCharacterCreationDialogQuery,
  LoadCharacterCreationDialogResponse
> {
  public readonly __TAG = "LoadCharacterCreationDialogQueryHandler";

  async handle(
    _query: LoadCharacterCreationDialogQuery
  ): Promise<LoadCharacterCreationDialogResponse> {
    // Data can be fetched from a database, an API, or any other source
    return {
      title: "Add a new character",
      subTitle: "Fill out the form to create a new character.",
      form: {
        avatar: {
          label: "Avatar",
          required: false,
          value: "/images/avatars/default.png",
        },
        name: {
          label: "Name *",
          placeholder: "Character name",
          required: true,
          value: "",
        },
        submit: {
          label: "Validate",
        },
        cancel: {
          label: "Cancel",
        },
      },
    };
  }
}
```

It is important to define the `__TAG` property for each query handler. This tag is used to identify the query handler and must match the pattern `{QueryName}Handler` where `{QueryName}` is the `__TAG` property of the query.

The `LoadCharacterCreationDialogQueryHandler` class extends the `QueryHandler` class and defines the response type as `LoadCharacterCreationDialogResponse`.
The response is also known as a ViewModel.

```typescript
interface CharacterCreationFormViewModel {
  avatar: {
    label: string;
    required: boolean;
    value: string;
  };
  name: {
    label: string;
    placeholder: string;
    required: boolean;
    value: string;
  };
  submit: {
    label: string;
  };
  cancel: {
    label: string;
  };
}

export interface LoadCharacterCreationDialogResponse extends IResponse {
  title: string;
  subTitle: string;
  form: CharacterCreationFormViewModel;
}
```

### How to dispatch a query

Queries are dispatched to the appropriate query handler using a `Query Bus`.

To dispatch a query, you can use the `execute` method provided by the query bus.

```typescript
const query = new LoadCharacterCreationDialogQuery();
const response = await queryBus.execute(query);
```

The query bus is responsible for routing the query to the correct query handler and executing the handler.

### Registering query handlers

To register a query handler with the query bus, you can use the `register` method provided by the query bus.

```typescript
import { Bus, Query } from "@evyweb/simple-ddd-toolkit";

const queryBus = new Bus<Query>();
queryBus.register(() => new LoadCharacterCreationDialogQueryHandler());
```

**Make sure to use the `__TAG` property of the query as the key when registering the query handler.**

You can also use an ioc container (like inversify or simple-ddd-toolkit) to resolve the query handler.

```typescript
queryBus.register(() => container.get(DI.LoadCharacterCreationDialogQueryHandler));
```

# Middleware

Middleware is a way to add additional behavior to commands and queries without modifying the core logic.

It allows you to intercept commands and queries before they are processed by the command or query handler.

## How to create middleware

You can create middlewares for both commands and queries by implementing the `Middleware<Command>` and `Middleware<Query>` interfaces provided by the `simple-ddd-toolkit` package.

### Command middleware

```typescript
import { Middleware, Command } from "@evyweb/simple-ddd-toolkit";
import { Logger } from "@evyweb/simple-ddd-toolkit";

export class CommandLoggerMiddleware implements Middleware<Command> {
  constructor(
    private readonly logger: Logger,
    private readonly middlewareId: string
  ) {}

  async execute<T>(command: Command, next: (command: Command) => Promise<T>): Promise<T> {
    const date = new Date().toISOString();
    this.logger.log(
      `[${date}][${this.middlewareId}][${command.__TAG}] - ${JSON.stringify(
        command
      )}`
    );
    return next(command);
  }
}
```

### Query middleware

```typescript
import { Middleware, Query } from "@evyweb/simple-ddd-toolkit";
import { Logger } from "@evyweb/simple-ddd-toolkit";

export class QueryLoggerMiddleware implements Middleware<Query> {
  constructor(
    private readonly logger: Logger,
    private readonly middlewareId: string
  ) {}

  execute<T>(query: Query, next: (query: Query) => Promise<T>): Promise<T> {
    const date = new Date().toISOString();
    this.logger.log(
      `[${date}][${this.middlewareId}][${query.__TAG}] - ${JSON.stringify(
        query
      )}`
    );
    return next(query);
  }
}
```

In these examples, the `CommandLoggerMiddleware` and `QueryLoggerMiddleware` classes log the command or query data before passing it to the next middleware or the command/query handler.

## How to register middleware

To register middleware with the command bus or query bus, you can use the `use` method provided by the bus.

```typescript
commandBus.use(new CommandLoggerMiddleware(logger, "CommandLoggerMiddleware"));
queryBus.use(new QueryLoggerMiddleware(logger, "QueryLoggerMiddleware"));
```

**Middleware will be executed in the order they are registered.**

But you can also use an ioc container to resolve the middleware.

```typescript
commandBus.use(container.get(DI.CommandLoggerMiddleware));
queryBus.use(container.get(DI.QueryLoggerMiddleware));
```

# Event Bus

The `Event Bus` is a way to decouple components in a system by allowing them to communicate through events.

It provides a mechanism for publishing and subscribing to events, allowing different parts of the system to react to changes without being tightly coupled.

## How to register event handlers

Similarly to the command bus and query bus, the event bus is responsible for routing events to the appropriate event handlers.

```typescript
import { EventBus } from "@evyweb/simple-ddd-toolkit";

const eventBus = new EventBus();
eventBus.on("ConversationCreatedEvent", () => new CreateDefaultPostEventHandler());
```

You can also use an ioc container to resolve the event handler.

```typescript
eventBus.on(
  "ConversationCreatedEvent",
  () => container.get(DI.CreateDefaultPostEventHandler)
);
```

You can group all the event types in a single file to avoid typos or to group them by domain.

```typescript
export const EventTypes = {
  ConversationCreatedEvent: "ConversationCreatedEvent",
  PostCreatedEvent: "PostCreatedEvent",
  // ...
};

eventBus.on(
  EventTypes.ConversationCreatedEvent,
  () => new CreateDefaultPostEventHandler()
);
```

### How to create an event handler

To create an event handler, you can implement the `IEventHandler` interface provided by the `simple-ddd-toolkit` package.

```typescript
import { IEventHandler, DomainEvent, Command, Bus } from "@evyweb/simple-ddd-toolkit";

export class CreateDefaultPostEventHandler implements IEventHandler<ConversationCreatedEvent> {
  public readonly __TAG = "CreateDefaultPostEventHandler";

  constructor(private readonly commandBus: Bus<Command>) {}

  async handle(event: ConversationCreatedEvent): Promise<void> {
    const { conversationId, characterId, postId, userId, participantsIds } =
      event.metadata;
    const command = new CreateDefaultPostCommand(
      conversationId,
      userId,
      characterId,
      postId,
      participantsIds
    );
    await this.commandBus.execute(command);
  }
}
```

In this example, the `CreateDefaultPostEventHandler` class implements the `IEventHandler` interface and defines the `handle` method to process the event.

The event handler can execute commands, queries, or any other logic based on the event data.

Here the event handler creates a default post when a conversation is created.

**It's recommended to define a `__TAG` for each event handler to easily identify them. However, it's not mandatory.**

## How to dispatch the events

To dispatch events to the event bus, you can use the `dispatch` and `dispatchAsync` methods provided by the event bus.

```typescript
const event = new ProductAddedToOrderEvent(order.id(), "product1", 2);

// Use dispatch if you want to wait for the event to be processed before continuing (also present on aggregates)
await eventBus.dispatch(event);

// if you want to dispatch events without blocking the user, prefer dispatchAsync (also present on aggregates)
// Don't use: "eventBus.dispatch(event);" without await

// Use:
eventBus.dispatchAsync(event);
```

The `dispatch` method has to be executed with an `await`, as it is synchronous and will wait for the event to be processed before continuing.

The `dispatchAsync` method is asynchronous, which means it will dispatch the event without waiting for it to be processed.

Using `dispatchAsync` can be useful when you want to dispatch events without blocking the main thread. For example, when you want to dispatch events in the background.
You can use for eventual consistency.

### Notes:

Under the hood, the `dispatchAsync` method uses the `setImmediate` function to dispatch events asynchronously.

#### Why not use `Promise.resolve().then(() => eventBus.dispatch(event))` or `process.nextTick(() => eventBus.dispatch(event))` or remove the `await` from `eventBus.dispatch(event)`?

The `setImmediate` function is a more reliable way to dispatch events asynchronously because it ensures that the event is dispatched after the current phase of the event loop has completed. Tasks added via `setImmediate` are placed in the **macrotask queue** (specifically in the "check" phase), whereas tasks from `Promise.resolve` or `process.nextTick` are placed in the **microtask queue**.

This distinction is crucial because the **microtask queue** is processed before the event loop moves to the next phase, which means that using `Promise.resolve` or `process.nextTick` can introduce unintended blocking if the tasks are computationally expensive or numerous. In contrast, `setImmediate` ensures that the current phase of the event loop (including microtasks) is entirely finished before the event is dispatched, reducing the risk of blocking or performance degradation.

#### Why not use `setTimeout(() => eventBus.dispatch(event), 0)`?

While `setTimeout` is similar to `setImmediate`, it schedules the task in the **timer queue**, which is processed after a minimum delay and only after the next phase of the event loop. `setImmediate` schedules the task in the **check queue**, allowing it to be executed earlier than a `setTimeout` task.
