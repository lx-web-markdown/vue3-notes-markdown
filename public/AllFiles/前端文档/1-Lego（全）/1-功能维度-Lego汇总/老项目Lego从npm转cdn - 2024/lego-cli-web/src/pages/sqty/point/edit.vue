<template>
  <div id="pointEdit" class="point-edit">
    <!-- 右键菜单 -->
    <div
      v-show="contextMenuShow"
      class="context-menu"
      :style="{
        left: contextMenuStyle.x + 'px',
        top: contextMenuStyle.y + 'px',
      }"
    >
      <p @click="deleting">删除</p>
    </div>
    <el-dialog
      width="80%"
      title="点位信息"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <el-form label-width="140px" :inline="true">
        <el-form-item label="所在物理厂区">
          <el-select
            @change="changquChange"
            v-model="changquModel"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="(item, idx) in changquOptions"
              :key="idx"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在物理单体">
          <el-select
            @change="dantiChange"
            v-model="dantiModel"
            placeholder="请选择"
            size="mini"
          >
            <el-option
              v-for="(item, idx) in dantiOptions"
              :key="idx"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在物理单体分区">
          <el-select v-model="fenquModel" placeholder="请选择" size="mini">
            <el-option
              v-for="(item, idx) in fenquOptions"
              :key="idx"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCancle">取 消</el-button>
        <el-button type="primary" @click="dialogOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { SVG } from '@svgdotjs/svg.js';
import { apiPath } from '../dataList/path';
import SGMJQJD from '@/assets/point/img/SGM-JQ-JD.jpg';
import WHJD from '@/assets/point/img/WH-JD.jpg';
import NSJD from '@/assets/point/img/NS-JD.jpg';
import DYJD from '@/assets/point/img/DY-JD.png';
import CADILLACGCJD from '@/assets/point/img/CADILLAC-GC-JD.jpg';
import FYJQJD from '@/assets/point/img/FY-JQ-JD.jpg';

