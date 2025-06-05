import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [ RouterLink ],
  templateUrl: './main-page.component.html',
})
export class MainPageComponent {
  img = "imagen.png"
  logo = "icon.png"
}
