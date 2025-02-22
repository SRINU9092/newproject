import { Component, Input} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datasharing',
  templateUrl: './datasharing.component.html',
  styleUrls: ['./datasharing.component.css']
})
export class DatasharingComponent {
  //@Input()  Data:string = "";

  receivedData: any[] =[];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Retrieve the data passed via router state
    const navigationState = history.state;
    if (navigationState && navigationState.data) {
      this.receivedData = navigationState.data;  // Assign the passed data to a variable
    } else {
      this.receivedData = [];  // Default if no data is passed
    }
  }}
