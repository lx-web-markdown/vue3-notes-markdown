import CSSRouters from './css-demo'

const routers = [
  {
    path: "/demo",
    name: "DemoHome",
    component: () => import("@/views/modules/Demo/index.vue")
  },
  {
    path: "/audio-player-demo",
    name: "AudioPlayerDemo",
    component: () => import("@/components/AudioPlayer/AudioPlayerDemo.vue")
  },
  {
    path: "/video-player-demo", 
    name: "VideoPlayerDemo",
    component: () => import("@/components/VideoPlayer/VideoPlayerDemo.vue")
  },
  {
    path: "/download-demo",
    name: "DownloadDemo",
    component: () => import("@/views/modules/Demo/download-demo.vue")
  },
  {
    path: "/pdf-viewer-demo",
    name: "PdfViewerDemo",
    component: () => import("@/views/modules/Demo/pdfViewer-demo.vue")
  },
  {
    path: "/image-viewer-demo",
    name: "ImageViewerDemo",
    component: () => import("@/components/ImageViewer/ImageViewerDemo.vue")
  },
  {
    path: '/xmind-viewer-demo',
    name: 'XmindViewerDemo',
    component: () => import('@/views/modules/Demo/XmindViewer-demo.vue'),
  },
];


export default [...routers, ...CSSRouters];
