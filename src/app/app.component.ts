import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'ExamenVenturesSoft';

  errorMessage: string | null = null;

  constructor(
    private translate: TranslateService,
    private toastr: ToastrService
  ) {
    const language = localStorage.getItem('language') || 'en';
    translate.setDefaultLang(language);
    translate.use(language);
  }
  
  showError(message: string) {
    this.errorMessage = message;
    this.toastr.error(message, 'Error');
  }
}
