import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './select.component.html',
})
export class SelectComponent {
  logo = "icon.png"
}
