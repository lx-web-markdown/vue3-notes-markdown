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
            module: 'workflow', // 所属模块
            appId: 'shigongxiangmuguanli', // 应用名称
            slaveDataLen: 0
        };
    },
    methods: {
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
            } if (action === 'WORKFLOW_EXECUTE') {
                // 项目结束时间-项目开始时间/90对比项目阶段的数量
                const { xiangmukaishiriqi, xiangmujieshuriqi } = this.getFormData(ctx);
                const days = Math.ceil(moment(xiangmujieshuriqi).diff(moment(xiangmukaishiriqi), 'days') / 90);
                if (days > this.slaveDataLen) {
                    createDialog({
                        data: {
                            form: {
                                module: 'workflow',
                                app: this.appId,
                                form: this.form,
                                node: this.node,
                                spaceId: this.spaceId,
                                edit: '0',
                            },
                            title: '提示',
                        },
                        content: `您好,您添加的阶段不足,每个阶段最长为${this.slaveDataLen}个月!`,
                        buttons: [{
                            className: 'cancel',
                            label: '关闭',
                            type: 'cancel',
                            callback: (e) => {
                            e.close();
                            } 
                        }],
                        onClose: () => {},
                        width: 200,
                        height: 200,
                    });
                    return false;
                }
            }
            validate().then(result => {
                if (result) {
                    next();
                }
            });
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
