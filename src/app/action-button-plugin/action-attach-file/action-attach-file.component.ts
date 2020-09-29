import { GalleryImage } from './gallery-image';
import { VideoPlayerService } from './../../shared/video-player.service';
import { Component,  ViewChild, ElementRef,AfterViewInit, AfterViewChecked} from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-action-attach-file',
  templateUrl: './action-attach-file.component.html',
  styleUrls: ['./action-attach-file.component.css']
})
export class ActionAttachFileComponent implements AfterViewChecked {
  @ViewChild("progressBar") progressBar: ElementRef;
  @ViewChild("divDropArea") divDropArea: ElementRef;
  @ViewChild("progressPercent") progressPercent: ElementRef;

  showAthFile: boolean = false;

  progresBarVal: number = 0;
  progresPercentVal : string = '0%';
  addBorderStyle: boolean = false;
  uploadProgress: any = [];

  alertShow: boolean= false;
  title: string =  '';
  description: string = ''
  success: boolean = true;
  player: videojs.player;
  galleryImg:GalleryImage[] = [];
  constructor(private playerService:VideoPlayerService) {
    this.player=this.playerService.getVideoPlayerInstance();
  }

  onActionAthFileBtnClk(): void{
    this.showAthFile = true;
    this.player.pause();
    this.player.controls(false)

    // this.ngAfterViewInit()


  }
  preventDefaultBehaviour(e: Event) {
    e.preventDefault()
    e.stopPropagation()
  }


  dispAlert(title: string,status: string,descr: string,success: boolean=true){
    this.alertShow= true;
    this.title = title+':'+status
    this.description = descr
    this.success = success;
    setTimeout(() => {
        this.alertShow= false;
    }, 4000);
  }
  applyBorderStyle = () => {
    this.addBorderStyle = true;
  }

  removeBorderStyle = () => {
    this.addBorderStyle = false;
  }


  handleFiles = (files: any) => {

    files = [...files]
    this.initializeProgress(files.length)
    files.forEach(this.uploadFile)
    files.forEach(this.previewFile)
  }
  handleDrop = (e: any) => {
    let dt = e.dataTransfer
    let files = dt.files
    files = [...files]
    this.handleFiles(files)
  }
  uploadFile = (file: any, i: number): void => {
    var url: string = 'www.google.com'
    var xhr: XMLHttpRequest = new XMLHttpRequest()
    var formData: FormData = new FormData()
    xhr.open('POST', url, true)


    xhr.upload.addEventListener("progress", (e) => {
      this.updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
    })

    xhr.addEventListener('readystatechange', (e) => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.dispAlert('Success',String(xhr.readyState),'Uplaoded successfully',true)
      }
      else if (xhr.readyState == 4 && xhr.status != 200) {
        this.dispAlert('Error',String(xhr.readyState),'Some error occured while uploading',false)
      }
      this.progressPercent.nativeElement.innerHTML = '100%'
      this.progresBarVal= 100;
    })
    formData.append('file', file);
    xhr.send(formData);
  }
  previewFile =  (file: any): void => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend =  () =>{
      let miniGalleryImgObj: GalleryImage={Name:null,Source:null};
      let fileType: string=String(reader.result);
      let fileName: string=
        (file['name'].length) > 20 ? file['name'].slice(0, 8) + '....' + file['name'].substr(file['name'].length - 5) : file['name'];
      let reg: RegExp = /^(data:image)/;
      let src: string = reg.test(fileType) ? String(reader.result) : 'assets/Images/document.png';
      miniGalleryImgObj.Name = fileName;
      miniGalleryImgObj.Source = src
      this.galleryImg.push(miniGalleryImgObj)
    }
  }



  initializeProgress = (numFiles) => {
    this.progresBarVal = 0
    this.progressPercent.nativeElement.innerHTML = '0%'


    for (let i = numFiles; i > 0; i--) {
      this.uploadProgress.push(0)
    }
  }
  onCloseButtonClick(): void{
    this.showAthFile = false;
    this.player.play();
    this.player.controls(true)
  }

  updateProgress = (fileNumber, percent) => {

    this.uploadProgress[fileNumber] = percent
    let total = this.uploadProgress.reduce((tot, curr) => tot + curr, 0) /this.uploadProgress.length
    this.progresBarVal = total
    this.progressPercent.nativeElement.innerHTML = `${Math.floor(total)}` + '%';
  }

  ngAfterViewChecked(): void {
    try{
      ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
        this.divDropArea.nativeElement.addEventListener(event, this.preventDefaultBehaviour)
      });

    ;['dragenter', 'dragover'].forEach(eventName => {
      this.divDropArea.nativeElement.addEventListener(eventName, this.applyBorderStyle, false)
    });

    ;['dragleave', 'drop'].forEach(eventName => {
      this.divDropArea.nativeElement.addEventListener(eventName, this.removeBorderStyle, false)
    });
    this.divDropArea.nativeElement.addEventListener('drop', this.handleDrop, false)
  }catch(err){
    // dontdisplay
  }
 }
}
