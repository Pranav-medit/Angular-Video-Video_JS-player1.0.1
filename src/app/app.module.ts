import { StartOverComponent } from './start-over/start-over.component';
import { VideoPlayerComponent } from './video_player/video-player.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ActionButtonPluginComponent } from './action-button-plugin/action-button-plugin.component';
import { ActionRecordComponent } from './action-button-plugin/action-record/action-record.component';
import { ActionAddNotesComponent } from './action-button-plugin/action-add-notes/action-add-notes.component';
import { ActionAttachFileComponent } from './action-button-plugin/action-attach-file/action-attach-file.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    VideoPlayerComponent,
    StartOverComponent,
    ActionButtonPluginComponent,
    ActionRecordComponent,
    ActionAddNotesComponent,
    ActionAttachFileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
