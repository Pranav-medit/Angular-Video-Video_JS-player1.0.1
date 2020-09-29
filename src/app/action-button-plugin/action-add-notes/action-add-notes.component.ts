import { VideoPlayerService } from './../../shared/video-player.service';
import { Component, OnInit } from '@angular/core';
import videojs  from 'video.js';
declare var videojs: videojs.player;
@Component({
  selector: 'app-action-add-notes',
  templateUrl: './action-add-notes.component.html',
  styleUrls: ['./action-add-notes.component.css']
})
export class ActionAddNotesComponent implements OnInit {
  notesText1 : string = 'Notes'
  showNotes:boolean= false;

  alertShow: boolean= false;
  title: string =  '';
  description: string = ''
  success: boolean = true;

  player: videojs.player = this.videoPlayer.getVideoPlayerInstance();
  constructor(private videoPlayer:VideoPlayerService) {}

  dispAlert(title: string,status: string,descr: string,success: boolean=true){
    this.alertShow= true;
    this.title = title+':'+status
    this.description = descr
    this.success = success;
    setTimeout(() => {
        this.alertShow= false;
    }, 4000);
  }

  onActionAdNotBtnClk(){
      this.showNotes =true;
      this.player.pause();
      this.player.controls(false)
  }
  onAddNoteButtonClick(){
    let noteDict: object={};
    if(JSON.parse(localStorage.getItem("Note"))){
        noteDict=JSON.parse(localStorage.getItem("Note"));
    }
    if(this.notesText1===''){
        this.dispAlert('Error',"Cannot Add Notes","Text area is empty",false)
     }
    else{
        noteDict[Math.floor(this.videoPlayer.getVideoPlayerInstance().currentTime())]=this.notesText1;
        localStorage.setItem('Note',JSON.stringify(noteDict));
        this.notesText1='';
        this.dispAlert('Success',"Note added","Notes added successfully",true)
        this.showNotes =false;
        this.player.play();
        this.player.controls(true);
    }
  }
  onCloseButtonClick(): void{
    this.showNotes = false;
    this.player.play();
    this.player.controls(true)
  }
  ngOnInit(): void { }
}

