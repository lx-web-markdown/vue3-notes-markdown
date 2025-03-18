<template>
  <div id="pointEdit"
       class="point-edit">
    <div ref="titleBox"
         v-show="titleShow"
         class="title-box"
         :style="{ left: titleLeft + 'px', top: titleTop + 'px' }">
      <h1>施工作业信息</h1>
      <div v-if="titleContent.length">
        <div class="bottom-line inline-block"
             v-for="(item, index) in titleContent"
             :key="index">
          <p>{{ item.type || item.TYPE }}：{{ item.count }}个</p>
        </div>
      </div>
      <div v-else
           style="margin-top: 10px">暂无作业信息</div>
    </div>
    <!-- 右键菜单 -->
    <div v-show="contextMenuShow"
         class="context-menu"
         :style="{
        left: contextMenuStyle.x + 'px',
        top: contextMenuStyle.y + 'px',
      }">
      <p @click="binding">查询</p>
    </div>
    <!-- 绑定抽屉 -->
    <bind-panel :drawer.sync="drawer"
                v-model="pointDetail"></bind-panel>
  </div>
</template>

<script>
import { SVG } from '@svgdotjs/svg.js';
import BindPanel from '@/pages/sqty/point/components/BindPanel.vue';
import { apiPath } from '../dataList/path';
import location from '@/assets/point/img/location.png';
import SGMJQJD from '@/assets/point/img/SGM-JQ-JD.jpg';
import WHJD from '@/assets/point/img/WH-JD.jpg';
import NSJD from '@/assets/point/img/NS-JD.jpg';
import DYJD from '@/assets/point/img/DY-JD.png';
import CADILLACGCJD from '@/assets/point/img/CADILLAC-GC-JD.jpg';
import FYJQJD from '@/assets/point/img/FY-JQ-JD.jpg';

export default {
  name: 'show',
  props: {
    pointId: {
      type: String,
      default() {
        return 'SGMJQJD';
      }
    },
  },
  components: {
    BindPanel,
  },
  data() {
    return {
      // svg根对象
      svgObj: null,
      // 当前新建的坐标点
      currentNode: null,
      // 全局图片宽度高度
      gloabalWidth: 0,
      gloabalHeight: 0,
      // 背景图对象数据
      bgImg: {
        width: 0,
        height: 0,
        transform: 0,
      },
      // 是否显示右键菜单
      contextMenuShow: false,
      // 右键菜单显示位置
      contextMenuStyle: {
        x: 0,
        y: 0,
      },
      // 加载坐标点
      pointArr: [],
      // 绑定抽屉
      drawer: false,
      // 鼠标悬浮提示消息
      titleLeft: 0,
      titleTop: 0,
      titleShow: false,
      titleContent: [],
      pointDetail: {},
    };
  },
  mounted() {
    const imgData = this.getImgData(this.pointId);
    this.getImgWidthAndHeight(imgData);
    window.onresize = this.debounce(() => {
      this.initUi();
    }, 300);
  },
  methods: {
    getImgData(pointId) {
      let data = '';
      switch (pointId) {
        case 'WHJD':
          data = WHJD;
          break;
        case 'NSJD':
          data = NSJD;
          break;
        case 'DYJD':
          data = DYJD;
          break;
        case 'CADILLACGCJD':
          data = CADILLACGCJD;
          break;
        case 'FYJQJD':
          data = FYJQJD;
          break;
        case 'SGMJQJD':
          data = SGMJQJD;
          break;
        default:
          break;
      }
      return data;
    },
    // 初始化
    initUi() {
      this.svgObj.remove();
      this.drawSvg();
    },
    // 防抖函数
    debounce(func, wait) {
      let timer;
      return () => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this);
        }, wait);
      };
    },
    // 获取图片真实宽高和宽高比
    getImgWidthAndHeight(imgUrl) {
      const img = new Image();
      img.src = imgUrl;
      if (img.complete) {
        this.bgImg = {
          width: img.width,
          height: img.height,
          transform: img.height / img.width,
        };
        this.drawSvg();
      } else {
        img.onload = () => {
          this.bgImg = {
            width: img.width,
            height: img.height,
            transform: img.height / img.width,
          };
          this.drawSvg();
        };
      }
    },
    // 绘制svg
    drawSvg() {
      const imgData = this.getImgData(this.pointId);
      // 绘制svg标签
      this.svgObj = SVG()
        .addTo('#pointEdit')
        .size('100%', this.bgImg.transform * window.innerWidth);
      // 绘制背景图片
      const bgImg = this.svgObj
        .image(imgData)
        .dx(0)
        .dy(0)
        .size('100%', this.bgImg.transform * window.innerWidth);
      bgImg.attr({
        preserveAspectRatio: 'xMinYMin meet',
      });
      // svg背景图加载完成事件
      this.gloabalWidth = this.svgObj.node.clientWidth;
      this.gloabalHeight = this.gloabalWidth * this.bgImg.transform;
      // 遍历渲染坐标点
      // 遍历渲染坐标点 listPoints
      this.$http.get(`/${apiPath}/custom/works/listPoints?pointId=${this.pointId}`).then((res) => {
        const hData = res.data.result.filter((r) => r.workInfo.length > 0);
        this.pointArr = hData;
        if (this.pointArr.length > 0) {
          this.pointArr.map((v) => {
            const temp = this.svgObj
              .image(location)
              .size(30, 30)
              .dx(this.gloabalWidth * v.x)
              .dy(this.gloabalHeight * v.y)
              .transform({
                translateX: -15,
                translateY: -15,
              })
              .attr({
                id: v.id,
                style: 'cursor:pointer;',
                param: JSON.stringify(v),
              });
            temp.on('mouseover', () => {
              this.titleLeft = temp.x();
              this.titleTop = temp.y() - 20;
              this.titleShow = true;
              this.titleContent = v.workInfo;
            });
            temp.on('mouseleave', () => {
              this.titleShow = false;
            });
            // 注册右键事件
            this.onContextMenu(temp);
          });
        }
      });
      bgImg.on('click', () => {
        // 关闭右键菜单
        if (this.contextMenuShow) {
          this.contextMenuShow = false;
        }
      });
    },
    // 打开上下文菜单
    onContextMenu(node) {
      node.click((e) => {
        e.preventDefault();
        this.currentNode = node;
        this.binding();
      });
    },
    // 获取对象下标
    getArrIndex(idx) {
      let result = 0;
      this.pointArr.map((v, i) => {
        if (v.index === idx) {
          result = i;
        }
      });
      return result;
    },
    // 绑定坐标点
    binding() {
      this.pointDetail = JSON.parse(this.currentNode.attr('param'));
      this.drawer = true;
      this.contextMenuShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.point-edit {
  width: 100%;
  height: 100%;
  position: relative;
}
.context-menu {
  position: absolute;
  background-color: white;
}
.context-menu p {
  padding: 10px 20px;
}
.context-menu p:hover {
  background-color: #cccccc;
  cursor: pointer;
}
.context-menu p:not(:last-child) {
  border-bottom: 1px solid #cccccc;
}
.title-box {
  width: 340px;
  position: absolute;
  z-index: 9;
  padding: 5px;
  background-color: white;
  border: 1px solid black;
  transform: translateX(-50%) translateY(-100%);
}
.title-box > h1 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}
.inline-block {
  display: inline-block;
  width: 160px;
  padding: 5px 0;
}
.bottom-line {
  border-bottom: 1px solid #ccc;
}
</style>
