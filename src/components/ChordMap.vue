<template>
  <!-- 不能去掉最外层的div，因为在生成html后最外层的div会消失，导致g6找不到 -->
  <div>
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
    updateChordMapData: function (scaleType) {
      this.graphData.edges = []
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
    }
  },
  watch: {
    musicTheorySongScale: function (newValue, oldValue) {
      this.updateChordMapData(newValue)
      this.graph.changeData(this.graphData)
    }
  },
  mounted () {
    this.graph = new G6.Graph({
      container: 'chord-map-g6',
      width: 1400,
      height: 400,
      modes: {
        default: ['drag-node'] // 允许拖拽画布、放缩画布、拖拽节点
      },
      layout: { // Object，可选，布局的方法及其配置项，默认为 random 布局。
        type: 'circular',
        radius: 140,
        preventOverlap: true // 防止节点重叠
      },
      defaultNode: {
        size: 67, // 节点大小
        shape: 'circle',
        // 节点样式配置
        style: {
          lineWidth: 0, // 节点描边粗细
          fill: '#61a7e9'
        },
        // 节点上的标签文本配置
        labelCfg: {
          position: 'bottom',
          offset: -45, // 默认的center偏高了
          // 节点上的标签文本样式配置
          style: {
            fill: 'white', // 节点标签文字颜色
            fontSize: 30
          }
        }
      },
      // 边在默认状态下的样式配置（style）和其他配置
      defaultEdge: {
        shape: 'line',
        // 边样式配置
        style: {
          lineWidth: 2,
          endArrow: true,
          stroke: 'grey' // 边描边颜色
        }
      },

      // 节点不同状态下的样式集合
      nodeStateStyles: {
        // 鼠标 hover 上节点，即 hover 状态为 true 时的样式
        hover: {
          fill: '#7fb4e6'
        }
      }
    })
    this.updateChordMapData('Major')
    // 改tonic节点的颜色
    this.graphData.nodes[0].style = { 'fill': '#126dc2' }

    // 鼠标进入节点
    this.graph.on('node:mouseenter', e => {
      const nodeItem = e.item // 获取鼠标进入的节点元素对象
      this.graph.setItemState(nodeItem, 'hover', true) // 设置当前节点的 hover 状态为 true
    })

    // 鼠标离开节点
    this.graph.on('node:mouseleave', e => {
      const nodeItem = e.item // 获取鼠标离开的节点元素对象
      this.graph.setItemState(nodeItem, 'hover', false) // 设置当前节点的 hover 状态为 false
    })

    this.graph.data(this.graphData)
    this.graph.render()
  }
}
</script>

<style>
#nothing {
  color: #126dc2
}
</style>
