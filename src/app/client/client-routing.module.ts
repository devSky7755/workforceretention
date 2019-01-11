import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AuthenticationComponent} from "./authentication/authentication.component";
import {ProductComponent} from "./product/product.component";
import {ContactComponent} from "./contact/contact.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: AuthenticationComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'product', component: ProductComponent},
    {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {
}
