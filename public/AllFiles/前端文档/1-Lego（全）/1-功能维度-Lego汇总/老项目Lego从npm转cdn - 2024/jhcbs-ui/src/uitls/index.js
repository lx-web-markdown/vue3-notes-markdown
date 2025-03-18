export default class MethodsPlugin {
    static install(Vue) {
        Vue.prototype.openAppModule = (fromObj, fromId) => {
            // 在这里拦截事件
            console.log(fromObj, fromId, '拦截事件');
            this.$router.push({
                name: 'shebeijichuxinxifrom',
                query: {
                    module: 'information',
                    app: 'shebeijichuxinxi',
                    form: data.form || data.instance_id || data.id,
                    node: data.node || '',
                    edit: data.edit || '0',
                },
            });
        };
    }
}