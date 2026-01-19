import { Device, SystemEvent, VideoStats } from './types';

export const MOCK_DEVICES: Device[] = [
  { id: 'cam-01', name: '主入口大厅', status: 'online', location: { lat: 40.7128, lng: -74.0060 }, region: 'A 区', streamUrl: 'https://picsum.photos/800/600?random=1' },
  { id: 'cam-02', name: 'B1 停车场', status: 'online', location: { lat: 40.7138, lng: -74.0070 }, region: 'A 区', streamUrl: 'https://picsum.photos/800/600?random=2' },
  { id: 'cam-03', name: '服务器机房', status: 'warning', location: { lat: 40.7148, lng: -74.0080 }, region: 'B 区', streamUrl: 'https://picsum.photos/800/600?random=3' },
  { id: 'cam-04', name: '员工餐厅', status: 'offline', location: { lat: 40.7158, lng: -74.0090 }, region: 'B 区', streamUrl: 'https://picsum.photos/800/600?random=4' },
  { id: 'cam-05', name: '仓库装卸区', status: 'online', location: { lat: 40.7168, lng: -74.0100 }, region: 'C 区', streamUrl: 'https://picsum.photos/800/600?random=5' },
  { id: 'cam-06', name: '北大堂', status: 'online', location: { lat: 40.7178, lng: -74.0110 }, region: 'A 区', streamUrl: 'https://picsum.photos/800/600?random=6' },
];

export const MOCK_EVENTS: SystemEvent[] = [
  { id: 'evt-1', deviceId: 'cam-03', deviceName: '服务器机房', type: 'WARNING', message: '非工作时间检测到移动', timestamp: '10:42:05' },
  { id: 'evt-2', deviceId: 'cam-01', deviceName: '主入口大厅', type: 'INFO', message: '门禁开启', timestamp: '10:40:12' },
  { id: 'evt-3', deviceId: 'cam-04', deviceName: '员工餐厅', type: 'ERROR', message: '视频信号丢失', timestamp: '10:38:55' },
  { id: 'evt-4', deviceId: 'cam-02', deviceName: 'B1 停车场', type: 'INFO', message: '车辆驶入', timestamp: '10:35:20' },
];

export const MOCK_STATS: VideoStats[] = [
  { date: '周一', events: 12 },
  { date: '周二', events: 19 },
  { date: '周三', events: 8 },
  { date: '周四', events: 24 },
  { date: '周五', events: 15 },
  { date: '周六', events: 5 },
  { date: '周日', events: 9 },
];