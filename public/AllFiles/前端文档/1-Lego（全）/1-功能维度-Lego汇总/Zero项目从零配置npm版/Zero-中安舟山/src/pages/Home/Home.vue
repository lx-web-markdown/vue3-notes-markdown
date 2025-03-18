<template>
  <ul class="app" v-loading="loading">
    <!-- <div class="app-508">
      <div class="app-508-title">508批量选择定制案例</div>
      <div class="app-508-content">
        <li class="app-508-item" v-for="(form, index) in multiList" :key="index">
          <router-link :to="form.link">{{form.name}}</router-link>
        </li>
      </div>
    </div>-->
    <div class="app-special">
      <div class="app-special-title">特殊定制案例</div>
      <div class="app-special-content">
        <li class="app-special-item" v-for="(item, index) in specilaList" :key="index">
          <router-link :to="item.link">{{item.name}}</router-link>
        </li>
      </div>
    </div>
    <div class="app-view">
      <div class="app-view-title">View列表组件的示例</div>
      <div class="app-view-content">
        <li class="app-view-item" v-for="(view, index) in viewList" :key="index">
          <router-link :to="view.link">{{view.name}}</router-link>
        </li>
      </div>
    </div>
    <div class="app-form">
      <div class="app-form-title">FormPage组件的示例</div>
      <div class="app-form-content">
        <li class="app-form-item" v-for="(form, index) in formList" :key="index">
          <router-link :to="form.link">{{form.name}}</router-link>
        </li>
      </div>
    </div>
    <div class="app-usersetting">
      <div class="app-usersetting-title">个人设置组件示例</div>
      <div class="app-usersetting-content">
        <li class="app-usersetting-item" v-for="(form, index) in userSettingList" :key="index">
          <router-link :to="form.link">{{form.name}}</router-link>
        </li>
      </div>
    </div>
    <li v-for="(app, index) in apps" :key="index">
      <router-link :to="app.link">{{app.name}}</router-link>
    </li>
  </ul>
</template>

<script>
import { $http } from '@commonbox/utils';
import { buildSpaceUri } from '@qycloud/cube';

