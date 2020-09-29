import { VideoPlayerService } from './../../shared/video-player.service';

import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import videojs from 'video.js';
declare var MediaRecorder: any;




@Component({
  selector: 'app-action-record',
  templateUrl: './action-record.component.html',
  styleUrls: ['./action-record.component.css']
})
export class ActionRecordComponent implements OnInit {
  showRecMenu:boolean = false;
  player: videojs.player;

  recordStatusText: string = 'Record'
  recordTime: string = ''
  startRecordIcon: boolean = true;

  timer: number;

  mdGlobal: any;
  err: boolean;
  audioList: Array<string>=[];
  constructor(private sanitizer:DomSanitizer,private playerService: VideoPlayerService){
    this.player = this.playerService.getVideoPlayerInstance();
  }
  recAudio(){
    //If no errors
    if(!this.err){
      if(this.startRecordIcon){
        this.startRecordIcon=false;
        this.startRecord();
      }else{
        this.startRecordIcon=true;
        this.stopRecord();
      }
    }else{
      console.log("Some error occured,check your mic,mediadevice or hardware");
    }

  }

  showTimer(min: number,sec: number){
    let minStr: string = String(min),secStr: string =String(sec);
    if (min<10){
       minStr="0"+String(min);
    }
    if (sec<10){
       secStr='0'+String(sec);
    }
    this.recordTime=minStr+':'+secStr;
  }

startTimer(){
  let sec: number=0;
  let min: number=0;
  this.showTimer(min,sec)
  this.timer=setInterval(() => {
      sec=sec+1;
      if (sec===60){
          min=min+1;
          sec=0;
      }
      try{
          if(min>10){
              throw("Too much of audio size recorded")
          }
      }
      catch(err){
          console.log(err)
      }
      this.showTimer(min,sec)
    }, 1000);
  }
  stopTimer(){
    clearInterval(this.timer);
    this.recordTime = ''
  }

  displayAudioInList(audioUrls: Array<any>){
    this.audioList=[]
    audioUrls.forEach(element => {
      //Bypassing security as this is local
      element=this.sanitizer.bypassSecurityTrustUrl(element);
      this.audioList.push(element);
    });

  }
  startRecord(){
    this.mdGlobal.start();
    this.recordStatusText = 'Recording'
    this.startTimer()
  }
  stopRecord(){
    this.mdGlobal.stop();
    this.recordStatusText = 'Record'
    this.stopTimer()
  }

//act1 complete
  onActionRecFileBtnClk(){
    this.showRecMenu = true;
    this.player.pause();
    this.player.controls(false);
  }
  onCloseButtonClick(): void{
    this.showRecMenu = false;
    this.player.play();
    this.player.controls(true)
  }




  ngOnInit(): void {

    navigator.mediaDevices.getUserMedia({ audio: true }).then( (mediaStreamObj) => {
      let mediaRecorder: any = new MediaRecorder(mediaStreamObj);
      let audioUrls=[];
      this.mdGlobal=mediaRecorder
      let dataArray = [];
      this.mdGlobal.ondataavailable =  (ev: any) => {
          dataArray.push(ev.data);
      }
      this.mdGlobal.onstop =  () => {

          // blob of type mp3
          let audioData = new Blob(dataArray,  { 'type': 'audio/mp3;' });
          dataArray = [];
          let audioSrc = window.URL.createObjectURL(audioData);
          audioUrls.push(audioSrc)
          this.displayAudioInList(audioUrls);
      }
      this.err = false;
    }).catch((err)=>{
      console.log(err)
      this.err = true;
    })
  }

}
