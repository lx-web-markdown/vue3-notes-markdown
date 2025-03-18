import Vue from 'vue';
import '@qpaas/vue-plugin-global';

import VueRouter from 'vue-router';
import './install';
import { destroyAllDialogs } from '@qycloud/lego';
import { patchGlobalConfig } from './services';
import {
  Home,
  Login,
  DefaultAppView,
  DefaultAppForm,
  // eslint-disable-next-line import/named
  CustomeFormMaster,
  MulitiAppForm,
  ShiYouShangPinXinXi,
  ShiYouShangPinXinXiForm,
  ZeRenShuQianDing,
  WoDeJianLi,
  WoDeJianLiForm,
} from './pages';

import CommonView from './pages/CommonView/CommonView.vue';
import CommonViewExtend from './pages/CommonView/CommonViewExtend.vue';
import CustomeColumnView from './pages/CommonView/CustomeColumnView.vue';
import CustomeOperatorView from './pages/CommonView/CustomeOperatorView.vue';
import CrumbView from './pages/CommonView/CrumbView.vue';
import LabelView from './pages/CommonView/LabelView.vue';
import ViewActionView from './pages/CommonView/ViewActionView.vue';
import CommonForm from './pages/CommonForm/CommonForm.vue';
import UICustomForm from './pages/CommonForm/UICustomForm.vue';
import OnInitForm from './pages/CommonForm/OnInitForm.vue';
import TopButtonForm from './pages/CommonForm/TopButtonForm.vue';
import CrumbForm from './pages/CommonForm/CrumbForm.vue';
import FieldChangeForm from './pages/CommonForm/FieldValueChangForm.vue';
import SetFieldValueForm from './pages/CommonForm/SetFieldValueForm.vue';
import GetFieldValueForm from './pages/CommonForm/GetFieldValueForm.vue';
import ViewToForm from './pages/ShiYouShangPinXinXi/View/index.vue';
import ReplaceFieldForm from './pages/CommonForm/ReplaceFieldForm.vue';
import CustomeFieldDemo from './pages/CommonForm/CustomeFieldDemo.vue';
import ConditionView from './pages/CommonView/ConditionView.vue';
import ViewSlave from './pages/CommonView/ViewSlave.vue';
import ElementForm from './pages/CommonForm/ElementForm.vue';
import ElementView from './pages/CommonView/ElementView.vue';
import UserInfo from './pages/UserSetting/UserInfo.vue';
import UserGroup from './pages/UserSetting/UserGroup.vue';
import UserSecurity from './pages/UserSetting/UserSecurity.vue';
import MessageSwitch from './pages/UserSetting/MessageSwitch.vue';
import ViewCustomeCondition from './pages/CommonView/ViewCustomeCondition.vue';
import ViewFieldShow from './pages/CommonView/ViewFieldShow.vue';
import ViewListParse from './pages/CommonView/ViewListParse.vue';
import FormSubapp from './pages/CommonForm/FormSubapp.vue';
import FormSlave from './pages/CommonForm/FormSlave.vue';
import FormFieldButton from './pages/CommonForm/FormFieldButton.vue';
import FormBottomButton from './pages/CommonForm/FormBottomButton.vue';
import FormSlaveLineEditField from './pages/CommonForm/FormSlaveLineEditField.vue';
import FormSlaveViewShow from './pages/CommonForm/FormSlaveViewShow.vue';
import CustomeMultipleOperation from './pages/CommonView/CustomeMultipleOperation.vue';
import CustomeViewRowClick from './pages/CommonView/CustomeViewRowClick.vue';
import SlaveViewClick from './pages/CommonForm/SlaveViewClick.vue';
import MultiView from './pages/508/view.vue';
// import MulitiForm from './pages/508/form.vue';
import AttachFieldSize from './pages/AttachSizeCustome/form.vue';
import CustomeViewCheckedFalse from './pages/CommonView/ViewCheckedFalse/view.vue';
import CustomeViewHeaderSlot from './pages/CommonView/ViewHeaderSlot/view.vue';
import SDKForm from './pages/CommonForm/SDKForm/SDKForm.vue';
import AppCall from './pages/CommonView/AppCall/AppCall-21.1.vue';
import AppCallForm from './pages/CommonForm/AppCallForm.vue';

