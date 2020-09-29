import { Component, ViewChild,ElementRef} from '@angular/core';
import { VideoPlayerService } from '../shared/video-player.service';

@Component({
  selector: 'app-vp-root',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent {
  doblClick(){
    setTimeout(() => {
      document.exitFullscreen();
    }, 200);

  }
  ngAfterViewInit() {}

}











