import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-web-rtc-sample',
  templateUrl: './web-rtc-sample.component.html',
  styleUrls: ['./web-rtc-sample.component.scss']
})
export class WebRTCSampleComponent implements OnInit {
  @ViewChild('myVideo') myVideo: any;
  @ViewChild('preview') preview: any;

  @ViewChild('record') record: any;
  @ViewChild('stopRecord') stopRecord: any;
  mediaRecorder: any;
  videoChunks: any[] =[];
  myRecording: any;

  types = [
    "video/webm",
    "audio/webm",
    "video/webm;codecs=vp8",
    "video/webm;codecs=daala",
    "video/webm;codecs=h264",
    "audio/webm;codecs=opus",
    "video/mpeg",
    "video/mp4"
  ];

  constructor(private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    this.userMedia();
  }

  userMedia(){
    let constrainObj = {
      audio: true,
      video: {
        facingMode: "user",
        width: { min: 640, ideal: 1200, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 }
      }
    };

    if (navigator.mediaDevices === undefined) {
      console.log('Are you here?');
    } else {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {

        }).catch(err => {
          console.log(err.name, err.message);
        })
    }

    navigator.mediaDevices.getUserMedia(constrainObj)
      .then((mediaStreamObj) => {
        let video = this.myVideo.nativeElement;

        if("srcObject" in video) {
          video.srcObject = mediaStreamObj;
        }

        video.onloadedmetadata = () => {
          video.play();
        };

        const options = {
          audioBitsPerSecond : 128000,
          videoBitsPerSecond : 2500000,
          mimeType : 'video/webm;codecs=h264'
        }

        this.mediaRecorder = new MediaRecorder(mediaStreamObj);
        for (const type of this.types) {
          console.log(`Is ${type} supported? ${MediaRecorder.isTypeSupported(type) ? "Maybe!" : "Nope :("}`);
        }
        this.initiateListener();
      }).catch(err => console.log(err.name, err.message))
  }

  initiateListener() {
    this.mediaRecorder.ondataavailable = (e:any) => {
      console.log(e);
      this.videoChunks.push(e.data);
    }
  }

  recordVideo() {
    this.mediaRecorder.start();
    console.log(this.mediaRecorder.state);
  }

  stopRecording() {
    this.mediaRecorder.stop();
    console.log(this.mediaRecorder);
    console.log(this.mediaRecorder.state);



    this.mediaRecorder.onstop = () => {
      console.log(this.videoChunks);

      let blob = new Blob(this.videoChunks, { 'type': "video/x-matroska;codecs=avc1,opus" });
      const videoPreview = window.URL.createObjectURL(blob);
      console.log(videoPreview);
      // this.myRecording = videoPreview;
      this.videoChunks = [];
      this.preview.nativeElement.src = videoPreview;
    }
  }

}
