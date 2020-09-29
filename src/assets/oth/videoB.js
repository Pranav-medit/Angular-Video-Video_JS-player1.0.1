
var vidm=videojs("my-video",{
    plugins:{
        addMenu:{
                    video_id:'my-video',
                    action1:'action1()',
                    action2:'action2()',
                    action3:'action3()',
                    nameOfButton1:"Action1",
                    nameOfButton2:"Action2",
                    nameOfButton3:"Action3"
                }
            },playbackRates:[.5,.75,1,2,3,4]
});


//Show Custom alert
var alrt=document.createElement("div");
alrt.id="alertBox";
document.getElementsByTagName("body")[0].appendChild(alrt);

function alertShow(title,description){
    setTimeout(function(){document.getElementById("alertBox").innerHTML
    =``  }, 2000);
    document.getElementById("alertBox").innerHTML
    =`
    <div id="alrt"class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>${title}</strong> ${description}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
   
}

function action1(){
    alertShow("Record","Has been Performed")
}
function action2(){
    alertShow("Attach PDF","Has been Performed")
}
function action3(){
    alertShow("Take Notes","Has been Performed")
}
