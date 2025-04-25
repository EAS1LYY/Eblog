<template>
    <div class="waterfall">
    <a-image-preview-group>    
      <!-- 循环渲染每一列 -->
      <div class="waterfall-column" v-for="(column, index) in columns" :key="index">
        <!-- 循环渲染每一项 -->
        <div class="waterfall-item" v-for="(item, i) in column" :key="i">
            
                <a-image
              width="100%"
              :src="`https://www.toolr.cn/pictureGroup/`+item.src" :title="item.alt"
          />
            

        </div>
      </div>
    </a-image-preview-group>
    </div>
  </template>
  
  <script>
  export default {
    name: 'waterFall',
    props: {
      items: {
        type: Array,
        required: true
      },
      columnWidth: {
        type: Number,
        default: 200
      },
      gutter: {
        type: Number,
        default: 10
      }
    },
    data() {
      return {
        columns: [] // 存储每一列的数据
      }
    },
    watch: {
      items: {
        handler: function (newVal, oldVal) {
          this.initColumns() // 监听数据变化，重新计算每一列的数据
        },
        deep: true,
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initColumns() // 初始化计算每一列的数据
        window.addEventListener('resize', this.initColumns) // 监听窗口大小变化，重新计算每一列的数据
      })
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.initColumns) // 组件销毁时移除监听
    },
    methods: {
      initColumns() {
         try{
           const containerWidth = this.$el.clientWidth // 获取容器宽度
           let columnsCount = Math.floor(containerWidth / (this.columnWidth + this.gutter)) // 计算列数
           columnsCount=columnsCount==0?1:columnsCount;
           const columns = new Array(columnsCount).fill().map(() => []); // 初始化每一列的数据
           this.items.forEach((item, index) => {
             const columnIndex = index % columnsCount; // 计算当前项应该放在哪一列
             columns[columnIndex].push(item) // 将当前项放入对应的列中
           })
           this.columns = columns; // 更新每一列的数据
         }catch (e) {
           console.log(e)
         }
  
      }
    }
  }
  </script>
  
  <style scoped >
  .waterfall {
    display: flex;
    flex-wrap: wrap;
    margin: 15px;
  }
  
  .waterfall-column {
    flex: 1;
    margin: 5px;
  }
  
  .waterfall-item {
    margin-bottom: 5px;
    overflow: hidden;
    position: relative;
  }
  .waterfall-item .text{
    position: absolute;
    z-index: 9999;
    top: 0px;
    right: 0px;
    left: 0px;
    text-align: center;
    background-color: rgba(30, 29, 29, 0.5); /* 设置背景颜色为白色，透明度为0.5 */
    color: aliceblue;
    transition: 0.3s;
    transform: translateY(-100px);
  }
  .waterfall-item .img{
    transition: 0.8s;
  }
  .waterfall-item .img:hover {
    transform: scale(1.2);
  }
  .waterfall-item:hover .text{
    transform: translateY(0px);
  }
  </style>