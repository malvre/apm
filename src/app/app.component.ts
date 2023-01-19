import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { NavbarComponent } from './commons/components/navbar/navbar.component';
import { LoadingComponent } from './commons/services/loading/loading.component';
import { LoadingService } from './commons/services/loading/loading.service';
import { ToasterComponent } from './commons/services/toaster/toaster/toaster.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    LoadingComponent,
    ToasterComponent,
  ],
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
