function isValid(
  start: number,
  end: number,
  letter: string,
  password: string,
) {
	const chars = password.replace(new RegExp(`[^${letter}]`, 'g'), '');
  return (chars.length >= start) && (chars.length <= end);
}

async function main() {
  const values = await Deno
    .readTextFile("values.txt")
		.then((v) => v.split("\n"));
		
	let i = 0;

  for (const line of values) {
		const [value, letter, password] = line.split(' ')
		const [start, end] = value.split('-')
		const valid = isValid(+start, +end, letter[0], password);
		if (valid) {
			i += 1
		}
	}
	return i
}

console.log(await main())

export default {};
