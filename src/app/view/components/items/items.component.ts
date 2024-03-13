import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  @Input() carros: any;
  @Output() carrosChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() formGroup: FormGroup;
  @Input() edicao: any;
  currentYear = new Date().getFullYear();

  constructor() {}

  ngOnInit() {}

  get form() {
    return this.formGroup.controls;
  }

  onChange() {
    // Emitir evento quando os campos são alterados
    this.carrosChange.emit(this.carros);
  }
}
