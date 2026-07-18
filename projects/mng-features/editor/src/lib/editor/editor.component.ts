import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mng-editor',
  templateUrl: './editor.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class EditorComponent {
  @Input() control: FormControl;
}
