---
layout: post
title: 'Shorthand class properties in Typescript'
tags:
  - article
  - typescript
  - TIL
snippet: Today I learned about how to declare class properties in Typescript using the constructor.
date: 2020-07-30
---

If you are like me and write Typescript code, you're probably very familiar with how to write classes. Here's an example of a class that you might write.

```typescript
class Player {
  private name: string;
  private age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public isOld(): boolean {
    return this.age >= 65;
  }
}
```

At work today I stumbled across some code that I didn't quite understand, but after running some experiments on the [Typescript playground](https://www.typescriptlang.org/play/index.html#code/MYGwhgzhAEAK4E8CmAnaBvAUNawD2AdhAC4oCuwxeKAFAA4oCWAbmMUtAWALZIBc0EkwIBzADTQGLNhzAj+nMtwBGqAJQZs0AL6YtdMspCNg0RhADyIACY01A5XjwgkYAppw4USYmRTviAAtzADo5DgA+AF5oADYAVgBuLV1tIA) and finding a random StackOverflow article talking about it, I realized I have discovered a shorthand way of declaring class properties in Typescript. The same Player class can be written like this.

```typescript
class Player {
  constructor(private name: string, private age: number) {
    // Don't need anything here!
  }

  public isOld(): boolean {
    return this.age >= 65;
  }
}
```

By adding the scope of the properties to the constructor, it automatically creates properties on the class with the same name!

I couldn't find anything about this in the Typescript documentation, or many people using this, but I thought it was pretty cool and wanted to share.
