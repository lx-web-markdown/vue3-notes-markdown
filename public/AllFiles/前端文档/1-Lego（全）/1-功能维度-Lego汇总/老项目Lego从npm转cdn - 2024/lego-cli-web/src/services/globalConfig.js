import { $http } from '@commonbox/utils';
import { AYSocketConnection } from '@qycloud/lego';

// const internalIp = require('internal-ip');

const { server: { www } } = require('../../config/server');

const setUser = async () => {
  if (!window.globalConfig.user) {
    const { data: { result } } = await $http.get('/api2/user/info');
    window.globalConfig.user = result;
    window.globalConfig.user.id = result.userId;
    window.globalConfig.user.name = result.realName;
  }
};

const setSocketInstance = () => {
  if (!window.socketInstance) {
    window.socketInstance = new AYSocketConnection();
  }
};

const whitelist = ['root', 'ws', 'websocketProtocol', 'websocket', 'isDynamic'];
const parseServer = combineServer => Object.keys(combineServer).reduce((result, key) => {
  if (whitelist.includes(key)) {
    result[key] = combineServer[key];
  } else {
    const url = combineServer[key].replace(/\/$/, '');
    result[key] = `${url}/`;
  }
  return result;
}, {});

const getGlobalServer = async () => {
  const serverConfig = await $http.get('/napi/global/server');
  // console.log(serverConfig, 'serverConfig');
  const combineServer = Object.assign({}, { www }, serverConfig.data);
  window.globalConfig.server = parseServer(combineServer);
  window.globalConfig.previewUrl = serverConfig.data.preview;
  if (!window.globalConfig.websocketConfig) {
    window.globalConfig.websocketConfig = JSON.stringify({
      socketDomain: serverConfig.data.socketDomain,
      // loginIp: internalIp.v4.sync() || null,
    });
  }
  setSocketInstance();
};

const getWebChatConfig = async () => {
  if (!window.globalConfig.chatConfig) {
    const result = await $http.get('/api2/webchat/chatconfig');
    console.log(result);
    if (result.data && parseInt(result.data.status, 10) === 200) {
      const { appKey, needCrossSpaceGroup, needOrgGroup } = result.data.result;
      const chatConfig = {
        appKey: appKey || '',
        needCrossSpaceGroup: needCrossSpaceGroup ? appKey : '',
        needOrgGroup: needOrgGroup ? appKey : '',
      };
      window.globalConfig.chatConfig = chatConfig;
    }
  }
};

const setFileMaxSize = async () => {
  if (!window.globalConfig.maxFileSize) {
    const { data: { maxFileSize } } = await $http.get('/api/store/getUMFSize');
    window.globalConfig.maxFileSize = maxFileSize;
  }
};

export const patchGlobalConfig = async () => {
  try {
    await setUser();
    await getGlobalServer();
    await setFileMaxSize();
    await getWebChatConfig();
    return 200;
  } catch (e) {
    console.error(e);
    return e.response && e.response.status;
  }
};
