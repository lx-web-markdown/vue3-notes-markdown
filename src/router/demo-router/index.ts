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
];

export default routers;
