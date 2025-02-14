import { Component, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Corrección aquí
})
export class HeaderComponent implements OnDestroy {

  isMobile: boolean = false;
  menuOpen: boolean = false;
  private breakpointSubscription: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointSubscription = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        catchError(error => {
          console.error('Error en BreakpointObserver:', error);
          return [];
        })
      )
      .subscribe({
        next: result => {
          this.isMobile = result.matches;
          if (!this.isMobile) {
            this.menuOpen = false;
          }
        },
        error: err => console.error('Error en la suscripción:', err)
      });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnDestroy() {
    if (this.breakpointSubscription) {
      this.breakpointSubscription.unsubscribe();
    }
  }
}
