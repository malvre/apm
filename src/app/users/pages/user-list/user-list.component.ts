import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  userService = inject(UserService);

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.userService.all().subscribe((response) => {
      this.users = response.data;
    });
  }
}
