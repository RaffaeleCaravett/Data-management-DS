import { Component, Input, TemplateRef } from '@angular/core';
import { LoaderService } from 'app/shared/services/loader.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'dm-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    host: {
        class: 'dm-loader'
    }
})
export class LoaderComponent {

    inLoading$: BehaviorSubject<boolean>;
    showMessage$: BehaviorSubject<boolean>;

    // LOADER
    @Input() loaderTemplate: TemplateRef<any>;

    constructor(private loaderService: LoaderService) {
        this.inLoading$ = this.loaderService.loader$;
        this.showMessage$ = this.loaderService.showMessage$;
    }

}
