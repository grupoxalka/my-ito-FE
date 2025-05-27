import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './shared/components/input/input.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'my-ito-FE';
}
