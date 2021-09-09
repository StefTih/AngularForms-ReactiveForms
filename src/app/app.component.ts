import { Component } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private formBuilder: FormBuilder) {
  }

  //To create a form group we call the group method. The FormBuilder is a simpler way to create formGroups and
  //formControls. Inside the array of every formControl, the second field is the validation rule.
  registrationForm = this.formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(3)]],
    password: [''],
    confirmPassword: [''],
    address: this.formBuilder.group({
      city: [''],
      state: [''],
      postcode: ['']
    })
  });

  get userName() {
    return this.registrationForm.get('userName');
  }

  // registrationForm = new FormGroup({
  //   userName: new FormControl('Tihomir'),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  //   address: new FormGroup({
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //     postcode: new FormControl('')
  //   })
  // });
  //
  loadApi() {
    // Set value sets all values inside the form, but is very strict and requires every single value to have a
    // set value and is not null.
    // this.registrationForm.setValue({

    //With patchValue we are able to pick and choose which value we want to set values to some of the form controls
    this.registrationForm.patchValue({
      userName: 'Bibi',
      password: 'test',
      confirmPassword: 'test'
      // address: {
      //   city: 'London',
      //   state: 'Bexley',
      //   postcode: 'IG35TN'
      // }
    });
  }
}