export default {
  name: 'edit',
  props: {
    pointId: {
      type: String,
      default() {
        return 'SGMJQJD';
      }
    },
  },
  data() {
    return {
      // svg根对象
      svgObj: null,
      // 当前新建的坐标点
      currentNode: null,
      // 当前点索引
      currentIndex: 0,
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
      // 点位信息弹出框
      dialogVisible: false,
      // 厂区model
      changquModel: '',
      changquOptions: [],
      // 物理单体
      dantiModel: '',
      dantiOptions: [],
      // 单体分区
      fenquModel: '',
      fenquOptions: [],
    };
  },
  created() {
    this.$http.get(`/${apiPath}/custom/works/listFactoryies?pointId=${this.pointId}`).then((res) => {
      this.changquOptions = res.data.result;
    });
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
        default:
          data = SGMJQJD;
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
      this.$http.get(`/${apiPath}/custom/works/listPoints?pointId=${this.pointId}`).then((res) => {
        this.pointArr = res.data.result;
        if (this.pointArr.length > 0) {
          this.pointArr.map((v) => {
            const temp = this.svgObj
              .image(require('@/assets/point/img/location.png'))
              .size(30, 30)
              .dx(this.gloabalWidth * v.x)
              .dy(this.gloabalHeight * v.y)
              .transform({
                translateX: -15,
                translateY: -15,
              })
              .attr({
                id: v.id,
              });
            // 注册右键事件
            this.onContextMenu(temp);
          });
        }
      });

      bgImg.on('click', (e) => {
        // 清除上次选择的点位信息
        this.selectModel = '';
        // 关闭右键菜单
        if (this.contextMenuShow) {
          this.contextMenuShow = false;
          return;
        }
        this.currentIndex = this.pointArr[this.pointArr.length - 1]
          ? this.pointArr[this.pointArr.length - 1].index + 1
          : 0;
        this.currentNode = this.svgObj
          .image(require('@/assets/point/img/location.png'))
          .size(30, 30)
          .dx(e.x)
          .dy(e.pageY)
          .transform({
            translateX: -15,
            translateY: -15,
          })
          .attr({ idx: this.currentIndex });
        this.dialogVisible = true;
        // 注册右键事件
        this.onContextMenu(this.currentNode);
      });
    },
    // 打开上下文菜单
    onContextMenu(node) {
      node.on('contextmenu', (e) => {
        e.preventDefault();
        this.contextMenuStyle = {
          x: e.x + 10,
          y: e.pageY + 10,
        };
        this.contextMenuShow = true;
        this.currentNode = node;
      });
    },
    // 移动坐标点
    movePoint(node) {
      let isDown = false;
      node.on('mousedown', (e) => {
        if (e.button === 2) return;
        // 关闭右键菜单
        this.contextMenuShow = false;
        isDown = true;
      });
      this.svgObj.on('mousemove', (e) => {
        if (isDown) {
          node.x(e.x).y(e.y);
        }
      });
      node.on('mouseup', () => {
        isDown = false;
        const idx = this.getArrIndex(node.attr('idx'));
        this.$set(
          this.pointArr,
          idx,
          Object.assign(this.pointArr[idx], {
            transformX: node.x() / this.gloabalWidth,
            transformY: node.y() / this.gloabalHeight,
          })
        );
        localStorage.setItem('pointArr', JSON.stringify(this.pointArr));
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
      this.drawer = true;
      this.contextMenuShow = false;
    },
    // 删除坐标点
    deleting() {
      const id = this.currentNode.attr('id');
      const idx = this.getArrIndex(id);
      this.$http
        .delete(`/${apiPath}/custom/works/removePoint?id=${id}`)
        .then((res) => {
          this.$message({
            type: 'success',
            message: '删除成功。',
          });
          this.pointArr.splice(idx, 1);
          this.currentNode.remove();
          this.contextMenuShow = false;
          localStorage.setItem('pointArr', JSON.stringify(this.pointArr));
        });
    },
    // 清空所有点
    deleteAll() {
      this.svgObj.remove();
      this.pointArr = [];
      localStorage.removeItem('pointArr');
      this.drawSvg();
      this.contextMenuShow = false;
    },
    // 对话框取消事件
    dialogCancle() {
      this.currentNode.remove();
      this.dialogVisible = false;
    },
    // 对话框确认事件
    dialogOk() {
      this.pointArr.push({
        index: this.currentIndex,
        transformX: this.currentNode.x() / this.gloabalWidth,
        transformY: this.currentNode.y() / this.gloabalHeight,
      });
      localStorage.setItem('pointArr', JSON.stringify(this.pointArr));
      const paramX = `${this.currentNode.x() / this.gloabalWidth}`;
      const paramY = `${this.currentNode.y() / this.gloabalHeight}`;
      const paramFactory = `${this.changquModel}`;
      const paramUnit = `${this.dantiModel}`;
      const paramUnitZones = `${this.fenquModel}`;
      this.$http
        .post(
          `/${apiPath}/custom/works/savePoint`,
          {
            x: paramX,
            y: paramY,
            factory: paramFactory,
            unit: paramUnit,
            unitZones: paramUnitZones
          }
        )
        .then((res) => {
          this.$message({
            type: 'success',
            message: '保存成功。',
          });
          this.currentNode.attr({ id: res.data.result.id });
          this.dialogVisible = false;
          this.changquModel = '';
          this.dantiModel = '';
          this.fenquModel = '';
          this.dantiOptions = [];
          this.fenquOptions = [];
        });
    },
    // 厂区change事件
    changquChange(val) {
      this.dantiModel = '';
      this.dantiOptions = [];
      this.fenquModel = '';
      this.fenquOptions = [];
      this.$http
        .get(`/${apiPath}/custom/works/listUnits?factory=${val}`)
        .then((res) => {
          this.dantiOptions = res.data.result;
        });
    },
    // 厂区change事件
    dantiChange(val) {
      this.fenquModel = '';
      this.fenquOptions = [];
      this.$http
        .get(
          `/${apiPath}/custom/works/listUnitZones?factory=${this.changquModel}&unit=${val}`
        )
        .then((res) => {
          this.fenquOptions = res.data.result;
        });
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
</style>
