function MusicTheory (iTonic, iScale) {
  // 唱名、数字音符 numberedNote 即简谱 1 2 3 4 5 6 7
  // 音名 noteName 即 C D E F G A B
  this.baseNoteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  this.pianoRoll = []
  this.majorIntervals = [2, 2, 1, 2, 2, 2, 1]
  this.minorIntervals = [2, 1, 2, 2, 1, 2, 2]
  this.majorChordNumbers = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°']
  this.minorChordNumbers = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII']
  this.currentScale = 'Major'
  this.currentTonic = 'C'
  this.currentNoteNames = []
  this.currentChords = []
  this.currentChordNames = []
  this.sevenLoopAdd = function (note, increment) {
    // 限制在1-7内
    let result = note + increment
    result = result % 7
    if (result === 0) result = 7
    return result
  }
  this.getNextInterval = function (numberedNote, scale) {
    // 获取当前音符距离下一个音符的半音数量
    if (scale === 'Major') {
      return this.majorIntervals[numberedNote - 1]
    } else {
      return this.minorIntervals[numberedNote - 1]
    }
  }
  this.initPianoRoll = function () {
    for (let i = 0; i < 12; ++i) {
      this.pianoRoll[i] = 0
    }
    let curBaseIndex = 0
    let curPianoRollIndex = 0
    while (curBaseIndex < this.baseNoteNames.length) {
      this.pianoRoll[curPianoRollIndex] = this.baseNoteNames[curBaseIndex]
      curPianoRollIndex += this.getNextInterval(curBaseIndex + 1, 'Major')
      curBaseIndex += 1
    }
    for (let i = 0; i < 12; ++i) {
      if (this.pianoRoll[i] === 0) { this.pianoRoll[i] = this.pianoRoll[i - 1] + '#' }
    }
  }
  this.initScale = function (tonic, scale) {
    this.currentTonic = tonic
    this.currentScale = scale
    let tonicSemitions = this.pianoRoll.indexOf(tonic)
    let curNoteNameIndex = 0
    let deltaSemitones = 0
    while (curNoteNameIndex < 7) {
      let targetPianoRollIndex = (tonicSemitions + deltaSemitones) % 12
      this.currentNoteNames[curNoteNameIndex] = this.pianoRoll[targetPianoRollIndex]
      deltaSemitones += this.getNextInterval(curNoteNameIndex + 1, scale)
      curNoteNameIndex += 1
    }
    // 初始化和弦
    for (let i = 0; i < 7; ++i) {
      this.currentChords[i] = this.getChordStructure(i + 1)
    }
  }
  this.getChordStructure = function (baseNumberedNote) {
    return [this.currentNoteNames[baseNumberedNote - 1],
      this.currentNoteNames[this.sevenLoopAdd(baseNumberedNote, 2) - 1],
      this.currentNoteNames[this.sevenLoopAdd(baseNumberedNote, 4) - 1]]
  }
  this.getChordName = function (baseNumberedNote) {
    let isUpper = function (letter) { return letter.toUpperCase() === letter }
    let tail = ''
    if (this.currentScale === 'Major') {
      if (isUpper(this.majorChordNumbers[baseNumberedNote - 1][0])) {
        tail = ''
      } else {
        tail = 'm'
      }
    } else {
      if (isUpper(this.minorChordNumbers[baseNumberedNote - 1][0])) {
        tail = ''
      } else {
        tail = 'm'
      }
    }
    return this.currentNoteNames[baseNumberedNote - 1] + tail
  }

  this.getChordNumber = function (baseNumberedNote) {
    if (this.currentScale === 'Major') {
      return this.majorChordNumbers[baseNumberedNote - 1]
    } else {
      return this.minorChordNumbers[baseNumberedNote - 1]
    }
  }

  this.initPianoRoll()
  this.initScale(iTonic, iScale)
}
export {
  MusicTheory
}
