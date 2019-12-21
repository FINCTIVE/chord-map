// 唱名、数字音符 numberedNote 即简谱 1 2 3 4 5 6 7
// 音名 noteName 即 C D E F G A B
// 目前仅支持大调、自然小调；不支持和声小调、自然小调
// 和弦仅支持三和弦

// 用对象模拟枚举
var ChordType = {
  Major: 0,
  Minor: 1,
  Diminished: 2,
  Augmented: 3
}

var ScaleType = {
  Major: 0,
  Minor: 1
}

function MusicTheoryToolkit () {
  // 储存3*12个半音对应的音名，相当于钢琴卷帘的两个八度范围
  // 这个数组对应的下标是当前音符距离第一个C的半音值
  this.pianoRoll = []
  // 当前位置到下一个音符的半音距离
  this.majorDeltaSemi = [2, 2, 1, 2, 2, 2, 1]
  this.minorDeltaSemi = [2, 1, 2, 2, 1, 2, 2]
  this.basicNoteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
  this.getNextDeltaSemi = function (numberedNote, scaleType) {
    // 获取当前音符距离下一个音符的半音数量
    if (scaleType === ScaleType.Major) {
      return this.majorDeltaSemi[numberedNote - 1]
    } else {
      return this.minorDeltaSemi[numberedNote - 1]
    }
  }
  this.getTonicSemitones = function (tonicNoteName) {
    // 返回最低(小)对应的半音数值
    return this.pianoRoll.indexOf(tonicNoteName)
  }

  // 初始化
  // 填充pianoRoll 2*12个半音
  for (let i = 0; i < 12; ++i) {
    this.pianoRoll[i] = 0
    this.pianoRoll[i + 12] = 0
  }
  let curBaseIndex = 0 // 当前计算音符对应下标
  let curPianoRollIndex = 0
  while (curBaseIndex < this.basicNoteNames.length) {
    this.pianoRoll[curPianoRollIndex] = this.basicNoteNames[curBaseIndex]
    this.pianoRoll[curPianoRollIndex + 12] = this.basicNoteNames[curBaseIndex]
    this.pianoRoll[curPianoRollIndex + 12 * 2] = this.basicNoteNames[curBaseIndex]
    curPianoRollIndex += this.getNextDeltaSemi(curBaseIndex + 1, ChordType.Major)
    curBaseIndex += 1
  }
  for (let i = 0; i < 12; ++i) {
    if (this.pianoRoll[i] === 0) {
      this.pianoRoll[i] = this.pianoRoll[i + 1] + '♭'
      this.pianoRoll[i + 12] = this.pianoRoll[i + 1] + '♭'
      this.pianoRoll[i + 12 * 2] = this.pianoRoll[i + 1] + '♭'
    }
  }
}

function Note (semitones) {
  this.semitones = semitones
  this.getName = function () {
    return musicTheoryToolkit.pianoRoll[this.semitones]
  }
}

function Chord (rootNote, thirdNote, fifthNote) {
  // 储存构成音符,目前仅支持三和弦
  // 储存Note类型变量
  this.structure = [rootNote, thirdNote, fifthNote]
  this.chordType = undefined

  this.updateChordType = function () {
    if (this.structure[1].semitones - this.structure[0].semitones === 4 &&
      this.structure[2].semitones - this.structure[1].semitones === 3) {
      // 大三和弦
      this.chordType = ChordType.Major
    } else if (this.structure[1].semitones - this.structure[0].semitones === 3 &&
      this.structure[2].semitones - this.structure[1].semitones === 4) {
      // 小三和弦
      this.chordType = ChordType.Minor
    } else if (this.structure[1].semitones - this.structure[0].semitones === 3 &&
      this.structure[2].semitones - this.structure[1].semitones === 3) {
      // 减三和弦
      this.chordType = ChordType.Diminished
    } else {
      // 增三和弦
      this.chordType = ChordType.Augmented
    }
  }

  this.getName = function () {
    var chordRootNote = this.structure[0].getName()
    var nameTail = ''
    if (this.chordType === ChordType.Major) {
      nameTail = ''
    } else if (this.chordType === ChordType.Minor) {
      nameTail = 'm'
    } else if (this.chordType === ChordType.Diminished) {
      nameTail = '°'
    } else {
      nameTail = '+'
    }
    return chordRootNote + nameTail
  }

  // 初始化
  this.updateChordType()
}

function Scale (tonicName, scaleTypeName) {
  // 2*7个音符
  this.notes = []
  this.chords = []
  this.scaleType = undefined
  this.getNote = function (numberedNote) {
    return this.notes[numberedNote - 1]
  }
  this.getChord = function (numberedNote) {
    return this.chords[numberedNote - 1]
  }
  this.getRomanNumerals = function (numberedNote) {
    if (this.scaleType === ScaleType.Major) { return ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'][numberedNote - 1] } else { return ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'][numberedNote - 1] }
  }
  if (scaleTypeName === 'Major') {
    this.scaleType = ScaleType.Major
  } else {
    this.scaleType = ScaleType.Minor
  }

  // 初始化notes数组
  let curSemitones = musicTheoryToolkit.getTonicSemitones(tonicName)
  let curNoteIndex = 0
  while (curNoteIndex < 7) {
    // this.notes[curNoteIndex] = musicTheoryToolkit.pianoRoll[curSemitones]
    this.notes[curNoteIndex] = new Note(curSemitones)
    this.notes[curNoteIndex + 7] = new Note(curSemitones + 12)
    curSemitones += musicTheoryToolkit.getNextDeltaSemi(curNoteIndex + 1, this.scaleType)
    ++curNoteIndex
  }
  // 初始化chords数组
  for (let i = 0; i < 7; ++i) {
    this.chords[i] = new Chord(this.notes[i], this.notes[i + 2], this.notes[i + 4])
  }
}

// 全局变量
var musicTheoryToolkit = new MusicTheoryToolkit()

// 测试代码
let iTonicName = 'F'
let iScaleTypeName = 'Minor'
var testScale = new Scale(iTonicName, iScaleTypeName)
console.log('tonic:', iTonicName)
console.log('scaleType:', iScaleTypeName)
// for (let i = 0; i < testScale.notes.length; ++i) {
//   console.log('notes:', testScale.notes[i].getName())
// }
for (let i = 0; i < testScale.chords.length; ++i) {
  console.log('----------')
  console.log('chord name:', testScale.chords[i].getName())
  console.log('chord roman numeral:', testScale.getRomanNumerals(i + 1))
  console.log('chord structure')
  console.log('---', testScale.chords[i].structure[0].getName())
  console.log('---', testScale.chords[i].structure[1].getName())
  console.log('---', testScale.chords[i].structure[2].getName())
}
