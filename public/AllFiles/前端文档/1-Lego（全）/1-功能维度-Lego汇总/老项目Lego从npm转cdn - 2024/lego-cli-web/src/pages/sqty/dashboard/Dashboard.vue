<template>
  <div class="dashboard">
    <h1 class="title">{{ title }}</h1>
    <div class="one-box">
      <div class="left-box bg-white">
        <div class="box-title under-line">
          <img class="inline-block title-img" :src="img_hyjy" />
          <strong class="title-text inline-block">EMSMC会议纪要</strong>
          <a class="inline-block a-link fix-right" href="#" @click="hyjyMore()"
            >More>></a
          >
        </div>
        <div
          class="list-item flex-1 under-line display-flex flex-middle"
          v-for="(item, index) in meetData"
          :key="index"
        >
          <div
            :class="[
              item.gaoliangxianshi == '是' ? 'highlight-color' : '',
              'text-under-line',
            ]"
            style="flex: 1"
            @click="hyjyUrl(item.id)"
          >
            {{ item.jiyaobiaoti }}
          </div>
          <div class="text-align-center" style="flex: 1">
            {{ item.zuzhimingcheng }}
          </div>
          <div class="text-align-right" style="flex: 1">
            {{ item.nianduyuefen }}
          </div>
        </div>
      </div>
      <div class="right-box bg-white">
        <div class="box-title under-line display-flex">
          <div class="flex-1">
            <img class="inline-block title-img" :src="img_hyjy" />
            <strong class="title-text inline-block">上级发文-解读及行动</strong>
          </div>
          <div class="text-align-center title-text" style="width: 100px">
            状态
          </div>
        </div>
        <div
          class="list-item flex-1 under-line display-flex flex-middle"
          v-for="(item, index) in documentData"
          :key="index"
        >
          <div style="flex: 1">
            <div class="inline-block" style="margin-right: 10px">
              {{ item.wenjianhao }}
            </div>
            <div
              :class="[
                item.shifougaoliang == '是' ? 'highlight-color' : '',
                ' inline-block text-under-line',
              ]"
              @click="sjfwUrl(item.id)"
            >
              {{ item.wenjianbiaoti }}
            </div>
          </div>
          <div class="text-align-center" style="width: 100px">
            <div
              :class="[
                'icon-circle inline-block',
                item.zhuangtaitubiaoyanse == '绿色' ? 'bg-green' : 'bg-yellow',
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="two-box">
      <div class="left-box bg-white">
        <div class="box-title under-line display-flex flex-middle">
          <div style="width: 180px">
            <img class="inline-block title-img" :src="img_calendar" />
            <strong class="title-text inline-block">序号</strong>
          </div>
          <div class="title-text flex-1">
            网格化管理状态( {{ dateYear }} 年 {{ dateMonth }} 月 )
          </div>
          <div class="text-align-center title-text" style="width: 100px">
            状态
          </div>
        </div>
        <div
          class="list-item flex-1 under-line display-flex flex-middle"
          v-for="(item, index) in networkData"
          :key="index"
        >
          <div style="width: 180px; padding-left: 40px">{{ index + 1 }}</div>
          <div class="flex-1">{{ item.name }}</div>
          <div class="text-align-center display-flex" style="width: 100px">
            <span
              :class="[
                'flex-1',
                item.status == '100%' ? 'color-green' : 'color-yellow',
              ]"
              >{{ item.status }}</span
            >
            <div class="flex-1">
              <div
                :class="[
                  'icon-circle inline-block',
                  item.status == '100%' ? 'bg-green' : 'bg-yellow',
                ]"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-box bg-white">
        <div class="box-title under-line display-flex flex-middle">
          <div style="width: 180px">
            <img class="inline-block title-img" :src="img_calendar" />
            <strong class="title-text inline-block">序号</strong>
          </div>
          <div class="title-text" style="flex: 3">项目名称</div>
          <div class="flex-1 title-text text-align-center">Q1</div>
          <div class="flex-1 title-text text-align-center">Q2</div>
          <div class="flex-1 title-text text-align-center">Q3</div>
          <div class="flex-1 title-text text-align-center">Q4</div>
        </div>
        <div
          class="list-item flex-1 under-line display-flex flex-middle"
          v-for="(item, index) in projectData"
          :key="index"
        >
          <div style="width: 180px; padding-left: 40px">{{ item.xuhao }}</div>
          <div
            :class="[
              item.gaoliangxianshi == '是' ? 'highlight-color' : '',
              'text-under-line',
            ]"
            style="flex: 3"
          >
            {{ item.xiangmumingcheng }}
          </div>
          <div class="flex-1 title-text text-align-center">
            <div
              v-if="item.q1"
              :class="[
                'progress',
                item.jindutiaoyanse == '绿色' ? 'bg-green' : 'bg-yellow',
              ]"
            ></div>
          </div>
          <div class="flex-1 title-text text-align-center">
            <div
              v-if="item.q2"
              :class="[
                'progress',
                item.jindutiaoyanse == '绿色' ? 'bg-green' : 'bg-yellow',
              ]"
            ></div>
          </div>
          <div class="flex-1 title-text text-align-center">
            <div
              v-if="item.q3"
              :class="[
                'progress',
                item.jindutiaoyanse == '绿色' ? 'bg-green' : 'bg-yellow',
              ]"
            ></div>
          </div>
          <div class="flex-1 title-text text-align-center">
            <div
              v-if="item.q4"
              :class="[
                'progress',
                item.jindutiaoyanse == '绿色' ? 'bg-green' : 'bg-yellow',
              ]"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div class="three-box">
      <div class="left-box bg-white">
        <div class="box-title under-line">
          <img class="inline-block title-img" :src="img_week" />
          <strong class="title-text inline-block"
            >安全工作月历（{{ calendarTitle }}）</strong
          >
        </div>
        <div
          class="list-item flex-1 display-flex"
          style="margin: 5px 0px; min-height: calc((100% - 100px) / 4)"
          v-for="(item, index) in calendarData"
          :key="index"
        >
          <div
            class="week-box display-flex flex-middle flex-center"
            style="width: 100px; height: 100%"
          >
            {{ item.week }}
          </div>
          <div class="flex-1 display-flex flex-column">
            <div class="display-flex" style="height: 24px">
              <div
                class="flex-1 week-box display-flex flex-middle flex-center"
                style="margin-left: 5px"
                v-for="(day, i) in item.weekArr"
                :key="i"
              >
                {{ day }}
              </div>
            </div>
            <div
              class="flex-1"
              style="
                margin-top: 5px;
                padding-left: 10px;
                overflow: hidden;
                height: calc(100% - 24px);
              "
            >
              <div style="max-height: 100%; overflow-y: auto">
                <div
                  style="margin-bottom: 5px"
                  v-for="(name, idx) in item.contents"
                  :key="idx"
                >
                  {{ name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right-box bg-white">
        <div class="box-title under-line display-flex flex-middle">
          <div style="width: 180px">
            <img class="inline-block title-img" :src="img_calendar" />
            <strong class="title-text inline-block">序号</strong>
          </div>
          <div class="title-text flex-1">专项工作</div>
          <div class="text-align-center title-text" style="width: 100px">
            状态
          </div>
        </div>
        <div
          class="list-item flex-1 under-line display-flex flex-middle"
          v-for="(item, index) in workData"
          :key="index"
        >
          <div style="width: 180px; padding-left: 40px">{{ item.xuhao }}</div>
          <div
            :class="[
              item.gaoliangxianshi == '是' ? 'highlight-color' : '',
              ' flex-1 text-under-line',
            ]"
          >
            {{ item.zhuanxianggongzuomin }}
          </div>
          <div class="text-align-center display-flex" style="width: 100px">
            <span
              :class="[
                'flex-1',
                item.zhuangtaibaifenbi == '100%'
                  ? 'color-green'
                  : 'color-yellow',
              ]"
              >{{ item.zhuangtaibaifenbi }}</span
            >
            <div class="flex-1">
              <div
                :class="[
                  'icon-circle inline-block',
                  item.zhuangtaibaifenbi == '100%' ? 'bg-green' : 'bg-yellow',
                ]"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { urlPath, apiPath } from '../dataList/path';

