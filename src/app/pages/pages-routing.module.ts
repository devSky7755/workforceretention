import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "home",
        component: DashboardComponent,
      },
      {
        path: "products",
        loadChildren: () =>
          import("./products/products.module").then((m) => m.ProductsModule),
      },
      {
        path: "articles",
        loadChildren: () =>
          import("./article/article.module").then((m) => m.ArticleModule),
      },
      {
        path: "clients",
        loadChildren: () =>
          import("./clients/clients.module").then((m) => m.ClientsModule),
      },
      {
        path: "surveys",
        loadChildren: () =>
          import("./surveys/surveys.module").then((m) => m.SurveysModule),
      },
      {
        path: "reporting",
        loadChildren: () =>
          import("./reporting/reporting.module").then((m) => m.ReportingModule),
      },
      {
        path: "links",
        loadChildren: () =>
          import("./links/links.module").then((m) => m.LinksModule),
      },
      {
        path: "office-admin",
        loadChildren: () =>
          import("./office-admin/office-admin.module").then(
            (m) => m.OfficeAdminModule
          ),
      },
      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfileModule),
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
