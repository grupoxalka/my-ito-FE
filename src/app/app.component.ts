import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './shared/components/input/input.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-ito-FE';
}
