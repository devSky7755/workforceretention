import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {ProductComponent} from './product/product.component';
import {DetailsComponent} from './product/details/details.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {NbCardModule, NbLayoutModule} from "@nebular/theme";
import {PageNameComponent} from './page-name/page-name.component';

@NgModule({
    declarations: [
        HomeComponent,
        ContactComponent,
        ProductComponent,
        DetailsComponent,
        AuthenticationComponent,
        HeaderComponent,
        FooterComponent,
        PageNameComponent
    ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        FlexLayoutModule,
        NbCardModule,
        NbLayoutModule
    ]
})
export class ClientModule {
}
