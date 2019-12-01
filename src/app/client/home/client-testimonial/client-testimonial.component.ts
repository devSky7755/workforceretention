import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'ngx-client-testimonial',
  templateUrl: './client-testimonial.component.html',
  styleUrls: ['./client-testimonial.component.scss']
})
export class ClientTestimonialComponent implements OnInit {
  slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, "autoplay": true, "dots": true, "autoplaySpeed": 12000 };

  logoSlides = [
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/pybar.png" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/blacktown city council.png" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/parra leagues.png" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/abbott.png" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/sofico.jpg" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/campbells.png" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/coffs.png" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/lexisnexis-logo-335x189.png" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/Perpetual_logo-700x259.png" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/allens.jpg" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/amp.jpg" },
    { img: "https://workforceretention.s3-ap-southeast-2.amazonaws.com/assets/images/logos/arnotts.png" },
  ];
  slideLogoConfig = {
    "slidesToShow": 4, "slidesToScroll": 4, "autoplay": true, "autoplaySpeed": 3000
  };

  constructor() { }

  ngOnInit() {
  }

}
