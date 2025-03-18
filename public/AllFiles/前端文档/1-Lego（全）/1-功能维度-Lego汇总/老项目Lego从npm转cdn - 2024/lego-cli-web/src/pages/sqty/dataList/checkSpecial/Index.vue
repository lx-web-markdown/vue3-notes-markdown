<template>
  <!-- // 检查执行情况 -->
  <div class="checkSpecial">
    <vue-scroll :ops="ops"
                style="width: 100%; height: 100%">
      <div class="mian">
        <div class="title">检查执行情况报表</div>
        <div class="container">
          <div class="floorFirst">
            <div class="floorLeft">
              <div class="risk">
                <!-- <header-title
                  headerTitle="风险点/非常规区域/区域管理执行检查完成率"
                                />-->
                <div class="tabTitle">
                  <span @click="changeTab1('2')"
                        :class="showTab1 === '2' ? 'btns1' : ''">岗位计划完成率</span>
                  &nbsp; &nbsp; &nbsp;
                  <span @click="changeTab1('1')"
                        :class="showTab1 === '1' ? 'btns1' : ''">岗位检查完成率</span>
                </div>
                <div class="tab1"
                     v-if="showTab1 === '1'">
                  <div class="selectFx">
                    <div class="selectLx">
                      <el-select v-model="optionFxlxValue"
                                 placeholder="风险点"
                                 @change="FxOptionChange">
                        <el-option v-for="item in optionLx"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <div class="selectMain">
                      <el-cascader v-model="optionsFxValue"
                                   :options="optionsFx"
                                   ref="cascaderHandleFx"
                                   :props="{ checkStrictly: true }"
                                   @change="FxOptionChange"
                                   clearable></el-cascader>
                    </div>
                    <div class="dateTime">
                      <el-date-picker v-model="valueFx"
                                      type="daterange"
                                      align="right"
                                      unlink-panels
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      :picker-options="pickerOptions"
                                      value-format="yyyy-MM-dd"
                                      @change="FxOptionChange"></el-date-picker>
                    </div>
                  </div>
                  <div class="tableFx">
                    <el-table :data="fxtableData"
                              border
                              style="width: 100%">
                      <el-table-column prop="checkPerson"
                                       label="检查岗位类别"></el-table-column>
                      <el-table-column prop="checkName"
                                       :label="fxLabel"></el-table-column>
                    </el-table>
                  </div>
                </div>
                <div class="tab2"
                     v-if="showTab1 === '2'">
                  <div class="selectFx">
                    <div class="selectLx">
                      <el-select v-model="optionFxlxTab1Value"
                                 placeholder="风险点"
                                 @change="FxOptionChange1">
                        <el-option v-for="item in optionLx"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"></el-option>
                      </el-select>
                    </div>
                    <div class="selectMain">
                      <el-cascader v-model="optionsFxTabValue"
                                   :options="optionsFx"
                                   ref="cascaderHandleFxTab"
                                   :props="{ checkStrictly: true }"
                                   @change="FxOptionChange1"
                                   clearable></el-cascader>
                    </div>
                    <div class="dateTime">
                      <el-date-picker v-model="valueTabFx"
                                      type="daterange"
                                      align="right"
                                      unlink-panels
                                      range-separator="至"
                                      start-placeholder="开始日期"
                                      end-placeholder="结束日期"
                                      :picker-options="pickerOptions"
                                      value-format="yyyy-MM-dd"
                                      @change="FxOptionChange1"></el-date-picker>
                    </div>
                  </div>
                  <div class="tableFx">
                    <el-table :data="fxtableData"
                              border
                              style="width: 100%">
                      <el-table-column prop="checkPerson"
                                       label="计划岗位类别"></el-table-column>
                      <el-table-column prop="checkName"
                                       :label="fxLabel"></el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
              <div class="peopleChat">
                <header-title headerTitle="安全交流任务完成率" />
                <div class="selectRy">
                  <div class="selectMain">
                    <el-cascader v-model="optionsRyValue"
                                 :options="optionsRy"
                                 ref="cascaderHandleRy"
                                 :props="{ checkStrictly: true }"
                                 @change="RyOptionChange"
                                 clearable></el-cascader>
                  </div>
                  <div class="dateTime">
                    <el-date-picker v-model="valueRy"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    :picker-options="pickerOptions"
                                    @change="RyOptionChange"
                                    value-format="yyyy-MM-dd"></el-date-picker>
                  </div>
                </div>
                <div class="tableRy">
                  <el-table :data="RytableData"
                            border
                            style="width: 100%">
                    <el-table-column prop="chekperson"
                                     label="检查人岗位类别"></el-table-column>
                    <el-table-column prop="chekper"
                                     label="安全交流任务完成率"></el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
            <div class="floorRight">
              <!-- <header-title
                headerTitle="风险点个人检查统计 (请按需根据人员或组织信息查询)"
                            />-->
              <div class="tabTitle">
                <span @click="changeTab('2')"
                      :class="showTab === '2' ? 'btns1' : ''">个人计划统计</span>
                &nbsp; &nbsp; &nbsp;
                <span @click="changeTab('1')"
                      :class="showTab === '1' ? 'btns1' : ''">个人检查统计</span>
                &nbsp; &nbsp; &nbsp;
                <span>(请按需根据人员或组织信息查询)</span>
              </div>
              <div class="tab1"
                   v-if="showTab === '1'">
                <div class="selectFxgr">
                  <div class="selectLx">
                    <el-select v-model="optionFxlxValue3"
                               placeholder
                               @change="GrOptionChange">
                      <el-option v-for="item in optionLx"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value"></el-option>
                    </el-select>
                  </div>
                  <div class="selectMain">
                    <el-cascader v-model="optionsGrValue"
                                 :options="optionsGr"
                                 ref="cascaderHandleGr"
                                 @change="GrOptionChange"
                                 :props="{ checkStrictly: true }"
                                 clearable></el-cascader>
                  </div>
                  <div class="searchName">
                    <el-input placeholder="姓名搜索"
                              v-model="searchNameInput"
                              @change="GrOptionChange"
                              clearable></el-input>
                  </div>
                  <div class="dateTime">
                    <el-date-picker v-model="valueGr"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="GrOptionChange"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions"></el-date-picker>
                  </div>
                </div>
                <div class="tableFxgr">
                  <vue-scroll :ops="ops"
                              style="width: 100%; height: 100%">
                    <el-table :data="GrtableData"
                              border
                              style="width: 100%"
                              v-loading="loading">
                      <el-table-column prop="name"
                                       label="执行人姓名工号"
                                       width="260"></el-table-column>
                      <el-table-column prop="inspectCount"
                                       label="执行人检查次数"
                                       width="180"></el-table-column>
                      <el-table-column prop="completeRate"
                                       label="检查完成率"></el-table-column>
                    </el-table>
                  </vue-scroll>
                </div>
              </div>
              <div class="tab2"
                   v-if="showTab === '2'">
                <div class="selectFxgr">
                  <div class="selectLx">
                    <el-select v-model="optionFxlxValue2"
                               placeholder
                               @change="GrOptionChange2">
                      <el-option v-for="item in optionLx"
                                 :key="item.value"
                                 :label="item.label"
                                 :value="item.value"></el-option>
                    </el-select>
                  </div>
                  <div class="selectMain">
                    <el-cascader v-model="optionsGrjhValue"
                                 :options="optionsGrjh"
                                 ref="cascaderHandleGrjh"
                                 @change="GrOptionChange2"
                                 :props="{ checkStrictly: true }"
                                 clearable></el-cascader>
                  </div>
                  <div class="searchName">
                    <el-input placeholder="姓名搜索"
                              v-model="searchNamejhInput"
                              @change="GrOptionChange2"
                              clearable></el-input>
                  </div>
                  <div class="dateTime">
                    <el-date-picker v-model="valueGrjh"
                                    type="daterange"
                                    align="right"
                                    unlink-panels
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    @change="GrOptionChange2"
                                    value-format="yyyy-MM-dd"
                                    :picker-options="pickerOptions"></el-date-picker>
                  </div>
                </div>
                <div class="tableFxgr">
                  <vue-scroll :ops="ops"
                              style="width: 100%; height: 100%">
                    <el-table :data="GrjhtableData"
                              border
                              style="width: 100%"
                              v-loading="loading">
                      <el-table-column prop="name"
                                       label="执行人姓名工号"
                                       width="260"></el-table-column>
                      <el-table-column prop="inspectCount"
                                       label="执行人计划次数"
                                       width="180"></el-table-column>
                      <el-table-column prop="completeRate"
                                       label="计划完成率"></el-table-column>
                    </el-table>
                  </vue-scroll>
                </div>
              </div>
            </div>
          </div>
          <div class="floorTwo">
            <!-- <header-title headerTitle="岗位检查执行率" /> -->
            <div class="tabTitle">
              <span @click="changeTab2('2')"
                    :class="showTab2 === '2' ? 'btns1' : ''">岗位计划完成率</span>
              &nbsp; &nbsp; &nbsp;
              <span @click="changeTab2('1')"
                    :class="showTab2 === '1' ? 'btns1' : ''">岗位检查完成率</span>
            </div>
            <div class="tab1"
                 v-if="showTab2 === '1'">
              <bar-echarts />
            </div>
            <div class="tab2"
                 v-if="showTab2 === '2'">
              <bar-echarts-tab />
            </div>
          </div>
        </div>
      </div>
    </vue-scroll>
  </div>
