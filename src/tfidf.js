import simpleTokeniser from "../utils/simpleTokeniser.js";

export default function tfidf(docs) {
  const processed = simpleTokeniser(docs);
  // Term frequency
  // let tracker = [];
  // processed.forEach((d) => {
  //   tracker.push(
  //     d.reduce((acc, item) => {
  //       acc[item] = ((acc[item] || 0) + 1) / d.length;
  //       return acc;
  //     }, {})
  //   );
  // });

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

  const tfidf = processed.map((a) => {
    const obj = {};
    const wordLength = a.length;

    totalWords.forEach((word) => {
      const numDocs = documentFrequency.find((d) => d.word == word).freq;

      // TF
      // const tf = Object.values(
      //   a.reduce((acc, item) => {
      //     acc[item] = ((acc[item] || 0) + 1) / wordLength;
      //     return acc;
      //   }, {})
      // );

      const tf = a.filter((d) => d == word).length / wordLength;

      //IDF
      const idf = Math.log(processed.length / numDocs);

      obj[word] = tf * idf;
    });
    return obj;
  });

  console.log(tfidf);
}
