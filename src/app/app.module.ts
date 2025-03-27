// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FieldGroupComponent } from './components/field-group/field-group.component';

import { CalendarModule } from 'primeng/calendar';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    FieldGroupComponent
  ],
  imports: [
    CalendarModule,
    BrowserModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
