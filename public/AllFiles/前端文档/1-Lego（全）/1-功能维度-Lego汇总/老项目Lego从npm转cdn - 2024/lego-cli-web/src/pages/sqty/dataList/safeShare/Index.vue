<template>
  <!-- 安全经验分享报表 -->
  <div class="safeShare">
    <div class="mian">
      <div class="title">安全经验分享报表</div>
      <div class="container">
        <div class="floorFirst">
          <div class="floorLeft">
            <div class="risk">
              <header-title headerTitle="Best Practice点赞率分析" />
              <div class="selectQy">
                <div class="selectMain">
                  <el-cascader
                    v-model="optionsBestValue"
                    :options="optionsBest"
                    :props="{ checkStrictly: true }"
                    @change="BestOptionChange"
                    ref="cascaderHandleBest"
                    clearable
                  ></el-cascader>
                </div>
                <div class="dateTime">
                  <el-date-picker
                    v-model="valueBest"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change="BestOptionChange"
                    :picker-options="pickerOptions"
                  >
                  </el-date-picker>
                </div>
              </div>
              <div class="tableQy">
                <el-table :data="BesttableData" border style="width: 100%">
                  <el-table-column prop="type" label="经验分享类型">
                  </el-table-column>
                  <el-table-column prop="watchCount" label="关注数">
                  </el-table-column>
                  <el-table-column prop="watchRate" label="关注率">
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
          <div class="floorRight">
            <header-title headerTitle="Lessron Learn点赞率分析" />
            <div class="selectYhxg">
              <div class="selectMain">
                <el-cascader
                  v-model="optionsLessronValue"
                  :options="optionsLessron"
                  ref="cascaderHandleLessron"
                  :props="{ checkStrictly: true }"
                  @change="LessronOptionChange"
                  clearable
                ></el-cascader>
              </div>
              <div class="dateTime">
                <el-date-picker
                  v-model="valueLessron"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  @change="LessronOptionChange"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
            </div>
            <div class="tableYhxg">
              <el-table :data="LessrontableData" border style="width: 100%">
                <el-table-column prop="type" label="经验分享类型">
                </el-table-column>
                <el-table-column prop="watchCount" label="关注数">
                </el-table-column>
                <el-table-column prop="watchRate" label="关注率">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderTitle from '../Title.vue';
import { urlPath, apiPath } from '../path';

export default {
  name: 'safeShare',
  components: {
    HeaderTitle,
  },
  props: {},
  data() {
    return {
      optionsBest: [], // Best点赞率四级联动的下拉框的值
      optionsBestValue: '', // Best点赞率四级联动的绑定值
      optionsBestParams: {}, // Best点赞率四级联动数组过滤传给后端调数据的参数值
      BesttableData: [], // Best点赞率数据的展示
      valueBest: [], // Best点赞率开始时间和结束时间
      optionsLessron: [], // Lessron点赞率四级联动的下拉框的值
      optionsLessronValue: '', // Lessron点赞率四级联动的绑定值
      optionsLessronParams: {}, // Lessron点赞率四级联动数组过滤传给后端调数据的参数值
      LessrontableData: [], // Lessron点赞率数据的展示
      valueLessron: [], // Lessron点赞率开始时间和结束时间
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
    this.BestOptionChange(); // best点赞率
    this.LessronOptionChange(); // Lessron点赞率
  },
  activited() {},
  update() {},
  beforeRouteUpdate() {},
  methods: {
    FoueSelectOptions() {
      this.$http.get(`/${apiPath}/statistics/listAll`).then((res) => {
        if (res.data.status === 200) {
          this.optionsBest = res.data.result.options;
          this.optionsLessron = res.data.result.options;
        }
      });
    },
    // Best点赞率
    BestOptionChange() {
      this.optionsBestParams.base = '';
      this.optionsBestParams.department = '';
      this.optionsBestParams.factory = '';
      this.optionsBestParams.workshop = '';
      if (this.optionsBestValue.length === 1) {
        this.optionsBestParams.base = this.optionsBestValue[0];
      } else if (this.optionsBestValue.length === 2) {
        this.optionsBestParams.base = this.optionsBestValue[0];
        this.optionsBestParams.department = this.optionsBestValue[1];
      } else if (this.optionsBestValue.length === 3) {
        this.optionsBestParams.base = this.optionsBestValue[0];
        this.optionsBestParams.department = this.optionsBestValue[1];
        this.optionsBestParams.factory = this.optionsBestValue[2];
      } else if (this.optionsBestValue.length === 4) {
        this.optionsBestParams.base = this.optionsBestValue[0];
        this.optionsBestParams.department = this.optionsBestValue[1];
        this.optionsBestParams.factory = this.optionsBestValue[2];
        this.optionsBestParams.workshop = this.optionsBestValue[3];
      }
      if (this.valueBest === null) {
        this.optionsBestParams.start = '';
        this.optionsBestParams.end = '';
      } else {
        this.optionsBestParams.start = this.valueBest[0];
        this.optionsBestParams.end = this.valueBest[1];
      }
      this.BesttableData = [];
      this.$http
        .get(`/${apiPath}/statistics/experienceSharing/bestPractice`, {
          params: this.optionsBestParams,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.BesttableData = res.data.result;
          }
        });
    },
    //  Lessron点赞率
    LessronOptionChange() {
      this.optionsLessronParams.base = '';
      this.optionsLessronParams.department = '';
      this.optionsLessronParams.factory = '';
      this.optionsLessronParams.workshop = '';
      if (this.optionsLessronValue.length === 1) {
        this.optionsLessronParams.base = this.optionsLessronValue[0];
      } else if (this.optionsLessronValue.length === 2) {
        this.optionsLessronParams.base = this.optionsLessronValue[0];
        this.optionsLessronParams.department = this.optionsLessronValue[1];
      } else if (this.optionsLessronValue.length === 3) {
        this.optionsLessronParams.base = this.optionsLessronValue[0];
        this.optionsLessronParams.department = this.optionsLessronValue[1];
        this.optionsLessronParams.factory = this.optionsLessronValue[2];
      } else if (this.optionsLessronValue.length === 4) {
        this.optionsLessronParams.base = this.optionsLessronValue[0];
        this.optionsLessronParams.department = this.optionsLessronValue[1];
        this.optionsLessronParams.factory = this.optionsLessronValue[2];
        this.optionsLessronParams.workshop = this.optionsLessronValue[3];
      }
      if (this.valueLessron === null) {
        this.optionsLessronParams.start = '';
        this.optionsLessronParams.end = '';
      } else {
        this.optionsLessronParams.start = this.valueLessron[0];
        this.optionsLessronParams.end = this.valueLessron[1];
      }
      this.LessrontableData = [];
      this.$http
        .get(`/${apiPath}/statistics/experienceSharing/lessronLearn`, {
          params: this.optionsLessronParams,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.LessrontableData = res.data.result;
          }
        });
    },
  },
  filter: {},
  computed: {},
  watch: {
    optionsBestValue() {
      if (this.$refs.cascaderHandleBest) {
        this.$refs.cascaderHandleBest.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
    optionsLessronValue() {
      if (this.$refs.cascaderHandleLessron) {
        this.$refs.cascaderHandleLessron.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.safeShare {
  width: 100%;
  height: 100%;
  overflow: hidden;
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
        height: 600px;
        display: flex;
        justify-content: space-between;
        .floorLeft {
          width: 49%;
          overflow: hidden;
          .risk {
            height: 49%;
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
        overflow: hidden;
      }
    }
  }
}
</style>
