import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { DatasharingComponent } from './datasharing/datasharing.component';
import { TranslateComponent } from './translate/translate.component';
import { SampleComponent } from './sample/sample.component';
const routes: Routes = [
  {
    path: "", component: SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
