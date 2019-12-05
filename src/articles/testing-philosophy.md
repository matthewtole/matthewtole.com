---
layout: layouts/article.njk
title: Testing Philosophy
tags: article
snippet: Why even bother writing tests? Because as I see it, if the feature doesn't have tests, then it doesn't exist.
---

I have a masters degree in Computer Forensics, and spent the first four years of my working life at a litigation support and forensic firm. One of the core principles of doing forensic work that was drilled into me repeatedly, was to always make notes on any action you do with a piece of evidence.

Open up a computer to remove a hard drive? Write notes about how you did that, about the make and model of the computer, how the hard drive was connected, etc.

Running a script on the data you extracted from that hard drive? Make sure that you document when you ran it, what options you chose, what version of the software you were using, etc.

The reason for making all of these notes, is that if you ever need to go to court to defend your actions, you are only as reliable as the documentation you made. The phrase that was always rattling around my head when I was working was this:

> If you didn't write it down, then it didn't happen

Thankfully, I never had to go to court for any of the work that I did in those four years, and now that I work for a software company, writing frontend code all day, I don't have to make such meticulous notes on my every action any more. But recently I was thinking about testing, and how to encourage other teams to write tests for their features that are built on top of our surface, and the old phrase from my computer forensic days came back to mind. So I came up with a variation of the concept, but for tests:

> If the feature doesn't have tests, then it doesn't exist

What this means, at least to me, is that if you don't write tests for your feature, then we cannot be responsible for breaking it or completely disabling it. After all, an engineer cannot be expected to know or remember
