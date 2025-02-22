// datepicker.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css'],
})
export class DatepickerComponent implements ICellEditorAngularComp {
  public selectedDate!: Date;

  // Ag-Grid hooks
  agInit(params: any): void {
    if (params.value) {
      this.selectedDate = new Date(params.value);
    }
  }

  getValue(): any {
    return this.selectedDate;
  }
}
