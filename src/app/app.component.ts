import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { NavbarComponent } from './commons/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, NavbarComponent],
})
export class AppComponent {
  authService = inject(AuthService);
  router = inject(Router);

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
