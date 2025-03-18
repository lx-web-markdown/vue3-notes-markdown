import { $http } from '@commonbox/utils';
import { AYSocketConnection } from '@qycloud/lego';

const setUser = async () => {
  console.log(window.location.pathname);
  if (!window.globalConfig.user && window.location.pathname !== '/csafety-jhcbs/platform/' && window.location.pathname !== '/csafety-jhcbs/platform/homes') {
    const { data: { result } } = await $http.get('/api2/user/info');
    window.globalConfig.user = result;
    window.globalConfig.user.id = result.userId;
    window.globalConfig.user.name = result.realName;
    setSocketInstance();
  }
};

const setSocketInstance = () => {
  if (!window.socketInstance) {
    window.socketInstance = new AYSocketConnection();
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
    // await setFileMaxSize();
    return 200;
  } catch (e) {
    return e.response.status;
  }
};
