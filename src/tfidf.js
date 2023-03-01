import simpleTokeniser from "../utils/simpleTokeniser.js";

export default function tfidf(docs) {
  const processed = simpleTokeniser(docs);
  // Term frequency
  let tracker = [];
  processed.forEach((d) => {
    tracker.push(
      d.reduce((acc, item) => {
        acc[item] = ((acc[item] || 0) + 1) / d.length;
        return acc;
      }, {})
    );
  });

  const totalWords = [...new Set(processed.flatMap((d) => d))];

  const documentFrequency = [
    ...new Set(
      totalWords.map((a) => {
        return {
          word: a,
          freq: processed.filter((d) => d.includes(a)).length,
        };
      })
    ),
  ];
}
