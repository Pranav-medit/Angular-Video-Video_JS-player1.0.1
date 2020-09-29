import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { VideoPlayerService } from '../shared/video-player.service';
import videojs  from 'video.js';
declare var videojs: videojs.player;
declare var bootbox: any ;
@Component({
  selector: 'app-start-over',
  templateUrl: './start-over.component.html',
  styleUrls: ['./start-over.component.css']
})
export class StartOverComponent implements AfterViewInit {
  @ViewChild('mulethi')mul:ElementRef;
  player: videojs.player;
  resumeTime:number = 0;
  resumeVolume:number = 10;
  askResumeConfirm(): void{
    if(JSON.parse(localStorage.getItem('currentTime'))){
    bootbox.confirm({
      title: `${this.getVideoTitle()}`,
      message: "Do you wish to resume from where you stopped ",
      buttons: {
          cancel: {
              label: '<i class="fa fa-repeat"></i> Start Over'
          },
          confirm: {

            label: '<i class="fa fa-check"></i> Resume'
          }
      },
      callback: (result: boolean) => {
          if (result){
            this.player.play()
            this.player.currentTime(this.resumeTime)
          }
          else{
            this.player.play();
          }
          this.player.volume(this.resumeVolume/10);
      }
    });
  }
  }
  //Function which gets video title for startover,resume menu
  getVideoTitle(): string{
    try{
      let videoTitle: string=this.player.currentSrc(); //ex: '/folder/sub-folder/test.mp4'
      let curType: string=this.player.currentType(); //ex: video/mp4
      let minRegExp: RegExp=/[^(video)\/].*$/i; //extract format ex:-mp4
      const regex: RegExp = new RegExp(`(\/[^/]*\.${curType.match(minRegExp)[0]})$`);
      // let regExp=/(\/[^/]*\.myPlayer.currentType())$/;
      if (videoTitle.match(regex)){
        //ex:- toUpperCase(t)+'est.mp4'
        return videoTitle.match(regex)[0].slice(1).charAt(0).toUpperCase()+videoTitle.match(regex)[0].slice(2);
      }
      else{
        //ex:- toUpperCase(t)+'est.mp4'
        return videoTitle.charAt(0).toUpperCase()+videoTitle.match(regex)[0].slice(1);
      }
    }
    catch(error){
      console.log(error)
      return 'Video'
    }
  }



  constructor(private videoPlayerService:VideoPlayerService) {

    this.player = this.videoPlayerService.getVideoPlayerInstance();
    //Access time value if stored in local session
    if(JSON.parse ( localStorage.getItem('currentTime'))!== undefined){
      this.resumeTime=Number(JSON.parse(localStorage.getItem('currentTime')))
    }
    //Access volume value if stored in local session
    if(JSON.parse(localStorage.getItem('currentVolume'))!==undefined){
      this.resumeVolume=Number(JSON.parse(localStorage.getItem('currentVolume') ))
    }
  }
  ngAfterViewInit(): void{



    this.player.ready(() =>{
      this.askResumeConfirm();
      //Keep an eye on time change
      this.player.on('timeupdate',function(){
        let whereYouAt: number = this.player().currentTime();
        if(whereYouAt!==0){
          //Store current time in local session
          localStorage.setItem('currentTime',JSON.stringify(Math.floor(whereYouAt)))
        }
      });
      //Keep an eye on volume change
      this.player.on('volumechange',function(){
        let currentVolume: number = this.player().volume();
        if(currentVolume!==1){
          //Store current volume in local session
          localStorage.setItem('currentVolume',JSON.stringify(Math.floor(currentVolume*10)))
        }
      });
    });
  }
}
