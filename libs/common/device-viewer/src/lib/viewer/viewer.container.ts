import { AfterContentInit, Component, ContentChild, OnInit } from '@angular/core';
import { OptionsComponent } from '../options/options.component';

@Component({
  selector: 'device-viewer',
  templateUrl: './viewer.container.html',
  styleUrls: ['./viewer.container.scss'],
})
export class ViewerContainer implements AfterContentInit {
  @ContentChild(OptionsComponent) public options: OptionsComponent;

  constructor() {}

  ngAfterContentInit(): void {
    console.log(this.options);
    
  }
}
