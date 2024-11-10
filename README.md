# Simple DDD Toolkit 🛠️

A simple Domain Driven Design Toolkit created to help developers to understand how to implement DDD concepts. It also contains some useful stuff not directly related to DDD, like a command bus or result pattern.

This toolkit is not a library, it's just a set of classes and interfaces that you can use, and it has no dependency. 

Note: This toolkit is still under development and not intended to be used in production. All classes and interfaces are subject to change.

## Installation

```bash
npm install --save @evyweb/simple-ddd-toolkit
```

## Features

- [x] Aggregate
- [x] Command
- [x] Command handler
- [x] Command bus
- [x] Domain events
- [x] Entity
- [x] Errors
- [x] Event bus
- [x] Middleware
- [x] Query
- [x] Query handler
- [x] Query bus
- [x] Result
- [x] Use case
- [x] Value object

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
- `Address`
- `Email`
- `PhoneNumber`
- `DateRange`
- `Color`
- `Weight`
- `Height`
- `Temperature`
- `Money`
- etc...

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
import {ValueObject} from "@evyweb/simple-ddd-toolkit";

export class Color extends ValueObject<{ red: number, green: number, blue: number }> {}
```

You can also create an interface to define the `red`, `green`, and `blue` values.

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
import {ValueObject} from "@evyweb/simple-ddd-toolkit";

interface RGBColor {
    red: number;
    green: number;
    blue: number;
}

export class Color extends ValueObject<RGBColor> {
    static create({red, green, blue}: RGBColor): Color {
        // Validate the red, green, and blue values here
        this.validateColorValue(red);
        this.validateColorValue(green);
        this.validateColorValue(blue);

        return new Color({ red, green, blue });
    }

    private validateColorValue(value: number): void {
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
const color2 = Color.fromHEX('#FF0000');
```

Note that the `fromRGB` and `fromHEX` methods are just static methods names, you can choose any name that makes sense for you.
The important thing is that they are static factory methods that create a `Color` object and validate the input values before creating the object.

The word 'from' is a common convention to indicate that the method creates an object from a specific format.

Now that the value object is created, you can use the `equals` method provided by the `ValueObject` class, you can compare two `Color` objects.

```typescript
const color1 = Color.fromRGB({ red: 255, green: 0, blue: 0 });
const color2 = Color.fromHEX('#FF0000');

console.log(color1.equals(color2)); // true
```

Here is the full implementation of the `Color` class:

```typescript
import {ValueObject} from "@evyweb/simple-ddd-toolkit";

interface RGBColor {
    red: number;
    green: number;
    blue: number;
}

export class Color extends ValueObject<RGBColor> {

    static fromRGB({red, green, blue}: RGBColor): Color {
        Color.validateRGBColorFormat(red);
        Color.validateRGBColorFormat(green);
        Color.validateRGBColorFormat(blue);

        return new Color({red, green, blue});
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
const color = Color.fromRGB({red: 255, green: 255, blue: 255});

color.get('red'); // 255
color.get('green'); // 255
color.get('blue'); // 255
```

You will get autocomplete suggestions for the `get` method based on the properties of the `Color` class.

## Combine with the result pattern

Note that you can combine the value object factory method with the result pattern to return a result object that contains the created value object or an error.
It can be useful to handle validation errors when creating the value object.

```typescript
interface RGBColor {
    red: number;
    green: number;
    blue: number;
}

class InvalidRGBColorError extends Error {
    constructor() {
        super('Invalid RGB color format.');
    }
}

export class Color extends ValueObject<RGBColor> {

    static fromRGB(rgbColor: RGBColor): Result<Color, InvalidRGBColorError> {
        if (Color.isInvalidRGBColor(rgbColor)) {
            return Result.fail(new InvalidRGBColorError());
        }

        return Result.ok(new Color(rgbColor));
    }

}

const colorCreation = Color.fromRGB({red: 255, green: 255, blue: 255});
if(colorCreation.isOk()) {
    // Do something with the color
} else {
    // Handle the error
}
```

## Using directly the constructor (not recommended)

If you want to use a constructor instead of a static factory method, you can simply make the constructor public.

```typescript
export class Color extends ValueObject<RGBColor> {
    constructor({red, green, blue}: RGBColor) {
        // Validate the red, green, and blue values here
        super({red, green, blue});
    }

    // Other methods
}
```

Now you can create a new instance of the `Color` class using the constructor directly.

```typescript
const color = new Color({ red: 255, green: 0, blue: 0 });
```

## Nested values (not recommended)

It is recommended to avoid nested values in the value object.
Try to keep the value object as flat as possible and simple to use.
If you need to store complex data, consider creating a separate value object for that data.
