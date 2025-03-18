<template>
  <div class="barEcharts">
    <div class="navTitle">
      <header-title headerTitle="专项任务超期率" />
      <div class="navSelect">
        <div class="selectMain">
          <el-cascader v-model="optionsGwValue"
                       :options="optionsGw"
                       ref="cascaderHandleGw"
                       @change="initChart"
                       :props="{ checkStrictly: true }"
                       clearable></el-cascader>
        </div>
        <div class="dateTime">
          <el-date-picker v-model="valueGw"
                          type="daterange"
                          align="right"
                          unlink-panels
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"
                          @change="initChart"
                          :picker-options="pickerOptions"></el-date-picker>
        </div>
      </div>
    </div>
    <div class="gwEcharts"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import HeaderTitle from '../Title.vue';
import { urlPath, apiPath } from '../path';

export default {
  name: 'barEcharts',
  components: {
    HeaderTitle,
  },
  props: {},
  data() {
    return {
      optionsGw: [], // 风险点岗位检查四级联动的下拉框的值
      optionsGwValue: '', // 风险点岗位检查四级联动的绑定值
      optionsGwParams: {}, // 风险点岗位检查四级联动数组过滤传给后端调数据的参数值
      valueGw: [], // 风险点岗位检查开始时间和结束时间
      barName: [],
      barzxpx: [],
      barjsfs: [],
      barzxjc: [],
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
  mounted() {
    this.FoueSelectOptions(); // 四级联动下拉框
    this.initChart();
    this.__resizeHanlder = this._.debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener('resize', this.__resizeHanlder);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener('resize', this.__resizeHanlder);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    FoueSelectOptions() {
      this.$http.get(`/${apiPath}/statistics/listAll`).then((res) => {
        if (res.data.status === 200) {
          this.optionsGw = res.data.result.options;
        }
      });
    },
    // 风险点个人检查
    initChart() {
      this.optionsGwParams.base = '';
      this.optionsGwParams.department = '';
      this.optionsGwParams.factory = '';
      this.optionsGwParams.workshop = '';
      if (this.optionsGwValue.length === 1) {
        this.optionsGwParams.base = this.optionsGwValue[0];
      } else if (this.optionsGwValue.length === 2) {
        this.optionsGwParams.base = this.optionsGwValue[0];
        this.optionsGwParams.department = this.optionsGwValue[1];
      } else if (this.optionsGwValue.length === 3) {
        this.optionsGwParams.base = this.optionsGwValue[0];
        this.optionsGwParams.department = this.optionsGwValue[1];
        this.optionsGwParams.factory = this.optionsGwValue[2];
      } else if (this.optionsGwValue.length === 4) {
        this.optionsGwParams.base = this.optionsGwValue[0];
        this.optionsGwParams.department = this.optionsGwValue[1];
        this.optionsGwParams.factory = this.optionsGwValue[2];
        this.optionsGwParams.workshop = this.optionsGwValue[3];
      }
      if (this.valueGw === null) {
        this.optionsGwParams.start = '';
        this.optionsGwParams.end = '';
      } else {
        this.optionsGwParams.start = this.valueGw[0];
        this.optionsGwParams.end = this.valueGw[1];
      }
      this.barName = [];
      this.barzxpx = [];
      this.barjsfs = [];
      this.barzxjc = [];
      this.$http
        .get(`/${apiPath}/statistics/specialTask/overdueRateBar`, {
          params: this.optionsGwParams,
        })
        .then((res) => {
          if (res.data.status === 200) {
            res.data.result.forEach((item) => {
              this.barName.push(item.name);
              this.barzxpx.push(item.zxpxOverdueRate);
              this.barjsfs.push(item.jsfsOverdueRate);
              this.barzxjc.push(item.zxjcOverdueRate);
            });
            console.log(this.barName, '165');
            this.chart = echarts.init(this.$el.querySelector('.gwEcharts'));
            this.chart.setOption({
              color: ['#4150d8', '#28bf7e', '#ed7c2f'],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow',
                },
              },
              grid: {
                x: '4%',
                y: '20%',
                x2: '4%',
                y2: '6%',
                borderWidth: 1,
              },
              legend: {
                y: '15px',
                data: ['专项培训', '举一反三排查', '专项安全检查'],
              },
              toolbox: {
                show: true,
                orient: 'vertical',
                left: 'right',
                top: 'center',
              },
              xAxis: [
                {
                  type: 'category',
                  data: this.barName,
                  axisLabel: {
                    color: '#333',
                  },
                  axisLine: {
                    lineStyle: {
                      color: '#e7e7e7',
                    },
                  },
                  axisTick: {
                    show: false,
                    lineStyle: {
                      color: '#e7e7e7',
                    },
                  },
                },
              ],
              yAxis: [
                {
                  type: 'value',
                  splitLine: {
                    lineStyle: {
                      type: 'dashed',
                    },
                  },
                  axisLine: {
                    show: false,
                  },
                  axisTick: {
                    lineStyle: {
                      color: '#ccc',
                    },
                  },
                },
              ],
              series: [
                {
                  name: '专项培训',
                  type: 'bar',
                  barGap: 0,
                  barWidth: 25,
                  data: this.barzxpx,
                },
                {
                  name: '举一反三排查',
                  type: 'bar',
                  barGap: 0,
                  barWidth: 25,
                  data: this.barjsfs,
                },
                {
                  name: '专项安全检查',
                  type: 'bar',
                  barGap: 0,
                  barWidth: 25,
                  data: this.barzxjc,
                },
              ],
            });
          }
        });
    },
  },
  filter: {},
  computed: {},
  watch: {
    optionsGwValue() {
      if (this.$refs.cascaderHandleGw) {
        this.$refs.cascaderHandleGw.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.barEcharts {
  width: 100%;
  height: 100%;
  .navTitle {
    width: 100%;
    height: 40px;
    position: relative;
    .navSelect {
      width: 570px;
      height: 40px;
      position: absolute;
      right: 10px;
      top: 4px;
      display: flex;
      justify-content: space-between;
      .dateTime {
        width: 350px;
      }
      .selectMain {
        width: 200px;
      }
    }
  }
  .gwEcharts {
    height: calc(100% - 50px);
  }
}
</style>
