import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { NbAuthComponent } from "@nebular/auth";
import { AuthGuard } from "./auth-guard.service";
import { LogoutComponent } from "./auth/logout/logout.component";
import { LoginComponent } from "./auth/login/login.component";
import { RequestPasswordComponent } from "./auth/request-password/request-password.component";
import { ResetPasswordComponent } from "./auth/reset-password/reset-password.component";
import { TfaComponent } from "./auth/tfa/tfa.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./client/client.module").then((m) => m.ClientModule),
  },
  {
    path: "pages",
    canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
  },
  {
    path: "auth",
    component: NbAuthComponent,
    children: [
      {
        path: "",
        component: LoginComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },
      // {
      //     path: 'register',
      //     component: NbRegisterComponent,
      // },
      {
        path: "logout",
        component: LogoutComponent,
      },
      {
        path: "request-password",
        component: RequestPasswordComponent,
      },
      {
        path: "reset-password",
        component: ResetPasswordComponent,
      },
      {
        path: "tfa",
        component: TfaComponent,
      },
    ],
  },
  { path: "client", redirectTo: "", pathMatch: "prefix" },
  { path: "register", redirectTo: "auth/login", pathMatch: "full" },
  { path: "**", redirectTo: "" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
