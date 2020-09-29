import { ActionRecordComponent } from './action-record/action-record.component';
import { ActionAttachFileComponent } from './action-attach-file/action-attach-file.component';

import { Component, OnInit, ViewChild} from '@angular/core';
import { VideoPlayerService } from '../shared/video-player.service';
import videojs from 'video.js';

import { ActionAddNotesComponent } from './action-add-notes/action-add-notes.component';

declare var videojs: videojs.player;
const Plugin = videojs.getPlugin('plugin');
@Component({
  selector: 'app-action-button-plugin',
  templateUrl: './action-button-plugin.component.html',
  styleUrls: ['./action-button-plugin.component.css']
})
export class ActionButtonPluginComponent implements OnInit {
  @ViewChild('appActionAddNotes') appActionAddNotes:ActionAddNotesComponent;
  @ViewChild('appActionAthFile') appActionAthFile:ActionAttachFileComponent
  @ViewChild('appActionRecFile') appActionRecFile:ActionRecordComponent
  showVideoDivMenu1: boolean= false;
  addActionMenu: Function = videojs.extend(Plugin, {
    constructor: function(player: videojs.player) {
      this.player=player;
      player.ready(this.onPlayerReady())
      
    },
    onPlayerReady:function(): void{
      this.setMenuButton();
      this.setFullScreenButton();
    },
    setMenuButton:function(): void{
      var Button: Function = videojs.getComponent('Button');
      var MenuActionButton: Function = videojs.extend(Button, {
        constructor: function() {
        Button.apply(this, arguments);
        this.addClass('fa');
        this.addClass('fa-dedent');
        this.addClass('btn__menu-1');
        },
        handleClick: function(){
        }
      });
      videojs.registerComponent('MyButton', MenuActionButton);
      this.player.getChild('controlBar').addChild('myButton');
    },
    setFullScreenButton:function(): void{
      var Button: Function = videojs.getComponent('Button');
      var setFullScreen: Function = videojs.extend(Button, {
        constructor: function() {
        Button.apply(this, arguments);
        this.addClass('fas');
        this.addClass('fa-expand');
        this.addClass('btn__fulScr-1');
        },
        handleClick: function(){
          if(this.hasClass('fa-expand')) {
            this.removeClass('fa-expand')
            this.addClass('fa-compress');
            let elem=document.getElementById('wrapper')
            elem.requestFullscreen();
            try{
              if (elem.requestFullscreen) {
                elem.requestFullscreen();
              }
            }catch(e){  }

          }else{
            this.removeClass('fa-compress')
            this.addClass('fa-expand');
            document.exitFullscreen();
          }

        }
      });
      videojs.registerComponent('MyButton', setFullScreen);
      this.player.getChild('controlBar').addChild('myButton');
    }
  });
  ActionAdNtClk(): void{
    this.appActionAddNotes.onActionAdNotBtnClk();
  }
  ActionAthFileClk(): void{
    this.appActionAthFile.onActionAthFileBtnClk();
  }
  ActionAthRecMenuClk(): void{
    this.appActionRecFile.onActionRecFileBtnClk();
  }

  constructor(private videoPlayerService :VideoPlayerService) {}
  ngOnInit(): void {
    videojs.registerPlugin('addActionMenu',this.addActionMenu);
    this.videoPlayerService.getVideoPlayerInstance().addActionMenu();
  }
  ngAfterViewInit() {

    var menuActionButton=document.getElementsByClassName("vjs-control vjs-button btn__menu-1")[0]
    menuActionButton.addEventListener('blur',()=>{
      setTimeout(() => {
        this.showVideoDivMenu1= false;
      }, 200);

    })
    document.getElementsByClassName("vjs-control vjs-button btn__menu-1")[0].addEventListener('click',()=>{
      this.showVideoDivMenu1= !this.showVideoDivMenu1;
    })
  }

};
