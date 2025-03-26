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
  },
  {
    path: "/vue-office-docx-demo",
    name: "VueOfficeDocxDemo",
    component: () => import("@/views/OtherView/vue-office-docx-demo.vue")
  },
  {
    path: "/vue-office-excel-demo",
    name: "VueOfficeExcelDemo",
    component: () => import("@/views/OtherView/vue-office-excel-demo.vue")
  },
  {
    path: "/vue-office-pdf-demo",
    name: "VueOfficePdfDemo",
    component: () => import("@/views/OtherView/vue-office-pdf-demo.vue")
  },
  {
    path: "/vue-office-pptx-demo",
    name: "VueOfficePptxDemo",
    component: () => import("@/views/OtherView/vue-office-pptx-demo.vue")
  },
  {
    path: "/office-viewer-demo",
    name: "OfficeViewerDemo",
    component: () => import("@/components/OfficeComp/office-viewer-demo.vue")
  }
];

export default routers;
