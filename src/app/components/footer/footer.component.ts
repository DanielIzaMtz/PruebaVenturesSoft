import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  selectedLanguage: string = 'en';

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    const savedLang: string | null = localStorage.getItem('language');
    if (savedLang !== null) {
      this.selectedLanguage = savedLang;
    }

    this.translate.setDefaultLang(this.selectedLanguage);
    this.translate.use(this.selectedLanguage);
  }

  changeLanguage(lang: string): void {
    this.selectedLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  }
}
