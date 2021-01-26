---
layout: post
title: How I made my Github profile dynamic
tags:
  - article
  - github
snippet: An explanation of how I overly engineered my Github profile to always show my latest article
date: 2020-10-11
---

If you use Github, you've probably seen the new feature that lets you [customize your profile page](https://docs.github.com/en/free-pro-team@latest/github/setting-up-and-managing-your-github-profile/managing-your-profile-readme) by creating a README file in a repository with the same name as your username. It's a really nice way to provide more context and show off what you've been working on.

Despite this being a relatively new feature, people have already built some really cool tools for enhancing your profiles, including [generators](https://arturssmirnovs.github.io/github-profile-readme-generator/) and [dynamic images that show your Github stats](https://github.com/anuraghazra/github-readme-stats).

I wanted to keep my profile simple and clean, but I wanted it to always link to the most recently published blog post on my website. ~~I tried to find other projects that were doing the same thing but I couldn't find any, so I built it myself.~~ While writing this blog post I came across [this awesome project](https://simonwillison.net/2020/Jul/10/self-updating-profile-readme/) from [Simon Willison](https://simonwillison.net/).

## Dynamic Profile

The first thing I built was [`dynamic-profile`](https://github.com/matthewtole/dynamic-profile), a small NPM CLI that takes a template markdown file and a configuration file and generates a README out of it. Currently it only supports the RSS feed feature but I plan on adding more things in the future.

As an example of how it works, here's a configuration file...

```json
{
  "feedUrl": "http://matthewtole.com/rss.xml"
}
```

... and the corresponding template.

```markdown
{% raw %}[{{article.title}}]({{article.link}}){% endraw %}
```

When you run the script...

```bash
npx github:matthewtole/dynamic-profile
```

... this is what will be output.

```markdown
[How I made my Github profile dynamic](https://matthewtole.com/articles/dynamic-github-profile/)
```

## Github Action

[Github Actions](https://github.com/features/actions) allows you to write automated tasks for your repository in the form of workflows. You can use them to run automated tests on pull requests, auto-triage incoming issues, or even silly things like keeping your profile up to date. One of the powerful things about Github Actions is that it's really easy to share and re-use other people's actions, so you can build up really complex workflows without having to write any code.

This is the action I am [currently using](https://github.com/matthewtole/matthewtole/blob/master/.github/workflows/blank.yml) for my profile repository.

```yaml
name: Dynamic Profile
on:
  issues:
    types: [opened]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run dynamic-profile
        run: npx github:matthewtole/dynamic-profile;
      - name: Push changes
        uses: actions-go/push@v1
      - name: Close Issue
        uses: peter-evans/close-issue@v1.0.2
```

When Github detects a new issue on the repository, it checks out the code to a temporary directory, then it runs my `dynamic-profile` script to update the README file. Then it pushes the changes back to Github and closes out the issue.

## IFTTT

You might be wondering why the Github Action runs on a new issue. This is because that was the simplest way to connect it up to the last part of the puzzle, IFTTT. [If This Then That](https://github.com/features/actions) is a web service that lets you build simple connections between two tools. For example, you could have it save [Facebook photos you get tagged in to Dropbox](https://ifttt.com/applets/rveqra5B), or get a [notification when the ISS is passing over your house](https://ifttt.com/applets/YfkYtQB2).

IFTTT has a Github integration, but the only thing it supports is creating issues. So that's what I did. When it detects a new entry in my RSS feed, it creates an issue on the profile repository, which triggers the Github Action.

## Next Steps

The post you're reading right now is actually my first real world test of the entire system working end-to-end, so I might be spending some time debugging it when it inevitably goes wrong.

Once it's working, I want to add some more functionality to the `dynamic-profile` project and publish it to NPM with more generalizable instructions on using it for your own profile. If you have any feature requests please submit an issue on the [Github repository](https://github.com/matthewtole/dynamic-profile/issues).
