<!-- 项目信息列表 -->
<template>
    <div class="lego-container">
        <div v-if="pageType === 'list'" class="ws-lego-list">
            <AppView
                :module="module"
                :app-id="appId"
                :space-id="spaceId"
                :open-form-callback="openFormCallback"
                :on-view-action-call-back="onViewActionCallBack" 
            />
        </div>
        <div v-if="pageType === 'form'" class="ws-lego-detail">
            <FormPage ref="form"
                :space-id="spaceId"
                :module="module"
                :app="appId"
                :form="form"
                :node="node"
                :edit="edit"
                disable-nav
                disable-top-button
                disable-crumb
                :after-form-finished="afterFormFinished"
                @form-action="onFormAction"
                @slave-table-init="handleSlaveTableInit"
                @field-value-changed="onFieldValueChanged"
                @on-init="handleOnInit"
            />
        </div>
    </div>
</template>

<script>
import { AppView, FormPage, createDialog } from '@qycloud/lego';
import utils from '@51safety/safety-utils';
import moment from 'moment';

const {
    querystring: {
        getQsObj
    },
} = utils;

export default {
    name: 'projectManagement',
    components: {
        AppView,
        FormPage
    },
    data() {
        return {
            pageType: getQsObj().pageType || 'list', // list列表/form详情
            form: getQsObj().form || '', // 详情id
            edit: getQsObj().edit, // 是否可编辑
            node: '',
            // spaceId: window.globalConfig.user.entId,
            spaceId: 'shangqitongyongqiche',
            module: 'information', // 所属模块
            appId: 'yirenyidang', // 应用名称
            slaveDataLen: 0
        };
    },
    methods: {
        handleOnInit(ctx, type, nodeId) {
            const { zuoyezhenghao } = this.getFormData(ctx);
            if (zuoyezhenghao.length === 18) {
                const gender = this.getGender(zuoyezhenghao);
                const age = this.getAge(zuoyezhenghao);        
                ctx.setFieldValue({
                    table: 'yirenyidang',
                    field: 'nianling',
                    value: age,
                });
                ctx.setFieldValue({
                    table: 'yirenyidang',
                    field: 'xingbie',
                    value: gender,
                });                
            }
        },
        getFormData(ctx) {
            const baseInfo = ctx.getFieldsValue();
            const masterInfo = baseInfo[Object.keys(baseInfo)[0]];
            const master = masterInfo.master;
            const formData = {};
            for (const key in master) {
                if (Object.hasOwnProperty.call(master, key)) {
                    const element = master[key];
                    formData[key] = element.value;
                }
            }
            return formData;
        },               
        onFieldValueChanged(ctx, { table, field, value }) {
            if (field === 'zuoyezhenghao' && value.length === 18) {
                // 根据身份证号计算性别年龄
                const gender = this.getGender(value);
                const age = this.getAge(value);
                console.log('gender', gender, '-----age', age);
                ctx.setFieldValue({
                    table,
                    field: 'nianling',
                    value: age,
                });
                ctx.setFieldValue({
                    table,
                    field: 'xingbie',
                    value: gender,
                });
            } else if (field === 'zuoyezhenghao' && value.length !== 18) {
                ctx.setFieldValue({
                    table,
                    field: 'nianling',
                    value: '',
                });
                ctx.setFieldValue({
                    table,
                    field: 'xingbie',
                    value: '',
                });                
            }
        },
        getGender(idCard) {
            const sexNum = idCard.substring(16, 17);
            return sexNum % 2 === 0 ? '女' : '男';
        },
        getAge(idCard) {
            // 获取出生日期
            const birthDateStr = idCard.substring(6, 14);
            const birthDate = new Date(birthDateStr.substring(0, 4), parseInt(birthDateStr.substring(4, 6)) - 1, birthDateStr.substring(6, 8));
            // 计算当前年份与出生年份的差值
            const now = new Date();
            const age = now.getFullYear() - birthDate.getFullYear();
            // 如果当前月份小于出生月份或者当前月份等于出生月份但是当前日期小于出生日期则年龄减1
            if ((now.getMonth() < birthDate.getMonth() || (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate())) && age > 0) {
                return age - 1;
            }
            return age;
        },      
        handleSlaveTableInit(ctx, { masterTableId, slaveTableId, slaveInfo }) {
            this.slaveDataLen = slaveInfo.value.length;
        },
        afterFormFinished(ctx, next, nodeId) {
            this.pageType = 'list';
        },
        onFormAction(ctx, {
 action, formData, validate, next 
}) {
            if (['CANCEL', 'DATAFLOW_CANCEL', 'WORKFLOW_CANCEL', 'SAVE_WORKFLOW'].indexOf(action) > -1) {
                return this.pageType = 'list';
            }
            validate().then(result => {
                if (result) {
                    next();
                }
            });
        }, 
        openFormCallback(ctx, data) {
            if (data.id) {
                this.form = data.id;
                this.edit = 0;
            } else {
                this.form = '';
            }
            this.pageType = 'form';
        },
        async onViewActionCallBack(ctx, params) {
            if (params.action === 'EDIT') {
                this.form = params.radioProps.recordId;
                this.edit = 1;
                this.pageType = 'form';
            } else {
                params.next();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.lego-container, .ws-lego-list, .ws-lego-detail {
    width: 100%;
    height: 100%;
}
</style>
