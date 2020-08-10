(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile-profile-module"],{

/***/ "./src/app/pages/profile/profile-management/profile-management.component.html":
/*!************************************************************************************!*\
  !*** ./src/app/pages/profile/profile-management/profile-management.component.html ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-12\">\n        <nb-card>\n            <nb-card-header class=\"text-center\">Profile</nb-card-header>\n            <nb-card-body style=\"overflow: visible\">\n                <div class=\"row justify-content-center align-items-center\">\n                    <div class=\"col-lg-8\">\n                        <!--Reactive Form-->\n                        <form (ngSubmit)=\"updateUserProfile()\" [formGroup]=\"userForm\" aria-labelledby=\"title\">\n                            <div class=\"alert alert-danger\" role=\"alert\" *ngIf=\"userForm.errors\">\n                                {{userForm.errors.message}}\n                            </div>\n                            <div class=\"alert alert-success\" role=\"alert\" *ngIf=\"successUserMessage\">\n                                {{successUserMessage}}\n                            </div>\n                            <div class=\"row full-name-inputs\" [formGroup]=\"userForm.get('name')\">\n                                <div class=\"col-sm-6\">\n                                    <div class=\"form-group\">\n                                        <input type=\"text\" class=\"form-control\" formControlName=\"firstName\"\n                                            name=\"user-first-name\" nbInput fullWidth placeholder=\"First Name\"\n                                            [(ngModel)]=\"user.first_name\">\n\n                                        <!--Register Error Here-->\n                                        <div class=\"alert alert-danger\" role=\"alert\"\n                                            *ngIf=\"get('name').get('firstName').touched && get('name').get('firstName').invalid\">\n                                            FirstName is required\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-sm-6\">\n                                    <div class=\"form-group\">\n                                        <input type=\"text\" formControlName=\"lastName\" name=\"user-last-name\"\n                                            class=\"form-control\" nbInput fullWidth placeholder=\"Last Name\"\n                                            [(ngModel)]=\"user.last_name\">\n                                        <!--Register Error Here-->\n                                        <div class=\"alert alert-danger\" role=\"alert\"\n                                            *ngIf=\"get('name').get('lastName').touched && get('name').get('lastName').invalid\">\n                                            LastName is required\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <!--EMAIL-->\n                            <div class=\"form-group\">\n                                <input type=\"email\" class=\"form-control\" formControlName=\"email\" name=\"user-email\"\n                                    placeholder=\"Email Address\" [disabled]=\"true\" [(ngModel)]=\"user.email\">\n                                <!--Register Error Here-->\n                                <div class=\"alert alert-danger\" role=\"alert\"\n                                    *ngIf=\"get('email').touched && get('email').invalid\">\n                                    <div *ngIf=\"get('email').errors.required\"> Email is required</div>\n                                    <div *ngIf=\"get('email').errors.pattern\">Invalid email address</div>\n                                </div>\n                            </div>\n\n                            <!--USERNAME-->\n                            <div class=\"form-group\">\n                                <input type=\"email\" class=\"form-control\" formControlName=\"username\" name=\"username\"\n                                    placeholder=\"Username\" [(ngModel)]=\"user.username\">\n                                <!--Register Error Here-->\n                                <div class=\"alert alert-danger\" role=\"alert\"\n                                    *ngIf=\"get('username').touched && get('username').invalid\">\n                                    <div *ngIf=\"get('username').errors.required\"> Username is required</div>\n                                    <div *ngIf=\"get('username').errors.minlength\">Username should be at least 4\n                                        character long</div>\n                                </div>\n                            </div>\n                            <div class=\"text-center mt-3\">\n                                <button type=\"submit\" [disabled]=\"!userForm.valid\" class=\"btn btn-success\">\n                                    UPDATE\n                                </button>\n                            </div>\n                        </form>\n\n                        <!--PASSWORD-->\n                        <hr class=\"my-5\">\n                        <form (ngSubmit)=\"changePassword()\" [formGroup]=\"passwordForm\" aria-labelledby=\"title\">\n                            <div class=\"alert alert-danger\" role=\"alert\"\n                                *ngIf=\"passwordForm.errors && passwordForm.errors.message\">\n                                {{passwordForm.errors.message}}\n                            </div>\n                            <div class=\"alert alert-success\" role=\"alert\" *ngIf=\"successPasswordMessage\">\n                                {{successPasswordMessage}}\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-sm-6\">\n                                    <div class=\"form-group\">\n                                        <input type=\"password\" class=\"form-control\" formControlName=\"oldPassword\"\n                                            name=\"user-old-password\" nbInput fullWidth placeholder=\"Old Password\"\n                                            [(ngModel)]=\"user.old_password\">\n\n                                        <!--Register Error Here-->\n                                        <div class=\"alert alert-danger\" role=\"alert\"\n                                            *ngIf=\"get_password('oldPassword').touched && get_password('oldPassword').invalid\">\n                                            Old Password is required\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"row\">\n                                <div class=\"col-sm-6\">\n                                    <div class=\"form-group\">\n                                        <input type=\"password\" class=\"form-control\" formControlName=\"newPassword\"\n                                            name=\"user-new-password\" nbInput fullWidth placeholder=\"New Password\"\n                                            [(ngModel)]=\"user.new_password\">\n\n                                        <!--Register Error Here-->\n                                        <div class=\"alert alert-danger\" role=\"alert\"\n                                            *ngIf=\"get_password('newPassword').touched && get_password('newPassword').invalid\">\n                                            Type at least 8 characters\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"col-sm-6\">\n                                    <div class=\"form-group\">\n                                        <input type=\"password\" formControlName=\"newPasswordConfirmation\"\n                                            name=\"user-new-password-confirmation\" class=\"form-control\" nbInput fullWidth\n                                            placeholder=\"Re-Enter Password\"\n                                            [(ngModel)]=\"user.new_password_confirmation\">\n                                        <!--Register Error Here-->\n                                        <div class=\"alert alert-danger\" role=\"alert\"\n                                            *ngIf=\"passwordForm.hasError('notSame')\">\n                                            Passwords do not match\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"text-center mt-2\">\n                                <button type=\"submit\" [disabled]=\"!passwordForm.valid\" class=\"btn btn-success\">\n                                    UPDATE\n                                </button>\n                            </div>\n                        </form>\n                    </div>\n                </div>\n            </nb-card-body>\n        </nb-card>\n    </div>\n</div>"

/***/ }),

