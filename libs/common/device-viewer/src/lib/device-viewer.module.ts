import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsComponent } from './options/options.component';
import { FrameComponent } from './frame/frame.component';
import { ViewerContainer } from './viewer/viewer.container';

@NgModule({
  imports: [CommonModule],
  declarations: [OptionsComponent, FrameComponent, ViewerContainer],
  exports: [OptionsComponent, FrameComponent, ViewerContainer],
})
export class DeviceViewerModule {}
