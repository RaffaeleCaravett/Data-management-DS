import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService implements OnDestroy {
    loader$: BehaviorSubject<boolean> = new BehaviorSubject(false);
    showMessage$: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor() {
    }

    inLoading(state: boolean) {
        this.loader$.next(state);
        if (!state) {
            this.setShowMessage(false);
        }
    }

    setShowMessage(state: boolean) {
        this.showMessage$.next(state);
    }

    ngOnDestroy(): void {
        this.loader$.complete();
        this.showMessage$.complete();
    }
}