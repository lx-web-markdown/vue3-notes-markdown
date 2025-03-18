<template>
  <!-- 隐患关闭率及超期率 -->
  <div class="hiddenBase">
    <div class="mian">
      <div class="title">隐患关闭率及超期率</div>
      <div class="container">
        <div class="floorFirst">
          <div class="floorLeft">
            <div class="risk">
              <header-title headerTitle="隐患关闭率及超期率统计(短期措施)" />
              <div class="selectQy">
                <div class="selectMain">
                  <el-cascader v-model="optionsQyValue"
                               :options="optionsQy"
                               ref="cascaderHandleQy"
                               @change="QyOptionChange"
                               :props="{ checkStrictly: true }"
                               clearable></el-cascader>
                </div>
                <div class="dateTime">
                  <el-date-picker v-model="valueQy"
                                  type="daterange"
                                  align="right"
                                  unlink-panels
                                  range-separator="至"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                  value-format="yyyy-MM-dd"
                                  @change="QyOptionChange"
                                  :picker-options="pickerOptions"></el-date-picker>
                </div>
              </div>
              <div class="tableQy">
                <vue-scroll :ops="ops"
                            style="width: 99%; height: 100%">
                  <el-table :data="QytableData"
                            border
                            style="width: 100%">
                    <el-table-column prop="dengji"
                                     label="隐患分类"></el-table-column>
                    <el-table-column prop="zongrenwushu"
                                     label="总隐患数"></el-table-column>
                    <el-table-column prop="guanbishu"
                                     label="关闭数"></el-table-column>
                    <el-table-column prop="guanbilv"
                                     label="关闭率"></el-table-column>
                    <el-table-column prop="qsNum"
                                     label="问题超期数"></el-table-column>
                    <el-table-column prop="qsPer"
                                     label="问题超期率"></el-table-column>
                  </el-table>
                </vue-scroll>
              </div>
            </div>
          </div>
          <!-- <div class="floorRight">
            <header-title headerTitle="隐患问题解决效果分析" />
            <div class="selectYhxg">
              <div class="dateTime">
                <el-date-picker
                  v-model="valueYh"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="tableYhxg">
              <el-table :data="YhtableData" border style="width: 100%">
                <el-table-column prop="name" label="基地/工厂/部门">
                </el-table-column>
                <el-table-column prop="value" label="PSI数值">
                </el-table-column>
              </el-table>
            </div>
                    </div>-->
        </div>
        <!-- <div class="floorTwo">
          <header-title headerTitle="隐患问题解决效果分析" />
          <bar-echarts />
                </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTitle from '../Title.vue';
// import BarEcharts from '../checkSpecial/BarEcahrts.vue';

