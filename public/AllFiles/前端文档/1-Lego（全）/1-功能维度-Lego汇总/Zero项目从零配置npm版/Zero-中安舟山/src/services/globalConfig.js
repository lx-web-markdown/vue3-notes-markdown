import { $http } from '@commonbox/utils';
import { AYSocketConnection } from '@qycloud/lego';

// const internalIp = require('internal-ip');

const { server: { www } } = require('../../config/server');

const setUser = async () => {
  if (!window.globalConfig.id) {
    const { data: { result } } = await $http.get('/sapi/user/entuser/info');
    window.globalConfig.user = result;
    window.globalConfig.user.id = result.userId;
    window.globalConfig.user.name = result.realName;
    // window.globalConfig.server.fileio = 'dev.pre.qycloud.com.cn'
  }
};

const setSocketInstance = () => {
  if (!window.socketInstance) {
    window.socketInstance = new AYSocketConnection();
  }
};

const parseServer = combineServer => Object.keys(combineServer).reduce((result, key) => {
  if (
    key === 'root' || key === 'ws' || key === 'websocketProtocol' || key === 'websocket'
  ) {
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
  window.globalConfig.server.fileio = 'https://dev.pre.qycloud.com.cn:8081/';
  window.globalConfig.previewUrl = serverConfig.data.preview;
  window.globalConfig.openChildFilePreview = serverConfig.data.openChildFilePreview;


  window.globalConfig.openChildFilePreview = true;

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
    return e.response && e.response.status;
  }
};
