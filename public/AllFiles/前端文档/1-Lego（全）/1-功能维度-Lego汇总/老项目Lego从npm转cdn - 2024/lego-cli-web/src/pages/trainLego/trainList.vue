<!-- 培训计划列表 -->
<template>
    <div class="receive-page-list">
        <DesignerAppView
            :module="module"
            :app-id="appId"
            :space-id="spaceId"
            :open-form-callback="openFormCallback"
        />
    </div>
</template>

<script>
import { DesignerAppView } from '@qycloud/lego';

export default {
    name: 'ReceiveList',
    components: {
        DesignerAppView,
    },
    data() {
        return {
            spaceId: window.globalConfig.user.entId,
            module: 'workflow', // 所属模块
            appId: 'peixunjihua', // 应用名称
        };
    },
    methods: {
        // view 列表打开 form 事件拦截
        openFormCallback(ctx, data) {
            console.log('data.id=', data.id);
            console.log('data.edit=', data.edit);
            if (data.edit) {
                this.$router.push({
                    name: 'trainDetail',
                    query: { formId: data.id, edit: data.edit },
                });
            } else {
                this.$router.push({
                    name: 'trainDetail',
                    query: { formId: data.id },
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.receive-page-list {
    width: 100%;
    height: 100%;
}
</style>
