
const expectedFields: Record<string, boolean> = {
	byr: true,
	iyr: true,
	eyr: true,
	hgt: true,
	hcl: true,
	ecl: true,
	pid: true
}

async function main() {
	const values = await Deno
		.readTextFile("./values.txt")
		.then((v) => v.split("\n\n"));

	const keys = Object.keys(expectedFields);

	const filteredValues = values
		.map((v) => v.replace(/\s/g, '\n').split('\n'))
		.filter((v) => v.length >= 7);

	const parsedValues = filteredValues.map((v) => {
		return v.reduce((memo, strV) => {
			const [key] = strV.split(':');
			memo[key] = true;
			return memo;
		}, {} as Record<string, boolean>);
	});

	return parsedValues.filter((v) => {
		const bool = keys.every((k) => v[k]);
		return bool;
	}).length;
}

console.log(await main())

export default {}