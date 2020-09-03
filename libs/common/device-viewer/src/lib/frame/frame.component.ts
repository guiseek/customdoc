import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DeviceType } from '../device-types';

@Component({
  selector: 'device-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent implements OnInit {
  private _src: string | SafeResourceUrl = '';

  @Input()
  public set src(value) {
    this._src = this.sanitize(value as string);
  }
  public get src() {
    return this._src;
  }

  private _device: DeviceType = 'smartphone';

  @HostBinding('class')
  @Input()
  set device(value: DeviceType) {
    if (value) this._device = value;
  }
  get device() {
    return this._device;
  }

  constructor(private sanitizer: DomSanitizer) {}

  private sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {}
}
