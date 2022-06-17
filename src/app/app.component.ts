/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
// import { SeoService } from "./@core/utils/seo.service";
import { NbIconLibraries } from "@nebular/theme";

@Component({
  selector: "ngx-app",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  constructor(
    private iconLibraries: NbIconLibraries,
    private analytics: AnalyticsService // private seoService: SeoService
  ) {
    this.iconLibraries.registerFontPack("nebular", { iconClassPrefix: "nb" });
    this.iconLibraries.setDefaultPack("nebular");
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    // this.seoService.trackCanonicalChanges();
  }
}
