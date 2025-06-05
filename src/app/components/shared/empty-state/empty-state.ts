import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  template: `
    <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div class="bg-green-100 rounded-full p-6 mb-6">
        <fa-icon [icon]="icon" class="text-4xl text-green-600"></fa-icon>
      </div>
      <h3 class="text-xl font-bold text-green-900 mb-2">{{ title }}</h3>
      <p class="text-green-700 mb-6 max-w-md">{{ message }}</p>
      <button *ngIf="buttonText" 
              [routerLink]="buttonLink" 
              class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition">
        {{ buttonText }}
      </button>
    </div>
  `,
  styles: []
})
export class EmptyStateComponent {
  @Input() title: string = 'No hay datos disponibles';
  @Input() message: string = 'No se encontraron registros para mostrar.';
  @Input() buttonText: string = '';
  @Input() buttonLink: string = '';
  @Input() icon!: IconDefinition;
}