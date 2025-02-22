import { Component } from '@angular/core';
import { DatepickerComponent } from '../datepicker/datepicker.component';
import { DatePickerCellEditorComponent } from '../date-picker-cell-editor/date-picker-cell-editor.component';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent { 
  public columnDefs = [
    {
      headerName: 'Date',
      field: 'date',
      editable: true,  // Make the date column editable
      cellEditor: 'datePickerCellEditor',  // Use custom date picker cell editor
      valueFormatter: (params: { value: string | number | Date; }) => {
        if (!params.value) return '';  // Return an empty string if no date is set
        const date = new Date(params.value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      },
      cellStyle: {
        display: 'flex',
        justifyContent: 'center', // Center the content in the cell
      },
    },
    {
      headerName: 'Name',
      field: 'name',
      editable: true,  // Name column is editable
    },
  ];

  public rowData = [
    { date: null, name: '' },  // Empty initial data for Date and Name
    { date: null, name: '' },
  ];

  public frameworkComponents = {
    datePickerCellEditor: DatePickerCellEditorComponent, // Register custom date picker
  };

  public gridOptions = {
    rowHeight: 40,  // Set row height to fit the date picker
  };
}