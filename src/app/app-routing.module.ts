import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebRTCSampleComponent } from './web-rtc-sample/web-rtc-sample.component';

const routes: Routes = [
  {path: 'video-webrtc', component: WebRTCSampleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
