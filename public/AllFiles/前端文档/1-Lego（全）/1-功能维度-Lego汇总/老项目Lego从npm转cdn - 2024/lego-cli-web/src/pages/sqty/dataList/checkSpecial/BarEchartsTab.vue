<template>
  <div class="barEcharts">
    <div class="navTitle">
      <!-- <header-title headerTitle="隐患问题解决效果分析" /> -->
      <div class="navSelect">
        <div class="selectLx">
          <el-select v-model="optionGw3Value"
                     placeholder="风险点"
                     @change="initChart">
            <el-option v-for="item in optionLx"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value"></el-option>
          </el-select>
        </div>
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
// import HeaderTitle from '../Title.vue';

export default {
  name: 'barEcharts',
  components: {
    // HeaderTitle,
  },
  props: {},
  data() {
    return {
      optionLx: [
        {
          value: '全部',
          label: '全部',
        },
        {
          value: '危害因素',
          label: '危害因素',
        },
        {
          value: '非常规区域',
          label: '非常规区域',
        },
        {
          value: '区域管理人员',
          label: '区域管理人员',
        },
      ], // 风险类型的下拉框内容
      optionGw3Value: '全部',
      optionsGw: [], // 风险点岗位检查四级联动的下拉框的值
      optionsGwValue: '', // 风险点岗位检查四级联动的绑定值
      optionsGwParams: {}, // 风险点岗位检查四级联动数组过滤传给后端调数据的参数值
      valueGw: [], // 风险点岗位检查开始时间和结束时间
      barName: [],
      barI: [],
      barH: [],
      barJ: [],
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
  created() { },
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

  activited() { },
  update() { },
  beforeRouteUpdate() { },
  methods: {
    FoueSelectOptions() {
      this.$http.get('/sdkApi/ohsms/statistics/listAll').then((res) => {
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
      this.optionsGwParams.jianchaleixing = '';
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
      if (this.optionGw3Value === '全部') {
        this.optionsGwParams.jianchaleixing = '';
      } else {
        this.optionsGwParams.jianchaleixing = this.optionGw3Value;
      }
      this.barName = [];
      this.barI = [];
      this.barH = [];
      this.barJ = [];
      this.$http
        .get('/sdkApi/ohsms/statistics/inspect/riskPoint/plan', {
          params: this.optionsGwParams,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.barName = [];
            this.barI = [];
            this.barH = [];
            this.barJ = [];
            res.data.result.forEach((item) => {
              this.barName.push(item.name);
              this.barI.push(item.I);
              this.barH.push(item.H);
              this.barJ.push(item.J);
            });
            // console.log(this.barH, this.barI, this.barJ);
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
                y2: '8%',
                borderWidth: 1,
              },
              legend: {
                //   x: '300px',
                y: '15px',
                data: ['H', 'I', 'J'],
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
                  // data: ['p', 'A', 'c', 'd', 'd'],
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
                  name: 'H',
                  type: 'bar',
                  barGap: 0,
                  barWidth: 25,
                  data: this.barH,
                },
                {
                  name: 'I',
                  type: 'bar',
                  barGap: 0,
                  barWidth: 25,
                  data: this.barI,
                },
                {
                  name: 'J',
                  type: 'bar',
                  barGap: 0,
                  barWidth: 25,
                  data: this.barJ,
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
      width: 600px;
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
    height: calc(100% - 80px);
  }
}
</style>
