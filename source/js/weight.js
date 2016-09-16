---
---

var weightLabels = [{% for row in site.data.weight %}
  new Date('{{ row.date }}'),{% endfor %}
];

var weightValues = [{% for row in site.data.weight %}
  {{ row.weight }},{% endfor %}
]
