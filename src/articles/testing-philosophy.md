---
layout: layouts/article.njk
title: My testing philosophy
tags:
  - article
  - testing
snippet: How I apply a core principle of computer forensics to thinking about writing tests
date: 2020-08-03
---

**tl;dr** The purpose of writing tests for your code is to protect it against accidental future breakages, not just to validate the current behavior.

## Background

I have a Master's degree in Computer Forensics and spent the first four years of university working for a company that did, amongst other things, computer forensics. One of the most important principles of doing good computer forensics (and presumably all forensics) is to take really good notes on everything you do, as you are doing it.

For example, the first step in many computer forensic investigations is to remove the hard drive from a computer and image it (create a virtual clone of the entire disk). Before you touch the computer, you would need to note down any serial numbers you can see, maybe take photos of the case, etc. Then when you remove the drive, you would again record serial numbers and note down anything special or interesting about the drive. When you do the imaging, you would write down the time and date that you started, what version of the software or hardware you were using to clone the drive. When the drive was cloned, you would verify the clone by generating a hash for the original disk and the clone image and noting it down.

The general rule of thumb for note-taking was that "if you didn't write it down then it didn't happen". The idea is that if you were ever called to court to testify about your investigation, you would only be able to defend your actions if you had written them down at the time.

Thankfully I never had to go to court for any of the forensic investigations I did, but that principle has still stuck with me as I transitioned into my career as a software engineer. But now I apply it to thinking about what to write tests for.

## Why write tests

When most people talk about writing tests, it's as a way to validate the behavior of a function or component. This is the principle behind things like Test Driven Development, where you write the tests first and then implement just enough code to get them to pass.

This is a perfectly valid reason to write tests, and for some parts of your code, it's absolutely vital to have good unit test coverage to ensure that all of the edge cases are validated. But I don't think this is the most important reason to write tests. For most of the code we write, it's so easy to manually check that it works that it seems pointless to write tests to validate it.

What is much more important is protected that functionality against accidental breakages in the future.

Here is an example of a React component and a corresponding test written using [React Testing Library](https://github.com/testing-library/react-testing-library).

```typescript
export const MyComponent: React.FC = () => {
  return <AwesomeButton onClick={doSomethingCool}>Click Me!</AwesomeButton>;
};
```

```ts
describe('MyComponent', () => {
  it('should do something cool when the awesome button is clicked', () => {
    const {getByText} = render(<MyComponent />);
    fireEvent.click(getByText('Click Me!'));
    expect(somethingCool).toHaveHappened();
  });
});
```

If you think of tests purely as a way to verify the current behavior, then this might seem like a bit of a pointless test. But if you think about tests as a guarantee against future problems, then it makes a lot more sense. For example, the developer of the AwesomeButton component might decide that the onClick callback only fires on a double click. Without any tests, how would they know that this was going to break your feature? How would you know that the behavior changed until it was broken in production?

Obviously, this is a particularly contrived and overly simplistic example, but it demonstrates the underlying principle of the value of writing good tests. As I have repeatedly told folks who refused to write tests for their new feature, if something doesn't have tests, then I cannot guarantee that I won't break or disable it in the future.

## How I think about tests

I have taken the mantra of note-taking from my computer forensic days and come up with an equivalent for testing code.

> If your code doesn't have tests, then it doesn't exist

It's that simple. If your code doesn't have any tests, then how can you be sure it won't change, break, or completely disappear in the future? This has been demonstrated multiples times in my professional career. In one example, a coworker was doing a refactor of some code and accidentally left out a couple of lines of code that showed a prompt to users to encourage them to upgrade their account. This breakage went unnoticed for months and potentially cost the business over one million dollars in recurring revenue. How did this happen? There were zero tests for this functionality and so our team had no idea we had broken their behavior.

Writing good tests is hard, and for most of us, not that enjoyable, but it is vitally important. Not just to make sure you got the code right the first time, but to make sure it doesn't break in the future. Be nice to your future selves (or more likely, a future stranger) and write tests!
