import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { interval, Subscription, tap } from 'rxjs';
import { Convert, Currency, DEFAULT_CHANGE_RATE } from '../../models';

@Component({
  selector: 'app-convert-form',
  imports: [ReactiveFormsModule],
  templateUrl: './convert-form.component.html',
  styleUrl: './convert-form.component.scss'
})
export class ConvertFormComponent {
  @Input() value!: Convert;
  @Output() valueChange = new EventEmitter<Convert>();

  private fb = inject(FormBuilder);

  formGroup = this.fb.group({
    changeRate: [{ value: 1.1, disabled: true }, Validators.required],
    manual: [false],
    fromCurrency: ['', Validators.required],
    fromAmount: [null, Validators.required],
    toCurrency: [{ value: '', disabled: true }],
    toAmount: [{ value: null, disabled: true }],
  });

  changeRate = signal(DEFAULT_CHANGE_RATE);
  changeRateInterval$ = interval(3000).pipe(
    tap((v) => {
      if (!this.formGroup.value.manual) {
        this.changeRate.set(
          this.changeRate() + (Math.random() * 0.1 - 0.05)
        );
      }
    })
  );

  currencies = Object.keys(Currency);

  subRef: Subscription[] = []

  ngOnInit() {
    this.subRef.push(this.changeRateInterval$.subscribe(console.log))

    this.subRef.push(this.formGroup.controls.fromCurrency.valueChanges.subscribe((value) => {
      this.formGroup.controls.toCurrency.setValue(
        value == Currency.EUR ? Currency.USD : Currency.EUR
      );
    }));

    this.subRef.push(this.formGroup.controls.manual.valueChanges.subscribe((value) => {
      if (value) {
        this.formGroup.controls.changeRate.enable();
      } else {
        this.formGroup.controls.changeRate.disable();
      }
    }));
  }

  ngOnDestroy() {
    this.subRef.map((i) => i.unsubscribe())
  }


  handleSwitch() {
    const value = this.formGroup.getRawValue();
    this.changeRate.set(1 / this.changeRate());
    this.formGroup.patchValue({
      changeRate: this.changeRate(),
      fromCurrency: value.toCurrency,
      fromAmount: value.toAmount,
      toCurrency: value.fromCurrency,
      toAmount: value.fromAmount,
    });
  }

  handleSubmit() {
    if (this.formGroup.valid) {
      const value = this.getFinalValue();
      this.valueChange.emit(value);
    }
  }

  private getFinalValue() {
    const value = this.formGroup.getRawValue() as any;
    let changeRate: number;
    const diff = Math.abs(value.changeRate - this.changeRate());
    const maxAllowed = 0.02 * this.changeRate();
    if (diff > maxAllowed) {
      changeRate = this.changeRate();
      console.error(
        'change to hight, which to default one',
        this.changeRate()
      );
    } else {
      changeRate = value!.changeRate as any;
    }
    this.formGroup.patchValue({
      toAmount: this.computeResult(
        value.fromAmount as any,
        changeRate
      ) as any,
    });

    return this.formGroup.getRawValue() as any
  }

  private computeResult(from: number, rate: number) {
    return from * rate;
  }
}
