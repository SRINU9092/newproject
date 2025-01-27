import { Component } from '@angular/core';
import { BusService } from '../bus.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  public busdetails: any[] = [];
  public gridOptions: any;
  public currentBusData: any = { busName: '', busType: '', status: '', capacity: '' };
  public isFormVisible: boolean = false;
  public isEditing: boolean = false;

  public columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Bus Name", field: "busName" },
    { headerName: "Bus Type", field: "busType" },
    { headerName: "Status", field: "status" },
    { headerName: "Capacity", field: "capacity" },
    {
      headerName: "Actions",
      cellRenderer: (params: any) => {
        const div = document.createElement('div');
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', () => {
          this.openForm(params.data);
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', () => {
          this.deleteRow(params.data);
        });

        div.appendChild(editButton);
        div.appendChild(deleteButton);

        return div;
      },
    }
  ];

  public defaultColDef = {
    filter: true,
    sortable: true,
  };

  public rowSelection: 'single' | 'multiple' | undefined;

  constructor(private busservice: BusService) {}

  ngOnInit() {
    this.busservice.getbusdetails().subscribe(
      (data: any) => {
        this.busdetails = data;
      },
      (error: any) => {
        console.error("Fetching data error", error);
      }
    );
  }

  onGridReady(params: any) {
    this.gridOptions = params;
  }

  openForm(busData: any = null) {
    if (busData) {
      this.isEditing = true;
      this.currentBusData = { ...busData };
    } else {
      this.isEditing = false;
      this.currentBusData = { busName: '', busType: '', status: '', capacity: '' };
    }
    this.isFormVisible = true;
  }

  addNewBus() {
    if (this.currentBusData.busName && this.currentBusData.busType && this.currentBusData.status && this.currentBusData.capacity) {
      this.busservice.addNewBus(this.currentBusData).subscribe(
        (response) => {
          this.busdetails.push(response);
          this.gridOptions.api.setRowData(this.busdetails);
          this.closeForm();
        },
        (error) => {
          console.error("Error adding new bus", error);
        }
      );
    } else {
      alert("Please fill in all fields!");
    }
  }

  editdata() {
    if (this.currentBusData.id) {
      this.busservice.editBusDetails(this.currentBusData.id, this.currentBusData).subscribe(
        (updatedData) => {
          const index = this.busdetails.findIndex(bus => bus.id === updatedData.id);
          this.busdetails[index] = updatedData;
          this.gridOptions.api.setRowData(this.busdetails);
          this.closeForm();
        },
        (error) => {
          console.error("Error updating bus details", error);
        }
      );
    }
  }

  closeForm() {
    this.isFormVisible = false;
    this.isEditing = false;
    this.currentBusData = { busName: '', busType: '', status: '', capacity: '' };
  }

  deleteRow(rowData: any) {
    const rowId = rowData.id;
    this.busservice.deleteBusDetails(rowId).subscribe(
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
}
