import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-items-cadastrar',
  templateUrl: './items-cadastrar.component.html',
  styleUrls: ['./items-cadastrar.component.scss'],
})
export class ItemsCadastrarComponent  implements OnInit {
  @Output() form = new EventEmitter<FormGroup>();
  formCadastrar : FormGroup
  currentYear = new Date().getFullYear();
  constructor(private formBuilder: FormBuilder) { 
    this.formCadastrar = this.formBuilder.group({
      modelo: ['', [Validators.required]],
      marca:  ['', [Validators.required]],
      ano:  ['', [Validators.required, Validators.pattern(/^(19|20)?\d{2,4}$/), Validators.min(this.currentYear - 100), Validators.max(this.currentYear)]],
      price: ['', [Validators.pattern(/^(\d{1,3}(.\d{3})*(\.\d{1,2})?|\d+(\.\d{1,2})?)$/), Validators.min(0)]],
      carroceria:  ['', [Validators.required]],
    })
  }

  ngOnInit() {}

  cadastrar() {
    if (this.formCadastrar.valid) {
      this.form.emit(this.formCadastrar);
    }
  }
  
}
