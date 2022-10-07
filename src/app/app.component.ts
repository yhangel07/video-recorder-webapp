import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { isSupported, setup } from "@loomhq/loom-sdk";
import { oembed } from "@loomhq/loom-embed";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'video-recorder-webapp';
  loomVid: string = '';

  PUBLIC_APP_ID = environment.loom_api;
  BUTTON_ID = "loom-record-button";

  ngOnInit(): void {
    this.initializedLoom();
  }



  async initializedLoom() {
    const { supported, error } = await isSupported();

    if (!supported) {
      console.warn(`Error setting up Loom: ${error}`);
      return;
    }

    const root = document.getElementById("app");

    if (!root) {
      return;
    }

    root.innerHTML = `<div className="loom-record-btn-wrapper">
    <div className="loom-record-btn-inner-wrapper">
      <button id="${this.BUTTON_ID}">Record</button>
    </div>
  </div>`;

    const button = document.getElementById(this.BUTTON_ID);

    if (button == null || !isSupported()) {
      return;
    }

    const { configureButton } = await setup({
      apiKey: this.PUBLIC_APP_ID,
    });

    const sdkButton = configureButton({
      element: button,
      hooks: {
        onRecordingComplete: (vid) => { console.log(vid) },
        onUploadComplete: (res) => { console.log(res) },
        onInsertClicked: (shareLink) => {
          console.log("clicked insert");
          console.log(shareLink);
        },
        onStart: () => console.log("start"),
        onCancel: () => console.log("cancelled"),
        onComplete: () => console.log("complete")
      }
    });

    sdkButton.on("insert-click", async (video: any) => {
      const { html } = await oembed(video.sharedUrl, { width: 400 });
      this.insertEmbedPlayer(html);
    });
  }
  insertEmbedPlayer(html: string) {
    const target = document.getElementById("target");

    if (target) {
      target.innerHTML = html;
    }
  }
}
