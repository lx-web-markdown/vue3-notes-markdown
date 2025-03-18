<template>
    <div class="Main">
        <div class="leftTree">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
            <!-- :default-expanded-keys="isOpen" -->
            <el-tree
                :data="data"
                class="filter-tree"
                :props="defaultProps"
                node-key="uname"
                :data-title="id"
                :default-expanded-keys="isOpen"
                @node-click="handleNodeClick"
                :filter-node-method="filterNode"
                ref="tree"
            ></el-tree>
        </div>
        <div class="rightCalendar">
            <h1>{{ uname }}</h1>
            <new-calendar :uname="uname" />
        </div>
    </div>
</template>

<script>
import NewCalendar from './NewCalendar.vue';
import { urlPath, apiPath } from '../dataList/path';

export default {
  name: 'Main',
  props: {},
  components: {
    NewCalendar,
  },
  data() {
    return {
      id: [],
      filterText: '',
      isOpen: [],
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label',
        id: 'uname',
      },
      data1: [],
      uname: '',
      name: null,
    };
  },
  created() {
    this.getTreeData();
    this.getUerInfo();
  },
  methods: {
    handleNodeClick(data) {
      if (data.uname) {
        this.uname = data.uname;
      }
    },
    getUerInfo() {
      this.$http.get('/api2/user/info').then((res) => {
        if (res.status === 200 && res.data.status === 200) {
          this.uname = res.data.result['extra:xingming'];
        }
        this.name = this.recursion(this.data1, this.uname);
        if (!this.name) {
          this.data1[0].children[0].children.unshift({
            label: this.uname,
            uname: this.uname,
          });
          console.log(this.data, '72');
        }
        this.data = this.data1;
      });
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getTreeData() {
      this.data1 = [];
      this.$http.get(`/${apiPath}/custom/calendar/listStaff`).then((res) => {
        if (res.data.status === 200) {
          this.data1 = res.data.result.data;
        }
        // this.isOpen.push(this.data[0].children[0].children[0].uname);
        // this.uname = this.data[0].children[0].children[0].uname;
      });
    },
    recursion(data, current) {
      let result = null;
      if (!data) {
        return;
      }
      for (const i in data) {
        if (result !== null) {
          break;
        }
        const item = data[i];
        if (item.label === current) {
          result = item;
          break;
        } else if (item.children && item.children.length > 0) {
          // console.log(item.children);
          result = this.recursion(item.children, current);
        }
      }
      return result;
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.Main {
  width: 100vw;
  height: 100vh;
  display: flex;
  .leftTree {
    width: 250px;
    height: 100%;
    ::v-deep .el-tree-node__content {
      height: 45px;
      line-height: 45px;
    }
    ::v-deep .el-tree {
      height: 80%;
      overflow-y: auto;
    }
  }
  .rightCalendar {
    width: calc(100% - 250px);
    h1 {
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #f9f9f9;
      color: #666;
    }
  }
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }

  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    border-radius: 10px;
    background-color: rgba(240, 240, 240, 0.5);
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    box-shadow: inset 0 0 0px rgba(240, 240, 240, 0.5);
    background-color: rgba(240, 240, 240, 0.5);
  }
}
</style>
