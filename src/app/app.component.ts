import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {forbiddenNameValidator} from "./shared/user-name.validator";
import {PasswordValidator} from "./shared/password.validator";
import {emailConditionallyRequiredValidator} from "./shared/email.validator";
import {RegistrationService} from "../registration.service";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  registrationForm: FormGroup ;

  constructor(private formBuilder: FormBuilder, private _registrationService: RegistrationService) {
  }

  ngOnInit(): void {
    // To create a form group we call the group method. The FormBuilder is a simpler way to create formGroups and
    // formControls. Inside the array of every formControl, the second field is the validation rule. By passing the]
    // registrationForm we can access both fields which are needed for the cross-check validation.
      this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      password: [''],
      confirmPassword: [''],
      email: [''],
      subscribe: [false],
      address: this.formBuilder.group({
        city: [''],
        state: [''],
        postcode: ['']
      }),alternateEmails: this.formBuilder.array([])
    }, {validators: PasswordValidator});
// // IMPORTANT NOTE: the validator has to be inside the body of the FormGroup and not the FormControls

    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm?.get('email');
      if (checkedValue) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }

      email.updateValueAndValidity();
    })

    }


  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }

  //This method is used, so that it is easier to access the formBuilder allternateEmails inside the HTML file
  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
  }


  //Every time this method is call a form controll is pushed onto this array
  addAlternateEmail() {
    this.alternateEmails.push(this.formBuilder.control(''));
  }

  // registrationForm = new FormGroup({
  // userName: new FormControl('', [Validators.required, Validators.minLength(3),
  // forbiddenNameValidator(/password/)]),
  // password: new FormControl('',[Validators.required]),
  // confirmPassword: new FormControl('',[Validators.required]),
  // address: new FormGroup({
  //   city: new FormControl('',[Validators.required]),
  //   state: new FormControl('',[Validators.required]),
  //   postcode: new FormControl('',[Validators.required])
  // })
  // });

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

  onSubmit() {
    console.log(this.registrationForm.value);
    return this._registrationService.register(this.registrationForm.value)
      .subscribe(
      response => console.log('Success!', response),
      error => console.log('Error', error)
    );
  }
}
