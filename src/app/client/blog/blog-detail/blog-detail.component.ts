import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../../@core/data/article.service";
import { URLService } from "../../../@core/data/url.service";
import { ActivatedRoute, Router } from "@angular/router";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  articleId;
  article = null;
  faArrowLeft = faChevronLeft;

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService, private location: Location,
    private urlService: URLService) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.paramMap.get('id');
    this.getArticle();
  }

  getArticle() {
    this.articleService.getArticle(this.articleId).subscribe(
      data => {
        this.article = data.article
        this.article.createdAt = new Date(data.article.createdAt)
        this.article.imageSrc = this.urlService.baseUrl + '/images/article/' + data.article.image;
        console.log(this.article)
      },
      err => {
        console.log(err);
      }
    );
  }
  goBack() {
    this.location.back();
  }
}
