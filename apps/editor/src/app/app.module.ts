import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { SplitContentModule } from '@customdoc/common/split-content';
import { ToolbarEditorModule } from '@customdoc/common/toolbar-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToolbarEditorModule,
    SplitContentModule,
    RouterModule.forRoot(
      [
        { path: '', pathMatch: 'full', redirectTo: 'markdown' },
        {
          path: 'markdown',
          loadChildren: () =>
            import('./markdown/markdown.module').then((m) => m.MarkdownModule),
        },
        {
          path: 'document',
          loadChildren: () =>
            import('./document/document.module').then((m) => m.DocumentModule),
        },
      ],
      { initialNavigation: 'enabled' }
    ),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