</template>

<script>
import HeaderTitle from '../Title.vue';
import BarEcharts from './BarEcahrts.vue';
import BarEchartsTab from './BarEchartsTab.vue';

export default {
  name: 'checkSpecial',
  components: {
    HeaderTitle,
    BarEcharts,
    BarEchartsTab,
  },
  data() {
    return {
      showTab2: '2',
      showTab1: '2',
      showTab: '2',
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
      loading: false, // 懒加载
      optionFxlxValue2: '', // tab2第二个风险类型
      optionFxlxValue: '全部', // 风险类型选择的绑定值
      optionFxlxValue3: '', // tab1
      optionFxlxTab1Value: '全部', // 岗位计划完成率 tab值
      optionsFx: [], // 风险点四级联动的下拉框的值 ===>岗位检查完成率 tab
      optionsFxTab: [], // 风险点四级联动的下拉框的值 ===>===>岗位计划完成率 tab
      optionsFxValue: '', // 风险点四级联动的绑定值 ===>岗位检查完成率 tab
      optionsFxTabValue: '', // 风险点四级联动的绑定值 ===>岗位计划完成率 tab
      optionsFxParams: {}, // 风险点四级联动数组过滤传给后端调数据的参数值  ===>岗位检查完成率 tab
      optionsFxTabParams: {}, // 风险点四级联动数组过滤传给后端调数据的参数值 ===>岗位计划完成率 tab
      valueFx: [], // 风险点开始时间和结束时间 ===>岗位检查完成率 tab
      valueTabFx: [], // 风险点开始时间和结束时间 ===>岗位计划完成率 tab
      fxLabel: '全部', // 风险的label值
      fxtableData: [], // 风险点R,I,A数据的展示
      optionsRy: [], // 人员四级联动的下拉框的值
      optionsRyValue: '', // 人员四级联动的绑定值
      optionsRyParams: {}, // 人员四级联动数组过滤传给后端调数据的参数值
      RytableData: [], // 人员数据的展示
      valueRy: [], // 人员开始时间和结束时间
      optionsGr: [], // 风险点个人检查四级联动的下拉框的值
      optionsGrjh: [], // tab2
      optionsGrValue: '', // 风险点个人检查四级联动的绑定值
      optionsGrjhValue: '', // tab2
      optionsGrParams: {}, // 风险点个人检查四级联动数组过滤传给后端调数据的参数值
      optionsGrjhParams: {}, // tba2
      GrtableData: [], // 风险点个人检查数据的展示
      GrjhtableData: [], // tba2
      valueGr: [], // 风险点个人检查开始时间和结束时间
      valueGrjh: [], // tab2
      searchNameInput: '', // 风险点个人检查姓名搜索
      searchNamejhInput: '', // tab2
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
    this.FxOptionChange(); // 风险点数据
    this.FxOptionChange1(); // 风险点数据
    this.RyOptionChange(); // 人员沟通数据
    // this.GrOptionChange(); // 风险点个人检查
    // this.GrOptionChange2(); // tab2
    this.FoueSelectOptions();
  },
  methods: {
    changeTab(type) {
      if (type === '1') {
        this.showTab = '1';
        // this.GrOptionChange(); // 风险点个人检查
      } else {
        this.showTab = '2';
        // this.GrOptionChange2(); // tab2
      }
    },
    changeTab1(type) {
      if (type === '1') {
        this.showTab1 = '1';
        this.FxOptionChange();
      } else {
        this.showTab1 = '2';
        this.FxOptionChange1();
      }
    },
    changeTab2(type) {
      if (type === '1') {
        this.showTab2 = '1';
        // this.GrOptionChange(); // 风险点个人检查
      } else {
        this.showTab2 = '2';
        // this.GrOptionChange2(); // tab2
      }
    },
    FoueSelectOptions() {
      this.$http.get('/sdkApi/ohsms/statistics/listAll').then((res) => {
        if (res.data.status === 200) {
          this.optionsFx = res.data.result.options;
          this.optionsRy = res.data.result.options;
          this.optionsGr = res.data.result.options;
          this.optionsGrjh = res.data.result.options;
        }
      });
    },
    // 风险点数据加载  岗位检查完成率
    FxOptionChange() {
      this.optionsFxParams.base = '';
      this.optionsFxParams.department = '';
      this.optionsFxParams.factory = '';
      this.optionsFxParams.workshop = '';
      if (this.optionsFxValue.length === 1) {
        this.optionsFxParams.base = this.optionsFxValue[0];
      } else if (this.optionsFxValue.length === 2) {
        this.optionsFxParams.base = this.optionsFxValue[0];
        this.optionsFxParams.department = this.optionsFxValue[1];
      } else if (this.optionsFxValue.length === 3) {
        this.optionsFxParams.base = this.optionsFxValue[0];
        this.optionsFxParams.department = this.optionsFxValue[1];
        this.optionsFxParams.factory = this.optionsFxValue[2];
      } else if (this.optionsFxValue.length === 4) {
        this.optionsFxParams.base = this.optionsFxValue[0];
        this.optionsFxParams.department = this.optionsFxValue[1];
        this.optionsFxParams.factory = this.optionsFxValue[2];
        this.optionsFxParams.workshop = this.optionsFxValue[3];
      }
      if (this.optionFxlxValue === '全部') {
        this.optionsFxParams.type = '';
      } else {
        this.optionsFxParams.type = this.optionFxlxValue;
      }
      console.log(this.optionsFxParams.type);
      if (this.valueFx === null) {
        this.optionsFxParams.start = '';
        this.optionsFxParams.end = '';
      } else {
        this.optionsFxParams.start = this.valueFx[0];
        this.optionsFxParams.end = this.valueFx[1];
      }
      if (this.optionFxlxValue === '危害因素') {
        this.fxLabel = '危害因素';
      } else if (this.optionFxlxValue === '非常规区域') {
        this.fxLabel = '非常规区域';
      } else if (this.optionFxlxValue === '区域管理人员') {
        this.fxLabel = '区域管理人员';
      } else if (this.optionFxlxValue === '危害因素') {
        this.fxLabel = '危害因素';
      } else {
        this.fxLabel = '全部';
      }
      this.fxtableData = [];
      this.$http
        .get('/sdkApi/ohsms/statistics/inspect/CompletionRate', {
          params: this.optionsFxParams,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.fxtableData = [
              { checkPerson: 'H', checkName: `${res.data.result.H}%` || '0%' },
              { checkPerson: 'I', checkName: `${res.data.result.I}%` || '0%' },
              { checkPerson: 'J', checkName: `${res.data.result.J}%` || '0%' },
            ];
          }
        });
    },
    // 风险点数据加载 岗位计划完成率 tab2
    FxOptionChange1() {
      this.optionsFxTabParams.base = '';
      this.optionsFxTabParams.department = '';
      this.optionsFxTabParams.factory = '';
      this.optionsFxTabParams.workshop = '';
      if (this.optionsFxTabValue.length === 1) {
        this.optionsFxTabParams.base = this.optionsFxTabValue[0];
      } else if (this.optionsFxTabValue.length === 2) {
        this.optionsFxTabParams.base = this.optionsFxTabValue[0];
        this.optionsFxTabParams.department = this.optionsFxTabValue[1];
      } else if (this.optionsFxTabValue.length === 3) {
        this.optionsFxTabParams.base = this.optionsFxTabValue[0];
        this.optionsFxTabParams.department = this.optionsFxTabValue[1];
        this.optionsFxTabParams.factory = this.optionsFxTabValue[2];
      } else if (this.optionsFxTabValue.length === 4) {
        this.optionsFxTabParams.base = this.optionsFxTabValue[0];
        this.optionsFxTabParams.department = this.optionsFxTabValue[1];
        this.optionsFxTabParams.factory = this.optionsFxTabValue[2];
        this.optionsFxTabParams.workshop = this.optionsFxTabValue[3];
      }
      if (this.optionFxlxTab1Value === '全部') {
        this.optionsFxTabParams.type = '';
      } else {
        this.optionsFxTabParams.type = this.optionFxlxTab1Value;
      }
      console.log(this.optionsFxTabParams.type);
      if (this.valueTabFx === null) {
        this.optionsFxTabParams.start = '';
        this.optionsFxTabParams.end = '';
      } else {
        this.optionsFxTabParams.start = this.valueTabFx[0];
        this.optionsFxTabParams.end = this.valueTabFx[1];
      }
      if (this.optionFxlxTab1Value === '危害因素') {
        this.fxLabel = '危害因素';
      } else if (this.optionFxlxTab1Value === '非常规区域') {
        this.fxLabel = '非常规区域';
      } else if (this.optionFxlxTab1Value === '区域管理人员') {
        this.fxLabel = '区域管理人员';
      } else if (this.optionFxlxTab1Value === '危害因素') {
        this.fxLabel = '危害因素';
      } else {
        this.fxLabel = '全部';
      }
      this.fxtableData = [];
      this.$http
        .get('/sdkApi/ohsms/statistics/inspect/plan/CompletionRate', {
          params: this.optionsFxTabParams,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.fxtableData = [
              { checkPerson: 'H', checkName: `${res.data.result.H}%` || '0%' },
              { checkPerson: 'I', checkName: `${res.data.result.I}%` || '0%' },
              { checkPerson: 'J', checkName: `${res.data.result.J}%` || '0%' },
            ];
          }
        });
    },
    // 人员沟通任务完成率
    RyOptionChange() {
      this.optionsRyParams.base = '';
      this.optionsRyParams.department = '';
      this.optionsRyParams.factory = '';
      this.optionsRyParams.workshop = '';
      if (this.optionsRyValue.length === 1) {
        this.optionsRyParams.base = this.optionsRyValue[0];
      } else if (this.optionsRyValue.length === 2) {
        this.optionsRyParams.base = this.optionsRyValue[0];
        this.optionsRyParams.department = this.optionsRyValue[1];
      } else if (this.optionsRyValue.length === 3) {
        this.optionsRyParams.base = this.optionsRyValue[0];
        this.optionsRyParams.department = this.optionsRyValue[1];
        this.optionsRyParams.factory = this.optionsRyValue[2];
      } else if (this.optionsRyValue.length === 4) {
        this.optionsRyParams.base = this.optionsRyValue[0];
        this.optionsRyParams.department = this.optionsRyValue[1];
        this.optionsRyParams.factory = this.optionsRyValue[2];
        this.optionsRyParams.workshop = this.optionsRyValue[3];
      }
      if (this.valueRy === null) {
        this.optionsRyParams.start = '';
        this.optionsRyParams.end = '';
      } else {
        this.optionsRyParams.start = this.valueRy[0];
        this.optionsRyParams.end = this.valueRy[1];
      }
      this.RytableData = [];
      this.$http
        .get('/sdkApi/ohsms/statistics/communicate/CompletionRate', {
          params: this.optionsRyParams,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.RytableData = [
              { chekperson: 'H', chekper: res.data.result.H || '0%' },
              { chekperson: 'I', chekper: res.data.result.I || '0%' },
              { chekperson: 'J', chekper: res.data.result.J || '0%' },
            ];
          }
        });
    },
    // 风险点个人检查
    GrOptionChange() {
      this.loading = true;
      this.optionsGrParams.base = '';
      this.optionsGrParams.department = '';
      this.optionsGrParams.factory = '';
      this.optionsGrParams.workshop = '';
      this.optionsGrjhParams.xingming = '';
      this.optionsGrParams.jianchaleixing = '';
      if (this.optionsGrValue.length === 1) {
        this.optionsGrParams.base = this.optionsGrValue[0];
      } else if (this.optionsGrValue.length === 2) {
        this.optionsGrParams.base = this.optionsGrValue[0];
        this.optionsGrParams.department = this.optionsGrValue[1];
      } else if (this.optionsGrValue.length === 3) {
        this.optionsGrParams.base = this.optionsGrValue[0];
        this.optionsGrParams.department = this.optionsGrValue[1];
        this.optionsGrParams.factory = this.optionsGrValue[2];
      } else if (this.optionsGrValue.length === 4) {
        this.optionsGrParams.base = this.optionsGrValue[0];
        this.optionsGrParams.department = this.optionsGrValue[1];
        this.optionsGrParams.factory = this.optionsGrValue[2];
        this.optionsGrParams.workshop = this.optionsGrValue[3];
      }
      if (this.valueGr === null) {
        this.optionsGrParams.start = '';
        this.optionsGrParams.end = '';
      } else {
        this.optionsGrParams.start = this.valueGr[0];
        this.optionsGrParams.end = this.valueGr[1];
      }
      if (this.searchNameInput === undefined) {
        this.optionsGrParams.xingming = '';
      } else {
        this.optionsGrParams.xingming = this.searchNameInput;
      }
      if (this.optionFxlxValue3 === '全部') {
        this.optionsGrParams.jianchaleixing = '';
      } else {
        this.optionsGrParams.jianchaleixing = this.optionFxlxValue3;
      }
      this.$http
        .get('/sdkApi/ohsms/statistics/inspect/personalInspect/check', {
          params: this.optionsGrParams,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.loading = false;
            const data = [];
            res.data.result.forEach((ele) => {
              data.push({
                name: ele.name,
                inspectCount: ele.inspectCount,
                completeRate: `${ele.completeRate}%`,
              });
            });
            this.GrtableData = data;
          }
        });
    },
    // tab2数据
    GrOptionChange2() {
      console.log('tab');
      this.loading = true;
      this.optionsGrjhParams.base = '';
      this.optionsGrjhParams.department = '';
      this.optionsGrjhParams.factory = '';
      this.optionsGrjhParams.workshop = '';
      this.optionsGrjhParams.jianchaleixing = '';
      this.optionsGrjhParams.xingming = '';
      if (this.optionsGrjhValue.length === 1) {
        this.optionsGrjhParams.base = this.optionsGrjhValue[0];
      } else if (this.optionsGrjhValue.length === 2) {
        this.optionsGrjhParams.base = this.optionsGrjhValue[0];
        this.optionsGrjhParams.department = this.optionsGrjhValue[1];
      } else if (this.optionsGrjhValue.length === 3) {
        this.optionsGrjhParams.base = this.optionsGrjhValue[0];
        this.optionsGrjhParams.department = this.optionsGrjhValue[1];
        this.optionsGrjhParams.factory = this.optionsGrjhValue[2];
      } else if (this.optionsGrjhValue.length === 4) {
        this.optionsGrjhParams.base = this.optionsGrjhValue[0];
        this.optionsGrjhParams.department = this.optionsGrjhValue[1];
        this.optionsGrjhParams.factory = this.optionsGrjhValue[2];
        this.optionsGrjhParams.workshop = this.optionsGrjhValue[3];
      }
      if (this.valueGrjh === null) {
        this.optionsGrjhParams.start = '';
        this.optionsGrjhParams.end = '';
      } else {
        this.optionsGrjhParams.start = this.valueGrjh[0];
        this.optionsGrjhParams.end = this.valueGrjh[1];
      }
      if (this.searchNamejhInput === undefined) {
        this.optionsGrjhParams.xingming = '';
      } else {
        this.optionsGrjhParams.xingming = this.searchNamejhInput;
      }
      if (this.optionFxlxValue2 === '全部') {
        this.optionsGrjhParams.jianchaleixing = '';
      } else {
        this.optionsGrjhParams.jianchaleixing = this.optionFxlxValue2;
      }
      this.$http
        .get('/sdkApi/ohsms/statistics/inspect/personalInspect/plan', {
          params: this.optionsGrjhParams,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.loading = false;
            const data = [];
            res.data.result.forEach((ele) => {
              console.log(ele, '619');
              data.push({
                name: ele.name,
                inspectCount: ele.inspectCount,
                completeRate: `${ele.completeRate}%`,
              });
            });
            this.GrjhtableData = data;
          }
        });
    },
  },

  watch: {
    optionsFxValue() {
      if (this.$refs.cascaderHandleFx) {
        this.$refs.cascaderHandleFx.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
    optionsFxTabValue() {
      if (this.$refs.cascaderHandleFxTab) {
        this.$refs.cascaderHandleFxTab.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
    optionsRyValue() {
      if (this.$refs.cascaderHandleRy) {
        this.$refs.cascaderHandleRy.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
    optionsGrValue() {
      if (this.$refs.cascaderHandleGr) {
        this.$refs.cascaderHandleGr.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
    optionsGrValue2() {
      if (this.$refs.cascaderHandleGrjh) {
        this.$refs.cascaderHandleGrjh.dropDownVisible = false; // 监听值发生变化就关闭它
      }
    },
  },
};
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
</style>
<style lang="scss" scoped>
.checkSpecial {
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
      //   height: calc(100% - 50px);
      .floorFirst {
        width: 100%;
        // height: 535px;
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

        .selectFx,
        .selectRy,
        .selectFxgr {
          width: 570px;
          height: 50px;
          position: relative;
          top: 4px;
          display: flex;
          justify-content: space-between;
        }
        .selectFx {
          width: 100%;
        }
        .selectFxgr {
          width: 98%;
        }
        .tableFx,
        .tableRy {
          width: 100%;
          height: calc(100% - 50px);
          //   /deep/ .el-table td,
          //   .el-table th {
          //     padding: 8px 0;
          //   }
        }
        .tableFxgr {
          width: 98%;
          height: 481px;
          //   margin-right: 8px;
          //   /deep/ .el-table td,
          //   .el-table th {
          //     padding: 8px 0;
          //   }
        }
      }
      .floorTwo {
        width: 100%;
        height: 410px;
        // overflow: hidden;
        .tab1 {
          width: 100%;
          height: 360px;
        }
        .tab2 {
          width: 100%;
          height: 360px;
        }
      }
    }
  }
  ::v-deep .el-date-editor .el-range-separator {
    width: 8%;
  }
  .tabTitle {
    width: 100%;
    height: 50px;
    color: #fff;
    padding-left: 30px;
    line-height: 50px;
    font-size: 15px;
    background: url('../../../../assets/dataList/bgTitle.png') no-repeat;
    background-size: 100% 100%;
    span {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
    }
    .btns1 {
      border-bottom: 3px solid #4680ff;
      color: #4680ff;
    }
  }
}
</style>
