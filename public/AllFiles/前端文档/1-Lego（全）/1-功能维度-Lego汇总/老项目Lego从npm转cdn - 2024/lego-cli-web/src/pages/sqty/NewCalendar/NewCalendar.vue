<template>
    <div class="NewCalendar">
        <div class="calendar">
            <cus-calendar v-model="value" id="calendar" :key="menuKey" v-on:pickDay="pickDay">
                <template slot="dateCell" slot-scope="{ date, data }">
                    <div
                        :class="[
              goDetail(date, data, true) ? 'holiday' : '',
              'day',
              rangeTime(festivalDays, data.day) ? 'custom-festival' : '',
            ]"
                    >
                        <span
                            v-if="data.type === 'current-month'"
                            :class="
                rangeTime(workDays, data.day)
                  ? 'workday'
                  : String(date).includes('Sat') ||
                    String(date).includes('Sun') ||
                    rangeTime(festivalDays, data.day)
                  ? 'rest'
                  : 'workday'
              "
                        >
                            {{
                            rangeTime(workDays, data.day)
                            ? '上班'
                            : String(date).includes('Sat') ||
                            String(date).includes('Sun') ||
                            rangeTime(festivalDays, data.day)
                            ? '休息'
                            : '上班'
                            }}
                        </span>
                        <!-- <span :class="rangeTime(workDays, data.day) ? 'workday' : 'rest'">{{
              rangeTime(workDays, data.day) ? '上班' : '休息'
                        }}</span>-->
                        <div class="calendar-day">
                            <span>{{ data.day.split('-').slice(2).join('-') }}</span>
                            <!-- <i class="el-icon-check" v-if="data.day.split('-').slice(2).join('-').includes('1')"></i>
                            <i class="el-icon-warning-outline" v-else></i>-->
                        </div>
                        <div class="lunar">
                            <span>{{ solarToLunar(date, data) }}</span>
                            <div
                                v-if="data.type === 'current-month'"
                                @click="
                  goDetail2(
                    date,
                    data.day,
                    rangeTime(workDays, data.day)
                      ? '否'
                      : String(date).includes('Sat') ||
                        String(date).includes('Sun') ||
                        rangeTime(festivalDays, data.day)
                      ? '是'
                      : '否'
                  )
                "
                                class="setDetail"
                                :class="
                  rangeTime(workDays, data.day)
                    ? 'open'
                    : String(date).includes('Sat') ||
                      String(date).includes('Sun') ||
                      rangeTime(festivalDays, data.day)
                    ? 'close'
                    : 'open'
                "
                                ref="button"
                            ></div>
                        </div>
                    </div>
                </template>
            </cus-calendar>
        </div>
    </div>
</template>

<script>
import CusCalendar from '../calendar/src/main.vue';
import {
  standard2simpleDate,
  rangeTime,
  standardGetForYearAndMonth,
} from '../../../utils/dealDate';
import calendarjs from '../../../utils/calendar';
import { urlPath, apiPath } from '../dataList/path';