/***/ "./src/app/pages/profile/profile-management/profile-management.component.scss":
/*!************************************************************************************!*\
  !*** ./src/app/pages/profile/profile-management/profile-management.component.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3Byb2ZpbGUvcHJvZmlsZS1tYW5hZ2VtZW50L3Byb2ZpbGUtbWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/pages/profile/profile-management/profile-management.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/pages/profile/profile-management/profile-management.component.ts ***!
  \**********************************************************************************/
/*! exports provided: ProfileManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileManagementComponent", function() { return ProfileManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _nebular_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nebular/auth */ "./node_modules/@nebular/auth/index.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _core_data_users_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../@core/data/users.service */ "./src/app/@core/data/users.service.ts");
/* harmony import */ var _auth_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../auth/auth.service */ "./src/app/auth/auth.service.ts");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_5__);
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileManagementComponent = /** @class */ (function () {
    function ProfileManagementComponent(userService, authService, tokenService, localAuth) {
        this.userService = userService;
        this.authService = authService;
        this.tokenService = tokenService;
        this.localAuth = localAuth;
        this.user = { first_name: '', last_name: '', email: '', username: '', old_password: '', new_password: '', new_password_confirmation: '' };
    }
    ProfileManagementComponent.prototype.ngOnInit = function () {
        this.createForm();
        this.loadUser();
    };
    ProfileManagementComponent.prototype.checkPasswords = function (group) {
        var pass = group.get('newPassword').value;
        var confirmPass = group.get('newPasswordConfirmation').value;
        return pass === confirmPass ? null : { notSame: true };
    };
    ProfileManagementComponent.prototype.createForm = function () {
        this.userForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            name: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
                firstName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
                lastName: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required)
            }),
            email: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required,
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].pattern("[^ @]*@[^ @]*")
            ]),
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(4)])
        });
        this.passwordForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"]({
            oldPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required),
            newPassword: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(8)]),
            newPasswordConfirmation: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('')
        }, { validators: this.checkPasswords });
    };
    ProfileManagementComponent.prototype.refreshToken = function () {
        var _this = this;
        this.tokenService.get()
            .subscribe(function (curtoken) {
            _this.localAuth.refreshToken(curtoken.getPayload())
                .subscribe(function (retval) {
                var newtoken = retval.token;
                _this.authService.refreshToken('email', newtoken);
                var token = JSON.parse(localStorage.getItem('auth_app_token'));
                token.value = newtoken;
                var tokenString = JSON.stringify(token);
                localStorage.setItem('auth_app_token', tokenString);
                _this.loadUser();
            }, function (err) {
            });
        });
    };
    ProfileManagementComponent.prototype.loadUser = function () {
        var _this = this;
        this.tokenService.get()
            .subscribe(function (token) {
            console.log(token);
            _this.userId = token.getPayload()._id;
            console.log(token.getPayload());
            _this.user = __assign({}, _this.user, lodash__WEBPACK_IMPORTED_MODULE_5__["pick"](token.getPayload(), ['first_name', 'last_name', 'email', 'username']));
        });
    };
    ProfileManagementComponent.prototype.updateUserProfile = function () {
        var _this = this;
        var user = {
            first_name: this.get('name').get('firstName').value,
            last_name: this.get('name').get('lastName').value,
            username: this.get('username').value,
            email: this.get('email').value
        };
        this.userService.updateUserProfile(user, this.userId).subscribe(function (data) {
            _this.successUserMessage = data.message;
            _this.refreshToken();
        }, function (err) {
            var error = err.error;
            _this.successUserMessage = '';
            _this.userForm.setErrors({ 'message': error.message });
        });
    };
    ProfileManagementComponent.prototype.changePassword = function () {
        var _this = this;
        var password = {
            old_password: this.get_password("oldPassword").value,
            new_password: this.get_password("newPassword").value
        };
        this.userService.changePassword(password, this.userId).subscribe(function (data) {
            _this.successPasswordMessage = data.message;
            _this.refreshToken();
        }, function (err) {
            var error = err.error;
            _this.successPasswordMessage = '';
            _this.passwordForm.setErrors({ 'message': error.message });
        });
    };
    // validator function
    ProfileManagementComponent.prototype.get = function (controlName) {
        return this.userForm.get(controlName);
    };
    // validator function
    ProfileManagementComponent.prototype.get_password = function (controlName) {
        return this.passwordForm.get(controlName);
    };
    ProfileManagementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ngx-profile-management',
            template: __webpack_require__(/*! ./profile-management.component.html */ "./src/app/pages/profile/profile-management/profile-management.component.html"),
            styles: [__webpack_require__(/*! ./profile-management.component.scss */ "./src/app/pages/profile/profile-management/profile-management.component.scss")]
        }),
        __metadata("design:paramtypes", [_core_data_users_service__WEBPACK_IMPORTED_MODULE_3__["UserService"],
            _nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbAuthService"],
            _nebular_auth__WEBPACK_IMPORTED_MODULE_1__["NbTokenService"],
            _auth_auth_service__WEBPACK_IMPORTED_MODULE_4__["AuthService"]])
    ], ProfileManagementComponent);
    return ProfileManagementComponent;
}());



