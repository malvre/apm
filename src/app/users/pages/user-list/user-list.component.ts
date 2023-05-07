import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from 'src/app/commons/services/loading/loading.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/commons/pipes/search.pipe';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SearchPipe],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users = signal<User[]>([]);
  activeUser = signal<User>({} as User);

  searchTerm: string = '';

  userService = inject(UserService);
  router = inject(Router);
  offcanvasService = inject(NgbOffcanvas);
  loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loadingService.show();
    this.userService.all().subscribe((response) => {
      this.users.set(response);
      this.loadingService.hide();
    });
  }

  onEdit(event: any, user: User) {
    event.stopPropagation();
    this.router.navigateByUrl(`/users/${user.id}/edit`);
  }

  onDetail(content: any, user: User) {
    this.activeUser.set(user);
    this.offcanvasService.open(content, { position: 'end' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }
}
