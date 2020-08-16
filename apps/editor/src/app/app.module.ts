import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { SplitContentModule } from '@customdoc/common/split-content';
import { ToolbarEditorModule } from '@customdoc/common/toolbar-editor';
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
    SplitContentModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
