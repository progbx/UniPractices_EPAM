export function findLongestWord(phrase) {
    const words = phrase.split(' ');
    return _.maxBy(words, word => word.length);
}