function isValid(
  char1: string,
  char2: string,
  letter: string,
) {
  return (char1 === letter || char2 === letter) && (char1 !== char2);
}

async function main() {
  const values = await Deno
    .readTextFile("values.txt")
    .then((v) => v.split("\n"));

  let i = 0;

  for (const line of values) {
    const [value, letter, password] = line.split(" ");
    const [start, end] = value.split("-");
    if (isValid(password[+start - 1], password[+end - 1], letter[0])) {
      i += 1;
    }
  }
  return i;
}

console.log(await main());

export default {};
