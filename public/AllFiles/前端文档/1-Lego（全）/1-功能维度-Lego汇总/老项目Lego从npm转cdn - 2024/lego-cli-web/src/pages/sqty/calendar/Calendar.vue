<template>
  <div class="calendar">
    <cus-calendar v-model="value" id="calendar" :key="menuKey">
      <template slot="dateCell" slot-scope="{ date, data }">
        <div
          :class="[
            goDetail(date, data, true) ? 'holiday' : '',
            'day',
            rangeTime(festivalDays, data.day) ? 'custom-festival' : '',
          ]"
        >
          <span class="rest">{{
            rangeTime(festivalDays, data.day) ? '休' : ''
          }}</span>
          <span class="workday">{{
            rangeTime(workDays, data.day) ? '班' : ''
          }}</span>
          <div class="calendar-day">
            <span>{{ data.day.split('-').slice(2).join('-') }}</span>
            <!-- <i class="el-icon-check" v-if="data.day.split('-').slice(2).join('-').includes('1')"></i>
                        <i class="el-icon-warning-outline" v-else></i> -->
          </div>
          <div class="lunar">
            <span>{{ solarToLunar(date, data) }}</span>
            <el-button type="primary" @click="goDetail(date, data)" size="small"
              >设置排休</el-button
            >
          </div>
        </div>
      </template>
    </cus-calendar>
    <el-dialog
      :title="`${schedulingDate}排班表`"
      :visible.sync="dialogTableVisible"
      @closed="closeDialog"
      :modal-append-to-body="false"
    >
      <el-input
        v-model="searchName"
        placeholder="请输入"
        size="small"
        @blur="handleIconClick"
      >
        <i
          class="el-icon-search el-input__icon"
          slot="suffix"
          @click="handleIconClick"
        >
        </i>
      </el-input>
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="base" label="组织名称"> </el-table-column>
        <el-table-column prop="department" label="部门"> </el-table-column>
        <el-table-column prop="fenbu" label="分部"> </el-table-column>
        <el-table-column prop="workshop" label="科室"> </el-table-column>
        <el-table-column fixed="right" label="是否上班" width="140">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.isWork"
              active-text="是"
              inactive-text="否"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveBtn()">保存</el-button>
      </span>
      <!-- <el-pagination
                v-if="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="sizes, prev, pager, next"
                :total="total">
            </el-pagination> -->
    </el-dialog>
  </div>
</template>

<script>
import { cloneDeep, isEqual, throttle } from 'lodash';
import calendarjs from '../../../utils/calendar';
import { standard2simpleDate, rangeTime } from '../../../utils/dealDate';
import CusCalendar from './src/main.vue';
import { urlPath, apiPath } from '../dataList/path';

