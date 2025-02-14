import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  selectedLanguage: string = localStorage.getItem('language') || 'en';

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  changeLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
  }
}
