<template>
  <!-- 不能去掉最外层的div，因为在生成html后最外层的div会消失，导致g6找不到 -->
  <div id="chord-map">
    <div id="chord-map-g6"></div>
  </div>
</template>

<script>
import G6 from '@antv/g6'
export default {
  name: 'ChordMap',
  props: ['musicTheory', 'musicTheorySongScale', 'list'],
  data () {
    return {
      graph: null,
      graphData: {
        nodes: [],
        edges: []
      }
    }
  },
  methods:
  {
    initMapData: function (scaleType) {
      this.graphData.edges = []
      this.graphData.nodes = []
      for (let i = 1; i <= 7; ++i) {
        this.graphData.nodes[i - 1] = {
          id: i.toString(),
          label: this.musicTheory.songScale.getRomanNumerals(i)
        }
        let map
        if (scaleType === 'Major') {
          map = this.musicTheory.musicTheoryToolkit.majorChordMap
        } else {
          map = this.musicTheory.musicTheoryToolkit.minorChordMap
        }
        for (let j = 0; j < map[i - 1].length; ++j) {
          this.graphData.edges.push({
            target: map[i - 1][j].toString(),
            source: i.toString()
          })
        }
      }
    },
    updateListStyle: function () {
      // 以下操作都是对已经渲染好的节点进行的，且都是对样式进行修改(状态)
      // 清空节点设置
      const selectedChordNodes = this.graph.findAllByState('node', 'selectedChord')
      selectedChordNodes.forEach(element => {
        this.graph.setItemState(element, 'selectedChord', false)
      })
      const lastSelectedChordNodes = this.graph.findAllByState('node', 'lastSelectedChord')
      lastSelectedChordNodes.forEach(element => {
        this.graph.setItemState(element, 'lastSelectedChord', false)
      })
      // 设置每一个选中的节点
      this.list.forEach(element => {
        const node = this.graph.findById(element.chordNumber.toString())
        this.graph.setItemState(node, 'selectedChord', true)
      })
      // 最后一个的节点的样式
      const lastNode = this.graph.findById(this.list[this.list.length - 1].chordNumber)
      this.graph.setItemState(lastNode, 'lastSelectedChord', true)

      // 清空边样式
      const selectedChordEdges = this.graph.findAllByState('edge', 'selectedChord')
      selectedChordEdges.forEach(element => {
        this.graph.setItemState(element, 'selectedChord', false)
      })
      // 高亮有连接的边
      const allEdges = this.graph.getEdges()
      for (let i = 2; i <= this.list.length; ++i) {
        const preNode = this.graph.findById((this.list[i - 1 - 1].chordNumber).toString())
        const afterNode = this.graph.findById((this.list[i - 1].chordNumber).toString())
        allEdges.forEach(edge => {
          if (edge.getSource() === preNode && edge.getTarget() === afterNode) {
            edge.toFront()
            this.graph.setItemState(edge, 'selectedChord', true)
          }
        })
      }
    },
    offcetNodePos () {
      // g6的环形布局默认在x轴开始排列（tonic的位置是正右方）
      // 这里旋转所有节点，让tonic移动到默认V的位置
      const Cfgs = []
      for (let i = 1; i <= 7; ++i) {
        const node = this.graph.findById(i.toString())
        Cfgs.push({ x: node._cfg.model.x, y: node._cfg.model.y })
      }
      for (let i = 1; i <= 7; ++i) {
        const node = this.graph.findById(i.toString())
        let cfgIndex = i + 4
        if (cfgIndex > 7) cfgIndex -= 7
        cfgIndex -= 1
        node.updatePosition(Cfgs[cfgIndex])
      }
      this.graph.refresh() // 刷新图像
    }
  },
  watch: {
    musicTheorySongScale: function (newValue, oldValue) {
      this.initMapData(newValue)
      this.graph.changeData(this.graphData)
      this.offcetNodePos()
    },
    list: function () {
      this.updateListStyle()
    }
  },
  mounted () {
    // 配置图
    this.graph = new G6.Graph({
      container: 'chord-map-g6',
      // renderer: 'svg',
      width: 800,
      height: 350,
      modes: {
        default: ['drag-node']
      },
      layout: {
        type: 'circular',
        radius: 140,
        preventOverlap: true
      },
      defaultNode: {
        size: 67,
        shape: 'circle',
        style: {
          lineWidth: 0,
          fill: '#61a7e9'
        },
        labelCfg: {
          position: 'bottom',
          offset: -45, // 默认有偏移，这样设置可以居中（svg渲染模式下无偏移)
          style: {
            fill: 'white',
            fontSize: 30
          }
        }
      },
      defaultEdge: {
        shape: 'line',
        style: {
          lineWidth: 2,
          endArrow: {
            path: 'M 6,0 L -6,-6 L -3,0 L -6,6 Z',
            d: 5
          },
          stroke: 'grey'
        }
      },

      nodeStateStyles: {
        hover: {
          lineWidth: 0,
          fill: '#a4a4a4'
        },
        selectedChord: {
          lineWidth: 0,
          fill: '#ffc046'
        },
        lastSelectedChord: {
          lineWidth: 0,
          fill: '#e09300'
        }
      },
      edgeStateStyles: {
        selectedChord: {
          stroke: '#ffc046'
        }
      }
    })
    // 设置状态
    this.graph.on('node:mouseenter', e => {
      const nodeItem = e.item
      this.graph.setItemState(nodeItem, 'hover', true)
    })
    this.graph.on('node:mouseleave', e => {
      const nodeItem = e.item
      this.graph.setItemState(nodeItem, 'hover', false)
    })

    // 初始化节点数据
    this.initMapData('Major')
    // 给tonic换一个颜色
    this.graphData.nodes[0].style = { 'fill': '#126dc2' }

    this.graph.data(this.graphData)
    this.graph.render()

    this.offcetNodePos()
    this.updateListStyle()
  }
}
</script>

<style scoped>
#chord-map {
  display: flex;
  justify-content: center;
}
</style>
