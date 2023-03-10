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
import { lastValueFrom } from 'rxjs';

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
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.loadForm();
  }

  loadForm() {
    if (this.userId) {
      this.loadingService.show();
      this.userService.get(+this.userId).subscribe((result) => {
        this.userForm.patchValue({
          first_name: result.first_name,
          last_name: result.last_name,
          email: result.email,
        });
        this.loadingService.hide();
      });
    }
  }

  async onSave() {
    this.loadingService.show();
    try {
      const data = this.userForm.value;

      if (this.userId) {
        const res = await lastValueFrom(
          this.userService.update(data, +this.userId)
        );
        this.toastService.showSuccessToast('Success', 'User updated');
      } else {
        const res = await lastValueFrom(this.userService.add(data));
        this.toastService.showSuccessToast('Success', 'User created');
      }

      this.router.navigateByUrl('/users');
    } catch (error) {
      console.error(error);
      this.toastService.showErrorToast('Ops', 'Something went wrong');
    } finally {
      this.loadingService.hide();
    }
  }

  async onDelete() {
    if (!this.userId) return;

    const result = await this.confirmationDialogService.confirm(
      'Delete user?',
      `Do you want to permanently delete the user ${this.userForm.controls['first_name'].value}?`
    );
    if (result) {
      try {
        this.loadingService.show();
        const res = await lastValueFrom(this.userService.delete(+this.userId));
        this.toastService.showSuccessToast('Success', 'User deleted');
        this.router.navigateByUrl('/users');
      } catch (error) {
        console.error(error);
        this.toastService.showErrorToast('Ops', 'Something went wrong');
      } finally {
        this.loadingService.hide();
      }
    }
  }
}
