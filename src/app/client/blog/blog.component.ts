import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../@core/data/article.service";
import { URLService } from "../../@core/data/url.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'ngx-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  count = 0;
  offset = 0;
  limit = 2;
  articles = [];
  hasPrev = false
  hasNext = false

  constructor(private route: ActivatedRoute, private router: Router, private articleService: ArticleService,
    private urlService: URLService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let pageNum = params['pageNum'];
      this.offset = parseInt(pageNum || "0");
      this.articles = []
      this.page(this.offset, this.limit);
      this.hasPrev = this.offset > 0
    });
  }

  page(offset, limit) {
    this.articleService.getArticles(offset, limit, true).subscribe(results => {
      this.count = results.totalItems;
      this.articles = results.articles;
      this.hasNext = Math.ceil(this.count / this.limit) - 1 > this.offset
      this.articles = this.articles.map(article => {
        article.excerpt = this.getExcerpt(article.description)
        article.createdAt = new Date(article.createdAt)
        article.imageSrc = this.urlService.baseUrl + '/images/article/' + article.image;
        article.link = '/client/blog/' + article._id
        return article
      })
    },
      (err) => {
        console.log(err);
      }
    );
  }

  getExcerpt(html) {
    let length = 200
    let excerpt = this.htmlToPlaintext(html)
    if (excerpt.length > length) {
      return excerpt.substr(0, length) + '...';
    }
    return excerpt
  }

  htmlToPlaintext(text) {
    return text ? String(text).replace(/<[^>]+>/gm, '') : '';
  }

  prevBlog() {
    if (this.hasPrev) {
      this.go(this.offset - 1)
    }
  }
  nextBlog() {
    if (this.hasNext) {
      this.go(this.offset + 1)
    }
  }
  go(pageNum) {
    this.router.navigateByUrl('/client/blogs/' + pageNum)
  }
}
