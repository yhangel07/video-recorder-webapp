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

  ngOnInit(): void { }

}
