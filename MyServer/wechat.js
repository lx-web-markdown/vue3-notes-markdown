// 导入WebSocket模块:
import { WebSocketServer } from 'ws';

// 实例化:
const wss = new WebSocketServer({
  port: 9001,
  path: '/ws'
});

const wsList = [];

// 监听创建连接事件，回调函数的参数是创建的连接
wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  // 监听该连接的接收信息事件
  ws.on('message', function message(data) {
    console.log('接收到信息: %s', data);
    for (const w of wsList) {
      if (w.readyState === w.OPEN) {
        w.send(data.toString());
      }
    }
  });

  wsList.push(ws);
});

// node --experimental-modules wechat.js 启动服务 (或 package.json 设置 type: "module")