import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExamenVenturesSoft';
  constructor(private translate: TranslateService) {
    const language = localStorage.getItem('language') || 'en';
    translate.setDefaultLang(language);
    translate.use(language);
  }
}
