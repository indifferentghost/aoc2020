import { main } from './part1.ts';

const values = [[1, 1], [1, 3], [1, 5], [1, 7], [2, 1]].map(([x, y]) => main([x, y]))

const value = await Promise.all(values).then(v => v.reduce((a, b) => a * b))
console.log(value)
