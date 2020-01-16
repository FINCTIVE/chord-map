function MusicTheory (iTonicName, iScaleTypeName) {
  // 唱名、数字音符 numberedNote 即简谱 1 2 3 4 5 6 7
  // 音名 noteName 即 C D E F G A B
  // 目前仅支持大调、自然小调；不支持和声小调、自然小调
  // 和弦仅支持三和弦

  // 用对象模拟枚举
  this.ChordType = {
    Major: 0,
    Minor: 1,
    Diminished: 2,
    Augmented: 3
  }

  this.ScaleType = {
    Major: 0,
    Minor: 1
  }
  var that = this
  this.MusicTheoryToolkit = function () {
    // 储存3*12个半音对应的音名，相当于钢琴卷帘的两个八度范围
    // 为什么需要这么多？因为所有tonic占据的范围是前两组12个半音，由每个tonic增加的调内音符会占用到第三组12个半音
    // 这个数组对应的下标是当前音符距离第一个C的半音值
    this.pianoRoll = []
    // 当前位置到下一个音符的半音距离
    this.majorDeltaSemi = [2, 2, 1, 2, 2, 2, 1]
    this.minorDeltaSemi = [2, 1, 2, 2, 1, 2, 2]
    this.basicNoteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B']
    this.getNextDeltaSemi = function (numberedNote, scaleType) {
      // 获取当前音符距离下一个音符的半音数量
      if (scaleType === that.ScaleType.Major) {
        return this.majorDeltaSemi[numberedNote - 1]
      } else {
        return this.minorDeltaSemi[numberedNote - 1]
      }
    }
    this.getTonicSemitones = function (tonicNoteName) {
      // 返回最低(小)对应的半音数值
      return this.pianoRoll.indexOf(tonicNoteName)
    }
    this.majorChordMap = [
      [2, 3, 4, 5, 6, 7],
      [5, 3, 7],
      [2, 4, 6],
      [5, 1, 2, 3, 7],
      [6, 7, 1],
      [2, 5, 4],
      [5, 1]
    ]
    this.minorChordMap = [
      [2, 3, 4, 5, 6, 7],
      [5],
      [7, 6, 4, 2],
      [2, 5, 1],
      [6, 1],
      [7, 2, 4],
      [6, 3, 1, 5]
    ]
    this.getMajorChordMap = function (numberedNote) {
      return this.majorChordMap[numberedNote - 1]
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
      curPianoRollIndex += this.getNextDeltaSemi(curBaseIndex + 1, that.ChordType.Major)
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
  this.musicTheoryToolkit = new this.MusicTheoryToolkit()

  this.Note = function (semitones) {
    this.semitones = semitones
    this.getName = function () {
      return that.musicTheoryToolkit.pianoRoll[this.semitones]
    }
  }

  this.Chord = function (rootNote, thirdNote, fifthNote) {
    // 储存构成音符,目前仅支持三和弦
    // 储存Note类型变量
    this.structure = [rootNote, thirdNote, fifthNote]
    this.chordType = undefined

    this.updateChordType = function () {
      if (this.structure[1].semitones - this.structure[0].semitones === 4 &&
        this.structure[2].semitones - this.structure[1].semitones === 3) {
        // 大三和弦
        this.chordType = that.ChordType.Major
      } else if (this.structure[1].semitones - this.structure[0].semitones === 3 &&
        this.structure[2].semitones - this.structure[1].semitones === 4) {
        // 小三和弦
        this.chordType = that.ChordType.Minor
      } else if (this.structure[1].semitones - this.structure[0].semitones === 3 &&
        this.structure[2].semitones - this.structure[1].semitones === 3) {
        // 减三和弦
        this.chordType = that.ChordType.Diminished
      } else {
        // 增三和弦
        this.chordType = that.ChordType.Augmented
      }
    }

    this.getName = function () {
      var chordRootNote = this.structure[0].getName()
      var nameTail = ''
      if (this.chordType === that.ChordType.Major) {
        nameTail = ''
      } else if (this.chordType === that.ChordType.Minor) {
        nameTail = 'm'
      } else if (this.chordType === that.ChordType.Diminished) {
        nameTail = '°'
      } else {
        nameTail = '+'
      }
      return chordRootNote + nameTail
    }

    // 初始化
    this.updateChordType()
  }

  this.Scale = function (tonicName, scaleTypeName) {
    // 2*7个音符
    this.notes = []
    this.chords = []
    this.scaleType = undefined
    this.getScaleTypeName = function () {
      if (this.scaleType === that.ScaleType.Major) {
        return 'Major'
      } else {
        return 'Minor'
      }
    }
    this.getNote = function (numberedNote) {
      return this.notes[numberedNote - 1]
    }
    this.getChord = function (numberedNote) {
      return this.chords[numberedNote - 1]
    }
    this.getRomanNumerals = function (numberedNote) {
      if (this.scaleType === that.ScaleType.Major) { return ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'][numberedNote - 1] } else { return ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII'][numberedNote - 1] }
    }
    if (scaleTypeName === 'Major') {
      this.scaleType = that.ScaleType.Major
    } else {
      this.scaleType = that.ScaleType.Minor
    }

    // 初始化notes数组
    let curSemitones = that.musicTheoryToolkit.getTonicSemitones(tonicName)
    let curNoteIndex = 0
    while (curNoteIndex < 7) {
      // this.notes[curNoteIndex] = musicTheoryToolkit.pianoRoll[curSemitones]
      this.notes[curNoteIndex] = new that.Note(curSemitones)
      this.notes[curNoteIndex + 7] = new that.Note(curSemitones + 12)
      curSemitones += that.musicTheoryToolkit.getNextDeltaSemi(curNoteIndex + 1, this.scaleType)
      ++curNoteIndex
    }
    // 初始化chords数组
    for (let i = 0; i < 7; ++i) {
      this.chords[i] = new that.Chord(this.notes[i], this.notes[i + 2], this.notes[i + 4])
    }
  }
  this.songScale = new this.Scale(iTonicName, iScaleTypeName)
}

export {
  MusicTheory
}