export default {
  name: 'Dashboard',
  props: {},
  components: {},
  data() {
    return {
      img_hyjy: require('../../../assets/dashboard/hyjy.png'),
      img_calendar: require('../../../assets/dashboard/calendar.png'),
      img_week: require('../../../assets/dashboard/week.png'),
      title: '',
      meetData: [],
      documentData: [],
      networkData: [],
      projectData: [],
      calendarTitle: this.getFullYearMonth(),
      calendarData: [],
      workData: [],
      dateYear: '',
      dateMonth: '',
    };
  },
  created() {
    this.getTitle();
    this.getMeeting();
    this.getDocument();
    this.getProject();
    this.getCalendar();
    this.getWork();
    this.getNetworkData();
    this.getData();
  },
  methods: {
    // 获取年月
    getData() {
      const res = '';
      const date = new Date();
      this.dateYear = date.getFullYear();
      this.dateMonth = date.getMonth() + 1;
    },
    // 获取标题
    getTitle() {
      // console.log(`${urlPath}/${apiPath}/custom/board/getBoardTitle`);
      this.$http.get(`/${apiPath}/custom/board/getBoardTitle`).then((res) => {
        this.title = res.data.result;
      });
    },
    getNetworkData() {
      this.$http.get(`/${apiPath}/custom/board/listGridsStatus`).then((res) => {
        this.networkData = [
          {
            name: '风险分级管控检查计划执行率',
            status: res.data.result.riskRate,
          },
          {
            name: '供应商督导计划执行率',
            status: res.data.result.areaRate,
          },
          {
            name: '问题计划关闭率',
            status: res.data.result.closeRate,
          },
          {
            name: '季度自诊断完成率',
            status: res.data.result.specialRate,
          },
        ];

        // console.log(res, 'res');
      });
    },
    // 获取会议纪要
    getMeeting() {
      this.$http
        .get(
          `/${apiPath}/custom/board/listMinutes?isPaging=1&pageNum=1&pageSize=5`
        )
        .then((res) => {
          // console.log(res, 'res');
          this.meetData = res.data.result.list;
        });
    },
    // 获取上级发文
    getDocument() {
      this.$http
        .get(
          `/${apiPath}/custom/board/listDocuments?isPaging=1&pageNum=1&pageSize=5`
        )
        .then((res) => {
          // console.log(res, 'doc');
          this.documentData = res.data.result.list;
        });
    },
    // 获取项目名称
    getProject() {
      this.$http
        .get(
          `/${apiPath}/custom/board/listProjects?isPaging=1&pageNum=1&pageSize=4`
        )
        .then((res) => {
          this.projectData = res.data.result.list;
          if (this.projectData.length) {
            this.projectData.map((v) => {
              const start = v.kaishishijian.split('Q')[1];
              const end = v.jieshushijian.split('Q')[1];
              v.q1 = 0;
              v.q2 = 0;
              v.q3 = 0;
              v.q4 = 0;
              if (start == end) {
                v[`q${start}`] = 1;
              } else if (start > end) {
                for (let i = start; i <= 4; i++) {
                  v[`q${i}`] = 1;
                }
              } else {
                for (let i = end; i >= start; i--) {
                  v[`q${i}`] = 1;
                }
              }
            });
          }
        });
    },
    // 获取工作月历
    getCalendar() {
      this.$http.get(`/${apiPath}/custom/board/getCalendar`).then((res) => {
        const data = res.data.result;
        if (data.length) {
          data.map((v) => {
            if (v.start) {
              v.weekArr = this.dateUtil(v.start);
            }
          });
        }
        this.calendarData = data;
      });
    },
    // 获取专项工作
    getWork() {
      this.$http
        .get(
          `/${apiPath}/custom/board/listSpecialWorks?isPaging=1&pageNum=1&pageSize=7`,
          {
            isPaging: 1,
            pageNum: 1,
            pageSize: 5,
          }
        )
        .then((res) => {
          this.workData = res.data.result.list;
        });
    },
    // 时间计算方法
    dateUtil(date) {
      const currentDate = new Date(date).getTime();
      const result = [this.formatDate(date)];
      for (let i = 1; i <= 4; i++) {
        result.push(this.formatDate(currentDate + i * 1000 * 60 * 60 * 24));
      }
      return result;
    },
    // 日期格式化
    formatDate(date) {
      const dateStr = new Date(date);
      const month = dateStr.getMonth() + 1;
      const day = dateStr.getDate();
      return `${month}.${day}`;
    },
    // 获取年月
    getFullYearMonth() {
      const dateStr = new Date();
      return `${dateStr.getFullYear()}年${dateStr.getMonth() + 1}月`;
    },
    // 会议纪要详情跳转链接
    hyjyUrl(url) {
      // console.log(url);
      // form?module=information&app=huiyijiyao&form=2&label=1155
      window.location.href = `/form?module=information&app=huiyijiyao&form=${url}`;
    },
    // 会议纪要more跳转链接
    hyjyMore() {
      window.location.href = '/app/!/information/huiyijiyao';
    },
    // 上级发文详情跳转
    sjfwUrl(url) {
      window.location.href = `/form?module=information&app=shangjifawen&form=${url}`;
    },
  },
};
</script>

