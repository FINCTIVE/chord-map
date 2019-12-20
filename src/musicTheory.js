var noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

function noteAdd (note, increment) {
  let result = note + increment
  if (result > 7) result = result % 7
  return result
}
function getNextInterval (numberedNote, scale) {
  if (scale === 'Major') {
    let intervals = [2, 2, 1, 2, 2, 2, 1]
    return intervals[numberedNote - 1]
  } else {
    let intervals = [2, 1, 2, 2, 1, 2, 2]
    return intervals[numberedNote - 1]
  }
}
function getNoteName (numberedNote, tonic, scale) {
  console.log(numberedNote, tonic, scale)
  let deltaSemitones = 0 // 从1到当前音符的半音数量
  for (let i = 1; i <= numberedNote - 1; ++i) {
    deltaSemitones += getNextInterval(i, scale)
  }
  let tonicIndex = noteNames.indexOf(tonic)
  let curSemitones = 0
  //   let tempNote = 0
  //   while (curSemitones < deltaSemitones) {
  //     tempNote += 1
  //     curSemitones += getNextInterval(tempNote, 'Mayjor')
  //   }
  //   if (curSemitones !== deltaSemitones) {
  //     tempNote -= 1
  //     return noteNames[noteAdd(tonicIndex, tempNote - 1)] + '#'
  //   } else {
  //     return noteNames[noteAdd(tonicIndex, tempNote - 1)]
  //   }
}
function getChordStrcture (numberedNote, tonic, scale) {
  let chordStructure = [numberedNote, noteAdd(numberedNote, 2), noteAdd(numberedNote, 4)]
  return chordStructure.map(x => getNoteName(x, tonic, scale))
}

console.log(getChordStrcture(1, 'C', 'Major'))
