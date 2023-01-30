import { CommonModule } from '@angular/common';
import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth/services/auth.service';
import { NavbarComponent } from './commons/components/navbar/navbar.component';
import { checkInternet } from './commons/functions/checkInternet';
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
    NgbAlertModule,
  ],
})
export class AppComponent implements AfterContentChecked {
  authService = inject(AuthService);
  loadingService = inject(LoadingService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  loading$ = this.loadingService.loading$;

  online: boolean = true;

  constructor() {
    checkInternet().subscribe((isOnline) => {
      this.online = isOnline;
    });
  }

  ngOnInit() {
    this.authService.authenticationState.subscribe((state) => {
      if (state) {
        this.router.navigateByUrl('/users');
      } else {
        this.router.navigateByUrl('/auth');
      }
    });
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
}
