---
layout: layouts/article.njk
title: Eleventy, Markdown, and Tailwind CSS
tags: article
snippet: Learn how to apply Tailwind CSS classes to Markdown content in your Eleventy website.
---

This website is built using [Eleventy](https://11ty.dev) and [Tailwind CSS](https://tailwindcss.com), which are two of my currently favorite web technologies.

I find them to be the right balance of simple and configurable, allowing me to do my work without getting in the way.

When I started to write this article in Markdown, I realized that I would need to do some work to make it look right. This is because Tailwind applies almost zero styling by default, and uses class names to handle all styling.

To demonstrate what I mean, this screenshot is of the first section of this article before I applied any styling.

<div class="my-4 border border-nord2">
  <div class="flex items-center p-2 bg-nord2">
    <div class="w-2 h-2 mr-1 bg-red-500 rounded-full"></div>
    <div class="w-2 h-2 mr-1 bg-orange-400 rounded-full"></div>
    <div class="w-2 h-2 mr-1 bg-green-500 rounded-full"></div>
  </div>
  <img src="/static/images/articles/eleventy-markdown-tailwind.png" alt="Screenshot of the unstyled article" />
</div>

My initial approach to the problem was to

My first thought was to use [Tailwind's `@apply` directive](https://tailwindcss.com/docs/extracting-components#extracting-css-components-with-apply) to add the classes in my CSS file.

```css
p {
  @apply mb-2;
}

a {
  @apply text-nord11 border-b border-nord11;
}
```

This was appealing for its simplicity, but I try to avoid adding new classes whenever possible to keep my CSS size small.

Thankfully, Eleventy allows you to [customize the Markdown renderer](https://www.11ty.dev/docs/languages/markdown/#add-your-own-plugins), and I found a plugin for Markdownit that lets you specify the classes to apply to each tag.

Putting the two together in my `.eleventy.js` configuration file, and I ended up with something like this.

```javascript
const markdownIt = require('markdown-it');
const markdownItClass = require('@toycode/markdown-it-class');

module.exports = (eleventyConfig) => {
  const mapping = {
    p: ['mb-2'],
    a: ['text-nord11', 'border-b', 'border-nord11'],
  };
  const md = markdownIt({ linkify: true, html: true }).use(
    markdownItClass,
    mapping
  );
  eleventyConfig.setLibrary('md', md);
};
```

This works great, and got me 90% of the way to where I wanted the styles to be.

_Unfortunately_ the plugin I chose to handle adding the CSS classes had a couple of limitations that I hadn't forseen.

1. It didn't work for all elements, such as code blocks
2. There wasn't a mechanism to set different classes based on the nested of elements (e.g. `a > code` vs `p > code`)

It didn't seem that hard to fix **#1** but I couldn't think of a good general solution for **#2** so in the end I decided to go back to the first approach and just apply the classes in the CSS.

```css
article p > code,
article li > code {
  @apply text-nord2 bg-nord5;
}

article h2 {
  @apply text-xl font-serif mt-4;
}

article h3 {
  @apply text-lg font-serif mt-4;
}
```

You can view the full CSS file on [Github](https://github.com/matthewtole/matthewtole.com/blob/master/src/_includes/postcss/styles.css).
