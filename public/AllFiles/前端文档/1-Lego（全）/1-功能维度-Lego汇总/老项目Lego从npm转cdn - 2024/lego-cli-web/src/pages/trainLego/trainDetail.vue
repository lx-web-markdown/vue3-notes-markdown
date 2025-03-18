<template>
    <div class="train-detail">
        <form-page
            ref="trainForm"
            :space-id="spaceId"
            :module="module"
            :app="appId"
            :form="form"
            :edit="edit"
            disable-nav
            disable-top-button
            disable-crumb
            @on-init="handleOnInit"
            @form-operation="handleFormOperation"
        />
        <!-- 导入培训人员弹框 -->
        <import-person-dialog 
            v-if="showImportDialog"
            :recordId="mainId"
            :tableId="appId"
            @close="showImportDialog=false"
            @success="importPersonSuccessHandle"
        />
        <!-- 获取导入状态 -->
        <loading-person-list 
            v-show="currentTab === '培训学员' && addPersonStatus === 0"
            :obj="{addPersonStatus,appId:appId,mainId:mainId}" 
            @finish="finishHandle" />
    </div>
</template>

<script>
import { FormPage, FormMaster } from '@qycloud/lego';
import { Message } from 'element-ui';
import ImportPersonDialog from './importPersonDialog.vue';
import LoadingPersonList from './loadingPersonList.vue';

export default {
    name: 'TrainDetail',
    components: {
        FormPage,
        'import-person-dialog': ImportPersonDialog,
        'loading-person-list': LoadingPersonList,
    },
    xComponents: {
        master: FormMaster,
    },
    data() {
        return {
            spaceId: window.globalConfig.user.entId,
            module: 'workflow', // 所属模块
            appId: 'peixunjihua', // 应用名称
            form: '',
            edit: '',
            mainId: null, // 主表id
            formCtx: null, // 主表上下文
            instanceId: null, // 实例id
            departmentId: '', // 申请部门Id
            lingyongleixing: '', // 领用类型
            showApplyDialog: false, // 编辑领用清单弹框
            showStockOutDialog: false, // 编辑出库清单弹框
            sumbitNext: null, // 提交的下一步方法
            currentStep: '', // 当前操作的流程节点
            // extendParams: {
            //     handleTabClickCallback: this.handleTabClickCallback,
            // },
            currentTab: '',
            showImportDialog: false,
           // 导入人员状态   0 进行中   1已完成
            addPersonStatus: '',
        };
    },
    created() {
        this.spaceId = window.globalConfig.user.entId;
        this.module = 'workflow'; // 所属模块
        this.appId = 'peixunjihua'; // 应用名称
        this.form = this.$route.query.formId;
        this.edit = this.$route.query.edit;
        this.getTraineeImportStatus();
        console.log('this.form=', this.form);
        console.log('this.edit=', this.edit);
    },
    methods: {
        // 导入人员成功事件
        importPersonSuccessHandle() {
            // 关闭弹窗
            this.showImportDialog = false;
            this.getTraineeImportStatus();
        },
        // 获取导入状态完成事件
        finishHandle() {
            this.addPersonStatus = 1;
            // 刷新从表
            this.reloadHandle();
        },
        // tab切换事件
        handleTabClickCallback({ id, name }, { from, to, ctx }) {
            console.log('extendParams', id, name, from, to, ctx);
            this.currentTab = name;
            if (this.currentTab === '培训学员') {
                this.getTraineeImportStatus();
            }
        },
        // 获取培训学员导入状态
        getTraineeImportStatus() {
            this.$http
            .get(
            `/sdkApi/ohsms/custom/trainingPlan/getTraineeImportStatus?tableId=${this.appId}&recordId=${this.mainId}`
            )
            .then((res) => {
                this.addPersonStatus = Number(res.data.result);
                if (this.addPersonStatus === 1) {
                    // 刷新从表
                    this.reloadHandle();
                }
                console.log(this.addPersonStatus, '获取导入人员状态');
            });
        },
        // 刷新培训人员从表数据
        reloadHandle() {
            this.formCtx.fetchNewSlaveAction('peixunjihua', 'peixunjihuacongbiao');
        },
        // 获取培训计划主表id
        getMainIdHandle() {
            const options = {
                table: 'peixunjihua',
                field: 'id',
            };
            return this.formCtx.getOneFieldValue(options);
        },
        // 表单加载
        handleOnInit(ctx, type) {
            console.log(type, 'type');
            this.formCtx = ctx;
            if (type === 'edit') {
                this.instanceId = Number(this.formCtx.form);
                this.mainId = Number(this.getMainIdHandle());
            } else {
                this.instanceId = Number(ctx.$store.state.form);
                this.mainId = Number(this.getMainIdHandle());
            }
            
            console.log('表单初始化', this.formCtx, this.mainId, this.instanceId);
        },
        // form按钮点击回调
        handleFormOperation(ctx, {
            action, next, title, params, buttonTitle
        }) {
            console.log('handleFormOperation', ctx, {
                action, next, title, params,
            });
             // 当前工作流的节点
            const currentNode = ctx.$store.state.node || ctx.$store.state.currentStep.node;
            console.log(currentNode, 'currentNode');
            console.log(buttonTitle, 'buttonTitle');
            // 截取【导入】按钮
            if (currentNode === 'WorkNode_3' && action === 'IMPORT') {
                console.log('mianId', this.mainId, this.instanceId);
                console.log('截取导入', this.mainId);
                // 打开定制的导入弹框
                this.showImportDialog = true;
            } else {
                next();
            }
        },
        // 表单事件执行时触发 如 取消、提交 等操作
        /** 关闭按钮：CANCEL
         dataflow取消：DATAFLOW_CANCEL
         dataflow保存：DATAFLOW_SAVE
         workflow取消：WORKFLOW_CANCEL
         workflow存草稿：SAVE_WORKFLOW
         workflow提交：WORKFLOW_EXECUTE */
        // eslint-disable-next-line consistent-return
        async handleFormAction(ctx, {
        action, formData, validate, next 
        }) {
            console.log('点击form底部事件', next);
                    next();
        },
        // 提交保存成功后回调
        afterFormFinished(ctx, next, nodeId) {
            next();
        },
    },
};
</script>

<style lang="scss" scoped>
.train-detail {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
