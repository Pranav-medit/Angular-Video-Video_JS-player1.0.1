var myPlayer = vidm
myPlayer.src({type: 'video/mp4', src: 'test.mp4'});
var lengthOfVideo = myPlayer.duration();
console.log(vidm)

var resumeTime=0
var resumeVolume=5

if(JSON.parse(localStorage.getItem('currentTime'))!==undefined){
  resumeTime=Number(JSON.parse(localStorage.getItem('currentTime')))
}
if(JSON.parse(localStorage.getItem('currentVolume'))!==undefined){
  resumeVolume=Number(JSON.parse(localStorage.getItem('currentVolume') ))  
}




myPlayer.ready(function() {
  if(JSON.parse(localStorage.getItem('currentTime'))){
    bootbox.confirm({
      title: `${document.querySelector('#my-video source').getAttribute('src')}`,
      message: "Do you wish to resume from where you stopped",
      buttons: {
          cancel: {
              label: '<i class="fa fa-times"></i> Start Over'
          },
          confirm: {
            
            label: '<i class="fa fa-check"></i> Resume'
          }
      },
      callback: function (result) {
          if (result){
            myPlayer.play()
            myPlayer.currentTime(resumeTime)
            
          }
          else{
            myPlayer.play();
           
          }
      
      }
    }); 
    myPlayer.volume(resumeVolume/10);
    
  }
  this.on('timeupdate',function(){
    let whereYouAt = myPlayer.currentTime();
    if(whereYouAt!==0){
      localStorage.setItem('currentTime',JSON.stringify(Math.floor(whereYouAt)))
    }
  });
  this.on('volumechange',function(){
    let currentVolume = myPlayer.volume();
    if(currentVolume!==1){
      localStorage.setItem('currentVolume',JSON.stringify(Math.floor(currentVolume*10)))
    }
  });
});
