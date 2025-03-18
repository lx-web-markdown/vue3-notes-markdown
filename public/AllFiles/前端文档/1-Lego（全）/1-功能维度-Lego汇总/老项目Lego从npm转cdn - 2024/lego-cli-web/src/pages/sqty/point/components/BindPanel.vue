<template>
  <el-drawer title="数据详情"
             :visible.sync="show"
             direction="rtl"
             size="800px"
             @closed="drawerClosed">
    <section class="bingding-panel">数据列表</section>
    <section class="table-box">
      <el-table :data="tableData.list"
                style="width: 100%;"
                :max-height="getMaxHeight">
        <el-table-column prop="xiangmumingcheng"
                         label="项目名称"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="zuoyeleixingxiaolei"
                         label="作业类型小类"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="xietiaoyuan"
                         label="SGM协调员"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="shigongzuoyerenshuli"
                         label="施工人数"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="zuoyejieshushijian"
                         label="作业结束时间"
                         show-overflow-tooltip></el-table-column>
        <el-table-column prop="id"
                         label="详情"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-button type="primary"
                       @click="clickHandle(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top:20px;"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="currentPage"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next"
                     :total="tableData.total"></el-pagination>
    </section>
  </el-drawer>
</template>

<script>
// eslint-disable-next-line import/extensions
import { apiPath } from '@/pages/sqty/dataList/path';

export default {
  name: '',
  model: {
    prop: 'dataList',
  },
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
    dataList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      show: this.drawer,
      // 绑定列表数据
      tableData: {},
      pageSize: 10,
      currentPage: 1,
    };
  },
  watch: {
    drawer(n) {
      this.show = n;
    },
    dataList(n) {
      this.getData();
    },
  },
  computed: {
    getMaxHeight() {
      return window.innerHeight - 300;
    },
  },
  methods: {
    getData() {
      const param = this.dataList;
      this.$http
        .get(
          `/${apiPath}/custom/works/listPointWorksInfo?x=${param.x}&y=${param.y}&factory=${param.factory}&unit=${param.unit}&unitZones=${param.unitZones}&isPaging=1&pageNum=${this.currentPage}&pageSize=${this.pageSize}`
        )
        .then((res) => {
          this.tableData = res.data.result;
        });
    },
    drawerClosed() {
      this.$emit('update:drawer', false);
    },
    // 分页方法
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    clickHandle(id) {
      window.open(`/space-shangqitongyongqiche/form?module=workflow&app=PuTongZuoYeXuKe&form=${id}`);
    }
  },
};
</script>

<style lang="scss" scoped>
.bingding-panel {
  padding: 0 20px;
}
.table-box {
  height: calc(100% - 100px);
  padding: 20px;
}
::v-deep .table-box .el-table th {
  color: #fff;
  background: #7da6ff;
}
::v-deep .table-box .el-table td,
::v-deep .table-box .el-table th {
  padding: 1px 0 0;
  border: 0;
}
::v-deep .table-box .el-table th {
  font-size: 16px;
}
::v-deep .table-box .el-table td {
  font-size: 14px;
  color: black;
}
::v-deep .table-box .el-table tr:nth-child(odd) {
  background-color: #f0f6fe;
}
::v-deep .table-box .el-table tr:hover > td {
  cursor: pointer;
  background-color: #fff6bd;
}
.btn-group {
  padding: 20px;
  text-align: right;
}
</style>
