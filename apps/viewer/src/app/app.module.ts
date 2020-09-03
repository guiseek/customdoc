import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CompodocViewerModule } from '@customdoc/common/compodoc-viewer';
import { PaginatorStoreModule } from '@customdoc/paginator-store';
import { DeviceViewerModule } from '@customdoc/device-viewer';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    CompodocViewerModule,
    PaginatorStoreModule,
    DeviceViewerModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
