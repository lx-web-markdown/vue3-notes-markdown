const routers = [
  {
    path: "/audio-player-demo",
    name: "AudioPlayerDemo",
    component: () => import("@/components/AudioPlayer/AudioPlayerDemo.vue")
  },
];

export default routers;