export default {
  name: 'Home',
  data() {
    return {
      loading: true,
      specilaList: [
        // {
        //   name: '508批量选择定制案例',
        //   link: '/MultiView',
        // },
        {
          name: '附件字段支持自定义限制上传文件大小',
          link: '/AttachFieldSize',
        },
      ],
      viewList: [
        {
          name: 'view组件的通用示例',
          link: '/CommonView',
        },
        {
          name: 'view组件的面包屑事件拦截机制',
          link: '/CrumbView',
        },
        {
          name: 'view组件标签点击事件回调',
          link: '/LabelView',
        },
        {
          name: 'view组件列表业务按钮事件拦截',
          link: '/ViewActionView',
        },
        {
          name: 'view列表自定义路由进入form',
          link: '/ViewToForm',
        },
        {
          name: 'view通过外部组件控制筛选条件',
          link: '/ConditionView',
        },
        {
          name: 'view列表和从表一起展示',
          link: '/ViewSlave',
        },
        {
          name: 'view列表的关联要素设置',
          link: '/ElementView',
        },
        {
          name: 'view列表的筛选模块的定制',
          link: '/ViewCustomeCondition',
        },
        {
          name: 'view列表的字段的定制',
          link: '/ViewFieldShow',
        },
        {
          name: 'view列表的值的转换',
          link: '/ViewListParse',
        },
        {
          name: 'view列表自定义列显示',
          link: '/CustomeColumnView',
        },
        {
          name: 'view列表操作列定制',
          link: '/CustomeOperatorView',
        },
        {
          name: 'view列表勾选数据项操作按钮定制',
          link: '/CustomeMultipleOperation',
        },
        {
          name: 'view列表支持行点击事件并高亮',
          link: '/CustomeViewRowClick',
        },
        {
          name: 'view列表支持勾选框根据数据设置可选/不可选',
          link: '/CustomeViewCheckedFalse',
        },
        {
          name: 'view列表头部增加插槽',
          link: '/CustomeViewHeaderSlot',
        },
        {
          name: 'view列表数据按钮跨应用赋值',
          link: '/AppCall',
        },
      ],
      formList: [
        {
          name: 'formPage组件的通用示例',
          link: '/CommonForm',
        },
        {
          name: 'formPage详情页导航栏，面包屑，顶部按钮，底部按钮的显示/隐藏',
          link: '/UICustomFOrm',
        },
        {
          name: 'formPage初始化事件回调',
          link: '/OnInitForm',
        },
        {
          name: 'formPage顶部按钮事件拦截',
          link: '/TopButtonForm',
        },
        {
          name: 'formPage面包屑事件拦截',
          link: '/CrumbForm',
        },
        {
          name: 'formPage字段值改变事件的回调',
          link: '/FieldChangeForm',
        },
        {
          name: 'formPage字段值赋值方法',
          link: '/SetFieldValueForm',
        },
        {
          name: 'formPage获取表单值',
          link: '/GetFieldValueForm',
        },
        {
          name: 'formPage弹窗形式字段定制',
          link: '/ReplaceFieldForm',
        },
        {
          name: 'formPage单个字段定制',
          link: '/customeFieldDemo',
        },
        {
          name: 'form详情页关联要素组件使用',
          link: '/ElementForm',
        },
        {
          name: 'form详情页字应用展示本身子应用或从表',
          link: '/FormSubapp',
        },
        {
          name: 'form从表定制项',
          link: '/FormSlave',
        },
        {
          name: 'form字段后加按钮',
          link: '/FormFieldButton',
        },
        {
          name: 'form底部按钮支持定制',
          link: '/FormBottomButton',
        },
        {
          name: 'form从表行编辑字段定制',
          link: '/FormSlaveLineEditField',
        },
        {
          name: 'form从表列显示支持定制',
          link: '/FormSlaveViewShow',
        },
        {
          name: 'form从表列表支持行点击',
          link: '/SlaveViewClick',
        },
        {
          name: 'form综合定制案例',
          link: '/SDKForm',
        },
      ],
      userSettingList: [
        {
          name: '个人设置我的信息',
          link: '/UserInfo',
        },
        {
          name: '个人设置角色组编辑',
          link: '/UserGroup',
        },
        {
          name: '个人设置账号安全',
          link: '/UserSecurity',
        },
        {
          name: '个人设置代办推送订阅',
          link: '/MessageSwitch',
        },
      ],
      apps: [],
    };
  },
  created() {
    const spaceId = window.AY.getSpaceId();
    $http
      .get(buildSpaceUri('/api2/appcenter/applist/id', spaceId))
      .then((response) => {
        const applist = response.data.result.reduce((apps, app) => {
          if (['information', 'workflow'].indexOf(app.app_type) > -1) {
            apps.push(app);
            return apps;
          }
          if (app.children && app.children.length > 0) {
            if (app.children && app.children.length) {
              app.children.forEach((item) => {
                if (['information', 'workflow'].includes(item.app_type)) {
                  apps.push(item);
                }
                if (item.children && item.children.length) {
                  apps = apps.concat(
                    item.children.filter(val => ['information', 'workflow'].includes(val.app_type)),
                  );
                }
              });
            }
          }
          // if (app.children && app.children.length > 0) {
          //   apps = apps.concat(
          //     app.children.filter(
          //       item => ['information', 'workflow'].indexOf(item.app_type) > -1,
          //     ),
          //   );
          // }
          return apps;
        }, []);
        this.apps = this.apps.concat(applist);
        this.loading = false;
      });
  },
};
</script>

<style lang="scss">
.app {
  padding-left: 20px;
  width: 100%;
  &-view {
    border-bottom: 1px solid #4680ff;
    margin-bottom: 20px;
    width: 100%;
    &-title {
      font-size: 25px;
      color: #4680ff;
      margin-bottom: 10px;
    }
    &-content {
    }
    &-item {
      margin-bottom: 10px;
    }
  }

  &-form {
    border-bottom: 1px solid red;
    margin-bottom: 20px;
    width: 100%;

    &-title {
      font-size: 25px;
      color: red;
      margin-bottom: 10px;
    }
    &-content {
    }
    &-item {
      margin-bottom: 10px;
    }
  }

  &-usersetting {
    border-bottom: 1px solid purple;
    margin-bottom: 20px;
    width: 100%;

    &-title {
      font-size: 25px;
      color: red;
      margin-bottom: 10px;
    }
    &-content {
    }
    &-item {
      margin-bottom: 10px;
    }
  }

  &-508 {
    border-bottom: 1px solid purple;
    margin-bottom: 20px;
    width: 100%;

    &-title {
      font-size: 25px;
      color: red;
      margin-bottom: 10px;
    }
    &-content {
    }
    &-item {
      margin-bottom: 10px;
    }
  }
  &-special {
    border-bottom: 1px solid purple;
    margin-bottom: 20px;
    width: 100%;

    &-title {
      font-size: 25px;
      color: brown;
      margin-bottom: 10px;
    }
    &-content {
    }
    &-item {
      margin-bottom: 10px;
    }
  }
}
</style>
