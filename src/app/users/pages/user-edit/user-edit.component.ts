import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoadingService } from 'src/app/commons/services/loading/loading.service';
import { ToastService } from 'src/app/commons/services/toaster/toast.service';
import { ConfirmationDialogService } from 'src/app/commons/services/confirmation-dialog/confirmation-dialog.service';
import { UserService } from '../../services/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent {
  userForm!: FormGroup;
  userId: string | null;

  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);
  loadingService = inject(LoadingService);
  toastService = inject(ToastService);
  confirmationDialogService = inject(ConfirmationDialogService);
  userService = inject(UserService);

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.loadForm();
  }

  loadForm() {
    if (this.userId) {
      this.loadingService.show();
      this.userService
        .get(+this.userId)
        .pipe(map((res) => res.data))
        .subscribe((result) => {
          this.userForm.patchValue({
            firstName: result.first_name,
            lastName: result.last_name,
            email: result.email,
          });
          this.loadingService.hide();
        });
    }
  }

  async onSave() {
    try {
      const d = this.userForm.value;

      console.log(this.userId, d);
    } catch (error) {
      console.error(error);
    }
  }

  async onDelete() {
    if (!this.userId) return;

    const result = await this.confirmationDialogService.confirm(
      'Delete user?',
      `Do you want to permanently delete the user ${this.userForm.controls['firstName'].value}?`
    );
    if (result) {
      try {
        // do something

        this.router.navigateByUrl('/users');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
