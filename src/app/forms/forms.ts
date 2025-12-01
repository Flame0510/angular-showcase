// COMPONENT TYPE: Container
// SECTION: Angular Basics
//
// ROLE:
// - Demonstrate Angular Reactive Forms with validation
// - Show FormBuilder, FormGroup, and FormControl usage
// - Provide real-time validation feedback with visual indicators
//
// PATTERNS USED:
// - Reactive Forms pattern (FormBuilder, FormGroup)
// - Built-in and custom validators
// - Real-time validation with visual feedback (icons, error messages)
//
// NOTES FOR CONTRIBUTORS:
// - Use Reactive Forms (not Template-driven) for consistency
// - Add validators inline when creating the form group
// - Keep validation logic simple and educational
// - Show validation states visually (check/error icons)

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PageHeader } from '../page-header/page-header';
import { Icon } from '../components/icon/icon';

@Component({
  selector: 'app-forms',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PageHeader, Icon],
  templateUrl: './forms.html',
  styleUrl: './forms.scss',
})
export class Forms {
  reactiveForm: FormGroup;

  // Inject FormBuilder to create reactive form in constructor
  constructor(private fb: FormBuilder) {
    // Configura il form reattivo con validazioni
    this.reactiveForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z]+$'),
        ],
      ],
      surname: ['', Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  onSubmit() {
    // Esempio di setValue per aggiornare il valore di un controllo
    //this.reactiveForm.get('name')?.setValue('Mario');

    if (this.reactiveForm.valid) {
      console.log('Form reattivo inviato:', this.reactiveForm.value);
      alert('Form reattivo inviato con successo!');
    } else {
      console.log('Form reattivo non valido', this.reactiveForm.controls);
      alert('Form reattivo non valido. Controlla i campi e riprova.');
    }
  }

  onReset() {
    this.reactiveForm.reset();
  }
}