export default {
  name: 'NewCalendar',
  props: {
    uname: {
      type: String,
      default: '',
    },
  },
  components: { CusCalendar },
  data() {
    return {
      value: new Date(),
      month: standardGetForYearAndMonth(new Date()),
      schedulingDate: '',
      menuKey: 1,
      festivalDays: null,
      workDays: null,
      params: {
        isPaging: 0,
        workDate: '',
        workOrNo: '是',
        // pageNum: 1,
        // pageSize: 10,
        term: '',
      },
      sta: '',
    };
  },
  created() {
    this.setFestival();
    console.log(this.date, this.data, '69');
  },
  mounted() {},
  methods: {
    pickDay(day) {
      this.month = day.substring(0, 7);
    },
    rangeTime,
    setFestival() {
      // 设置节日
      this.$http
        .get(
          `/${apiPath}/custom/calendar/getUserScheadule?uname=${this.uname}&month=${this.month}`
        )
        .then((res) => {
          this.festivalDays = res.data.result.vacation;
          // this.festivalDays = [
          //   {
          //     base: 'DYSPGA',
          //     customVacation: '国庆假期',
          //     end: '2021-05-05',
          //     name: '王祖乐',
          //     start: '2021-05-01',
          //     year: '2021',
          //   },
          // ];
          // console.log(this.festivalDays, '77');
          this.workDays = res.data.result.workday;
          // this.workDays = [
          //   {
          //     base: 'DYSPGA',
          //     customVacation: '国庆假期',
          //     end: '2021-05-03',
          //     name: '王祖乐',
          //     start: '2021-05-02',
          //     year: '2021',
          //   },
          //   {
          //     base: 'DYSPGA',
          //     customVacation: '国庆假期',
          //     end: '2021-05-08',
          //     name: '王祖乐',
          //     start: '2021-05-08',
          //     year: '2021',
          //   },
          // ];
          const arr = res.data.result.vacation;
          // const arr = this.festivalDays;
          const dealArr = [];
          for (let i = 0; i < arr.length; i += 1) {
            dealArr.push({
              date: [standard2simpleDate(arr[i].start)],
              fes: { title: arr[i].jiejiarimingcheng },
            });
          }
          const obj = {};
          dealArr.forEach((item) => {
            // obj[item.date] = item.fes;
            obj[item.date] = '';
          });
          console.log(this.value, '182');
          if (this.value.getFullYear() === new Date().getFullYear()) {
            calendarjs.setFestival(obj);
          } else {
            calendarjs.setFestival({});
          }
        });
    },
    goDetail(date, data, needBG) {
      // console.log(date, data, '111');
      let holiday = false;
      if (needBG) {
        if (String(date).includes('Sat') || String(date).includes('Sun')) {
          holiday = true;
        }
      } else {
        this.dialogTableVisible = true;
        this.schedulingDate = data.day;
        console.log(this.schedulingDate, '151');
        /* 判断是否上班
          放假：节假日加周末（除补班的）
          上班的：补班的加工作日（除节假日）
        */
        let workOrNo = '';
        if (
          this.rangeTime(this.festivalDays, data.day)
          || ((String(date).includes('Sat') || String(date).includes('Sun'))
            && !this.rangeTime(this.workDays, data.day))
        ) {
          workOrNo = '否';
        } else {
          workOrNo = '是';
        }
        console.log(data, workOrNo, '122');
        this.params = {
          isPaging: 0,
          workDate: data.day,
          workOrNo,
          // pageNum: this.currentPage,
          // pageSize: this.pageSize,
        };
        // this.getScheduling(this.params);
      }
      return holiday;
    },
    goDetail2(date, data, sta) {
      this.sta = sta;
      this.$http
        .post(
          `/${apiPath}/custom/calendar/saveSingleScheadule?uname=${this.uname}&today=${data}&workOrNo=${sta}`
        )
        .then((res) => {
          console.log(res);
          if (res.data.status === 200) {
            this.setFestival();
          } else {
            this.$message('接口出错了');
          }
        });
    },
    // 公历转农历
    solarToLunar(slotDate, slotData) {
      const solarDayArr = slotData.day.split('-');
      const lunarDay = calendarjs.solar2lunar(
        solarDayArr[0],
        solarDayArr[1],
        solarDayArr[2]
      );
      // 农历日期
      const lunarMD = lunarDay.IMonthCn + lunarDay.IDayCn;
      // 公历节日\农历节日\农历节气
      let festAndTerm = [];
      festAndTerm.push(
        lunarDay.festival == null ? '' : ` ${lunarDay.festival}`
      );
      festAndTerm.push(
        lunarDay.lunarFestival == null ? '' : `${lunarDay.lunarFestival}`
      );
      // festAndTerm.push(lunarDay.Term == null ? '' : `${lunarDay.Term}`);
      festAndTerm = festAndTerm.join('');
      return festAndTerm === '' ? lunarMD : festAndTerm;
    },
  },
  watch: {
    uname() {
      this.setFestival();
    },
    // festivalDays: {
    //   handler() {
    //     this.menuKey = this.menuKey + 1;
    //   },
    //   immediate: true,
    //   deep: true,
    // },
    // workDays: {
    //   // 重新渲染日历，把自定义节日加入
    //   handler() {
    //     this.menuKey = this.menuKey + 1;
    //   },
    //   immediate: true,
    //   deep: true,
    // },
    value(nval) {
      this.setFestival();
    },
  },
};
</script>

