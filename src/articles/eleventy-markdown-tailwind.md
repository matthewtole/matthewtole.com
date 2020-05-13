---
layout: layouts/article.njk
title: Eleventy, Markdown, and Tailwind CSS
tags:
  - article
  - tailwind
  - eleventy
snippet: Two different techniques for using Tailwind CSS with your Markdown content in Eleventy.
---

If you are building a website using [Eleventy](https://11ty.dev) and [Tailwind CSS](https://tailwindcss.com), you might have come across a problem when you started trying to write Markdown content. As it states in the very top of the Tailwind documentation:

> Instead of opinionated predesigned components, Tailwind provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.

This is fantastic when you have full control over your HTML output, but becomes a bit of an issue when working with a lightweight markup language like Markdown.

To demonstrate what I'm talking about here is a rendering of part of this blog post before we fix the problem.

<div class="my-4 border border-nord2">
  <div class="flex items-center p-2 bg-nord2">
    <div class="w-2 h-2 mr-1 bg-red-500 rounded-full"></div>
    <div class="w-2 h-2 mr-1 bg-orange-400 rounded-full"></div>
    <div class="w-2 h-2 mr-1 bg-green-500 rounded-full"></div>
  </div>
  <img src="/static/images/articles/eleventy-markdown-tailwind.png" alt="Screenshot of the unstyled article" />
</div>

As you can see, there's no styling being applied to any of the content, which makes it hard to read!

So, how can we fix this? I came up with two different approaches when building this site, and I've described them both below, with their pros and cons. Take a look and see if either of them might work for you.

## Create custom Tailwind components

> **NOTE:** This method only works if you are using Tailwind with PostCSS.

Tailwind CSS encourages the utility first approach to CSS but does provide a mechanism for applying their styles in CSS, instead of HTML. This is intended to be used for small, commonly used components, but we can take advantage of it to style our Markdown content.

The `@apply` directive can be used to create CSS rules that are composed of Tailwind classes. For example, if you find yourself always using the same classes to make giant red text appear on the page, then instead of applying the Tailwind classes everywhere:

```html
<h1 class="text-4xl font-bold text-red-400">GIANT RED TEXT</h1>
```

You can create a new class that's built out of those class definitions, and use that everywhere.

```css
.big-red-text {
  @apply text-4xl text-red-400 font-bold;
}
```

```html
<h1 class="big-red-text">GIANT RED TEXT</h1>
```

> Check out the [Tailwind documentation](https://tailwindcss.com/docs/extracting-components#extracting-css-components-with-apply) for the full details on how to use the `@apply` directive.

So how can we use this technique for our Markdown content? Instead of creating CSS classes with the `@apply` directive, you can use them on HTML elements instead.

```css
.markdown h1 {
  @apply text-4xl text-red-400 font-bold;
}

.markdown a {
  @apply text-blue-300;
}

.markdown a:hover {
  @apply underline;
}
```

Note that you cannot just use the pseudo-class prefixes as you would in your HTML, you have to specify them manually like you would in CSS.

You should also ensure that you put all of your Markdown CSS definitions under a class so that they don't leak out into the rest of your site. You probably don't want these rules to apply everywhere, just your Markdown content.

### Positives

This technique is very versatile, allowing you the full flexibility of CSS combined with the utility of Tailwind.

The styles for your Markdown content live in your CSS files, which makes them easy to find and understand.

### Negatives

The `@apply` directive is not intended to be used in this way, and should ideally be reserved for reusable components, not overriding the styles of base HTML elements.

Introducing new rules to your CSS will increase the size, although likely only by a very small amount.

## Add classes to the Markdown output

Instead of adding new CSS rules, what if instead we could add the classes to the HTML output of the Markdown? Well, it turns out we can!

Eleventy gives you the ability to modify the library used to render Markdown content. You can even swap it out for an entirely different one if you like.

We don't need to go to that extreme for our needs, we can just use a plugin to add some classes to the output.

Eleventy ships with [markdown-it](https://markdown-it.github.io/) out of the box. It's a very configurable Markdown parser that gives you full control over the rendering but it comes with pretty solid defaults to start with.

One of the many community-written plugins for markdown-it is called [markdown-it-class](https://www.npmjs.com/package/@toycode/markdown-it-class) and it allows you to specify classes that get added to the HTML.

Before we can use the plugin, we first need to install it from npm.

```shell
$ npm install --save @toycode/markdown-it-class
```

Then we need to add some code to our Eleventy config file to override the default Markdown parser. If you don't already have an Eleventy configuration file, start by creating it.

```js
// .eleventy.js
module.exports = (eleventyConfig) => {};
```

Import the markdown-it library and the markdown-it-class plugin.

```js
const markdownIt = require('markdown-it');
const markdownItClass = require('@toycode/markdown-it-class');
```

Define the mapping of HTML elements to classes. You can use strings for single classes, or arrays if you want to specify multiple classnames.

```js
const mapping = {
  h1: ['text-4xl', 'text-red-400', 'font-bold'],
  a: ['text-blue-300', 'hover:underline'],
};
```

In order to use the plugin, we have to create a new markdown-it instance and tell Eleventy to use it for handling Markdown files.

```js
const md = markdownIt({ linkify: true, html: true });
md.use(markdownItClass, mapping);
eleventyConfig.setLibrary('md', md);
```

Now when you build your site, the output of your Markdown files should look now include the Tailwind class names.

```html
<h1 class="text-4xl font-bold text-red-400">GIANT RED TEXT</h1>
<a class="text-blue-300 hover:underline">I'm a link!</a>
```

### Positives

Adding the classes to the HTML that the Markdown library generates align well with the general philosophy of Tailwind.

This technique can be used even if you're not using Tailwind with PostCSS, such as loading it from a CDN. It also can be adapted to other atomic CSS libraries very easily.

### Negatives

Having your Markdown content styles configured in the Eleventy configuration file makes them harder to reason about since they're not with the content _or_ any of the other styles.

There are some limitations to the `markdown-it-class` plugin that I've found. It doesn't work with inline or block code elements.

You cannot have different styles for your elements depending on the context. For example, I wanted to have my inline code be styled differently if it's contained within a link.

## Conclusion

While I would have preferred to go with the Markdown class solution, the limitations were too much for me, so for this site, I have decided to use custom Tailwind components in my CSS.

You can view the finished [CSS file on Github](https://github.com/matthewtole/matthewtole.com/blob/master/src/_includes/postcss/styles.css) to see what I used to create the designs here.
