import {AbstractControl} from "@angular/forms";

export function PasswordValidator(control: AbstractControl): { [key: string]:boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  // If both the password and the confirmPassword fields have not been filled,
  // then the error should not be alerted to the user.
  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  // If password is not blank and confirmPassword is not blank and both of them equal each
  // other then the password is correct, else return an error.
  return password && confirmPassword && password.value !== confirmPassword.value ?
    { 'misMatch': true} :
    null;
}
