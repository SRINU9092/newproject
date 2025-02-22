import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css']
})
export class TranslateComponent {
  constructor(private translate: TranslateService) {
    // Set default language
    this.translate.setDefaultLang('en');
  }

  // Method to change the language dynamically
  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
