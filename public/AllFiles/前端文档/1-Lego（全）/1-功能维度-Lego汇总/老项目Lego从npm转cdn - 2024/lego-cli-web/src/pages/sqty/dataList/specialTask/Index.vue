<template>
    <!-- 专项任务报表 -->
    <div class="specialTask">
        <div class="mian">
            <div class="title">专项任务报表</div>
            <div class="container">
                <div class="floorFirst">
                    <div class="floorLeft">
                        <div class="risk">
                            <header-title headerTitle="专项任务执行情况" />
                            <div class="selectQy">
                                <div class="selectMain">
                                    <el-cascader
                                        v-model="optionsZxValue"
                                        :options="optionsZx"
                                        ref="cascaderHandleZx"
                                        @change="ZxOptionChange"
                                        :props="{ checkStrictly: true }"
                                        clearable
                                    ></el-cascader>
                                </div>
                                <div class="dateTime">
                                    <el-date-picker
                                        v-model="valueZx"
                                        type="daterange"
                                        align="right"
                                        unlink-panels
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd"
                                        @change="ZxOptionChange"
                                        :picker-options="pickerOptions"
                                    ></el-date-picker>
                                </div>
                            </div>
                            <div class="tableQy">
                                <el-table :data="ZxtableData" border style="width: 100%">
                                    <el-table-column prop="rwName" label="专项任务"></el-table-column>
                                    <el-table-column prop="totalNum" label="总任务数"></el-table-column>
                                    <el-table-column prop="guanbishu" label="关闭数"></el-table-column>
                                    <el-table-column prop="guanbilv" label="关闭率"></el-table-column>
                                    <el-table-column prop="overNum" label="超期数"></el-table-column>
                                    <el-table-column prop="overPer" label="超期率"></el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="floorTwo">
                    <bar-echarts />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderTitle from '../Title.vue';
import BarEcharts from './BarEcharts.vue';
import { urlPath, apiPath } from '../path';

export default {
  name: 'specialTask',
  components: {
    HeaderTitle,
    BarEcharts,
  },
  props: {},
  data() {
    return {
      optionsZx: [], // 专项任务超期率四级联动的下拉框的值
      optionsZxValue: '', // 专项任务超期率四级联动的绑定值
      optionsZxParams: {}, // 专项任务超期率四级联动数组过滤传给后端调数据的参数值
      ZxtableData: [], // 专项任务超期率数据的展示
      valueZx: [], // 专项任务超期率开始时间和结束时间
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一年',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
    };
  },
  created() {},
  mounted() {
    this.FoueSelectOptions();
    this.ZxOptionChange(); // 专项任务超期率
  },
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    FoueSelectOptions() {
      this.$http.get(`/${apiPath}/statistics/listAll`).then((res) => {
        if (res.data.status === 200) {
          this.optionsZx = res.data.result.options;
        }
      });
    },
    // 专项任务超期率
    ZxOptionChange() {
      this.optionsZxParams.base = '';
      this.optionsZxParams.department = '';
      this.optionsZxParams.factory = '';
      this.optionsZxParams.workshop = '';
      if (this.optionsZxValue.length === 1) {
        this.optionsZxParams.base = this.optionsZxValue[0];
      } else if (this.optionsZxValue.length === 2) {
        this.optionsZxParams.base = this.optionsZxValue[0];
        this.optionsZxParams.department = this.optionsZxValue[1];
      } else if (this.optionsZxValue.length === 3) {
        this.optionsZxParams.base = this.optionsZxValue[0];
        this.optionsZxParams.department = this.optionsZxValue[1];
        this.optionsZxParams.factory = this.optionsZxValue[2];
      } else if (this.optionsZxValue.length === 4) {
        this.optionsZxParams.base = this.optionsZxValue[0];
        this.optionsZxParams.department = this.optionsZxValue[1];
        this.optionsZxParams.factory = this.optionsZxValue[2];
        this.optionsZxParams.workshop = this.optionsZxValue[3];
      }
      if (this.valueZx === null) {
        this.optionsZxParams.start = '';
        this.optionsZxParams.end = '';
      } else {
        this.optionsZxParams.start = this.valueZx[0];
        this.optionsZxParams.end = this.valueZx[1];
      }
      this.ZxtableData = [];
      this.$http
        .get(`/${apiPath}/statistics/specialTask/overdueRate`, {
          params: this.optionsZxParams,
        })
        .then((res) => {
          if (res.data.status === 200) {
            const resData = res.data.result;

            this.ZxtableData = [
              {
                rwName: '专项培训',
                overNum: `${resData.zxpxOverdueCount}`,
                totalNum: `${resData.zxpxTotal}`,
                overPer: `${resData.zxpxOverdueRate}%`,
                guanbishu: `${resData.zxpx_close}`,
                guanbilv: `${resData.zxpx_close_rate}`,
              },
              {
                rwName: '举一反三排查',
                overNum: `${resData.jsfsOverdueCount}`,
                totalNum: `${resData.jsfsTotal}`,
                overPer: `${resData.jsfsOverdueRate}%`,
                guanbishu: `${resData.jyfs_close}`,
                guanbilv: `${resData.jyfs_close_rate}`,
              },
              {
                rwName: '专项安全检查',
                overNum: `${resData.zxjcOverdueCount}`,
                totalNum: `${resData.zxjcTotal}`,
                overPer: `${resData.zxjcOverdueRate}%`,
                guanbishu: `${resData.zxjc_close}`,
                guanbilv: `${resData.zxjc_close_rate}`,
              },
            ];
          }
        });
    },
  },
  filter: {},
  computed: {},
  watch: {
    optionsZxValue() {
      if (this.$refs.cascaderHandleZx) {
        this.$refs.cascaderHandleZx.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.specialTask {
  width: 100%;
  height: 100%;
  // overflow: hidden;
  .mian {
    width: 97%;
    height: 100%;
    margin: 0 auto;
    .title {
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 18px;
    }
    .container {
      width: 100%;
      height: 660px;
      .floorFirst {
        width: 100%;
        height: 310px;
        display: flex;
        justify-content: space-between;
        .floorLeft {
          width: 100%;
          overflow: hidden;
          .risk {
            height: 300px;
            margin-bottom: 5px;
          }
          .peopleChat {
            height: 49%;
          }
        }
        .selectQy,
        .selectYhxg {
          width: 570px;
          height: 50px;
          position: relative;
          top: 4px;
          display: flex;
          justify-content: space-between;
        }
        .tableQy {
          width: 100%;
          height: calc(100% - 50px);
        }
        .tableYhxg {
          width: 98%;
          height: calc(100% - 90px);
        }
      }
      .floorTwo {
        width: 100%;
        height: 400px;
        // overflow: hidden;
      }
    }
  }
}
</style>
