const routers = [
  {
    path: "/demo",
    name: "DemoHome",
    component: () => import("@/views/Demo/DemoHome.vue")
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
    component: () => import("@/views/Demo/download-demo.vue")
  },
  {
    path: "/pdf-viewer-demo",
    name: "PdfViewerDemo",
    component: () => import("@/views/Demo/pdfViewer-demo.vue")
  },
  {
    path: "/vue-office-docx-demo",
    name: "VueOfficeDocxDemo",
    component: () => import("@/views/Demo/vue-office-docx-demo.vue")
  },
  {
    path: "/vue-office-excel-demo",
    name: "VueOfficeExcelDemo",
    component: () => import("@/views/Demo/vue-office-excel-demo.vue")
  },
  {
    path: "/vue-office-pdf-demo",
    name: "VueOfficePdfDemo",
    component: () => import("@/views/Demo/vue-office-pdf-demo.vue")
  },
  {
    path: "/vue-office-pptx-demo",
    name: "VueOfficePptxDemo",
    component: () => import("@/views/Demo/vue-office-pptx-demo.vue")
  },
  {
    path: "/office-viewer-demo",
    name: "OfficeViewerDemo",
    component: () => import("@/components/OfficeComp/office-viewer-demo.vue")
  }
];

export default routers;
