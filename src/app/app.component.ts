import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { NavbarComponent } from './commons/components/navbar/navbar.component';
import { LoadingComponent } from './commons/services/loading/loading.component';
import { LoadingService } from './commons/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, LoadingComponent],
})
export class AppComponent {
  authService = inject(AuthService);
  loadingService = inject(LoadingService);
  router = inject(Router);

  loading$ = this.loadingService.loading$;

  ngOnInit() {
    this.authService.authenticationState.subscribe((state) => {
      if (state) {
        this.router.navigateByUrl('/users');
      } else {
        this.router.navigateByUrl('/auth');
      }
    });
  }
}
