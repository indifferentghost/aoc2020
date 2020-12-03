
export async function main([slopeX, slopeY]: [number, number]): Promise<number> {
	const values = await Deno
		.readTextFile("./values.txt")
		.then((v) => v.split("\n"));

	let [x, y] = [0, 0];
	let count = 0;

	while (x < values.length) {
		if (values[x][y] === '#') {
			count += 1;
		}
		y = (y + slopeY) % values[x]?.length;
		x += slopeX;
	}

	return count
}

console.log(await main([1, 3]));
