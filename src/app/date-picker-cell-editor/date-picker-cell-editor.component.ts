import { Component, OnInit, ViewChild } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatInput } from '@angular/material/input';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-picker-cell-editor',
  templateUrl: './date-picker-cell-editor.component.html',
  styleUrls: ['./date-picker-cell-editor.component.css'],
})
export class DatePickerCellEditorComponent implements ICellEditorAngularComp, OnInit {
  public dateControl!: FormControl; // Non-null assertion operator added here
  private params: any;

  @ViewChild('datepicker')
  datepicker!: MatDatepicker<Date>;

  constructor() {}

  ngOnInit(): void {
    this.dateControl = new FormControl(null);
  }

  agInit(params: any): void {
    this.params = params;
    this.dateControl.setValue(null); // Make sure the input is empty when the date picker opens
  }

  getValue(): any {
    const selectedDate = this.dateControl.value;
    if (selectedDate) {
      return `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${selectedDate
        .getDate()
        .toString()
        .padStart(2, '0')} ${selectedDate
        .getHours()
        .toString()
        .padStart(2, '0')}:${selectedDate
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${selectedDate
        .getSeconds()
        .toString()
        .padStart(2, '0')}`;
    }
    return null;
  }

  onDateChanged(): void {
    const formattedDate = this.getValue();
    this.params.api.stopEditing();
    this.params.node.setDataValue(this.params.colDef.field, formattedDate);
  }
}
