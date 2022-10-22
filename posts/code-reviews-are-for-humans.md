---
layout: layouts/post.njk
title: 'Code reviews are for humans'
tags:
  - code-reviews
date: 2020-09-26
---

Code reviews, diffs, pull requests. Whatever you call them, reviewing other people&#39;s code is one of the most vital skills to become a great software developer. At work, I average about 600 code reviews a year, which means I&#39;ve spent a lot of time giving and thinking about code reviews over the last few years.

I have read many articles with advice on how to give better code reviews, and while I have agreed with them all to varying degrees, none of them have really covered the _why_ of it all.

## Code reviews are for your users.

If you are reviewing some code, it&#39;s almost certain that someone will use it. After all, what&#39;s the point of code that nobody uses? Whether they other developers who depend on your library, visitors to your web app, creators who are trying to make a living on your platform, or people who rely on your website for critical information, your users matter. In fact, they are the people who should matter the most.

When you are reviewing code, always keep your users at the front of your mind. Does this feature make your product better for your users? Will this make it easier or harder for them to achieve their goals?

## Code reviews are for the author.

Until robots take over the programming jobs, the code you are reviewing was written by a person. It&#39;s especially important to remember this when pointing out mistakes or problems in the code. Your job is not to make the other person feel better, and you shouldn&#39;t avoid leaving feedback because it might avoid hurting their feelings. After all, remember that your users should be your highest priority, and bad code does not help them out. Instead, try and find less abrasive ways to phrase your feedback, always focussing on the code and not on the person.

The other way code reviews are about the person who wrote the code is that they are often the best way for them to learn new things. If you are a senior engineer or have more experience in the codebase, framework, or language than the person who wrote the code, it is your job to pass on the knowledge you&#39;ve learned to help them grow into a better engineer.

## Code reviews are for your colleagues.

The code you are reviewing is reasonably going to impact the other people who work at your company or organization. Code that is hard to understand or tricky to maintain will make other people&#39;s lives harder down the road. It&#39;s always tempting to accept small issues with the code, and sometimes that&#39;s the right choice, especially if you&#39;re on a deadline or building out an experimental feature. But technical debt stacks up fast, and it&#39;s always useful to think about what someone who joins the project a year from now might find confusing about the code you&#39;re reviewing.

There&#39;s another way in which your code reviews may affect your coworkers, and that&#39;s with code that causes problems for your business. While your users and coworkers should be your highest priority, if you allow code through that drives your business to lose money, it could end up with people losing their jobs.

## Code reviews are for you.

This section is deliberately last because you are the least important person when it comes to code reviews. They are not an opportunity for you to show off how smart you are or to make yourself feel better by tearing other people down. You need to leave your ego at the door when doing code reviews. It doesn&#39;t matter if they&#39;ve written code in a style that you don&#39;t like or that you could do it better. If the code is serving your users and makes your project better, without causing problems for your coworkers, then it&#39;s valid code.

When reviewing code written by other people, you should always be open to learning new things. If you see something you don&#39;t quite understand, or that you would have used a different approach to solve, ask the author about it. It could be that they know something you don&#39;t, and it&#39;s such a fantastic opportunity to grow as an engineer, whether you&#39;re new or you&#39;ve been coding your entire life. If you do learn something code review, you should leave a comment letting them know. It might even spark a conversation about evolving your team coding guidelines.

## Conclusion

When reviewing other people&#39;s code, remember that the people are more important than the code. Focus on your users and your coworkers, and it&#39;ll make it easier to decide whether or not you need to leave that comment.

## Extra reading

I am a big fan of the [Conventional Comments](https://conventionalcomments.org/) standard for formatting your code review feedback. Having a pattern you can follow when adding comments helps me avoid wasting time figuring out how to structure what I want to say.
