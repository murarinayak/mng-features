import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mng-editor',
  templateUrl: './editor.component.html',
  standalone: false
})
export class EditorComponent {
  @Input() control: FormControl;
}