<style lang="scss" scoped>
.NewCalendar {
  .calendar {
    .is-selected {
      color: #f8a535;
      font-size: 10px;
      margin-top: 5px;
    }
    #calendar
      .el-button-group
      > .el-button:not(:first-child):not(:last-child):after {
      content: '当月';
    }
    .holiday {
      color: red;
      height: 100%;
      .calendar-day {
        span {
          color: red;
        }
      }
    }
    .day {
      position: relative;
      .rest {
        position: absolute;
        top: 8px;
        right: 8px;
        color: #fff;
        font-size: 12px;
        display: inline-block;
        width: 30px;
        height: 20px;
        line-height: 20px;
        background-color: #ed784a;
        text-align: center;
      }
      .workday {
        position: absolute;
        top: 8px;
        right: 8px;
        color: #fff;
        font-size: 12px;
        display: inline-block;
        width: 30px;
        height: 20px;
        line-height: 20px;
        background-color: #86c166;
        text-align: center;
      }
      .calendar-day {
        text-align: center;
        color: #202535;
        padding-top: 30px;
        font-size: 24px;
        font-weight: 600;
        position: relative;
        i {
          position: absolute;
          top: 12px;
          right: 12px;
          font-size: 14px;
          font-weight: 700;
          border-radius: 100%;
          background: rgb(241, 148, 7);
          color: #fff;
        }
        .el-icon-check {
          background: rgba(7, 241, 124, 0.877);
        }
      }
      .lunar {
        font-size: 14px;
        line-height: 26px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        .el-button--small,
        .el-button--small.is-round {
          padding: 4px 8px;
          height: 26px;
        }
      }
      .setDetail {
        width: 45px;
        height: 25px;
      }
      .open {
        background: url('../../../assets/newCalender/open.png') no-repeat;
        background-size: 100% 100%;
      }
      .close {
        background: url('../../../assets/newCalender/close.png') no-repeat;
        background-size: 100% 100%;
      }
    }
    .el-pagination {
      padding-top: 20px;
      display: flex;
      justify-content: flex-end;
    }
    ::v-deep {
      .el-calendar-table:not(.is-range) td.next,
      .el-calendar-table:not(.is-range) td.prev {
        pointer-events: none;
      }
      .el-table__fixed-right::before,
      .el-table__fixed::before {
        height: 0;
      }
      .el-table .cell {
        overflow: visible;
        line-height: 28px;
      }
      .el-icon-search {
        cursor: pointer;
      }
      .el-table th {
        background: #ddd;
        font-weight: 700;
      }
      .el-dialog__body {
        padding-bottom: 0;
        padding-top: 60px;
        .el-input--suffix {
          position: absolute;
          top: 70px;
          left: 20px;
          width: 200px;
        }
      }
    }
    .prev,
    .next {
      .calendar-day {
        color: #ccc;
        i {
          display: none;
        }
      }
      .el-button {
        display: none;
      }
      .holiday {
        color: #f8a8a8;
        height: 100%;
        .calendar-day {
          span {
            color: #f8a8a8;
          }
        }
      }
      .rest {
        color: #f8a8a8;
      }
      .workday {
        color: rgb(66, 186, 226);
      }
    }
  }
}
</style>