const { globalConfig } = window;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: globalConfig.router.base,
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
    { path: '/MultiView', name: 'MultiView', component: MultiView },
    { path: '/AppCall', name: 'AppCall', component: AppCall },
    { path: '/CommonView', name: 'CommonView', component: CommonView },
    { path: '/CommonViewExtend', name: 'CommonViewExtend', component: CommonViewExtend },
    { path: '/CrumbView', name: 'CrumbView', component: CrumbView },
    { path: '/LabelView', name: 'LabelView', component: LabelView },
    { path: '/ViewActionView', name: 'ViewActionView', component: ViewActionView },
    { path: '/ViewToForm', name: 'ViewToForm', component: ViewToForm },
    { path: '/ConditionView', name: 'ConditionView', component: ConditionView },
    { path: '/ViewSlave', name: 'ViewSlave', component: ViewSlave },
    { path: '/ElementView', name: 'ElementView', component: ElementView },
    { path: '/ViewCustomeCondition', name: 'ViewCustomeCondition', component: ViewCustomeCondition },
    { path: '/ViewFieldShow', name: 'ViewFieldShow', component: ViewFieldShow },
    { path: '/ViewListParse', name: 'ViewListParse', component: ViewListParse },
    { path: '/CustomeColumnView', name: 'CustomeColumnView', component: CustomeColumnView },
    { path: '/CustomeOperatorView', name: 'CustomeOperatorView', component: CustomeOperatorView },
    { path: '/CustomeMultipleOperation', name: 'CustomeMultipleOperation', component: CustomeMultipleOperation },
    { path: '/CustomeViewRowClick', name: 'CustomeViewRowClick', component: CustomeViewRowClick },
    { path: '/CustomeViewCheckedFalse', name: 'CustomeViewCheckedFalse', component: CustomeViewCheckedFalse },
    { path: '/CustomeViewHeaderSlot', name: 'CustomeViewHeaderSlot', component: CustomeViewHeaderSlot },
    { path: '/CommonForm', name: 'CommonForm', component: CommonForm },
    { path: '/UICustomFOrm', name: 'UICustomFOrm', component: UICustomForm },
    { path: '/OnInitForm', name: 'OnInitForm', component: OnInitForm },
    { path: '/TopButtonForm', name: 'TopButtonForm', component: TopButtonForm },
    { path: '/CrumbForm', name: 'CrumbForm', component: CrumbForm },
    { path: '/FieldChangeForm', name: 'FieldChangeForm', component: FieldChangeForm },
    { path: '/SetFieldValueForm', name: 'SetFieldValueForm', component: SetFieldValueForm },
    { path: '/GetFieldValueForm', name: 'GetFieldValueForm', component: GetFieldValueForm },
    { path: '/ReplaceFieldForm', name: 'ReplaceFieldForm', component: ReplaceFieldForm },
    { path: '/CustomeFieldDemo', name: 'CustomeFieldDemo', component: CustomeFieldDemo },
    { path: '/FormFieldButton', name: 'FormFieldButton', component: FormFieldButton },
    { path: '/ElementForm', name: 'ElementForm', component: ElementForm },
    { path: '/FormSubapp', name: 'FormSubapp', component: FormSubapp },
    { path: '/FormSlave', name: 'FormSlave', component: FormSlave },
    { path: '/SDKForm', name: 'SDKForm', component: SDKForm },
    { path: '/SlaveViewClick', name: 'SlaveViewClick', component: SlaveViewClick },
    { path: '/FormBottomButton', name: 'FormBottomButton', component: FormBottomButton },
    { path: '/FormSlaveLineEditField', name: 'FormSlaveLineEditField', component: FormSlaveLineEditField },
    { path: '/UserInfo', name: 'UserInfo', component: UserInfo },
    { path: '/UserGroup', name: 'UserGroup', component: UserGroup },
    { path: '/UserSecurity', name: 'UserSecurity', component: UserSecurity },
    { path: '/MessageSwitch', name: 'MessageSwitch', component: MessageSwitch },
    { path: '/FormSlaveViewShow', name: 'FormSlaveViewShow', component: FormSlaveViewShow },
    { path: '/WoDeJianLi', name: 'WoDeJianLi', component: WoDeJianLi },
    { path: '/AttachFieldSize', name: 'AttachFieldSize', component: AttachFieldSize },
    {
      path: '/:spaceId/WoDeJianLiForm/:id',
      name: 'WoDeJianLiForm',
      component: WoDeJianLiForm,
      props: route => route.params,
    },
    { path: '/ZeRenShuQianDing', name: 'ZeRenShuQianDing', component: ZeRenShuQianDing },
    { path: '/ShiYouShangPinXinXi', name: 'ShiYouShangPinXinXi', component: ShiYouShangPinXinXi },
    {
      path: '/:spaceId/ShiYouShangPinXinXi/form/:id?',
      name: 'ShiYouShangPinXinXiForm',
      component: ShiYouShangPinXinXiForm,
      props: route => Object.assign({}, route.query, route.params),
    },
    {
      path: '/:spaceUri?/app/!/:module/:appId',
      name: 'appView',
      props: true,
      component: DefaultAppView,
    },
    {
      path: '/:spaceUri?/form/customemaster',
      name: 'customemaster',
      props: route => route.query,
      component: CustomeFormMaster,
    },
    {
      path: '/:spaceUri?/form/mulitiapp',
      name: 'mulitiapp',
      props: route => route.query,
      component: MulitiAppForm,
    },
    {
      path: '/:spaceUri?/form',
      name: 'appForm',
      props: route => route.query,
      component: DefaultAppForm,
    },
    {
      path: '/:spaceUri?/:app/detail/:form',
      name: 'appForm',
      props: route => route.query,
      component: DefaultAppForm,
    },
    {
      path: '/AppCall/formPage',
      name: 'appCall',
      props: route => route.query,
      component: AppCallForm,
    },
    // {
    //   path: '/muliti/:spaceUri?/form',
    //   name: 'MulitiForm',
    //   props: route => route.query,
    //   component: MulitiForm,
    // },
  ],
});

router.beforeEach(async (to, _, next) => {
  destroyAllDialogs();
  if (to.matched.some(route => route.meta.requiresAuth === false)) {
    next();
  } else {
    const status = await patchGlobalConfig();
    const isToLoginPage = to.name === 'login';
    if (status === 401) {
      if (isToLoginPage) {
        next();
      } else {
        next('/login');
      }
    } else if (isToLoginPage) {
      next('/');
    } else {
      next();
    }
  }
});

window.routerInstance = router;

export default router;
