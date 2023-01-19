import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
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
