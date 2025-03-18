<!-- 导入培训学员 -->
<template>
    <div>
        <el-dialog
            title="导入"
            :visible.sync="dialogVisible"
            width="560px"
            :close-on-click-modal="false"
            :before-close="closeHandle"
        >
            <div class="dialog-container">
                <div class="step">
                    <span class="title">1、请下载导入模板，并按照格式填写：</span>
                    <el-button type="primary" size="small" @click="downloadHandle">点击下载</el-button>
                </div>
                <div class="step">
                    <span class="title">2、请上传填写好的表格：</span>
                    <el-upload
                        ref="upload"
                        :file-list="fileList"
                        :on-change="handleChange"
                        :data="uploadData"
                        :on-success="uploadSuccessHandle"
                        :on-error="uploadErrorHandle"
                        :before-upload="checkFileHandle"
                        :multiple="false"
                        class="upload-demo"
                        name="file"
                        action="/sdkApi/ohsms/custom/trainingPlan/traineeImport"
                    >
                        <el-button size="small" type="primary">上传文件</el-button>
                    </el-upload>
                </div>
             </div>
        </el-dialog>
    </div>
</template>

<script>
import { Button, Dialog, Message } from 'element-ui';

export default {
    components: {
        'el-button': Button,
        'el-dialog': Dialog,
    },
    props: {
        tableId: {
            type: String,
            default: () => 'peixunjihua',
        },
        recordId: {
            type: Number,
            default: () => null,
        },

    },
    data() {
        return {
            dialogVisible: true,
            uploadData: {
                tableId: '',
                recordId: '',
            },
            fileList: []
        };
    },
    created() {
        this.uploadData = {
            tableId: this.tableId,
            recordId: this.recordId,
        };
    },
    methods: {
        // 检查上传事件
        checkFileHandle(file) {
            const typeArr = ['xls', 'xlsx'];
            let temType = '';
            const arr = file.name.split('.');
            temType = arr[arr.length - 1].toLowerCase();
            const isType = typeArr.indexOf(temType) >= 0;
            if (!isType) {
                this.$message({ message: '请上传指定格式的文件!', type: 'error' });
                this.$refs.upload.clearFiles();
                this.fileList = [];
                return false;
            }
            return isType;
        },
        // 取消事件
        closeHandle() {
            this.$emit('close');
        },
        uploadErrorHandle(err) {
            console.log(err);
            this.fileList = [];
        },
        handleChange(file, fileList) {
            this.fileList = fileList.slice(-1);
        },
        // 上传成功事件
        uploadSuccessHandle(res) {
            console.log('上传成功事件', res);
            if (res.status !== 200) {
                this.$refs.upload.clearFiles();
                this.fileList.unshift();
                let message = '';
                if (res.message) {
                    message = res.message.split(',').join('<br />');
                }
                // Message.error(res.message);
                this.$message({
                    dangerouslyUseHTMLString: true,
                    message,
                    type: 'error',
                });
            } else {
                this.$emit('success');
            }
        },
        // 上传文件变化事件
        uploadChangeHandle(fileList) {
            // 因为本次上传限制为1个文件，所以取第一个元素
            if (fileList.length) {
                this.importData.fileData = fileList[0].file;
            } else {
                this.importData.fileData = '';
            }
        },
        // 下载事件
        downloadHandle() {
            console.log('下载模板');
            const localFileName = '培训学员导入模板.xls';
            const origin = window.location.origin;
            const url = `${origin}/sdkApi/ohsms/withoutLogin/down/downloadLocalFile?localFileName=${localFileName}`;
            this.downloadUrl(url, '培训学员导入模板');
        },
        downloadUrl(url, name) {
            const a = document.createElement('a');
            const temArr = url.split('/')[url.split('/').length - 1];
            const fileName = temArr.split('.')[0];
            if (name) {
                a.download = `${name}`;
            } else {
                a.download = `${fileName}`;
            }
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        },
    },
};

</script>
<style lang='scss' scoped>
.dialog-container {
    padding: 0 60px;

    .step {
        margin-bottom: 40px;
        position: relative;
        .el-button {
            background-color: #6696FF !important;
        }
        .title {
            font-size: 14px;
            color: #454545;
            line-height: 26px;
            letter-spacing: 1px;
            float: left;
        }
        .tip-text {
            position: absolute;
            top: 8px;
            right: 15px;
            font-size: 14px;
            color: #B3B3B3;
        }
        ::v-deep {
            .el-upload-list .el-upload-list__item:hover .el-icon-close{
                display: inline-block !important;
            }
            .el-upload-list__item {
                outline: none !important;
            }
        }
    }
}
.dialog-footer {
    button.el-button--primary{
        background-color: #6696FF !important;
        border-color: #6696FF !important;
        width: 80px !important;
        height:30px !important;
        line-height: 0px !important;
        &:hover{
            background-color: #7FA8FF !important;
            border-color: #7FA8FF !important;
        }
    }
    .el-button--default{
        background-color: #C3CCDF !important;
        border-color: #C3CCDF !important;
        width: 80px !important;
        height:30px !important;
        line-height: 0px !important;
        color:#fff !important;
        &:hover{
            background-color: #D1DAF0 !important;
            border-color: #D1DAF0 !important;
        }
    }
}
::v-deep {
    .el-dialog__title {
        font-size: 14px;
        color: #454545;
    }
    .el-dialog__footer {
        text-align: center !important;
    }
}
</style>
