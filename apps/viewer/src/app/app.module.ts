import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { CompodocViewerModule } from '@customdoc/common/compodoc-viewer';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: ':project',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
  },
];

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    CompodocViewerModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
