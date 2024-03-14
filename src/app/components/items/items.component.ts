import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() carros: any;
  @Output() carrosChange: EventEmitter<any> = new EventEmitter<any>();
  formGroup: FormGroup;
  @Input() edicao: any;
  currentYear = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      modelo: ['', Validators.required],
      marca:  ['', Validators.required],
      ano:  ['', [Validators.required, Validators.pattern(/^(19|20)?\d{2,4}$/), Validators.min(this.currentYear - 100), Validators.max(this.currentYear)]],
      price: ['', [Validators.pattern(/^(\d{1,3}(.\d{3})*(\.\d{1,2})?|\d+(\.\d{1,2})?)$/), Validators.min(0)]],
      carroceria:  ['', Validators.required],
    });
  }

  ngOnInit() {
    this.formGroup.patchValue({
      modelo: this.carros.modelo,
      marca: this.carros.marca,
      ano: this.carros.ano,
      price: this.carros.price,
      carroceria: this.carros.carroceria,
    });
  }

  salvar() {
    if (this.formGroup.valid) {
      this.carrosChange.emit(this.formGroup);
    }
  }
}
