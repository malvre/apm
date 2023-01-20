import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  user: any;

  route = inject(ActivatedRoute);
  userService = inject(UserService);

  constructor() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.userService.get(id).subscribe((result) => {
      this.user = result.data;
      console.log(this.user);
    });
  }
}