export default {
  name: 'hiddenBase',
  components: {
    HeaderTitle,
    // BarEcharts,
  },
  props: {},
  data() {
    return {
      optionsQy: [], // 区域管理执行检查四级联动的下拉框的值
      optionsQyValue: '', // 区域管理执行检查四级联动的绑定值
      optionsQyParams: {}, // 区域管理执行检查四级联动数组过滤传给后端调数据的参数值
      valueQy: [], // 区域管理执行检查开始时间和结束时间
      QytableData: [], // 区域管理执行table的数据
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: '#01a99a',
          opacity: 0,
          size: '5px',
          specifyBorderRadius: false,
          gutterOfEnds: null, // 轨道距 x 和 y 轴两端的距离
          gutterOfSide: '0', // 距离容器的距离
          keepShow: false, // 是否即使 bar 不存在的情况下也保持显示
          border: 'none', // 边框
        },
        bar: {
          hoverStyle: true,
          onlyShowBarOnScroll: true, // 是否只有滚动的时候才显示滚动条
          background: '#fff', // 颜色
        },
      },
      optionsYh: [], // 隐患问题四级联动的下拉框的值
      optionsYhValue: '', // 隐患问题四级联动的绑定值
      optionsYhParams: {}, // 隐患问题四级联动数组过滤传给后端调数据的参数值
      valueYh: [], // 隐患问题开始时间和结束时间
      YhtableData: [], // 隐患问题table的数据
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
    this.FoueSelectOptions();
    this.QyOptionChange(); // 区域管理执行检查
    this.YhOptionChange(); // 隐患问题
  },
  activited() { },
  update() { },
  beforeRouteUpdate() { },
  methods: {
    FoueSelectOptions() {
      this.$http.get('/sdkApi/ohsms/statistics/listAll').then((res) => {
        if (res.data.status === 200) {
          this.optionsQy = res.data.result.options;
          this.optionsYh = res.data.result.options;
        }
      });
    },
    // 区域管理执行检查完成率
    QyOptionChange() {
      this.optionsQyParams.base = '';
      this.optionsQyParams.department = '';
      this.optionsQyParams.factory = '';
      this.optionsQyParams.workshop = '';
      if (this.optionsQyValue.length === 1) {
        this.optionsQyParams.base = this.optionsQyValue[0];
      } else if (this.optionsQyValue.length === 2) {
        this.optionsQyParams.base = this.optionsQyValue[0];
        this.optionsQyParams.department = this.optionsQyValue[1];
      } else if (this.optionsQyValue.length === 3) {
        this.optionsQyParams.base = this.optionsQyValue[0];
        this.optionsQyParams.department = this.optionsQyValue[1];
        this.optionsQyParams.factory = this.optionsQyValue[2];
      } else if (this.optionsQyValue.length === 4) {
        this.optionsQyParams.base = this.optionsQyValue[0];
        this.optionsQyParams.department = this.optionsQyValue[1];
        this.optionsQyParams.factory = this.optionsQyValue[2];
        this.optionsQyParams.workshop = this.optionsQyValue[3];
      }
      if (this.valueQy === null) {
        this.optionsQyParams.start = '';
        this.optionsQyParams.end = '';
      } else {
        this.optionsQyParams.start = this.valueQy[0];
        this.optionsQyParams.end = this.valueQy[1];
      }
      this.QytableData = [];
      this.$http
        .get(
          '/sdkApi/ohsms/statistics/hiddenDanger/areaManage/inspect/completionRate',
          {
            params: this.optionsQyParams,
          }
        )
        .then((res) => {
          if (res.data.status === 200) {
            // console.log(res);
            const resdata = res.data.result;
            this.QytableData = [
              {
                dengji: '交流/沟通',
                qsNum: `${resdata.jlgt_overdue}`,
                qsPer: `${resdata.jlgt_overdue_rate}`,
                zongrenwushu: `${resdata.jlgt_count}`,
                guanbishu: `${resdata.jlgt_close}`,
                guanbilv: `${resdata.jlgt_close_rate}`,
              },
              {
                dengji: '表扬',
                qsNum: `${resdata.by_overdue}`,
                qsPer: `${resdata.by_overdue_rate}`,
                zongrenwushu: `${resdata.by_count}`,
                guanbishu: `${resdata.by_close}`,
                guanbilv: `${resdata.by_close_rate}`,
              },
              {
                dengji: '管理缺陷',
                qsNum: `${resdata.glqx_overdue}`,
                qsPer: `${resdata.glqx_overdue_rate}`,
                zongrenwushu: `${resdata.glqx_count}`,
                guanbishu: `${resdata.glqx_close}`,
                guanbilv: `${resdata.glqx_close_rate}`,
              },
              {
                dengji: '员工操作',
                qsNum: `${resdata.ygcz_overdue}`,
                qsPer: `${resdata.ygcz_overdue_rate}`,
                zongrenwushu: `${resdata.ygcz_count}`,
                guanbishu: `${resdata.ygcz_close}`,
                guanbilv: `${resdata.ygcz_close_rate}`,
              },
              {
                dengji: '施工安全',
                qsNum: `${resdata.sgaq_overdue}`,
                qsPer: `${resdata.sgaq_overdue_rate}`,
                zongrenwushu: `${resdata.sgaq_count}`,
                guanbishu: `${resdata.sgaq_close}`,
                guanbilv: `${resdata.sgaq_close_rate}`,
              },
              {
                dengji: '安全用电',
                qsNum: `${resdata.aqyd_overdue}`,
                qsPer: `${resdata.aqyd_overdue_rate}`,
                zongrenwushu: `${resdata.aqyd_count}`,
                guanbishu: `${resdata.aqyd_close}`,
                guanbilv: `${resdata.aqyd_close_rate}`,
              },
              {
                dengji: '职业健康与人机工程',
                qsNum: `${resdata.zyjk_overdue}`,
                qsPer: `${resdata.zyjk_overdue_rate}`,
                zongrenwushu: `${resdata.zyjk_count}`,
                guanbishu: `${resdata.zyjk_close}`,
                guanbilv: `${resdata.zyjk_close_rate}`,
              },
              {
                dengji: '防火与应急',
                qsNum: `${resdata.fhyj_overdue}`,
                qsPer: `${resdata.fhyj_overdue_rate}`,
                zongrenwushu: `${resdata.fhyj_count}`,
                guanbishu: `${resdata.fhyj_close}`,
                guanbilv: `${resdata.fhyj_close_rate}`,
              },
              {
                dengji: 'PIV',
                qsNum: `${resdata.piv_overdue}`,
                qsPer: `${resdata.piv_overdue_rate}`,
                zongrenwushu: `${resdata.piv_count}`,
                guanbishu: `${resdata.piv_close}`,
                guanbilv: `${resdata.piv_close_rate}`,
              },
              {
                dengji: '化学品',
                qsNum: `${resdata.hxp_overdue}`,
                qsPer: `${resdata.hxp_overdue_rate}`,
                zongrenwushu: `${resdata.hxp_count}`,
                guanbishu: `${resdata.hxp_close}`,
                guanbilv: `${resdata.hxp_close_rate}`,
              },
              {
                dengji: '高空作业',
                qsNum: `${resdata.gkzy_overdue}`,
                qsPer: `${resdata.gkzy_overdue_rate}`,
                zongrenwushu: `${resdata.gkzy_count}`,
                guanbishu: `${resdata.gkzy_close}`,
                guanbilv: `${resdata.gkzy_close_rate}`,
              },
              {
                dengji: '受限空间',
                qsNum: `${resdata.sxkj_overdue}`,
                qsPer: `${resdata.sxkj_overdue_rate}`,
                zongrenwushu: `${resdata.sxkj_count}`,
                guanbishu: `${resdata.sxkj_close}`,
                guanbilv: `${resdata.sxkj_close_rate}`,
              },
              {
                dengji: 'LOCKOUT',
                qsNum: `${resdata.lock_overdue}`,
                qsPer: `${resdata.lock_overdue_rate}`,
                zongrenwushu: `${resdata.lock_count}`,
                guanbishu: `${resdata.lock_close}`,
                guanbilv: `${resdata.lock_close_rate}`,
              },
              {
                dengji: '高风险设备管理',
                qsNum: `${resdata.gfx_overdue}`,
                qsPer: `${resdata.gfx_overdue_rate}`,
                zongrenwushu: `${resdata.gfx_count}`,
                guanbishu: `${resdata.gfx_close}`,
                guanbilv: `${resdata.gfx_close_rate}`,
              },
              {
                dengji: '设备设施',
                qsNum: `${resdata.sbss_overdue}`,
                qsPer: `${resdata.sbss_overdue_rate}`,
                zongrenwushu: `${resdata.sbss_count}`,
                guanbishu: `${resdata.sbss_close}`,
                guanbilv: `${resdata.sbss_close_rate}`,
              },
              {
                dengji: '其他',
                qsNum: `${resdata.qt_overdue}`,
                qsPer: `${resdata.qt_overdue_rate}`,
                zongrenwushu: `${resdata.qt_count}`,
                guanbishu: `${resdata.qt_close}`,
                guanbilv: `${resdata.qt_close_rate}`,
              },
            ];
          }
        });
    },
    // 隐患问题
    YhOptionChange() {
      this.optionsYhParams.base = '';
      this.optionsYhParams.department = '';
      this.optionsYhParams.factory = '';
      this.optionsYhParams.workshop = '';
      if (this.optionsYhValue.length === 1) {
        this.optionsYhParams.base = this.optionsYhValue[0];
      } else if (this.optionsYhValue.length === 2) {
        this.optionsYhParams.base = this.optionsYhValue[0];
        this.optionsYhParams.department = this.optionsYhValue[1];
      } else if (this.optionsYhValue.length === 3) {
        this.optionsYhParams.base = this.optionsYhValue[0];
        this.optionsYhParams.department = this.optionsYhValue[1];
        this.optionsYhParams.factory = this.optionsYhValue[2];
      } else if (this.optionsYhValue.length === 4) {
        this.optionsYhParams.base = this.optionsYhValue[0];
        this.optionsYhParams.department = this.optionsYhValue[1];
        this.optionsYhParams.factory = this.optionsYhValue[2];
        this.optionsYhParams.workshop = this.optionsYhValue[3];
      }
      if (this.valueYh === null) {
        this.optionsYhParams.start = '';
        this.optionsYhParams.end = '';
      } else {
        this.optionsYhParams.start = this.valueYh[0];
        this.optionsYhParams.end = this.valueYh[1];
      }
      this.YhtableData = [];
      this.$http
        .get(
          '/sdkApi/ohsms/statistics/hiddenDanger/handleResultAnalysis',
          {
            params: this.optionsYhParams,
          }
        )
        .then((res) => {
          if (res.data.status === 200) {
            console.log(res);
            this.YhtableData = res.data.result;
            // this.YhtableData = [
            // ];
          }
        });
    },
  },
  filter: {},
  computed: {},
  watch: {
    optionsQyValue() {
      if (this.$refs.cascaderHandleQy) {
        this.$refs.cascaderHandleQy.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
    optionsYhValue() {
      if (this.$refs.cascaderHandleYh) {
        this.$refs.cascaderHandleYh.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hiddenBase {
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
      height: 970px;
      .floorFirst {
        width: 100%;
        height: 930px;
        display: flex;
        justify-content: space-between;
        .floorLeft {
          width: 100%;
          overflow: hidden;
          .risk {
            height: 930px;
            margin-bottom: 5px;
          }
          .peopleChat {
            height: 49%;
          }
        }
        .floorRight {
          width: 49%;
          height: 100%;
          overflow: hidden;
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
        height: 360px;
        // overflow: hidden;
      }
    }
  }
}
</style>
