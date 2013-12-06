---
layout: page
title: L'actualité PostgreSQL 
tagline: Supporting tagline
---
{% include JB/setup %}

<ul class="posts">
  {% for post in site.posts %}
    <li><span>{{ post.date | date_to_string }}</span> : <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
    <p>
	{% if post.content contains '<!--more-->' %}
    		{{ post.content | split:'<!--more-->' | first }}
	{% else %}
    		<!-- Case for when no excerpt is defined -->
	{% endif %}
        <a href="{{ BASE_PATH }}{{ post.url }}">&raquo; Lire la suite...</a>
    </p>
  {% endfor %}
</ul>



