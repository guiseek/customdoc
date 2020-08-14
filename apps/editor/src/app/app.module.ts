import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { ToolbarEditorModule } from '@docentro/common/toolbar-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToolbarEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
