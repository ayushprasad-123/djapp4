m1=m2=results="";
lx=ly=ls=rx=ry=rs=0;
function preload(){
    m1=loadSound("music.mp3");
    m2=loadSound("music2.mp3");
}
function setup(){
    c=createCanvas(600,424);
    c.center();
    v=createCapture(VIDEO);
    v.hide();
    mod=ml5.poseNet(v, onLoad);
    mod.on('pose', onPose);
}
function draw(){
    image(v,0,0,600,424);
    fill("red");
    if(ls>0.2){
        circle(lx,ly,20);
        m2.stop();
        if(!m1.isPlaying()){
            m1.play();
            document.getElementById("song").innerHTML="Song 1";
        }
    }
    if(rs>0.2){
        circle(rx,ry,20);
        m1.stop();
        if(!m2.isPlaying()){
            m2.play();
            document.getElementById("song").innerHTML="Song 2";
        }
    }
}
function onLoad(){console.log("Model loaded");}
function onPose(results){
    if(results==null){
        console.error('Variable "results" is null.')
    }else{
        lx=results[0].pose.leftWrist.x;
        ly=results[0].pose.leftWrist.y-200;
        rx=results[0].pose.rightWrist.x;
        ry=results[0].pose.rightWrist.y-200;
        ls=results[0].pose.keypoints[9].score;
        rs=results[0].pose.keypoints[10].score;
        console.log(results);
    }
}