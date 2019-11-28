import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

declare const gtag: any;

@Injectable()
export class AnalyticsService {
  private enabled: boolean;

  constructor(private location: Location, private router: Router) {
    this.enabled = true;
  }

  trackPageViews() {
    if (this.enabled) {
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
      )
        .subscribe((event: NavigationEnd) => {
          let path = event.urlAfterRedirects
          if (!path.startsWith('/auth') && !path.startsWith('/pages')) {
            // ga('send', { hitType: 'pageview', page: this.location.path() });
            gtag('config', 'UA-15483887-1', {
              'page_path': path
            });
          }
        });
    }
  }

  trackEvent(eventName: string) {
    // if (this.enabled) {
    //   ga('send', 'event', eventName);
    // }
  }
}
