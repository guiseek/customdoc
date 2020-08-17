import { NgModule } from '@angular/core';
import { DocService } from './doc.service';
import { DocProjectGuard } from './doc-project.guard';
import { environment } from '../../environments/environment';

@NgModule({
  providers: [
    DocService,
    DocProjectGuard,
    {
      provide: 'docs', useValue: environment.docs
    }
  ],
})
export class SharedModule { }
