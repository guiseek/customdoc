import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DeviceType, deviceTypes } from '../device-types';

@Component({
  selector: 'device-options',
  exportAs: 'deviceOptions',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {
  public devices = deviceTypes;
  private active = new Subject<DeviceType>();
  public active$ = this.active.asObservable().pipe(
    map(change => {
      console.log(change);
      
      return change;
    }),
    tap(console.log)
  );

  constructor() { }

  ngOnInit(): void {
  }

  change(value: DeviceType) {
    this.active.next(value);
  }

}
