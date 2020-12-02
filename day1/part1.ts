async function main() {
	const values = await Deno.readTextFile('values.txt');
	const map: Record<number, number> = {};
	for (const value of values.split('\n')) {
		const n = +value;
		if (map[n]) return n * map[n]

		map[2020 - n] = n
	}
}

console.log(await main())

export default {}