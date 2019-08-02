import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { MENU_ITEMS } from "./pages-menu";
import { NbAuthService, NbTokenService } from '@nebular/auth';
import { CanActivate, Router, NavigationEnd } from '@angular/router';
import { RoleService } from "../@core/data/role.service";

@Component({
    selector: 'ngx-pages',
    template: `
        <ngx-sample-layout>
            <nb-menu [items]="menu"></nb-menu>
            <router-outlet></router-outlet>
        </ngx-sample-layout>
    `,
})
export class PagesComponent {
    logoutResult;
    menu = [];
    constructor(private authService: AuthService, private roleService: RoleService,
        private router: Router,
        private tokenService: NbTokenService) {

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.getRole()
            }
        })
    }

    ngOnInit() {
        this.getRole()
    }

    getRole() {
        this.tokenService.get()
            .subscribe(token => {
                console.log(token)
                let payload = token.getPayload()
                if (!payload || !payload._id) {
                    this.logout(payload)
                }
                this.roleService.getRoleByUserId(payload._id).subscribe(
                    data => {
                        // if (data.role == "super_admin") {
                        //     this.menu = MENU_ITEMS
                        //     return
                        // }
                        const roleString = JSON.stringify(data.role);
                        localStorage.setItem('permission_role_app', roleString);

                        let permissions = data.role.permissions
                        let menu = MENU_ITEMS.filter(item => {
                            return permissions.some(permission =>
                                permission.table_name == item.title
                            )
                        })
                        // let menu = MENU_ITEMS
                        this.menu = menu
                    },
                    err => {
                        console.log(err);
                        this.logout(payload)
                    }
                );
            });
    }
    logout(payload) {
        this.authService.logout(payload)
            .subscribe(result => {
                this.logoutResult = result
                if (this.logoutResult.success) {
                    localStorage.removeItem('auth_app_token');
                    this.router.navigateByUrl('/auth/login');
                }
            })
    }
}
