import { NgModule, Pipe } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SlickCarouselModule } from "ngx-slick-carousel";
import {
  RECAPTCHA_SETTINGS,
  RecaptchaModule,
  RecaptchaSettings,
  RecaptchaFormsModule,
} from "ng-recaptcha";
import {
  NbCardModule,
  NbDatepickerModule,
  NbLayoutModule,
  NbPopoverModule,
  NbDialogModule,
} from "@nebular/theme";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { TimeAgoPipe } from "time-ago-pipe";

import { ClientRoutingModule } from "./client-routing.module";
import { HomeComponent } from "./home/home.component";
import { ContactComponent } from "./contact/contact.component";
import { ProductComponent } from "./product/product.component";
import { DetailsComponent } from "./product/details/details.component";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PageNameComponent } from "./page-name/page-name.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { QuestionsComponent } from "./questions/questions.component";
import { ProfileComponent } from "./profile/profile.component";
import { EmployeeSurveyDownloadComponent } from "./employee-survey-download/employee-survey-download.component";
import { ManagerReportComponent } from "./manager-report/manager-report.component";
import { ReportsComponent } from "./reports/reports.component";
import { ManagerReportPdfComponent } from "./manager-report-pdf/manager-report-pdf.component";
import { FlexibleOptionsComponent } from "./flexible-options/flexible-options.component";
import { AboutComponent } from "./about/about.component";
import { BlogComponent } from "./blog/blog.component";
import { BlogDetailComponent } from "./blog/blog-detail/blog-detail.component";
import { RequestAQuoteComponent } from "./request-a-quote/request-a-quote.component";
import { PrivacyComponent } from "./privacy/privacy.component";
import { ClientTestimonialComponent } from "./home/client-testimonial/client-testimonial.component";

@Pipe({
  name: "timeAgo",
  pure: false,
})
export class TimeAgoExtendsPipe extends TimeAgoPipe {}

@NgModule({
  declarations: [
    HomeComponent,
    ClientTestimonialComponent,
    AuthenticationComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    BlogComponent,
    BlogDetailComponent,
    ContactComponent,
    ProductComponent,
    DetailsComponent,
    PageNameComponent,
    DashboardComponent,
    QuestionsComponent,
    ProfileComponent,
    EmployeeSurveyDownloadComponent,
    ManagerReportComponent,
    ReportsComponent,
    ManagerReportPdfComponent,
    FlexibleOptionsComponent,
    RequestAQuoteComponent,
    PrivacyComponent,
    TimeAgoExtendsPipe,
  ],
  imports: [
    NgbModule,
    CommonModule,
    ClientRoutingModule,
    FlexLayoutModule,
    NbCardModule,
    NbLayoutModule,
    FormsModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    NbDatepickerModule,
    NgxChartsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SlickCarouselModule,
    FontAwesomeModule,
    NbPopoverModule,
    NbDialogModule.forRoot(),
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: "6LfR6bAUAAAAAE4j7BVcMf9sBNn9tMar-Mfbg4cH",
      } as RecaptchaSettings,
    },
  ],
})
export class ClientModule {}