<style lang="scss" scoped>
// 公共样式
div {
  box-sizing: border-box;
}
.icon-circle {
  width: 16px;
  height: 16px;
  border-radius: 100%;
}
.bg-yellow {
  background-color: #ffcb00;
}
.bg-green {
  background-color: #29c475;
}
.color-yellow {
  color: #ffcb00;
}
.color-green {
  color: #29c475;
}
.fix-right {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.text-align-center {
  text-align: center;
}
.text-align-right {
  text-align: right;
}
.highlight-color {
  color: black;
}
.display-flex {
  display: flex;
}
.flex-center {
  justify-content: center;
}
.flex-middle {
  align-items: center;
}
.flex-column {
  flex-direction: column;
}
.text-under-line {
  text-decoration: underline;
  cursor: pointer;
}
.inline-block {
  display: inline-block;
  vertical-align: middle;
}
.bg-white {
  background-color: white;
}
.under-line {
  border-bottom: 1px solid #e9e9e9;
}
.title-text {
  font-weight: bold;
  color: black;
}
.list-item {
  padding: 0px 10px;
  font-size: 0.8vw;
}
.title-img {
  width: 20px;
  margin-right: 5px;
}
.flex-1 {
  flex: 1;
}
.left-box {
  flex: 1.3;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  color: #333;
  font-size: 0.9vw;
}
.right-box {
  flex: 2;
  display: flex;
  flex-direction: column;
  color: #333;
  font-size: 0.9vw;
}
.dashboard {
  width: 100%;
  height: 100%;
  background-color: #eee;
  padding: 10px;
  display: flex;
  flex-direction: column;
  .title {
    height: 60px;
    line-height: 60px;
    text-align: center;
    background-color: white;
    color: #4680ff;
    font-size: 1.5vw;
    font-family: 'MFLiHei_Noncommercial';
    font-weight: bold;
  }
  .one-box {
    flex: 1.2;
    margin-top: 10px;
    display: flex;
  }
  .two-box {
    flex: 1;
    margin-top: 10px;
    display: flex;
  }
  .three-box {
    flex: 2;
    margin-top: 10px;
    display: flex;
  }
}
// 会议纪要样式
.box-title {
  padding: 0px 10px;
  height: 40px;
  line-height: 40px;
  position: relative;
  .a-link {
    text-decoration: none;
    color: #4680ff;
    font-size: 14px;
  }
}
.progress {
  width: 100%;
  height: 10px;
}
.week-box {
  background-color: #4680ff;
  color: white;
}
</style>
