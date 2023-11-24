import { Component } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';


@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
  animations: [appModuleAnimation()]

})
export class StateComponent {

}
