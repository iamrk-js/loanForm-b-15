import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/validators/custom-validators';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-apply-loan',
  templateUrl: './apply-loan.component.html',
  styleUrls: ['./apply-loan.component.scss']
})
export class ApplyLoanComponent implements OnInit {


  personalDetailsForm: FormGroup;
  documentUploadForm: FormGroup; // Add this line
  addressDetailsForm: FormGroup;
  employmentDetailsForm: FormGroup;
  loanDetailsForm: FormGroup;

  employmentTypes = ['Salaried', 'Self-Employed', 'Freelancer', 'Other'];
  loanPurposes = ['Home Loan', 'Car Loan', 'Personal Loan', 'Education Loan'];
  relationships = ['Spouse', 'Parent', 'Sibling', 'Child', 'Other'];

  constructor(
    private fb: FormBuilder,
    private loanService : LoanService
  ) {
    // Personal Details Form
    this.personalDetailsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, CustomValidators.phoneNumberValidator()]],
      dob: ['', [Validators.required, CustomValidators.dateOfBirthValidator()]],
      gender: ['', Validators.required],
      maritalStatus: ['', Validators.required],
    });
    this.documentUploadForm = this.fb.group({
      pan: ['', [Validators.required, CustomValidators.panCardValidator()]],
      aadhar: ['', [Validators.required, CustomValidators.aadharCardValidator()]],
    });
    // Address Details Form
    this.addressDetailsForm = this.fb.group({
      permanentAddress: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        country: ['', Validators.required],
      }),
      currentAddress: this.fb.group({
        addressLine1: ['', Validators.required],
        addressLine2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
        country: ['', Validators.required],
      }),
      sameAsPermanent: [false] // Checkbox to copy address
    });

    // Employment Details Form
    this.employmentDetailsForm = this.fb.group({
      employmentType: ['', Validators.required],
      currentIncome: ['', [Validators.required, Validators.min(0)]],
      companyName: ['', Validators.required],
      designation: ['', Validators.required],
    });

    // Loan Details Form
    this.loanDetailsForm = this.fb.group({
      loanAmount: ['', [Validators.required, CustomValidators.loanAmountValidator(10000, 10000000)]],
      loanTenure: ['', [Validators.required, CustomValidators.loanTenureValidator(6, 60)]],
      loanPurpose: ['', Validators.required],
      nomineeName: ['', Validators.required],
      nomineeRelationship: ['', Validators.required],
    });
  }
  ngOnInit(): void {
  }

  onSameAsPermanentChange() {
  }

  onSubmit() {
    if (
      this.personalDetailsForm.valid &&
      this.addressDetailsForm.valid &&
      this.employmentDetailsForm.valid &&
      this.loanDetailsForm.valid
    ) {
      const formData = {
        ...this.personalDetailsForm.value,
        ...this.addressDetailsForm.value,
        ...this.employmentDetailsForm.value,
        ...this.loanDetailsForm.value,
      };
      console.log('Form Submitted:', formData);
      // Here you can make an API call to submit the form data
      this.loanService.applyLoan(formData)
        .subscribe(res => {
          console.log(res);
        })
    } else {
      console.log('Form is invalid');
    }
  }

  logFormState() {
    console.log('Form Valid:', this.personalDetailsForm.valid);
    console.log('Form Errors:', this.personalDetailsForm.errors);
    console.log('Name Control Errors:', this.personalDetailsForm.get('name')?.errors);
    console.log('Email Control Errors:', this.personalDetailsForm.get('email')?.errors);
    console.log('Phone Control Errors:', this.personalDetailsForm.get('phone')?.errors);
  }
}