/***/ }),

/***/ "./src/app/pages/profile/profile-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/pages/profile/profile-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: ProfileRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileRoutingModule", function() { return ProfileRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _profile_management_profile_management_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-management/profile-management.component */ "./src/app/pages/profile/profile-management/profile-management.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: 'profile-management',
        component: _profile_management_profile_management_component__WEBPACK_IMPORTED_MODULE_2__["ProfileManagementComponent"],
    }
];
var ProfileRoutingModule = /** @class */ (function () {
    function ProfileRoutingModule() {
    }
    ProfileRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        })
    ], ProfileRoutingModule);
    return ProfileRoutingModule;
}());



/***/ }),

/***/ "./src/app/pages/profile/profile.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/profile/profile.module.ts ***!
  \*************************************************/
/*! exports provided: ProfileModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _profile_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-routing.module */ "./src/app/pages/profile/profile-routing.module.ts");
/* harmony import */ var _profile_management_profile_management_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./profile-management/profile-management.component */ "./src/app/pages/profile/profile-management/profile-management.component.ts");
/* harmony import */ var _nebular_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nebular/theme */ "./node_modules/@nebular/theme/index.js");
/* harmony import */ var _core_data_smart_table_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../@core/data/smart-table.service */ "./src/app/@core/data/smart-table.service.ts");
/* harmony import */ var _theme_theme_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../@theme/theme.module */ "./src/app/@theme/theme.module.ts");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @swimlane/ngx-datatable */ "./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _profile_management_profile_management_component__WEBPACK_IMPORTED_MODULE_3__["ProfileManagementComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _profile_routing_module__WEBPACK_IMPORTED_MODULE_2__["ProfileRoutingModule"],
                _nebular_theme__WEBPACK_IMPORTED_MODULE_4__["NbCardModule"],
                _theme_theme_module__WEBPACK_IMPORTED_MODULE_6__["ThemeModule"],
                _swimlane_ngx_datatable__WEBPACK_IMPORTED_MODULE_7__["NgxDatatableModule"]
            ],
            providers: [
                _core_data_smart_table_service__WEBPACK_IMPORTED_MODULE_5__["SmartTableService"],
            ],
        })
    ], ProfileModule);
    return ProfileModule;
}());



/***/ })

}]);
//# sourceMappingURL=profile-profile-module.js.map