export default {
  name: 'CalendarComp',
  components: {
    CusCalendar,
  },
  data() {
    return {
      value: new Date(),
      month: '',
      dialogTableVisible: false,
      tableData: [],
      multipleSelection: [],
      schedulingDate: '',
      currentPage: 1,
      pageSize: 10,
      searchName: '',
      total: 0,
      menuKey: 1,
      festivalDays: null,
      workDays: null,
      originList: null,
      params: {
        isPaging: 0,
        workDate: '',
        workOrNo: '是',
        // pageNum: 1,
        // pageSize: 10,
        term: '',
      },
    };
  },
  created() {
    this.setFestival();
  },
  methods: {
    // eslint-disable-next-line
    /* eslint-disable */
    rangeTime,
    // 设置节日
    setFestival() {
      // 设置节日
      this.$http.get(`/${apiPath}/custom/calendar/listVacation`).then((res) => {
        this.festivalDays = res.data.result.vacation;
        this.workDays = res.data.result.workday;
        const arr = res.data.result.vacation;
        const dealArr = [];
        for (let i = 0; i < arr.length; i += 1) {
          dealArr.push({
            date: [standard2simpleDate(arr[i].start)],
            fes: { title: arr[i].customVacation },
          });
        }
        const obj = {};
        dealArr.forEach((item) => {
          obj[item.date] = item.fes;
        });
        if (this.value.getFullYear() === new Date().getFullYear()) {
          calendarjs.setFestival(obj);
        } else {
          calendarjs.setFestival({});
        }
      });
    },
    goDetail(date, data, needBG) {
      let holiday = false;
      if (needBG) {
        if (String(date).includes('Sat') || String(date).includes('Sun')) {
          holiday = true;
        }
      } else {
        this.dialogTableVisible = true;
        this.schedulingDate = data.day;
        /* 判断是否上班
          放假：节假日加周末（除补班的）
          上班的：补班的加工作日（除节假日）
        */
        let workOrNo = '';
        if (
          this.rangeTime(this.festivalDays, data.day) ||
          ((String(date).includes('Sat') || String(date).includes('Sun')) &&
            !this.rangeTime(this.workDays, data.day))
        ) {
          workOrNo = '否';
        } else {
          workOrNo = '是';
        }

        this.params = {
          isPaging: 0,
          workDate: data.day,
          workOrNo,
          // pageNum: this.currentPage,
          // pageSize: this.pageSize,
        };
        this.getScheduling(this.params);
      }
      return holiday;
    },
    // 日历排班接口
    getScheduling(params) {
      this.$http
        .get(`/${apiPath}/custom/calendar/listStaffScheadule`, {
          params,
        })
        .then((res) => {
          this.total = res.data.result.total;
          for (let i = 0; i < res.data.result.list.length; i += 1) {
            res.data.result.list[i].isWork =
              res.data.result.list[i].workOrNo === '是';
          }
          this.originList = cloneDeep(res.data.result.list);
          this.tableData = res.data.result.list;
        });
    },
    // 排班保存修改
    saveBtn: throttle(function () {
      const arr = [];
      if (!isEqual(this.originList, this.tableData)) {
        for (let i = 0; i < this.tableData.length; i += 1) {
          if (this.tableData[i].isWork !== this.originList[i].isWork) {
            arr.push({
              workOrNo: this.tableData[i].isWork ? '是' : '否',
              id: this.tableData[i].id,
            });
          }
        }
        this.$http
          .post(`/${apiPath}/custom/calendar/saveScheadule`, {
            staffScheaduleList: JSON.stringify(arr),
          })
          .then((res) => {
            if (res.data.status === 200) {
              this.getScheduling(this.params);
              this.$message({
                message: '保存成功！',
                type: 'success',
              });
              this.dialogTableVisible = false;
            }
          });
      } else {
        this.$message('暂无修改');
      }
    }, 1000),
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.getScheduling(this.params);
    },
    handleCurrentChange(val) {
      this.params.pageNum = val;
      this.getScheduling(this.params);
      this.saveBtn(true);
    },
    // 搜索
    handleIconClick() {
      this.params.pageNum = 1;
      this.params.term = this.searchName;
      this.getScheduling(this.params);
    },
    // 关闭dialog
    closeDialog() {
      this.params = {
        isPaging: 0,
        workDate: '',
        workOrNo: '是',
        // pageNum: 1,
        // pageSize: 10,
      };
      this.searchName = '';
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
    festivalDays: {
      handler() {
        this.menuKey = this.menuKey + 1;
      },
      immediate: true,
      deep: true,
    },
    workDays: {
      // 重新渲染日历，把自定义节日加入
      handler() {
        this.menuKey = this.menuKey + 1;
      },
      immediate: true,
      deep: true,
    },
    value(nval) {
      this.setFestival();
    },
  },
};
</script>

<style lang="scss" scoped>
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
      left: 8px;
      color: red;
      font-size: 12px;
    }
    .workday {
      position: absolute;
      top: 8px;
      left: 8px;
      color: DeepSkyBlue;
      font-size: 12px;
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
</style>
