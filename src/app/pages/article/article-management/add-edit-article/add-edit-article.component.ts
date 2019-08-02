import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NbDateService } from '@nebular/theme';
import { TinyMceService } from "../../../../@core/data/tiny-mce.service";
import { NbTokenService } from "@nebular/auth";
import { ActivatedRoute } from "@angular/router";
import { ArticleService } from "../../../../@core/data/article.service";
import { BoxService } from "../../../../@core/data/box.service";
import { URLService } from "../../../../@core/data/url.service";


@Component({
    selector: 'ngx-add-edit-article',
    templateUrl: './add-edit-article.component.html',
    styleUrls: ['./add-edit-article.component.scss'],
})
export class AddEditArticleComponent implements OnInit {

    min: Date;
    max: Date;
    article;
    articleId;
    user;
    boxes;
    successMessage;
    errorMessage;

    fileName;
    imageSrc = '';
    articleForm: FormGroup;

    // control reference function
    get(controlName) {
        return this.articleForm.get(controlName);
    }

    constructor(protected dateService: NbDateService<Date>,
        private tinyMCEService: TinyMceService,
        private tokenService: NbTokenService,
        private route: ActivatedRoute,
        private articleService: ArticleService,
        private urlService: URLService,
        private boxService: BoxService) {
        this.article = {
            title: '', subtitle: '', author: '', keywords: '',
            description: '', image: null, publish_date: ''
        };
        this.min = this.dateService.addDay(this.dateService.today(), -5);
        this.max = this.dateService.addDay(this.dateService.today(), 5);
    }

    ngOnInit() {
        //get the employee from the localStorage
        // call the refresh token here
        this.tokenService.get()
            .subscribe(token => {
                this.user = token.getPayload();
            });

        this.initFormGroup()
        this.articleId = this.route.snapshot.paramMap.get('id');
        if (this.articleId) {
            //get the employee from the database and set to the employee
            this.getArticle();
            this.articleForm.clearValidators();
            this.get('image').clearValidators();
        }
    }

    initFormGroup() {
        this.articleForm = new FormGroup({
            title: new FormControl('', Validators.required),
            subtitle: new FormControl('', Validators.required),
            author: new FormControl('', Validators.required),
            keywords: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            image: new FormControl(null, [Validators.required]),
            imagePath: new FormControl(),
            fileName: new FormControl(),
        });
    }

    getArticle() {
        this.articleService.getArticle(this.articleId).subscribe(
            data => {
                this.setArticle(data);
            },
            err => {
                console.log(err);
            }
        );
    }

    setArticle(data) {
        this.article.title = data.article.title;
        this.article.subtitle = data.article.subtitle;
        this.article.author = data.article.author;
        this.article.keywords = data.article.keywords;
        this.article.description = data.article.description;
        this.article.publish_date = this.dateService.parse(data.article.publish_date, 'en-us');
        this.setEditorContent(this.article.description);
        this.articleForm.patchValue({ description: this.article.description });

        if (typeof data.article.image !== 'undefined' && data.article.image !== null) {
            this.imageSrc = this.urlService.baseUrl + '/images/article/' + data.article.image;
        }
    }

    onFilePicked(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.fileName = file.name;
        this.articleForm.patchValue({ image: file });
        this.get('image').updateValueAndValidity();
    }

    createArticle() {
        if (this.articleForm.valid) {
            //create a new staticPage object instance
            const formData = new FormData();
            formData.append('title', this.get('title').value);
            formData.append('subtitle', this.get('subtitle').value);
            formData.append('author', this.get('author').value);
            formData.append('keywords', this.get('keywords').value);
            formData.append('description', this.get('description').value);
            formData.append('publish_date', this.article.publish_date ? this.article.publish_date : '');
            //Add Image Conditionally
            if (this.get('image').value !== null) {
                formData.append('image', this.get('image').value);
            }
            if (this.articleId) {
                this.update(formData);
            } else {
                this.insert(formData);
            }
        }
    }

    insert(article) {
        this.articleService.createArticle(article, this.user._id).subscribe(
            data => {
                this.successMessage = data.message;
                this.setArticle(data);
            },
            err => {
                const { error } = err;
                this.errorMessage = error.message;
            }
        );
    }

    update(article) {
        this.articleService.updateArticle(article, this.articleId).subscribe(
            data => {
                this.successMessage = data.message;
                this.setArticle(data);
            },
            err => {
                const { error } = err;
                this.errorMessage = error.message;
            }
        );
    }

    getEditorContent($event) {
        this.article.description = $event;

        this.articleForm.patchValue({ description: $event });
        this.get('description').updateValueAndValidity();
    }

    setEditorContent(content) {
        this.tinyMCEService.contentChange.next(content);
    }
}
