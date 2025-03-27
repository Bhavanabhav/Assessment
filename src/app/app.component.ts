import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FieldGroupComponent } from './components/field-group/field-group.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FieldGroupComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'assessment';
}
