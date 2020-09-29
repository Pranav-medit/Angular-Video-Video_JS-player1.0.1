import { Injectable } from '@angular/core';
import videojs from 'video.js';
declare var videojs: videojs.player;
@Injectable({
  providedIn: 'root'
})
export class VideoPlayerService {
  private player: videojs.player=videojs(document.getElementById('my-video'),
  {controlBar: {
    fullscreenToggle: false
  }}
  );
  getVideoPlayerInstance(): videojs.player {

    return this.player;
  }
  constructor() { }
}
