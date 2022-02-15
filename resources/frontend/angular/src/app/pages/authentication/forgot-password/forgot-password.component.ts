import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fadeInUpAnimation } from '../../../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'fury-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [fadeInUpAnimation]
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  form = this.fb.group({
    email: [null, Validators.required]
  });
  
  ngOnInit() {
  }

  send() {
    this.router.navigate(['/']);
  }
}
