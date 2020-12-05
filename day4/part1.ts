
const expectedFields: Record<string, RegExp> = {
	byr: /^(19[2-9]\d)|(200[0-2])$/,
	iyr: /^20(1[0-9]|20)$/,
	eyr: /^20(2[0-9]|30)$/,
	hgt: /^(1([5-8]\d|9[0-3])cm)|(((59)|(6\d)|(7[0-6]))in)$/,
	hcl: /^#[0-9a-f]{6}$/,
	ecl: /amb|blu|brn|gry|grn|hzl|oth/,
	pid: /^\d{9}$/
}

async function main() {
	const values = await Deno
		.readTextFile("./values.txt")
		.then((v) => v.split("\n\n"));

	const entries = Object.entries(expectedFields);

	const filteredValues = values
		.map((v) => v.replace(/\s/g, '\n').split('\n'))
		.filter((v) => v.length >= 7);

	const parsedValues = filteredValues.map((v) => {
		return v.reduce((memo, strV) => {
			const [key, value] = strV.split(':');
			memo[key] = value;
			return memo;
		}, {} as Record<string, string>);
	});

	return parsedValues.filter((v) => {
		return entries.every(([k, a]) => {
			return a.test(v[k])
		});
	}).length;
}

console.log(await main())

export default {}