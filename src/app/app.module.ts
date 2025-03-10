import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';  // Import AgGridModule
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { HttpClient, HttpClientModule } from '@angular/common/http';  // Import HttpClientModule
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatasharingComponent } from './datasharing/datasharing.component';
import { AppRoutingModule } from './app-routing.module';
import { TranslateComponent } from './translate/translate.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatMenuModule} from '@angular/material/menu';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { SampleComponent } from './sample/sample.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { DatePickerCellEditorComponent } from './date-picker-cell-editor/date-picker-cell-editor.component';
import { SrinuComponent } from './srinu/srinu.component';

// Import FormsModule for ngModel

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    
    SignupComponent,
    DatasharingComponent,
    TranslateComponent,
    DatepickerComponent,
    SampleComponent,
    DatePickerCellEditorComponent,
    SrinuComponent,
    
  ],
  imports: [
    BrowserModule,
    MatDatepickerModule,  // Import the MatDatepickerModule
    MatInputModule,       // Import MatInputModule for the input field
    MatFormFieldModule,   // Import MatFormFieldModule for the mat-form-field
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSidenavModule,
    AgGridModule,
    BrowserAnimationsModule,
    MatSortModule,        // Importing MatSortModule for sorting
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule, // Add AgGridModule here
    FormsModule,   // Add FormsModule here
    HttpClientModule ,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
