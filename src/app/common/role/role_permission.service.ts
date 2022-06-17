import { Injectable } from "@angular/core";
import { AuthService } from "../../auth/auth.service";
import { CanActivate, Router, NavigationEnd } from "@angular/router";
import { NbAuthService, NbTokenService } from "@nebular/auth";

@Injectable()
export class RolePermissionService {
  logoutResult;
  role;
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: NbTokenService
  ) {}

  getRolePermission(role_name) {
    try {
      const permissionRole = localStorage.getItem("permission_role_app");
      this.role = JSON.parse(permissionRole);
      const permissions = this.role.permissions.filter(
        (permission) => permission.table_name == role_name
      );
      const permission = permissions[0];
      return permission;
    } catch (error) {
      this.logout();
      return null;
    }
  }

  logout() {
    this.tokenService.get().subscribe((token) => {
      const payload = token.getPayload();
      this.authService.logout(payload).subscribe((result) => {
        this.logoutResult = result;
        if (this.logoutResult.success) {
          localStorage.removeItem("auth_app_token");
          this.router.navigateByUrl("/auth/login");
        }
      });
    });
  }
}
