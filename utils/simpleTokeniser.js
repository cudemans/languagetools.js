export default function simpleTokeniser(docs) {
  const tokenised = docs.map((d) => d.split(" "));

  const processed = tokenised.map((d) => {
    return d.map((j) => {
      return j != undefined ? j.toLowerCase() : j;
    });
  });

  return processed;
}
