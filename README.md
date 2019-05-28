# template-benchmark
Benchmark of different templating engines

Run `npm start` to perform a benchmark.

Will produce output looking like the following:
```
╔════════════╤══════════╤══════════╤════════╤══════════╤══════════╗
║ 'Name      │ 'Ops/sec │ 'Average │ 'Error │ 'Samples │ '        ║
╟────────────┼──────────┼──────────┼────────┼──────────┼──────────╢
║ React      │ 26.05    │ 38.38 ms │ ±2.92% │ 46       │ Slowest  ║
╟────────────┼──────────┼──────────┼────────┼──────────┼──────────╢
║ Preact     │ 114.86   │ 8.71 ms  │ ±2.56% │ 73       │          ║
╟────────────┼──────────┼──────────┼────────┼──────────┼──────────╢
║ Handlebars │ 295.49   │ 3.38 ms  │ ±0.88% │ 86       │          ║
╟────────────┼──────────┼──────────┼────────┼──────────┼──────────╢
║ Mustache   │ 335.49   │ 2.98 ms  │ ±0.55% │ 88       │          ║
╟────────────┼──────────┼──────────┼────────┼──────────┼──────────╢
║ Dust       │ 535.65   │ 1.87 ms  │ ±1.67% │ 89       │          ║
╟────────────┼──────────┼──────────┼────────┼──────────┼──────────╢
║ doT        │ 11537.87 │ 0.09 ms  │ ±0.37% │ 92       │ Fastest  ║
╚════════════╧══════════╧══════════╧════════╧══════════╧══════════╝
```