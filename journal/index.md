---
title: Learning Micro Journal
---
# {{ title }}

{% for journal in collections.entry reversed %}
  <a href="{{ journal.url }}">
    <h2>{{ journal.url }}</h2>
  </a>
  {{ journal.templateContent }}
{% endfor %}