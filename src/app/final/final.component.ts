import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Blockchain } from './final.model';
import { AppState } from './../app.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit, OnDestroy {
  angForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      name: ['fin', Validators.required],
      LastName: ['bass', Validators.required],
      price: ['', Validators.required],
      Email: ['nonye@gmail', Validators.required],
      amount: [
        '',
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ],
      phone: ['', Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
    });
  }

  addCoin(name, lname, phone, email, price) {
    console.log('x');
    this.store.dispatch({
      type: 'ADD_COIN',
      payload: <Blockchain>{
        name: name,
        LastName: lname,
        price: price,
        PhoneNumber: phone,
        Email: email
      }
    });
  }

  ngOnInit() {}
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }
}
