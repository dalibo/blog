---
layout: post
title: 'PEV2, multiple ways to use it'
author: Pierre Giraud
twitter_id: pgira
github_id: pgiraud
tags:
  - PostgreSQL
  - performance
  - PEV2
  - Dalibo Labs
published: true
---

*Chambéry, October 10th 2019*

PEV2 (the plans graphical vizualizer) can be used in differents ways.

<!--MORE-->

## Storing My Plans? No Thanks!

In the [previous article] we mentioned that [PEV2] could be used
at [explain.dalibo.com].

This service stores the plans in a database so that you can share them with
others. If for any reason (security, anonymity, …) you don't want plans to be
sent on the web, you might be interested in a serverless version.

A standalone application running only on the browser is automatically deployed
from the github repo and is available at [dalibo.github.io/pev2].

*Bonus: you can install this application locally for yourself. See
[Contributing].*

## PEV2 For The Developers

When I started working on [PEV2], not only did I want to give [PEV] a new life,
the goal was also to isolate the graphical plan visualizer and make it
a reusable component that could be integrated in any tool or application
(web frameworks debug toolbars or PostgreSQL monitoring tools).

The `Plan` component can be used in any VueJS application. See
[Readme](https://github.com/dalibo/pev2#usage) for a complete example.

Here's also an up-to-date
[codesandbox demo](https://codesandbox.io/s/pev2-ry2dd) showing how to import
[PEV2] in a VueJS application.



I'd be pleased to hear your thoughts about this. If you plan to integrate
[PEV2], please let me know.

And don't forget that you can use [PEV2] by building the example application.
See [Contributing].

## What's Next?

In the next blog post, we'll do a complete tour of the different features. Stay
tuned.

[previous article]: {{ site.baseurl }}/2019/10/04/pev2.html
[PEV]: http://tatiyants.com/pev/
[PEV2]: http://github.com/dalibo/pev2
[Depesz]: https://explain.depesz.com
[explain.dalibo.com]: https://explain.dalibo.com/
[dalibo.github.io/pev2]: https://dalibo.github.io/pev2
[Contributing]: https://github.com/dalibo/pev2/blob/master/CONTRIBUTING.md#project-setup
