import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {StorageService} from './storage.service';


@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    routes: any;
    private currentUser: any;

    constructor( private auth: AuthService,
                private router: Router, private userService: StorageService) {
       //  this.routes = routesPermissionsConfig.routes;
    /*    this.userService.user$.subscribe(user => {
            this.currentUser = user;
        });*/
        console.log('costruttore AuthGuard');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (!this.currentUser) {
            const item = this.userService.getToken();
            if (!item) {
                // this.userService.addUser(JSON.parse(item));
              this.router.navigate(['/auth']);
            }
        }

        console.log('canActivate for path:', state.url);

        const isPublic = route.data?.public;
        return true;

    }

}
