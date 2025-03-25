const routers = [
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
    component: () => import("@/views/OtherView/download-demo.vue")
  },
  {
    path: "/pdf-viewer-demo",
    name: "PdfViewerDemo",
    component: () => import("@/views/OtherView/pdfViewer-demo.vue")
  }
];

export default routers;
