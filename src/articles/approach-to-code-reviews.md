---
layout: layouts/article.njk
title: Approach to Code Reviews
tags: article
snippet: How I approach doing code reviews
---

There are four main phases to a code review:

1. What does the code do?
2. Does the code work?
3. Does the code work well?
4. Is the code well written?

## What does the code do?

Before you can even begin reviewing the code, you first need to establish what the purpose of this change is. After all, if you don't know what it's trying to do, how will you decide if it's doing it correctly?

For a smaller change, like a bug fix or a copy tweak, you should just be able to rely on one or two sentences in the description of the diff or pull request.

For bigger changes, or if the change is part of a larger effort, you should expect to be given a link to a JIRA / Maniphest / GitHub ticket, a product or design spec, etc, and then you should make sure to read that first. The description of the code review should also outline what part of the project this change is working on. It might also link to previous diffs, or related changes that will inform your review.

### Tests as documentation

Non-trivial code changes should usually be accompanied by one or more tests, and this is also a great way to figure out what the code is intended to do. End-to-end tests, which are usually written in a very descriptive, almost plain English format, are very useful in determining what the goal of the change is.

```js
describe('when the user clicks on the button', () => {
  it('should show them a dialog box', () => {
    // ...
  });
});
```
