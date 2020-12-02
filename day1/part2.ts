async function main() {
	const values = await Deno
		.readTextFile('./values.txt')
		.then(v => v.split('\n'));

	const map: Record<number, number[]> = {};

	for (let i = 0; i < values.length; i++) {
		for (let j = 0; j < values.length; j++) {
			const vali = +values[i]
			const valj = +values[j]
			map[2020 - vali - valj] = [vali, valj]
		}
	}

	for (let i = 0; i < values.length; i++) {
		const vali = +values[i]
		if (map[vali]) {
			const [valj, valk] = map[vali]
			return vali * valj * valk
		}
	}
}

console.log(await main())

export default {}
