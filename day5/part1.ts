const ROW_START = 127
const COL_START = 7

function getPartialSeatValue(seatSubstring: string, start: number) {
	// let lowest = 0;
	// let highest = start;
	let val = ''
	for (let i = 0; i < seatSubstring.length; i++) {
		const char = seatSubstring[i];
		if (['F', 'L'].includes(char)) {
			val += '0'
			// highest = Math.floor((highest + lowest) / 2)
		} else {
			val += '1'
			// lowest = Math.ceil((highest + lowest) / 2)
		}
	}
	return parseInt(val, 2)
	// if (lowest !== highest) console.log({ lowest: lowest, highest: highest, seatSubstring })
	// return highest
}

function getSeatValue(seat: string) {
	const [,rows, columns] = /^([A-Z]{7})([A-Z]{3})$/.exec(seat)!
	console.log(rows, columns)
	return getPartialSeatValue(rows, ROW_START) * 8 + getPartialSeatValue(columns, COL_START);
}

var calcSeatId = (seat: string) => {
  var minRow = 0
  var maxRow = 127
  var minCol = 0
  var maxCol = 7;

  [...seat].forEach(s => {
      if(s === "F" || s === "B"){
          var diffRow = maxRow - minRow
          var halfRow = Math.ceil(diffRow/2)-1

          if(s === "F") {
              maxRow = minRow + halfRow
          }
          if(s === "B") {
              minRow = maxRow - halfRow
          }
      }
      if(s === "R" || s === "L"){
          var diffCol = maxCol - minCol
          var halfCol = Math.ceil(diffCol/2)-1

          if(s === "L") {
              maxCol = minCol+ halfCol
          }
          if(s === "R") {
              minCol = maxCol - halfCol
          }
      }
  })

  return [minRow * 8 + minCol, minRow, minCol, seat]
}

async function main(): Promise<string | undefined> {
	const values = await Deno
		.readTextFile("./values.txt")
		.then((v) => v.split("\n"));

	if (!values) return undefined;

	const b = values.map(val => calcSeatId(val)).sort(([a], [b]) => {
		// @ts-ignore
		return a - b
	})


	for (let i = 0; i < b.length; i++) {
		const current = b[i]
		const previous = b[i - 1]
		const next = b[i + 1]

		if (previous && ((current[0] as number - 1) !== previous[0])) {
			console.log(current, '')
		}
		if (next && ((current[0] as number + 1) !== next[0])) {
			console.log(current)
		}
	}

	// const result = values.reduce((previous, current): [string, number] => {
	// 	const currentSeatValue = calcSeatId(current);
	// 	if (!previous) return [current, currentSeatValue];

	// 	console.log(currentSeatValue)

	// 	return previous[1] > currentSeatValue
	// 		? previous
	// 		: [current, currentSeatValue];
		
	// }, undefined as [string, number] | undefined);

	// return result![0];
}

console.log(await main());

export default {}