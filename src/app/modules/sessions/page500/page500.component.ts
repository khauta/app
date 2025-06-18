import { Component } from '@angular/core';
import { ErrorCodeComponent } from '../../../shared/components/error-code/error-code.component';

@Component({
    selector: 'app-page500',
    templateUrl: './page500.component.html',
    styleUrls: ['./page500.component.scss'],
    standalone: true,
    imports: [ErrorCodeComponent]
})
export class Page500Component {

}
