import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitContentComponent } from './split-content.component';
import { SplitContentDirective } from './split-content.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [SplitContentComponent, SplitContentDirective],
  exports: [SplitContentComponent, SplitContentDirective],
})
export class SplitContentModule {}
