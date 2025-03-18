<template>
    <div v-if="Number(addPersonStatus)===0" class="loading-person">
        <div
            v-loading="loading"
            class="myloading"
            element-loading-text="数据加载中，请稍后..."
            element-loading-spinner="el-icon-loading"
        />
    </div>
</template>
<script>
export default {
    props: {
        obj: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            loading: true,
            setTimeGetStatus: '',
            // 导入人员状态   0 进行中   1已完成
            addPersonStatus: 2,
            messageBoxShow: false,
            temStatus: '',
        };
    },
    watch: {
        'obj.addPersonStatus': {
            handler(newVal, oldVal) {
                if (Number(newVal) === 0 && Number(oldVal) === 1) {
                    this.addPersonStatus = 0;
                    this.temStatus = 0;
                    this.getStatus();
                }
            },
            immediate: true,
            // deep: true
        },
    },
    mounted() {
        this.getStatus();
    },
    destroyed() {
        this.clearmyInterval();
    },
    methods: {
        finish() {
            this.clearmyInterval();
            if (this.messageBoxShow) {
                this.temStatus = 1;
            } else {
                this.addPersonStatus = 1;
                this.$emit('finish');
            }
        },
        async getStatus() {
            console.log('getStatusgetStatus', this.addPersonStatus, 99);
            if (this.setTimeGetStatus !== '') { return; }

            this.$http
            .get(
            `/sdkApi/ohsms/custom/trainingPlan/getTraineeImportStatus?tableId=${this.obj.appId}&recordId=${this.obj.mainId}`
            )
            .then((res) => {
               console.log(res.data.result, '获取导入人员状态');
                if (Number(res.data.result) === 1) {
                    this.finish();
                    return;
                }
                this.addPersonStatus = 0;
                this.setTimeGetStatus = setInterval(async () => {
                    await this.getStatusMethod();
                }, 5000);
            });
        },
        async getStatusMethod() {

            this.$http
            .get(
            `/sdkApi/ohsms/custom/trainingPlan/getTraineeImportStatus?tableId=${this.obj.appId}&recordId=${this.obj.mainId}`
            )
            .then((res) => {
             console.log(res.data.result, '获取导入人员状态');
                if (Number(res.data.result) === 1) {
                   this.clearmyInterval();
                    this.finish();
                } else {
                    this.addPersonStatus = 0;
                    this.temStatus = 0;
                }
            });
        },
        clearmyInterval() {
            if (this.setTimeGetStatus === '') { return; }
            clearInterval(this.setTimeGetStatus);
            this.setTimeGetStatus = '';
        },
    },
};
</script>
<style lang="scss" scoped>
.loading-person{
    width: 100%;
    height: 100%;
    font-size: 14px;
    color:#fff;
    position: absolute;
    top: 0;
    background: rgba(0,0,0,0.50);
}
.myloading{
    margin-top: 150px;
    ::v-deep.el-loading-spinner .el-loading-text{
        color:#fff;
        font-size: 16px;
    }
    ::v-deep.el-loading-spinner i{
        font-size: 25px;
        margin-bottom: 31px;
        color: #fff;
    }
}
.other-option{
    text-align: center;
    position: absolute;
    width: 100%;
    top:68px;
    span{
        color:#fff;
    }
}
</style>
