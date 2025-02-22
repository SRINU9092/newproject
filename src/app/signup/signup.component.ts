import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusService } from '../bus.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  public busdetails: any[] = [];
  public gridOptions: any;
  public isFormVisible: boolean = false;
  
  public busForm!: FormGroup;
  private busDetailsSubscription!: Subscription;
  private addBusSubscription!: Subscription;
  private deleteBusSubscription!: Subscription;
  navopened=false;

  public columnDefs: any[] = [];
  public defaultColDef = {
    filter: true,
    sortable: true,
  };

  constructor(
    private busservice: BusService,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.busForm = this.fb.group({
      busName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      busType: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      status: ['', [Validators.required, Validators.pattern('^(Active|Inactive)$')]],
      capacity: ['', [Validators.required, Validators.min(10), Validators.max(100)]],
    });

    this.busDetailsSubscription = this.busservice.getbusdetails().subscribe(
      (data: any) => {
        this.busdetails = data;
      },
      (error: any) => {
        console.error("Fetching data error", error);
      }
    );

    this.setColumnDefs();

    this.translate.onLangChange.subscribe(() => {
      this.setColumnDefs();
    });
  }

  setColumnDefs() {                                     
    this.translate.get(['id', 'busName', 'busType', 'status', 'capacity', 'actions']).subscribe((translations) => {
      this.columnDefs = [
        { headerName: translations['id'], field: "id", editable: false },
        { headerName: translations['busName'], field: "busName", editable: true },
        { headerName: translations['busType'], field: "busType", editable: true },
        { headerName: translations['status'], field: "status", editable: true },
        { headerName: translations['capacity'], field: "capacity", editable: true },
        { headerName: translations['actions'],
          cellRenderer: (params: any) => {
            const div = document.createElement('div');
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', () => {
              this.deleteRow(params.data);
            });

            div.appendChild(deleteButton);
            return div;
          },
        }
      ];
    });
  }

  onLangChange() {
    this.setColumnDefs();
  }

  onLanguageChange(event: any) {
    const selectedLanguage = event.target.value;
    this.translate.use(selectedLanguage);
  }

  onGridReady(params: any) {
    this.gridOptions = params;
  }

  onCellEditingStopped(event: any) {
    const updatedBusData = event.data;
    this.busservice.editBusDetails(updatedBusData.id, updatedBusData).subscribe(
      (updatedData) => {
        const index = this.busdetails.findIndex(bus => bus.id === updatedData.id);
        this.busdetails[index] = updatedData;
        this.gridOptions.api.setRowData(this.busdetails);
      },
      (error) => {
        console.error("Error updating bus details", error);
      }
    );
  }

  openAddBusForm() {
    this.isFormVisible = true;
    this.busForm.reset();
  } 
  

  closeForm() {
    this.isFormVisible = false;
  }
  

  addNewBus() {
    if (this.busForm.valid) {
      this.addBusSubscription = this.busservice.addNewBus(this.busForm.value).subscribe(
        (response) => {
          this.busdetails.push(response);
          this.gridOptions.api.setRowData(this.busdetails);
          this.closeForm();
        },
        (error) => {
          console.error("Error adding new bus", error);
        }
      );
    }
  }

  deleteRow(rowData: any) {
    const rowId = rowData.id;
    this.deleteBusSubscription = this.busservice.deleteBusDetails(rowId).subscribe(
      (response) => {
        const index = this.busdetails.findIndex(bus => bus.id === rowId);
        this.busdetails.splice(index, 1);
        this.gridOptions.api.setRowData(this.busdetails);
      },
      (error) => {
        console.error("Error deleting bus", error);
      }
    );
  }  
  displayedColumns: string[] = ['employeeId', 'name', 'position', 'department', 'salary'];  // Columns to display in the table
  dataSource = new MatTableDataSource<any>([
    { employeeId: 1, name: 'John Doe', position: 'Software Engineer', department: 'IT', salary: 80000 },
    { employeeId: 2, name: 'Jane Smith', position: 'HR Manager', department: 'HR', salary: 60000 },
    { employeeId: 3, name: 'Sam Wilson', position: 'Product Manager', department: 'Product', salary: 75000 },
    
    { employeeId: 4, name: 'David Lee', position: 'Software Engineer', department: 'IT', salary: 78000 },
    { employeeId: 5, name: 'Sarah Adams', position: 'Customer Support', department: 'Support', salary: 45000 }
  ]);

  ngOnDestroy(): void {
    if (this.busDetailsSubscription) {
      this.busDetailsSubscription.unsubscribe();
    }
    if (this.addBusSubscription) {
      this.addBusSubscription.unsubscribe();
    }
    if (this.deleteBusSubscription) {
      this.deleteBusSubscription.unsubscribe();
    }
  } 
    toggle(){
       this.navopened=!this.navopened;
    }
}
