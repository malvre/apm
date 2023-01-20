import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  activeUser: any = {};

  userService = inject(UserService);
  router = inject(Router);
  offcanvasService = inject(NgbOffcanvas);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.all().subscribe((response) => {
      this.users = response.data;
    });
  }

  onEdit(event: any, user: any) {
    event.stopPropagation();
    this.router.navigateByUrl(`/users/${user.id}/edit`);
  }

  onDetail(content: any, user: any) {
    this.activeUser = user;
    this.offcanvasService.open(content, { position: 'end' }).result.then(
      (result) => {},
      (reason) => {}
    );
  }
}
