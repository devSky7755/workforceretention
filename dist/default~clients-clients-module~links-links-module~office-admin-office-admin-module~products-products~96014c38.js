(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~clients-clients-module~links-links-module~office-admin-office-admin-module~products-products~96014c38"],{

/***/ "./node_modules/ng2-completer/esm5/ng2-completer.js":
/*!**********************************************************!*\
  !*** ./node_modules/ng2-completer/esm5/ng2-completer.js ***!
  \**********************************************************/
/*! exports provided: LocalData, RemoteData, LocalDataFactory, RemoteDataFactory, CompleterService, CtrCompleter, CtrDropdown, CtrInput, CtrList, CtrRow, CompleterListItemCmp, CompleterCmp, Ng2CompleterModule, ɵa, ɵb */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalData", function() { return LocalData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoteData", function() { return RemoteData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocalDataFactory", function() { return LocalDataFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemoteDataFactory", function() { return RemoteDataFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleterService", function() { return CompleterService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtrCompleter", function() { return CtrCompleter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtrDropdown", function() { return CtrDropdown; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtrInput", function() { return CtrInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtrList", function() { return CtrList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CtrRow", function() { return CtrRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleterListItemCmp", function() { return CompleterListItemCmp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleterCmp", function() { return CompleterCmp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ng2CompleterModule", function() { return Ng2CompleterModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return CtrListContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return CompleterBaseData; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/Observable */ "./node_modules/rxjs-compat/_esm5/Observable.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/Subject */ "./node_modules/rxjs-compat/_esm5/Subject.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_observable_timer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/observable/timer */ "./node_modules/rxjs-compat/_esm5/observable/timer.js");
/* harmony import */ var rxjs_add_operator_catch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/add/operator/catch */ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/**
 * @license ng2-completer
 * MIT license
 */











/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MAX_CHARS = 524288; // the default max length per the html maxlength attribute
var MIN_SEARCH_LENGTH = 3;
var PAUSE = 10;
var TEXT_SEARCHING = "Searching...";
var TEXT_NO_RESULTS = "No results found";
var CLEAR_TIMEOUT = 50;
/**
 * @param {?} value
 * @return {?}
 */
function isNil(value) {
    return typeof value === "undefined" || value === null;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
var CompleterBaseData = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(CompleterBaseData, _super);
    function CompleterBaseData() {
        return _super.call(this) || this;
    }
    /**
     * @return {?}
     */
    CompleterBaseData.prototype.cancel = /**
     * @return {?}
     */
    function () {
        return;
    };
    /**
     * @param {?} searchFields
     * @return {?}
     */
    CompleterBaseData.prototype.searchFields = /**
     * @param {?} searchFields
     * @return {?}
     */
    function (searchFields) {
        this._searchFields = searchFields;
        return this;
    };
    /**
     * @param {?} titleField
     * @return {?}
     */
    CompleterBaseData.prototype.titleField = /**
     * @param {?} titleField
     * @return {?}
     */
    function (titleField) {
        this._titleField = titleField;
        return this;
    };
    /**
     * @param {?} descriptionField
     * @return {?}
     */
    CompleterBaseData.prototype.descriptionField = /**
     * @param {?} descriptionField
     * @return {?}
     */
    function (descriptionField) {
        this._descriptionField = descriptionField;
        return this;
    };
    /**
     * @param {?} imageField
     * @return {?}
     */
    CompleterBaseData.prototype.imageField = /**
     * @param {?} imageField
     * @return {?}
     */
    function (imageField) {
        this._imageField = imageField;
        return this;
    };
    /**
     * @param {?} data
     * @return {?}
     */
    CompleterBaseData.prototype.convertToItem = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var /** @type {?} */ image = null;
        var /** @type {?} */ formattedText;
        var /** @type {?} */ formattedDesc = null;
        if (this._titleField) {
            formattedText = this.extractTitle(data);
        }
        else {
            formattedText = data;
        }
        if (typeof formattedText !== "string") {
            formattedText = JSON.stringify(formattedText);
        }
        if (this._descriptionField) {
            formattedDesc = this.extractValue(data, this._descriptionField);
        }
        if (this._imageField) {
            image = this.extractValue(data, this._imageField);
        }
        if (isNil(formattedText)) {
            return null;
        }
        return /** @type {?} */ ({
            description: formattedDesc,
            image: image,
            originalObject: data,
            title: formattedText
        });
    };
    /**
     * @param {?} data
     * @param {?} term
     * @return {?}
     */
    CompleterBaseData.prototype.extractMatches = /**
     * @param {?} data
     * @param {?} term
     * @return {?}
     */
    function (data, term) {
        var _this = this;
        var /** @type {?} */ matches = [];
        var /** @type {?} */ searchFields = this._searchFields ? this._searchFields.split(",") : null;
        if (this._searchFields !== null && this._searchFields !== undefined && term !== "") {
            matches = data.filter(function (item) {
                var /** @type {?} */ values = searchFields ? _this.extractBySearchFields(searchFields, item) : [item];
                return values.some(function (value) {
                    return value
                        .toString()
                        .toLowerCase()
                        .indexOf(term.toString().toLowerCase()) >= 0;
                });
            });
        }
        else {
            matches = data;
        }
        return matches;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CompleterBaseData.prototype.extractTitle = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        var _this = this;
        // split title fields and run extractValue for each and join with ' '
        if (!this._titleField) {
            return "";
        }
        return this._titleField.split(",")
            .map(function (field) {
            return _this.extractValue(item, field);
        })
            .reduce(function (acc, titlePart) { return acc ? acc + " " + titlePart : titlePart; });
    };
    /**
     * @param {?} obj
     * @param {?} key
     * @return {?}
     */
    CompleterBaseData.prototype.extractValue = /**
     * @param {?} obj
     * @param {?} key
     * @return {?}
     */
    function (obj, key) {
        var /** @type {?} */ keys;
        var /** @type {?} */ result;
        if (key) {
            keys = key.split(".");
            result = obj;
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                key = keys_1[_i];
                if (result) {
                    result = result[key];
                }
            }
        }
        else {
            result = obj;
        }
        return result;
    };
    /**
     * @param {?} matches
     * @return {?}
     */
    CompleterBaseData.prototype.processResults = /**
     * @param {?} matches
     * @return {?}
     */
    function (matches) {
        var /** @type {?} */ i;
        var /** @type {?} */ results = [];
        if (matches && matches.length > 0) {
            for (i = 0; i < matches.length; i++) {
                var /** @type {?} */ item = this.convertToItem(matches[i]);
                if (item) {
                    results.push(item);
                }
            }
        }
        return results;
    };
    /**
     * @param {?} searchFields
     * @param {?} item
     * @return {?}
     */
    CompleterBaseData.prototype.extractBySearchFields = /**
     * @param {?} searchFields
     * @param {?} item
     * @return {?}
     */
    function (searchFields, item) {
        var _this = this;
        return searchFields
            .map(function (searchField) { return _this.extractValue(item, searchField); }).filter(function (value) { return !!value; });
    };
    return CompleterBaseData;
}(rxjs_Subject__WEBPACK_IMPORTED_MODULE_4__["Subject"]));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LocalData = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(LocalData, _super);
    function LocalData() {
        var _this = _super.call(this) || this;
        _this.dataSourceChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        return _this;
    }
    /**
     * @param {?} data
     * @return {?}
     */
    LocalData.prototype.data = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        if (data instanceof rxjs_Observable__WEBPACK_IMPORTED_MODULE_2__["Observable"]) {
            var /** @type {?} */ data$ = /** @type {?} */ (data);
            data$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function () { return []; }))
                .subscribe(function (res) {
                _this._data = res;
                if (_this.savedTerm) {
                    _this.search(_this.savedTerm);
                }
                _this.dataSourceChange.emit();
            });
        }
        else {
            this._data = data;
        }
        this.dataSourceChange.emit();
        return this;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    LocalData.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (!this._data) {
            this.savedTerm = term;
        }
        else {
            this.savedTerm = null;
            var /** @type {?} */ matches = this.extractMatches(this._data, term);
            this.next(this.processResults(matches));
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    LocalData.prototype.convertToItem = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return _super.prototype.convertToItem.call(this, data);
    };
    return LocalData;
}(CompleterBaseData));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RemoteData = (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(RemoteData, _super);
    function RemoteData(http$$1) {
        var _this = _super.call(this) || this;
        _this.http = http$$1;
        _this.dataSourceChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        _this._urlFormater = null;
        _this._dataField = null;
        return _this;
    }
    /**
     * @param {?} remoteUrl
     * @return {?}
     */
    RemoteData.prototype.remoteUrl = /**
     * @param {?} remoteUrl
     * @return {?}
     */
    function (remoteUrl) {
        this._remoteUrl = remoteUrl;
        this.dataSourceChange.emit();
        return this;
    };
    /**
     * @param {?} urlFormater
     * @return {?}
     */
    RemoteData.prototype.urlFormater = /**
     * @param {?} urlFormater
     * @return {?}
     */
    function (urlFormater) {
        this._urlFormater = urlFormater;
    };
    /**
     * @param {?} dataField
     * @return {?}
     */
    RemoteData.prototype.dataField = /**
     * @param {?} dataField
     * @return {?}
     */
    function (dataField) {
        this._dataField = dataField;
    };
    /**
     * @param {?} requestOptions
     * @return {?}
     */
    RemoteData.prototype.requestOptions = /**
     * @param {?} requestOptions
     * @return {?}
     */
    function (requestOptions) {
        this._requestOptions = requestOptions;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    RemoteData.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        this.cancel();
        // let params = {};
        var /** @type {?} */ url = "";
        if (this._urlFormater) {
            url = this._urlFormater(term);
        }
        else {
            url = this._remoteUrl + encodeURIComponent(term);
        }
        this.remoteSearch = this.http
            .get(url, Object.assign({}, this._requestOptions))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (data) {
            var /** @type {?} */ matches = _this.extractValue(data, _this._dataField);
            return _this.extractMatches(matches, term);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function () { return []; }))
            .subscribe(function (matches) {
            var /** @type {?} */ results = _this.processResults(matches);
            _this.next(results);
        });
    };
    /**
     * @return {?}
     */
    RemoteData.prototype.cancel = /**
     * @return {?}
     */
    function () {
        if (this.remoteSearch) {
            this.remoteSearch.unsubscribe();
        }
    };
    /**
     * @param {?} data
     * @return {?}
     */
    RemoteData.prototype.convertToItem = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        return _super.prototype.convertToItem.call(this, data);
    };
    return RemoteData;
}(CompleterBaseData));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var LocalDataFactory = (function () {
    function LocalDataFactory() {
    }
    /**
     * @return {?}
     */
    LocalDataFactory.prototype.create = /**
     * @return {?}
     */
    function () {
        return new LocalData();
    };
    LocalDataFactory.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] },
    ];
    /** @nocollapse */
    LocalDataFactory.ctorParameters = function () { return []; };
    return LocalDataFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var RemoteDataFactory = (function () {
    function RemoteDataFactory(http$$1) {
        this.http = http$$1;
    }
    /**
     * @return {?}
     */
    RemoteDataFactory.prototype.create = /**
     * @return {?}
     */
    function () {
        return new RemoteData(this.http);
    };
    RemoteDataFactory.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] },
    ];
    /** @nocollapse */
    RemoteDataFactory.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClient"], },
    ]; };
    return RemoteDataFactory;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CompleterService = (function () {
    function CompleterService(localDataFactory, remoteDataFactory // Using any instead of () => LocalData because of AoT errors
    ) {
        this.localDataFactory = localDataFactory;
        this.remoteDataFactory = remoteDataFactory;
    }
    /**
     * @param {?} data
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    CompleterService.prototype.local = /**
     * @param {?} data
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    function (data, searchFields, titleField) {
        if (searchFields === void 0) { searchFields = ""; }
        if (titleField === void 0) { titleField = ""; }
        var /** @type {?} */ localData = this.localDataFactory.create();
        return localData
            .data(data)
            .searchFields(searchFields)
            .titleField(titleField);
    };
    /**
     * @param {?} url
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    CompleterService.prototype.remote = /**
     * @param {?} url
     * @param {?=} searchFields
     * @param {?=} titleField
     * @return {?}
     */
    function (url, searchFields, titleField) {
        if (searchFields === void 0) { searchFields = ""; }
        if (titleField === void 0) { titleField = ""; }
        var /** @type {?} */ remoteData = this.remoteDataFactory.create();
        return remoteData
            .remoteUrl(url)
            .searchFields(searchFields)
            .titleField(titleField);
    };
    CompleterService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] },
    ];
    /** @nocollapse */
    CompleterService.ctorParameters = function () { return [
        { type: LocalDataFactory, },
        { type: RemoteDataFactory, },
    ]; };
    return CompleterService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @record
 */

var CtrCompleter = (function () {
    function CtrCompleter() {
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.highlighted = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.opened = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.dataSourceChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this._hasHighlighted = false;
        this._hasSelected = false;
        this._cancelBlur = false;
        this._isOpen = false;
    }
    /**
     * @param {?} list
     * @return {?}
     */
    CtrCompleter.prototype.registerList = /**
     * @param {?} list
     * @return {?}
     */
    function (list) {
        this.list = list;
    };
    /**
     * @param {?} dropdown
     * @return {?}
     */
    CtrCompleter.prototype.registerDropdown = /**
     * @param {?} dropdown
     * @return {?}
     */
    function (dropdown) {
        this.dropdown = dropdown;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CtrCompleter.prototype.onHighlighted = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.highlighted.emit(item);
        this._hasHighlighted = !!item;
    };
    /**
     * @param {?} item
     * @param {?=} clearList
     * @return {?}
     */
    CtrCompleter.prototype.onSelected = /**
     * @param {?} item
     * @param {?=} clearList
     * @return {?}
     */
    function (item, clearList) {
        if (clearList === void 0) { clearList = true; }
        this.selected.emit(item);
        if (item) {
            this._hasSelected = true;
        }
        if (clearList) {
            this.clear();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.onDataSourceChange = /**
     * @return {?}
     */
    function () {
        if (this.hasSelected) {
            this.selected.emit(null);
            this._hasSelected = false;
        }
        this.dataSourceChange.emit();
    };
    /**
     * @param {?} term
     * @return {?}
     */
    CtrCompleter.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        if (this._hasSelected) {
            this.selected.emit(null);
            this._hasSelected = false;
        }
        if (this.list) {
            this.list.search(term);
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.clear = /**
     * @return {?}
     */
    function () {
        this._hasHighlighted = false;
        this.isOpen = false;
        if (this.dropdown) {
            this.dropdown.clear();
        }
        if (this.list) {
            this.list.clear();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.selectCurrent = /**
     * @return {?}
     */
    function () {
        if (this.dropdown) {
            this.dropdown.selectCurrent();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.nextRow = /**
     * @return {?}
     */
    function () {
        if (this.dropdown) {
            this.dropdown.nextRow();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.prevRow = /**
     * @return {?}
     */
    function () {
        if (this.dropdown) {
            this.dropdown.prevRow();
        }
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.hasHighlighted = /**
     * @return {?}
     */
    function () {
        return this._hasHighlighted;
    };
    /**
     * @param {?} cancel
     * @return {?}
     */
    CtrCompleter.prototype.cancelBlur = /**
     * @param {?} cancel
     * @return {?}
     */
    function (cancel) {
        this._cancelBlur = cancel;
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.isCancelBlur = /**
     * @return {?}
     */
    function () {
        return this._cancelBlur;
    };
    /**
     * @return {?}
     */
    CtrCompleter.prototype.open = /**
     * @return {?}
     */
    function () {
        if (!this._isOpen) {
            this.isOpen = true;
            this.list.open();
        }
    };
    Object.defineProperty(CtrCompleter.prototype, "isOpen", {
        get: /**
         * @return {?}
         */
        function () {
            return this._isOpen;
        },
        set: /**
         * @param {?} open
         * @return {?}
         */
        function (open) {
            this._isOpen = open;
            this.opened.emit(this._isOpen);
            if (this.list) {
                this.list.isOpen(open);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrCompleter.prototype, "autoHighlightIndex", {
        get: /**
         * @return {?}
         */
        function () {
            return this._autoHighlightIndex;
        },
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._autoHighlightIndex = index;
            if (this.dropdown) {
                this.dropdown.highlightRow(this._autoHighlightIndex);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrCompleter.prototype, "hasSelected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._hasSelected;
        },
        enumerable: true,
        configurable: true
    });
    CtrCompleter.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "[ctrCompleter]",
                },] },
    ];
    /** @nocollapse */
    CtrCompleter.ctorParameters = function () { return []; };
    CtrCompleter.propDecorators = {
        "selected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "highlighted": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "opened": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "dataSourceChange": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
    };
    return CtrCompleter;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

var CtrRowItem = (function () {
    function CtrRowItem(row, index) {
        this.row = row;
        this.index = index;
    }
    return CtrRowItem;
}());
var CtrDropdown = (function () {
    function CtrDropdown(completer, el) {
        this.completer = completer;
        this.el = el;
        this.rows = [];
        this._rowMouseDown = false;
        this.completer.registerDropdown(this);
    }
    /**
     * @return {?}
     */
    CtrDropdown.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.completer.registerDropdown(null);
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ css = getComputedStyle(this.el.nativeElement);
        var /** @type {?} */ autoHighlightIndex = this.completer.autoHighlightIndex;
        this.isScrollOn = !!css.maxHeight && css.overflowY === "auto";
        if (autoHighlightIndex) {
            setTimeout(function () {
                _this.highlightRow(autoHighlightIndex);
            }, 0);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrDropdown.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // Support for canceling blur on IE (issue #158)
        if (!this._rowMouseDown) {
            this.completer.cancelBlur(true);
            setTimeout(function () {
                _this.completer.cancelBlur(false);
            }, 0);
        }
        else {
            this._rowMouseDown = false;
        }
    };
    /**
     * @param {?} row
     * @return {?}
     */
    CtrDropdown.prototype.registerRow = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        var /** @type {?} */ arrIndex = this.rows.findIndex(function (_row) { return _row.index === row.index; });
        if (arrIndex >= 0) {
            this.rows[arrIndex] = row;
        }
        else {
            this.rows.push(row);
        }
    };
    /**
     * @param {?} rowIndex
     * @return {?}
     */
    CtrDropdown.prototype.unregisterRow = /**
     * @param {?} rowIndex
     * @return {?}
     */
    function (rowIndex) {
        var /** @type {?} */ arrIndex = this.rows.findIndex(function (_row) { return _row.index === rowIndex; });
        this.rows.splice(arrIndex, 1);
        if (this.currHighlighted && rowIndex === this.currHighlighted.index) {
            this.highlightRow(null);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    CtrDropdown.prototype.highlightRow = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        var /** @type {?} */ highlighted = this.rows.find(function (row) { return row.index === index; });
        if (isNil(index) || /** @type {?} */ ((index)) < 0) {
            if (this.currHighlighted) {
                this.currHighlighted.row.setHighlighted(false);
            }
            this.currHighlighted = undefined;
            this.completer.onHighlighted(null);
            return;
        }
        if (!highlighted) {
            return;
        }
        if (this.currHighlighted) {
            this.currHighlighted.row.setHighlighted(false);
        }
        this.currHighlighted = highlighted;
        this.currHighlighted.row.setHighlighted(true);
        this.completer.onHighlighted(this.currHighlighted.row.getDataItem());
        if (this.isScrollOn && this.currHighlighted) {
            var /** @type {?} */ rowTop = this.dropdownRowTop();
            if (!rowTop) {
                return;
            }
            if (rowTop < 0) {
                this.dropdownScrollTopTo(rowTop - 1);
            }
            else {
                var /** @type {?} */ row = this.currHighlighted.row.getNativeElement();
                if (this.dropdownHeight() < row.getBoundingClientRect().bottom) {
                    this.dropdownScrollTopTo(this.dropdownRowOffsetHeight(row));
                    if (this.el.nativeElement.getBoundingClientRect().bottom - this.dropdownRowOffsetHeight(row) < row.getBoundingClientRect().top) {
                        this.dropdownScrollTopTo(row.getBoundingClientRect().top - (this.el.nativeElement.getBoundingClientRect().top + parseInt(/** @type {?} */ (getComputedStyle(this.el.nativeElement).paddingTop), 10)));
                    }
                }
            }
        }
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.clear = /**
     * @return {?}
     */
    function () {
        this.rows = [];
    };
    /**
     * @param {?} item
     * @return {?}
     */
    CtrDropdown.prototype.onSelected = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.completer.onSelected(item);
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.rowMouseDown = /**
     * @return {?}
     */
    function () {
        this._rowMouseDown = true;
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.selectCurrent = /**
     * @return {?}
     */
    function () {
        if (this.currHighlighted) {
            this.onSelected(this.currHighlighted.row.getDataItem());
        }
        else if (this.rows.length > 0) {
            this.onSelected(this.rows[0].row.getDataItem());
        }
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.nextRow = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ nextRowIndex = 0;
        if (this.currHighlighted) {
            nextRowIndex = this.currHighlighted.index + 1;
        }
        this.highlightRow(nextRowIndex);
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.prevRow = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ nextRowIndex = -1;
        if (this.currHighlighted) {
            nextRowIndex = this.currHighlighted.index - 1;
        }
        this.highlightRow(nextRowIndex);
    };
    /**
     * @param {?} offset
     * @return {?}
     */
    CtrDropdown.prototype.dropdownScrollTopTo = /**
     * @param {?} offset
     * @return {?}
     */
    function (offset) {
        this.el.nativeElement.scrollTop = this.el.nativeElement.scrollTop + offset;
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.dropdownRowTop = /**
     * @return {?}
     */
    function () {
        if (!this.currHighlighted) {
            return;
        }
        return this.currHighlighted.row.getNativeElement().getBoundingClientRect().top -
            (this.el.nativeElement.getBoundingClientRect().top +
                parseInt(/** @type {?} */ (getComputedStyle(this.el.nativeElement).paddingTop), 10));
    };
    /**
     * @return {?}
     */
    CtrDropdown.prototype.dropdownHeight = /**
     * @return {?}
     */
    function () {
        return this.el.nativeElement.getBoundingClientRect().top +
            parseInt(/** @type {?} */ (getComputedStyle(this.el.nativeElement).maxHeight), 10);
    };
    /**
     * @param {?} row
     * @return {?}
     */
    CtrDropdown.prototype.dropdownRowOffsetHeight = /**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        var /** @type {?} */ css = getComputedStyle(row.parentElement);
        return row.parentElement.offsetHeight +
            parseInt(/** @type {?} */ (css.marginTop), 10) + parseInt(/** @type {?} */ (css.marginBottom), 10);
    };
    CtrDropdown.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "[ctrDropdown]",
                },] },
    ];
    /** @nocollapse */
    CtrDropdown.ctorParameters = function () { return [
        { type: CtrCompleter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"] },] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], },
    ]; };
    CtrDropdown.propDecorators = {
        "onMouseDown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["mousedown", ["$event"],] },],
    };
    return CtrDropdown;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// keyboard events
var KEY_DW = 40;
var KEY_RT = 39;
var KEY_UP = 38;
var KEY_LF = 37;
var KEY_ES = 27;
var KEY_EN = 13;
var KEY_TAB = 9;
var KEY_BK = 8;
var KEY_SH = 16;
var KEY_CL = 20;
var KEY_F1 = 112;
var KEY_F12 = 123;
var CtrInput = (function () {
    function CtrInput(completer, ngModel, el) {
        var _this = this;
        this.completer = completer;
        this.ngModel = ngModel;
        this.el = el;
        this.clearSelected = false;
        this.clearUnselected = false;
        this.overrideSuggested = false;
        this.fillHighlighted = true;
        this.openOnFocus = false;
        this.openOnClick = false;
        this.selectOnClick = false;
        this.selectOnFocus = false;
        this.ngModelChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this._searchStr = "";
        this._displayStr = "";
        this.blurTimer = null;
        this.completer.selected.subscribe(function (item) {
            if (!item) {
                return;
            }
            if (_this.clearSelected) {
                _this.searchStr = "";
            }
            else {
                _this.searchStr = item.title;
            }
            _this.ngModelChange.emit(_this.searchStr);
        });
        this.completer.highlighted.subscribe(function (item) {
            if (_this.fillHighlighted) {
                if (item) {
                    _this._displayStr = item.title;
                    _this.ngModelChange.emit(item.title);
                }
                else {
                    _this._displayStr = _this.searchStr;
                    _this.ngModelChange.emit(_this.searchStr);
                }
            }
        });
        this.completer.dataSourceChange.subscribe(function () {
            _this.completer.search(_this.searchStr);
        });
        if (this.ngModel.valueChanges) {
            this.ngModel.valueChanges.subscribe(function (value) {
                if (!isNil(value) && _this._displayStr !== value) {
                    if (_this.searchStr !== value) {
                        _this.completer.search(value);
                    }
                    _this.searchStr = value;
                }
            });
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.keyupHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.keyCode === KEY_LF || event.keyCode === KEY_RT || event.keyCode === KEY_TAB) {
            // do nothing
            return;
        }
        if (event.keyCode === KEY_UP || event.keyCode === KEY_EN) {
            event.preventDefault();
        }
        else if (event.keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.search(this.searchStr);
        }
        else if (event.keyCode === KEY_ES) {
            if (this.completer.isOpen) {
                this.restoreSearchValue();
                this.completer.clear();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.pasteHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.completer.open();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.keydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var /** @type {?} */ keyCode = event.keyCode || event.which;
        if (keyCode === KEY_EN) {
            if (this.completer.hasHighlighted()) {
                event.preventDefault();
            }
            this.handleSelection();
        }
        else if (keyCode === KEY_DW) {
            event.preventDefault();
            this.completer.open();
            this.completer.nextRow();
        }
        else if (keyCode === KEY_UP) {
            event.preventDefault();
            this.completer.prevRow();
        }
        else if (keyCode === KEY_TAB) {
            this.handleSelection();
        }
        else if (keyCode === KEY_BK) {
            this.completer.open();
        }
        else if (keyCode === KEY_ES) {
            // This is very specific to IE10/11 #272
            // without this, IE clears the input text
            event.preventDefault();
            if (this.completer.isOpen) {
                event.stopPropagation();
            }
        }
        else {
            if (keyCode !== 0 && keyCode !== KEY_SH && keyCode !== KEY_CL &&
                (keyCode <= KEY_F1 || keyCode >= KEY_F12) &&
                !event.ctrlKey && !event.metaKey && !event.altKey) {
                this.completer.open();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.onBlur = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // Check if we need to cancel Blur for IE
        if (this.completer.isCancelBlur()) {
            setTimeout(function () {
                // get the focus back
                // get the focus back
                _this.el.nativeElement.focus();
            }, 0);
            return;
        }
        if (this.completer.isOpen) {
            this.blurTimer = Object(rxjs_observable_timer__WEBPACK_IMPORTED_MODULE_7__["timer"])(200).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function () { return _this.doBlur(); });
        }
    };
    /**
     * @return {?}
     */
    CtrInput.prototype.onfocus = /**
     * @return {?}
     */
    function () {
        if (this.blurTimer) {
            this.blurTimer.unsubscribe();
            this.blurTimer = null;
        }
        if (this.selectOnFocus) {
            this.el.nativeElement.select();
        }
        if (this.openOnFocus) {
            this.completer.open();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrInput.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.selectOnClick) {
            this.el.nativeElement.select();
        }
        if (this.openOnClick) {
            if (this.completer.isOpen) {
                this.completer.clear();
            }
            else {
                this.completer.open();
            }
        }
    };
    Object.defineProperty(CtrInput.prototype, "searchStr", {
        get: /**
         * @return {?}
         */
        function () {
            return this._searchStr;
        },
        set: /**
         * @param {?} term
         * @return {?}
         */
        function (term) {
            this._searchStr = term;
            this._displayStr = term;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CtrInput.prototype.handleSelection = /**
     * @return {?}
     */
    function () {
        if (this.completer.hasHighlighted()) {
            this._searchStr = "";
            this.completer.selectCurrent();
        }
        else if (this.overrideSuggested) {
            this.completer.onSelected({ title: this.searchStr, originalObject: null });
        }
        else {
            if (this.clearUnselected && !this.completer.hasSelected) {
                this.searchStr = "";
                this.ngModelChange.emit(this.searchStr);
            }
            this.completer.clear();
        }
    };
    /**
     * @return {?}
     */
    CtrInput.prototype.restoreSearchValue = /**
     * @return {?}
     */
    function () {
        if (this.fillHighlighted) {
            if (this._displayStr != this.searchStr) {
                this._displayStr = this.searchStr;
                this.ngModelChange.emit(this.searchStr);
            }
        }
    };
    /**
     * @return {?}
     */
    CtrInput.prototype.doBlur = /**
     * @return {?}
     */
    function () {
        if (this.blurTimer) {
            this.blurTimer.unsubscribe();
            this.blurTimer = null;
        }
        if (this.overrideSuggested) {
            this.completer.onSelected({ title: this.searchStr, originalObject: null });
        }
        else {
            if (this.clearUnselected && !this.completer.hasSelected) {
                this.searchStr = "";
                this.ngModelChange.emit(this.searchStr);
            }
            else {
                this.restoreSearchValue();
            }
        }
        this.completer.clear();
    };
    CtrInput.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "[ctrInput]",
                },] },
    ];
    /** @nocollapse */
    CtrInput.ctorParameters = function () { return [
        { type: CtrCompleter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"] },] },
        { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgModel"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], },
    ]; };
    CtrInput.propDecorators = {
        "clearSelected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["clearSelected",] },],
        "clearUnselected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["clearUnselected",] },],
        "overrideSuggested": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["overrideSuggested",] },],
        "fillHighlighted": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["fillHighlighted",] },],
        "openOnFocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["openOnFocus",] },],
        "openOnClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["openOnClick",] },],
        "selectOnClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["selectOnClick",] },],
        "selectOnFocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["selectOnFocus",] },],
        "ngModelChange": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "keyupHandler": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["keyup", ["$event"],] },],
        "pasteHandler": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["paste", ["$event"],] },],
        "keydownHandler": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["keydown", ["$event"],] },],
        "onBlur": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["blur", ["$event"],] },],
        "onfocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["focus", [],] },],
        "onClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["click", ["$event"],] },],
    };
    return CtrInput;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CtrListContext = (function () {
    function CtrListContext(results, searching, searchInitialized, isOpen) {
        this.results = results;
        this.searching = searching;
        this.searchInitialized = searchInitialized;
        this.isOpen = isOpen;
    }
    return CtrListContext;
}());
var CtrList = (function () {
    function CtrList(completer, templateRef, viewContainer, cd) {
        this.completer = completer;
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.ctrListMinSearchLength = MIN_SEARCH_LENGTH;
        this.ctrListPause = PAUSE;
        this.ctrListAutoMatch = false;
        this.ctrListAutoHighlight = false;
        this.ctrListDisplaySearching = true;
        this.term = null;
        this.searchTimer = null;
        this.clearTimer = null;
        this.ctx = new CtrListContext([], false, false, false);
        this._initialValue = null;
        this.viewRef = null;
    }
    /**
     * @return {?}
     */
    CtrList.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.completer.registerList(this);
        this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, new CtrListContext([], false, false, false));
    };
    Object.defineProperty(CtrList.prototype, "dataService", {
        set: /**
         * @param {?} newService
         * @return {?}
         */
        function (newService) {
            this._dataService = newService;
            this.dataServiceSubscribe();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrList.prototype, "initialValue", {
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            if (this._dataService && typeof this._dataService.convertToItem === "function") {
                setTimeout(function () {
                    var /** @type {?} */ initialItem = /** @type {?} */ ((_this._dataService.convertToItem))(value);
                    if (initialItem) {
                        _this.completer.onSelected(initialItem, false);
                    }
                });
            }
            else if (!this._dataService) {
                this._initialValue = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} term
     * @return {?}
     */
    CtrList.prototype.search = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        var _this = this;
        if (!isNil(term) && term.length >= this.ctrListMinSearchLength && this.term !== term) {
            if (this.searchTimer) {
                this.searchTimer.unsubscribe();
                this.searchTimer = null;
            }
            if (!this.ctx.searching) {
                if (this.ctrListDisplaySearching) {
                    this.ctx.results = [];
                }
                this.ctx.searching = true;
                this.ctx.searchInitialized = true;
                this.refreshTemplate();
            }
            if (this.clearTimer) {
                this.clearTimer.unsubscribe();
            }
            this.searchTimer = Object(rxjs_observable_timer__WEBPACK_IMPORTED_MODULE_7__["timer"])(this.ctrListPause).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function () {
                _this.searchTimerComplete(term);
            });
        }
        else if (!isNil(term) && term.length < this.ctrListMinSearchLength) {
            this.clear();
            this.term = "";
        }
    };
    /**
     * @return {?}
     */
    CtrList.prototype.clear = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.searchTimer) {
            this.searchTimer.unsubscribe();
        }
        this.clearTimer = Object(rxjs_observable_timer__WEBPACK_IMPORTED_MODULE_7__["timer"])(CLEAR_TIMEOUT).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)).subscribe(function () {
            _this._clear();
        });
    };
    /**
     * @return {?}
     */
    CtrList.prototype.open = /**
     * @return {?}
     */
    function () {
        if (!this.ctx.searchInitialized) {
            this.search("");
        }
        this.refreshTemplate();
    };
    /**
     * @param {?} open
     * @return {?}
     */
    CtrList.prototype.isOpen = /**
     * @param {?} open
     * @return {?}
     */
    function (open) {
        this.ctx.isOpen = open;
    };
    /**
     * @return {?}
     */
    CtrList.prototype._clear = /**
     * @return {?}
     */
    function () {
        if (this.searchTimer) {
            this.searchTimer.unsubscribe();
            this.searchTimer = null;
        }
        if (this.dataService) {
            this.dataService.cancel();
        }
        this.viewContainer.clear();
        this.viewRef = null;
    };
    /**
     * @param {?} term
     * @return {?}
     */
    CtrList.prototype.searchTimerComplete = /**
     * @param {?} term
     * @return {?}
     */
    function (term) {
        // Begin the search
        if (isNil(term) || term.length < this.ctrListMinSearchLength) {
            this.ctx.searching = false;
            return;
        }
        this.term = term;
        this._dataService.search(term);
    };
    /**
     * @return {?}
     */
    CtrList.prototype.refreshTemplate = /**
     * @return {?}
     */
    function () {
        // create the template if it doesn't exist
        if (!this.viewRef) {
            this.viewRef = this.viewContainer.createEmbeddedView(this.templateRef, this.ctx);
        }
        else if (!this.viewRef.destroyed) {
            /** @type {?} */ ((
            // refresh the template
            this.viewRef)).context.isOpen = this.ctx.isOpen; /** @type {?} */
            ((this.viewRef)).context.results = this.ctx.results; /** @type {?} */
            ((this.viewRef)).context.searching = this.ctx.searching; /** @type {?} */
            ((this.viewRef)).context.searchInitialized = this.ctx.searchInitialized;
            this.viewRef.detectChanges();
        }
        this.cd.markForCheck();
    };
    /**
     * @return {?}
     */
    CtrList.prototype.getBestMatchIndex = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.ctx.results || !this.term) {
            return null;
        }
        // First try to find the exact term
        var /** @type {?} */ bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase() === /** @type {?} */ ((_this.term)).toLocaleLowerCase(); });
        // If not try to find the first item that starts with the term
        if (bestMatch < 0) {
            bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase().startsWith(/** @type {?} */ ((_this.term)).toLocaleLowerCase()); });
        }
        // If not try to find the first item that includes the term
        if (bestMatch < 0) {
            bestMatch = this.ctx.results.findIndex(function (item) { return item.title.toLowerCase().includes(/** @type {?} */ ((_this.term)).toLocaleLowerCase()); });
        }
        return bestMatch < 0 ? null : bestMatch;
    };
    /**
     * @return {?}
     */
    CtrList.prototype.dataServiceSubscribe = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._dataService) {
            this._dataService.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(function (err) {
                console.error(err);
                console.error("Unexpected error in dataService: errors should be handled by the dataService Observable");
                return [];
            }))
                .subscribe(function (results) {
                _this.ctx.searchInitialized = true;
                _this.ctx.searching = false;
                _this.ctx.results = results;
                if (_this.ctrListAutoMatch && results && results.length === 1 && results[0].title && !isNil(_this.term) &&
                    results[0].title.toLocaleLowerCase() === /** @type {?} */ ((_this.term)).toLocaleLowerCase()) {
                    // Do automatch
                    // Do automatch
                    _this.completer.onSelected(results[0]);
                    return;
                }
                if (_this._initialValue) {
                    _this.initialValue = _this._initialValue;
                    _this._initialValue = null;
                }
                _this.refreshTemplate();
                if (_this.ctrListAutoHighlight) {
                    _this.completer.autoHighlightIndex = _this.getBestMatchIndex();
                }
            });
            if (this._dataService.dataSourceChange) {
                this._dataService.dataSourceChange.subscribe(function () {
                    _this.term = null;
                    _this.ctx.searchInitialized = false;
                    _this.ctx.searching = false;
                    _this.ctx.results = [];
                    _this.refreshTemplate();
                    _this.completer.onDataSourceChange();
                });
            }
        }
    };
    CtrList.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "[ctrList]",
                },] },
    ];
    /** @nocollapse */
    CtrList.ctorParameters = function () { return [
        { type: CtrCompleter, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"] },] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], },
    ]; };
    CtrList.propDecorators = {
        "ctrListMinSearchLength": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "ctrListPause": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "ctrListAutoMatch": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "ctrListAutoHighlight": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "ctrListDisplaySearching": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "dataService": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["ctrList",] },],
        "initialValue": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ["ctrListInitialValue",] },],
    };
    return CtrList;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CtrRow = (function () {
    function CtrRow(el, renderer, dropdown) {
        this.el = el;
        this.renderer = renderer;
        this.dropdown = dropdown;
        this.selected = false;
    }
    /**
     * @return {?}
     */
    CtrRow.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._rowIndex) {
            this.dropdown.unregisterRow(this._rowIndex);
        }
    };
    Object.defineProperty(CtrRow.prototype, "ctrRow", {
        set: /**
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._rowIndex = index;
            this.dropdown.registerRow(new CtrRowItem(this, this._rowIndex));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CtrRow.prototype, "dataItem", {
        set: /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this._item = item;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    CtrRow.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dropdown.onSelected(this._item);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrRow.prototype.onMouseEnter = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dropdown.highlightRow(this._rowIndex);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CtrRow.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.dropdown.rowMouseDown();
    };
    /**
     * @param {?} selected
     * @return {?}
     */
    CtrRow.prototype.setHighlighted = /**
     * @param {?} selected
     * @return {?}
     */
    function (selected) {
        this.selected = selected;
        this.renderer.setElementClass(this.el.nativeElement, "completer-selected-row", this.selected);
    };
    /**
     * @return {?}
     */
    CtrRow.prototype.getNativeElement = /**
     * @return {?}
     */
    function () {
        return this.el.nativeElement;
    };
    /**
     * @return {?}
     */
    CtrRow.prototype.getDataItem = /**
     * @return {?}
     */
    function () {
        return this._item;
    };
    CtrRow.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: "[ctrRow]",
                },] },
    ];
    /** @nocollapse */
    CtrRow.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Renderer"], },
        { type: CtrDropdown, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Host"] },] },
    ]; };
    CtrRow.propDecorators = {
        "ctrRow": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "dataItem": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "onClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["click", ["$event"],] },],
        "onMouseEnter": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["mouseenter", ["$event"],] },],
        "onMouseDown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ["mousedown", ["$event"],] },],
    };
    return CtrRow;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
"use strict";
/**
 * @record
 */

var CompleterListItemCmp = (function () {
    function CompleterListItemCmp() {
        this.parts = [];
    }
    /**
     * @return {?}
     */
    CompleterListItemCmp.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.searchStr) {
            this.parts.push({ isMatch: false, text: this.text });
            return;
        }
        var /** @type {?} */ matchStr = this.text.toLowerCase();
        var /** @type {?} */ matchPos = matchStr.indexOf(this.searchStr.toLowerCase());
        var /** @type {?} */ startIndex = 0;
        while (matchPos >= 0) {
            var /** @type {?} */ matchText = this.text.slice(matchPos, matchPos + this.searchStr.length);
            if (matchPos === 0) {
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length;
            }
            else if (matchPos > 0) {
                var /** @type {?} */ matchPart = this.text.slice(startIndex, matchPos);
                this.parts.push({ isMatch: false, text: matchPart });
                this.parts.push({ isMatch: true, text: matchText });
                startIndex += this.searchStr.length + matchPart.length;
            }
            matchPos = matchStr.indexOf(this.searchStr.toLowerCase(), startIndex);
        }
        if (startIndex < this.text.length) {
            this.parts.push({ isMatch: false, text: this.text.slice(startIndex, this.text.length) });
        }
    };
    CompleterListItemCmp.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: "completer-list-item",
                    template: "<span class=\"completer-list-item-holder\" [ngClass]= \"{'completer-title': type === 'title', 'completer-description': type === 'description'}\" >\n        <span class=\"completer-list-item\" *ngFor=\"let part of parts\" [ngClass]= \"part.isMatch ? matchClass : null\">{{part.text}}</span>\n    </span>"
                },] },
    ];
    /** @nocollapse */
    CompleterListItemCmp.ctorParameters = function () { return []; };
    CompleterListItemCmp.propDecorators = {
        "text": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "searchStr": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "matchClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "type": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    };
    return CompleterListItemCmp;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
"use strict";
var noop = function () {
    return;
};
var COMPLETER_CONTROL_VALUE_ACCESSOR = {
    multi: true,
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(function () { return CompleterCmp; }),
};
var CompleterCmp = (function () {
    function CompleterCmp(completerService, cdr) {
        this.completerService = completerService;
        this.cdr = cdr;
        this.inputName = "";
        this.inputId = "";
        this.pause = PAUSE;
        this.minSearchLength = MIN_SEARCH_LENGTH;
        this.maxChars = MAX_CHARS;
        this.overrideSuggested = false;
        this.clearSelected = false;
        this.clearUnselected = false;
        this.fillHighlighted = true;
        this.placeholder = "";
        this.autoMatch = false;
        this.disableInput = false;
        this.autofocus = false;
        this.openOnFocus = false;
        this.openOnClick = false;
        this.selectOnClick = false;
        this.selectOnFocus = false;
        this.autoHighlight = false;
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.highlighted = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.blurEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.click = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.focusEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.opened = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.keyup = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.keydown = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]("");
        this.displaySearching = true;
        this.displayNoResults = true;
        this._textNoResults = TEXT_NO_RESULTS;
        this._textSearching = TEXT_SEARCHING;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this._focus = false;
        this._open = false;
        this._searchStr = "";
    }
    Object.defineProperty(CompleterCmp.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () { return this.searchStr; },
        set: /**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (v !== this.searchStr) {
                this.searchStr = v;
            }
            // Propagate the change in any case
            this._onChangeCallback(v);
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(CompleterCmp.prototype, "searchStr", {
        get: /**
         * @return {?}
         */
        function () {
            return this._searchStr;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            if (typeof value === "string" || isNil(value)) {
                this._searchStr = value;
            }
            else {
                this._searchStr = JSON.stringify(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CompleterCmp.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        if (this.autofocus) {
            this._focus = true;
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this._focus) {
            setTimeout(function () {
                _this.ctrInput.nativeElement.focus();
                _this._focus = false;
            }, 0);
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.onTouched = /**
     * @return {?}
     */
    function () {
        this._onTouchedCallback();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    CompleterCmp.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.searchStr = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CompleterCmp.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    CompleterCmp.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    CompleterCmp.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disableInput = isDisabled;
    };
    Object.defineProperty(CompleterCmp.prototype, "datasource", {
        set: /**
         * @param {?} source
         * @return {?}
         */
        function (source) {
            if (source) {
                if (source instanceof Array) {
                    this.dataService = this.completerService.local(source);
                }
                else if (typeof (source) === "string") {
                    this.dataService = this.completerService.remote(source);
                }
                else {
                    this.dataService = /** @type {?} */ (source);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textNoResults", {
        set: /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            if (this._textNoResults !== text) {
                this._textNoResults = text;
                this.displayNoResults = !!this._textNoResults && this._textNoResults !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompleterCmp.prototype, "textSearching", {
        set: /**
         * @param {?} text
         * @return {?}
         */
        function (text) {
            if (this._textSearching !== text) {
                this._textSearching = text;
                this.displaySearching = !!this._textSearching && this._textSearching !== "false";
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CompleterCmp.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.completer.selected.subscribe(function (item) {
            _this.selected.emit(item);
        });
        this.completer.highlighted.subscribe(function (item) {
            _this.highlighted.emit(item);
        });
        this.completer.opened.subscribe(function (isOpen) {
            _this._open = isOpen;
            _this.opened.emit(isOpen);
        });
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.blurEvent.emit();
        this.onTouched();
        this.cdr.detectChanges();
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.focusEvent.emit();
        this.onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CompleterCmp.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.click.emit(event);
        this.onTouched();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CompleterCmp.prototype.onKeyup = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.keyup.emit(event);
        event.stopPropagation();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CompleterCmp.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.keydown.emit(event);
        event.stopPropagation();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    CompleterCmp.prototype.onChange = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.value = value;
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.open = /**
     * @return {?}
     */
    function () {
        this.completer.open();
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.close = /**
     * @return {?}
     */
    function () {
        this.completer.clear();
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.focus = /**
     * @return {?}
     */
    function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.focus();
        }
        else {
            this._focus = true;
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.blur = /**
     * @return {?}
     */
    function () {
        if (this.ctrInput) {
            this.ctrInput.nativeElement.blur();
        }
        else {
            this._focus = false;
        }
    };
    /**
     * @return {?}
     */
    CompleterCmp.prototype.isOpen = /**
     * @return {?}
     */
    function () {
        return this._open;
    };
    CompleterCmp.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: "ng2-completer",
                    template: "\n        <div class=\"completer-holder\" ctrCompleter>\n            <input #ctrInput [attr.id]=\"inputId.length > 0 ? inputId : null\" type=\"search\"\n                class=\"completer-input\" ctrInput [ngClass]=\"inputClass\"\n                [(ngModel)]=\"searchStr\" (ngModelChange)=\"onChange($event)\"\n                [attr.name]=\"inputName\" [placeholder]=\"placeholder\"\n                [attr.maxlength]=\"maxChars\" [tabindex]=\"fieldTabindex\" [disabled]=\"disableInput\"\n                [clearSelected]=\"clearSelected\" [clearUnselected]=\"clearUnselected\"\n                [overrideSuggested]=\"overrideSuggested\" [openOnFocus]=\"openOnFocus\" [fillHighlighted]=\"fillHighlighted\"\n                [openOnClick]=\"openOnClick\" [selectOnClick]=\"selectOnClick\" [selectOnFocus]=\"selectOnFocus\"\n                (blur)=\"onBlur()\" (focus)=\"onFocus()\" (keyup)=\"onKeyup($event)\"\n                (keydown)=\"onKeydown($event)\" (click)=\"onClick($event)\"\n                autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" />\n\n            <div class=\"completer-dropdown-holder\"\n                *ctrList=\"dataService;\n                    minSearchLength: minSearchLength;\n                    pause: pause;\n                    autoMatch: autoMatch;\n                    initialValue: initialValue;\n                    autoHighlight: autoHighlight;\n                    displaySearching: displaySearching;\n                    let items = results;\n                    let searchActive = searching;\n                    let isInitialized = searchInitialized;\n                    let isOpen = isOpen;\">\n                <div class=\"completer-dropdown\" ctrDropdown \n                    *ngIf=\"isInitialized && isOpen && (( items?.length > 0|| (displayNoResults && !searchActive)) || (searchActive && displaySearching))\">\n                    <div *ngIf=\"searchActive && displaySearching\" class=\"completer-searching\">{{ _textSearching }}</div>\n                    <div *ngIf=\"!searchActive && (!items || items?.length === 0)\"\n                    class=\"completer-no-results\">{{ _textNoResults }}</div>\n                    <div class=\"completer-row-wrapper\" *ngFor=\"let item of items; let rowIndex=index\">\n                        <div class=\"completer-row\" [ctrRow]=\"rowIndex\" [dataItem]=\"item\">\n                            <div *ngIf=\"item.image || item.image === ''\" class=\"completer-image-holder\">\n                                <img *ngIf=\"item.image != ''\" src=\"{{item.image}}\" class=\"completer-image\" />\n                                <div *ngIf=\"item.image === ''\" class=\"completer-image-default\"></div>\n                            </div>\n                            <div class=\"completer-item-text\"\n                            [ngClass]=\"{'completer-item-text-image': item.image || item.image === '' }\">\n                                <completer-list-item\n                                class=\"completer-title\" [text]=\"item.title\" [matchClass]=\"matchClass\"\n                                [searchStr]=\"searchStr\" [type]=\"'title'\"></completer-list-item>\n                                <completer-list-item *ngIf=\"item.description && item.description != ''\"\n                                class=\"completer-description\" [text]=\"item.description\"\n                                    [matchClass]=\"matchClass\" [searchStr]=\"searchStr\" [type]=\"'description'\">\n                                </completer-list-item>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    ",
                    styles: ["\n    .completer-dropdown {\n        border-color: #ececec;\n        border-width: 1px;\n        border-style: solid;\n        border-radius: 2px;\n        width: 250px;\n        padding: 6px;\n        cursor: pointer;\n        z-index: 9999;\n        position: absolute;\n        margin-top: -6px;\n        background-color: #ffffff;\n    }\n\n    .completer-row {\n        padding: 5px;\n        color: #000000;\n        margin-bottom: 4px;\n        clear: both;\n        display: inline-block;\n        width: 103%;\n    }\n\n    .completer-selected-row {\n        background-color: lightblue;\n        color: #ffffff;\n    }\n\n    .completer-description {\n        font-size: 14px;\n    }\n\n    .completer-image-default {\n        width: 16px;\n        height: 16px;\n        background-image: url(\"demo/res/img/default.png\");\n    }\n\n    .completer-image-holder {\n        float: left;\n        width: 10%;\n    }\n    .completer-item-text-image {\n        float: right;\n        width: 90%;\n    }\n    "],
                    providers: [COMPLETER_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CompleterCmp.ctorParameters = function () { return [
        { type: CompleterService, },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"], },
    ]; };
    CompleterCmp.propDecorators = {
        "dataService": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "inputName": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "inputId": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "pause": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "minSearchLength": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "maxChars": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "overrideSuggested": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "clearSelected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "clearUnselected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "fillHighlighted": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "placeholder": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "matchClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "fieldTabindex": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "autoMatch": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "disableInput": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "inputClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "autofocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "openOnFocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "openOnClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "selectOnClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "selectOnFocus": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "initialValue": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "autoHighlight": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "selected": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "highlighted": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "blurEvent": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"], args: ["blur",] },],
        "click": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "focusEvent": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"], args: ["focus",] },],
        "opened": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "keyup": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "keydown": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] },],
        "completer": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: [CtrCompleter,] },],
        "ctrInput": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ["ctrInput",] },],
        "datasource": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "textNoResults": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
        "textSearching": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] },],
    };
    return CompleterCmp;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var providers = [
    CompleterService,
    LocalDataFactory,
    RemoteDataFactory
];
var Ng2CompleterModule = (function () {
    function Ng2CompleterModule() {
    }
    /**
     * @return {?}
     */
    Ng2CompleterModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: Ng2CompleterModule,
            providers: providers
        };
    };
    /**
     * @return {?}
     */
    Ng2CompleterModule.forChild = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: Ng2CompleterModule,
            providers: providers
        };
    };
    Ng2CompleterModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [
                        CompleterListItemCmp,
                        CtrCompleter,
                        CtrDropdown,
                        CtrInput,
                        CtrList,
                        CtrRow,
                        CompleterCmp
                    ],
                    exports: [
                        CompleterListItemCmp,
                        CtrCompleter,
                        CtrDropdown,
                        CtrInput,
                        CtrList,
                        CtrRow,
                        CompleterCmp
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_9__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpClientModule"]
                    ],
                    providers: providers
                },] },
    ];
    /** @nocollapse */
    Ng2CompleterModule.ctorParameters = function () { return []; };
    return Ng2CompleterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// Public classes.

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Entry point for all public APIs of the package.
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */


//# sourceMappingURL=ng2-completer.js.map


/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-edit-mode/custom-edit.component.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-edit-mode/custom-edit.component.js ***!
  \**********************************************************************************************/
/*! exports provided: CustomEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomEditComponent", function() { return CustomEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _edit_cell_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-cell-default */ "./node_modules/ng2-smart-table/components/cell/cell-edit-mode/edit-cell-default.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var CustomEditComponent = /** @class */ (function (_super) {
    __extends(CustomEditComponent, _super);
    function CustomEditComponent(resolver) {
        var _this = _super.call(this) || this;
        _this.resolver = resolver;
        return _this;
    }
    CustomEditComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (this.cell && !this.customComponent) {
            var componentFactory = this.resolver.resolveComponentFactory(this.cell.getColumn().editor.component);
            this.customComponent = this.dynamicTarget.createComponent(componentFactory);
            // set @Inputs and @Outputs of custom component
            this.customComponent.instance.cell = this.cell;
            this.customComponent.instance.inputClass = this.inputClass;
            this.customComponent.instance.onStopEditing.subscribe(function () { return _this.onStopEditing(); });
            this.customComponent.instance.onEdited.subscribe(function (event) { return _this.onEdited(event); });
            this.customComponent.instance.onClick.subscribe(function (event) { return _this.onClick(event); });
        }
    };
    CustomEditComponent.prototype.ngOnDestroy = function () {
        if (this.customComponent) {
            this.customComponent.destroy();
        }
    };
    CustomEditComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'table-cell-custom-editor',
                    template: "\n    <ng-template #dynamicTarget></ng-template>\n  ",
                },] },
    ];
    /** @nocollapse */
    CustomEditComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], },
    ]; };
    CustomEditComponent.propDecorators = {
        "dynamicTarget": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['dynamicTarget', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] },] },],
    };
    return CustomEditComponent;
}(_edit_cell_default__WEBPACK_IMPORTED_MODULE_1__["EditCellDefault"]));

//# sourceMappingURL=custom-edit.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-edit-mode/default-edit.component.js":
/*!***********************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-edit-mode/default-edit.component.js ***!
  \***********************************************************************************************/
/*! exports provided: DefaultEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultEditComponent", function() { return DefaultEditComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _edit_cell_default__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./edit-cell-default */ "./node_modules/ng2-smart-table/components/cell/cell-edit-mode/edit-cell-default.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var DefaultEditComponent = /** @class */ (function (_super) {
    __extends(DefaultEditComponent, _super);
    function DefaultEditComponent() {
        return _super.call(this) || this;
    }
    DefaultEditComponent.prototype.getEditorType = function () {
        return this.cell.getColumn().editor && this.cell.getColumn().editor.type;
    };
    DefaultEditComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'table-cell-default-editor',
                    template: "<div [ngSwitch]=\"getEditorType()\"><select-editor *ngSwitchCase=\"'list'\" [cell]=\"cell\" [inputClass]=\"inputClass\" (onClick)=\"onClick($event)\" (onEdited)=\"onEdited($event)\" (onStopEditing)=\"onStopEditing()\"></select-editor><textarea-editor *ngSwitchCase=\"'textarea'\" [cell]=\"cell\" [inputClass]=\"inputClass\" (onClick)=\"onClick($event)\" (onEdited)=\"onEdited($event)\" (onStopEditing)=\"onStopEditing()\"></textarea-editor><checkbox-editor *ngSwitchCase=\"'checkbox'\" [cell]=\"cell\" [inputClass]=\"inputClass\" (onClick)=\"onClick($event)\"></checkbox-editor><completer-editor *ngSwitchCase=\"'completer'\" [cell]=\"cell\"></completer-editor><input-editor *ngSwitchDefault [cell]=\"cell\" [inputClass]=\"inputClass\" (onClick)=\"onClick($event)\" (onEdited)=\"onEdited($event)\" (onStopEditing)=\"onStopEditing()\"></input-editor></div>",
                },] },
    ];
    /** @nocollapse */
    DefaultEditComponent.ctorParameters = function () { return []; };
    return DefaultEditComponent;
}(_edit_cell_default__WEBPACK_IMPORTED_MODULE_1__["EditCellDefault"]));

//# sourceMappingURL=default-edit.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-edit-mode/edit-cell-default.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-edit-mode/edit-cell-default.js ***!
  \******************************************************************************************/
/*! exports provided: EditCellDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCellDefault", function() { return EditCellDefault; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _lib_data_set_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/data-set/cell */ "./node_modules/ng2-smart-table/lib/data-set/cell.js");


var EditCellDefault = /** @class */ (function () {
    function EditCellDefault() {
        this.inputClass = '';
        this.edited = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    EditCellDefault.prototype.onEdited = function (event) {
        this.edited.next(event);
        return false;
    };
    EditCellDefault.prototype.onStopEditing = function () {
        this.cell.getRow().isInEditing = false;
        return false;
    };
    EditCellDefault.prototype.onClick = function (event) {
        event.stopPropagation();
    };
    EditCellDefault.propDecorators = {
        "cell": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "inputClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "edited": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    };
    return EditCellDefault;
}());

//# sourceMappingURL=edit-cell-default.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-edit-mode/edit-cell.component.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-edit-mode/edit-cell.component.js ***!
  \********************************************************************************************/
/*! exports provided: EditCellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCellComponent", function() { return EditCellComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _lib_data_set_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/data-set/cell */ "./node_modules/ng2-smart-table/lib/data-set/cell.js");


var EditCellComponent = /** @class */ (function () {
    function EditCellComponent() {
        this.inputClass = '';
        this.edited = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    EditCellComponent.prototype.onEdited = function (event) {
        this.edited.next(event);
        return false;
    };
    EditCellComponent.prototype.getEditorType = function () {
        return this.cell.getColumn().editor && this.cell.getColumn().editor.type;
    };
    EditCellComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'table-cell-edit-mode',
                    template: "\n      <div [ngSwitch]=\"getEditorType()\">\n        <table-cell-custom-editor *ngSwitchCase=\"'custom'\"\n                                  [cell]=\"cell\"\n                                  [inputClass]=\"inputClass\"\n                                  (edited)=\"onEdited($event)\">\n        </table-cell-custom-editor>\n        <table-cell-default-editor *ngSwitchDefault\n                                  [cell]=\"cell\"\n                                  [inputClass]=\"inputClass\"\n                                  (edited)=\"onEdited($event)\">\n        </table-cell-default-editor>\n      </div>\n    ",
                },] },
    ];
    /** @nocollapse */
    EditCellComponent.propDecorators = {
        "cell": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "inputClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "edited": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    };
    return EditCellComponent;
}());

//# sourceMappingURL=edit-cell.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-editors/checkbox-editor.component.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-editors/checkbox-editor.component.js ***!
  \************************************************************************************************/
/*! exports provided: CheckboxEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckboxEditorComponent", function() { return CheckboxEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _default_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-editor */ "./node_modules/ng2-smart-table/components/cell/cell-editors/default-editor.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var CheckboxEditorComponent = /** @class */ (function (_super) {
    __extends(CheckboxEditorComponent, _super);
    function CheckboxEditorComponent() {
        return _super.call(this) || this;
    }
    CheckboxEditorComponent.prototype.onChange = function (event) {
        var trueVal = (this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().true) || true;
        var falseVal = (this.cell.getColumn().getConfig() && this.cell.getColumn().getConfig().false) || false;
        this.cell.newValue = event.target.checked ? trueVal : falseVal;
    };
    CheckboxEditorComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'checkbox-editor',
                    styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em} /*# sourceMappingURL=editor.component.css.map */ "],
                    template: "\n    <input [ngClass]=\"inputClass\"\n           type=\"checkbox\"\n           class=\"form-control\"\n           [name]=\"cell.getId()\"\n           [disabled]=\"!cell.isEditable()\"\n           [checked]=\"cell.getValue() == (cell.getColumn().getConfig()?.true || true)\"\n           (click)=\"onClick.emit($event)\"\n           (change)=\"onChange($event)\">\n    ",
                },] },
    ];
    /** @nocollapse */
    CheckboxEditorComponent.ctorParameters = function () { return []; };
    return CheckboxEditorComponent;
}(_default_editor__WEBPACK_IMPORTED_MODULE_1__["DefaultEditor"]));

//# sourceMappingURL=checkbox-editor.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-editors/completer-editor.component.js":
/*!*************************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-editors/completer-editor.component.js ***!
  \*************************************************************************************************/
/*! exports provided: CompleterEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CompleterEditorComponent", function() { return CompleterEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var ng2_completer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ng2-completer */ "./node_modules/ng2-completer/esm5/ng2-completer.js");
/* harmony import */ var _default_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./default-editor */ "./node_modules/ng2-smart-table/components/cell/cell-editors/default-editor.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var CompleterEditorComponent = /** @class */ (function (_super) {
    __extends(CompleterEditorComponent, _super);
    function CompleterEditorComponent(completerService) {
        var _this = _super.call(this) || this;
        _this.completerService = completerService;
        _this.completerStr = '';
        return _this;
    }
    CompleterEditorComponent.prototype.ngOnInit = function () {
        if (this.cell.getColumn().editor && this.cell.getColumn().editor.type === 'completer') {
            var config = this.cell.getColumn().getConfig().completer;
            config.dataService = this.completerService.local(config.data, config.searchFields, config.titleField);
            config.dataService.descriptionField(config.descriptionField);
        }
    };
    CompleterEditorComponent.prototype.onEditedCompleter = function (event) {
        this.cell.newValue = event.title;
        return false;
    };
    CompleterEditorComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'completer-editor',
                    template: "\n    <ng2-completer [(ngModel)]=\"completerStr\"\n                   [dataService]=\"cell.getColumn().getConfig().completer.dataService\"\n                   [minSearchLength]=\"cell.getColumn().getConfig().completer.minSearchLength || 0\"\n                   [pause]=\"cell.getColumn().getConfig().completer.pause || 0\"\n                   [placeholder]=\"cell.getColumn().getConfig().completer.placeholder || 'Start typing...'\"\n                   (selected)=\"onEditedCompleter($event)\">\n    </ng2-completer>\n    ",
                },] },
    ];
    /** @nocollapse */
    CompleterEditorComponent.ctorParameters = function () { return [
        { type: ng2_completer__WEBPACK_IMPORTED_MODULE_1__["CompleterService"], },
    ]; };
    return CompleterEditorComponent;
}(_default_editor__WEBPACK_IMPORTED_MODULE_2__["DefaultEditor"]));

//# sourceMappingURL=completer-editor.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-editors/default-editor.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-editors/default-editor.js ***!
  \*************************************************************************************/
/*! exports provided: DefaultEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultEditor", function() { return DefaultEditor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _lib_data_set_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/data-set/cell */ "./node_modules/ng2-smart-table/lib/data-set/cell.js");


var DefaultEditor = /** @class */ (function () {
    function DefaultEditor() {
        this.onStopEditing = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onEdited = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onClick = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    DefaultEditor.propDecorators = {
        "cell": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "inputClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "onStopEditing": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onEdited": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
        "onClick": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    };
    return DefaultEditor;
}());

//# sourceMappingURL=default-editor.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-editors/input-editor.component.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-editors/input-editor.component.js ***!
  \*********************************************************************************************/
/*! exports provided: InputEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InputEditorComponent", function() { return InputEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _default_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-editor */ "./node_modules/ng2-smart-table/components/cell/cell-editors/default-editor.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var InputEditorComponent = /** @class */ (function (_super) {
    __extends(InputEditorComponent, _super);
    function InputEditorComponent() {
        return _super.call(this) || this;
    }
    InputEditorComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'input-editor',
                    styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em} /*# sourceMappingURL=editor.component.css.map */ "],
                    template: "\n    <input [ngClass]=\"inputClass\"\n           class=\"form-control\"\n           [(ngModel)]=\"cell.newValue\"\n           [name]=\"cell.getId()\"\n           [placeholder]=\"cell.getTitle()\"\n           [disabled]=\"!cell.isEditable()\"\n           (click)=\"onClick.emit($event)\"\n           (keydown.enter)=\"onEdited.emit($event)\"\n           (keydown.esc)=\"onStopEditing.emit()\">\n    ",
                },] },
    ];
    /** @nocollapse */
    InputEditorComponent.ctorParameters = function () { return []; };
    return InputEditorComponent;
}(_default_editor__WEBPACK_IMPORTED_MODULE_1__["DefaultEditor"]));

//# sourceMappingURL=input-editor.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-editors/select-editor.component.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-editors/select-editor.component.js ***!
  \**********************************************************************************************/
/*! exports provided: SelectEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectEditorComponent", function() { return SelectEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _default_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-editor */ "./node_modules/ng2-smart-table/components/cell/cell-editors/default-editor.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var SelectEditorComponent = /** @class */ (function (_super) {
    __extends(SelectEditorComponent, _super);
    function SelectEditorComponent() {
        return _super.call(this) || this;
    }
    SelectEditorComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'select-editor',
                    template: "\n    <select [ngClass]=\"inputClass\"\n            class=\"form-control\"\n            [(ngModel)]=\"cell.newValue\"\n            [name]=\"cell.getId()\"\n            [disabled]=\"!cell.isEditable()\"\n            (click)=\"onClick.emit($event)\"\n            (keydown.enter)=\"onEdited.emit($event)\"\n            (keydown.esc)=\"onStopEditing.emit()\">\n\n        <option *ngFor=\"let option of cell.getColumn().getConfig()?.list\" [value]=\"option.value\"\n                [selected]=\"option.value === cell.getValue()\">{{ option.title }}\n        </option>\n    </select>\n    ",
                },] },
    ];
    /** @nocollapse */
    SelectEditorComponent.ctorParameters = function () { return []; };
    return SelectEditorComponent;
}(_default_editor__WEBPACK_IMPORTED_MODULE_1__["DefaultEditor"]));

//# sourceMappingURL=select-editor.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-editors/textarea-editor.component.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-editors/textarea-editor.component.js ***!
  \************************************************************************************************/
/*! exports provided: TextareaEditorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TextareaEditorComponent", function() { return TextareaEditorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _default_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./default-editor */ "./node_modules/ng2-smart-table/components/cell/cell-editors/default-editor.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var TextareaEditorComponent = /** @class */ (function (_super) {
    __extends(TextareaEditorComponent, _super);
    function TextareaEditorComponent() {
        return _super.call(this) || this;
    }
    TextareaEditorComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'textarea-editor',
                    styles: [":host input,:host textarea{width:100%;line-height:normal;padding:.375em .75em} /*# sourceMappingURL=editor.component.css.map */ "],
                    template: "\n    <textarea [ngClass]=\"inputClass\"\n              class=\"form-control\"\n              [(ngModel)]=\"cell.newValue\"\n              [name]=\"cell.getId()\"\n              [disabled]=\"!cell.isEditable()\"\n              [placeholder]=\"cell.getTitle()\"\n              (click)=\"onClick.emit($event)\"\n              (keydown.enter)=\"onEdited.emit($event)\"\n              (keydown.esc)=\"onStopEditing.emit()\">\n    </textarea>\n    ",
                },] },
    ];
    /** @nocollapse */
    TextareaEditorComponent.ctorParameters = function () { return []; };
    return TextareaEditorComponent;
}(_default_editor__WEBPACK_IMPORTED_MODULE_1__["DefaultEditor"]));

//# sourceMappingURL=textarea-editor.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-view-mode/custom-view.component.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-view-mode/custom-view.component.js ***!
  \**********************************************************************************************/
/*! exports provided: CustomViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomViewComponent", function() { return CustomViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _lib_data_set_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/data-set/cell */ "./node_modules/ng2-smart-table/lib/data-set/cell.js");


var CustomViewComponent = /** @class */ (function () {
    function CustomViewComponent(resolver) {
        this.resolver = resolver;
    }
    CustomViewComponent.prototype.ngOnInit = function () {
        if (this.cell && !this.customComponent) {
            this.createCustomComponent();
            this.callOnComponentInit();
            this.patchInstance();
        }
    };
    CustomViewComponent.prototype.ngOnDestroy = function () {
        if (this.customComponent) {
            this.customComponent.destroy();
        }
    };
    CustomViewComponent.prototype.createCustomComponent = function () {
        var componentFactory = this.resolver.resolveComponentFactory(this.cell.getColumn().renderComponent);
        this.customComponent = this.dynamicTarget.createComponent(componentFactory);
    };
    CustomViewComponent.prototype.callOnComponentInit = function () {
        var onComponentInitFunction = this.cell.getColumn().getOnComponentInitFunction();
        onComponentInitFunction && onComponentInitFunction(this.customComponent.instance);
    };
    CustomViewComponent.prototype.patchInstance = function () {
        Object.assign(this.customComponent.instance, this.getPatch());
    };
    CustomViewComponent.prototype.getPatch = function () {
        return {
            value: this.cell.getValue(),
            rowData: this.cell.getRow().getData()
        };
    };
    CustomViewComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'custom-view-component',
                    template: "\n    <ng-template #dynamicTarget></ng-template>\n  ",
                },] },
    ];
    /** @nocollapse */
    CustomViewComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"], },
    ]; };
    CustomViewComponent.propDecorators = {
        "cell": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "dynamicTarget": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['dynamicTarget', { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] },] },],
    };
    return CustomViewComponent;
}());

//# sourceMappingURL=custom-view.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell-view-mode/view-cell.component.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell-view-mode/view-cell.component.js ***!
  \********************************************************************************************/
/*! exports provided: ViewCellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewCellComponent", function() { return ViewCellComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _lib_data_set_cell__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/data-set/cell */ "./node_modules/ng2-smart-table/lib/data-set/cell.js");


var ViewCellComponent = /** @class */ (function () {
    function ViewCellComponent() {
    }
    ViewCellComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'table-cell-view-mode',
                    changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                    template: "\n    <div [ngSwitch]=\"cell.getColumn().type\">\n        <custom-view-component *ngSwitchCase=\"'custom'\" [cell]=\"cell\"></custom-view-component>\n        <div *ngSwitchCase=\"'html'\" [innerHTML]=\"cell.getValue()\"></div>\n        <div *ngSwitchDefault>{{ cell.getValue() }}</div>\n    </div>\n    ",
                },] },
    ];
    /** @nocollapse */
    ViewCellComponent.propDecorators = {
        "cell": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
    };
    return ViewCellComponent;
}());

//# sourceMappingURL=view-cell.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell.component.js":
/*!************************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell.component.js ***!
  \************************************************************************/
/*! exports provided: CellComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CellComponent", function() { return CellComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _lib_grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../lib/grid */ "./node_modules/ng2-smart-table/lib/grid.js");
/* harmony import */ var _lib_data_set_cell__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../lib/data-set/cell */ "./node_modules/ng2-smart-table/lib/data-set/cell.js");
/* harmony import */ var _lib_data_set_row__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/data-set/row */ "./node_modules/ng2-smart-table/lib/data-set/row.js");




var CellComponent = /** @class */ (function () {
    function CellComponent() {
        this.inputClass = '';
        this.mode = 'inline';
        this.isInEditing = false;
        this.edited = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    CellComponent.prototype.onEdited = function (event) {
        if (this.isNew) {
            this.grid.create(this.grid.getNewRow(), this.createConfirm);
        }
        else {
            this.grid.save(this.row, this.editConfirm);
        }
    };
    CellComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'ng2-smart-table-cell',
                    template: "\n    <table-cell-view-mode *ngIf=\"!isInEditing\" [cell]=\"cell\"></table-cell-view-mode>\n    <table-cell-edit-mode *ngIf=\"isInEditing\" [cell]=\"cell\"\n                          [inputClass]=\"inputClass\"\n                          (edited)=\"onEdited($event)\">\n    </table-cell-edit-mode>\n  ",
                },] },
    ];
    /** @nocollapse */
    CellComponent.propDecorators = {
        "grid": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "row": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "editConfirm": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "createConfirm": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "isNew": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "cell": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "inputClass": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "mode": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "isInEditing": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] },],
        "edited": [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] },],
    };
    return CellComponent;
}());

//# sourceMappingURL=cell.component.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/components/cell/cell.module.js":
/*!*********************************************************************!*\
  !*** ./node_modules/ng2-smart-table/components/cell/cell.module.js ***!
  \*********************************************************************/
/*! exports provided: CellModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CellModule", function() { return CellModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ng2_completer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ng2-completer */ "./node_modules/ng2-completer/esm5/ng2-completer.js");
/* harmony import */ var _cell_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cell.component */ "./node_modules/ng2-smart-table/components/cell/cell.component.js");
/* harmony import */ var _cell_edit_mode_custom_edit_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./cell-edit-mode/custom-edit.component */ "./node_modules/ng2-smart-table/components/cell/cell-edit-mode/custom-edit.component.js");
/* harmony import */ var _cell_edit_mode_default_edit_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cell-edit-mode/default-edit.component */ "./node_modules/ng2-smart-table/components/cell/cell-edit-mode/default-edit.component.js");
/* harmony import */ var _cell_edit_mode_edit_cell_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cell-edit-mode/edit-cell.component */ "./node_modules/ng2-smart-table/components/cell/cell-edit-mode/edit-cell.component.js");
/* harmony import */ var _cell_editors_checkbox_editor_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./cell-editors/checkbox-editor.component */ "./node_modules/ng2-smart-table/components/cell/cell-editors/checkbox-editor.component.js");
/* harmony import */ var _cell_editors_completer_editor_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cell-editors/completer-editor.component */ "./node_modules/ng2-smart-table/components/cell/cell-editors/completer-editor.component.js");
/* harmony import */ var _cell_editors_input_editor_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cell-editors/input-editor.component */ "./node_modules/ng2-smart-table/components/cell/cell-editors/input-editor.component.js");
/* harmony import */ var _cell_editors_select_editor_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./cell-editors/select-editor.component */ "./node_modules/ng2-smart-table/components/cell/cell-editors/select-editor.component.js");
/* harmony import */ var _cell_editors_textarea_editor_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./cell-editors/textarea-editor.component */ "./node_modules/ng2-smart-table/components/cell/cell-editors/textarea-editor.component.js");
/* harmony import */ var _cell_view_mode_custom_view_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./cell-view-mode/custom-view.component */ "./node_modules/ng2-smart-table/components/cell/cell-view-mode/custom-view.component.js");
/* harmony import */ var _cell_view_mode_view_cell_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./cell-view-mode/view-cell.component */ "./node_modules/ng2-smart-table/components/cell/cell-view-mode/view-cell.component.js");















var CELL_COMPONENTS = [
    _cell_component__WEBPACK_IMPORTED_MODULE_4__["CellComponent"],
    _cell_edit_mode_custom_edit_component__WEBPACK_IMPORTED_MODULE_5__["CustomEditComponent"],
    _cell_edit_mode_default_edit_component__WEBPACK_IMPORTED_MODULE_6__["DefaultEditComponent"],
    _cell_edit_mode_edit_cell_component__WEBPACK_IMPORTED_MODULE_7__["EditCellComponent"],
    _cell_editors_checkbox_editor_component__WEBPACK_IMPORTED_MODULE_8__["CheckboxEditorComponent"],
    _cell_editors_completer_editor_component__WEBPACK_IMPORTED_MODULE_9__["CompleterEditorComponent"],
    _cell_editors_input_editor_component__WEBPACK_IMPORTED_MODULE_10__["InputEditorComponent"],
    _cell_editors_select_editor_component__WEBPACK_IMPORTED_MODULE_11__["SelectEditorComponent"],
    _cell_editors_textarea_editor_component__WEBPACK_IMPORTED_MODULE_12__["TextareaEditorComponent"],
    _cell_view_mode_custom_view_component__WEBPACK_IMPORTED_MODULE_13__["CustomViewComponent"],
    _cell_view_mode_view_cell_component__WEBPACK_IMPORTED_MODULE_14__["ViewCellComponent"],
];
var CellModule = /** @class */ (function () {
    function CellModule() {
    }
    CellModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                        ng2_completer__WEBPACK_IMPORTED_MODULE_3__["Ng2CompleterModule"],
                    ],
                    declarations: CELL_COMPONENTS.slice(),
                    exports: CELL_COMPONENTS.slice(),
                },] },
    ];
    return CellModule;
}());

//# sourceMappingURL=cell.module.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/lib/data-set/cell.js":
/*!***********************************************************!*\
  !*** ./node_modules/ng2-smart-table/lib/data-set/cell.js ***!
  \***********************************************************/
/*! exports provided: Cell */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return Cell; });
var Cell = /** @class */ (function () {
    function Cell(value, row, column, dataSet) {
        this.value = value;
        this.row = row;
        this.column = column;
        this.dataSet = dataSet;
        this.newValue = '';
        this.newValue = value;
    }
    Cell.prototype.getColumn = function () {
        return this.column;
    };
    Cell.prototype.getRow = function () {
        return this.row;
    };
    Cell.prototype.getValue = function () {
        var valid = this.column.getValuePrepareFunction() instanceof Function;
        var prepare = valid ? this.column.getValuePrepareFunction() : Cell.PREPARE;
        return prepare.call(null, this.value, this.row.getData(), this);
    };
    Cell.prototype.setValue = function (value) {
        this.newValue = value;
    };
    Cell.prototype.getId = function () {
        return this.getColumn().id;
    };
    Cell.prototype.getTitle = function () {
        return this.getColumn().title;
    };
    Cell.prototype.isEditable = function () {
        if (this.getRow().index === -1) {
            return this.getColumn().isAddable;
        }
        else {
            return this.getColumn().isEditable;
        }
    };
    Cell.PREPARE = function (value) { return value; };
    return Cell;
}());

//# sourceMappingURL=cell.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/lib/data-set/column.js":
/*!*************************************************************!*\
  !*** ./node_modules/ng2-smart-table/lib/data-set/column.js ***!
  \*************************************************************/
/*! exports provided: Column */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Column", function() { return Column; });
var Column = /** @class */ (function () {
    function Column(id, settings, dataSet) {
        this.id = id;
        this.settings = settings;
        this.dataSet = dataSet;
        this.title = '';
        this.type = '';
        this.class = '';
        this.width = '';
        this.isSortable = false;
        this.isEditable = true;
        this.isAddable = true;
        this.isFilterable = false;
        this.sortDirection = '';
        this.defaultSortDirection = '';
        this.editor = { type: '', config: {}, component: null };
        this.filter = { type: '', config: {} };
        this.renderComponent = null;
        this.process();
    }
    Column.prototype.getOnComponentInitFunction = function () {
        return this.onComponentInitFunction;
    };
    Column.prototype.getCompareFunction = function () {
        return this.compareFunction;
    };
    Column.prototype.getValuePrepareFunction = function () {
        return this.valuePrepareFunction;
    };
    Column.prototype.getFilterFunction = function () {
        return this.filterFunction;
    };
    Column.prototype.getConfig = function () {
        return this.editor && this.editor.config;
    };
    Column.prototype.getFilterType = function () {
        return this.filter && this.filter.type;
    };
    Column.prototype.getFilterConfig = function () {
        return this.filter && this.filter.config;
    };
    Column.prototype.process = function () {
        this.title = this.settings['title'];
        this.class = this.settings['class'];
        this.width = this.settings['width'];
        this.type = this.prepareType();
        this.editor = this.settings['editor'];
        this.filter = this.settings['filter'];
        this.renderComponent = this.settings['renderComponent'];
        this.isFilterable = typeof this.settings['filter'] === 'undefined' ? true : !!this.settings['filter'];
        this.defaultSortDirection = ['asc', 'desc']
            .indexOf(this.settings['sortDirection']) !== -1 ? this.settings['sortDirection'] : '';
        this.isSortable = typeof this.settings['sort'] === 'undefined' ? true : !!this.settings['sort'];
        this.isEditable = typeof this.settings['editable'] === 'undefined' ? true : !!this.settings['editable'];
        this.isAddable = typeof this.settings['addable'] === 'undefined' ? true : !!this.settings['addable'];
        this.sortDirection = this.prepareSortDirection();
        this.compareFunction = this.settings['compareFunction'];
        this.valuePrepareFunction = this.settings['valuePrepareFunction'];
        this.filterFunction = this.settings['filterFunction'];
        this.onComponentInitFunction = this.settings['onComponentInitFunction'];
    };
    Column.prototype.prepareType = function () {
        return this.settings['type'] || this.determineType();
    };
    Column.prototype.prepareSortDirection = function () {
        return this.settings['sort'] === 'desc' ? 'desc' : 'asc';
    };
    Column.prototype.determineType = function () {
        // TODO: determine type by data
        return 'text';
    };
    return Column;
}());

//# sourceMappingURL=column.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/lib/data-set/data-set.js":
/*!***************************************************************!*\
  !*** ./node_modules/ng2-smart-table/lib/data-set/data-set.js ***!
  \***************************************************************/
/*! exports provided: DataSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataSet", function() { return DataSet; });
/* harmony import */ var _row__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./row */ "./node_modules/ng2-smart-table/lib/data-set/row.js");
/* harmony import */ var _column__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./column */ "./node_modules/ng2-smart-table/lib/data-set/column.js");


var DataSet = /** @class */ (function () {
    function DataSet(data, columnSettings) {
        if (data === void 0) { data = []; }
        this.columnSettings = columnSettings;
        this.data = [];
        this.columns = [];
        this.rows = [];
        this.willSelect = 'first';
        this.createColumns(columnSettings);
        this.setData(data);
        this.createNewRow();
    }
    DataSet.prototype.setData = function (data) {
        this.data = data;
        this.createRows();
    };
    DataSet.prototype.getColumns = function () {
        return this.columns;
    };
    DataSet.prototype.getRows = function () {
        return this.rows;
    };
    DataSet.prototype.getFirstRow = function () {
        return this.rows[0];
    };
    DataSet.prototype.getLastRow = function () {
        return this.rows[this.rows.length - 1];
    };
    DataSet.prototype.findRowByData = function (data) {
        return this.rows.find(function (row) { return row.getData() === data; });
    };
    DataSet.prototype.deselectAll = function () {
        this.rows.forEach(function (row) {
            row.isSelected = false;
        });
    };
    DataSet.prototype.selectRow = function (row) {
        var previousIsSelected = row.isSelected;
        this.deselectAll();
        row.isSelected = !previousIsSelected;
        this.selectedRow = row;
        return this.selectedRow;
    };
    DataSet.prototype.multipleSelectRow = function (row) {
        row.isSelected = !row.isSelected;
        this.selectedRow = row;
        return this.selectedRow;
    };
    DataSet.prototype.selectPreviousRow = function () {
        if (this.rows.length > 0) {
            var index = this.selectedRow ? this.selectedRow.index : 0;
            if (index > this.rows.length - 1) {
                index = this.rows.length - 1;
            }
            this.selectRow(this.rows[index]);
            return this.selectedRow;
        }
    };
    DataSet.prototype.selectFirstRow = function () {
        if (this.rows.length > 0) {
            this.selectRow(this.rows[0]);
            return this.selectedRow;
        }
    };
    DataSet.prototype.selectLastRow = function () {
        if (this.rows.length > 0) {
            this.selectRow(this.rows[this.rows.length - 1]);
            return this.selectedRow;
        }
    };
    DataSet.prototype.willSelectFirstRow = function () {
        this.willSelect = 'first';
    };
    DataSet.prototype.willSelectLastRow = function () {
        this.willSelect = 'last';
    };
    DataSet.prototype.select = function () {
        if (this.getRows().length === 0) {
            return;
        }
        if (this.willSelect) {
            if (this.willSelect === 'first') {
                this.selectFirstRow();
            }
            if (this.willSelect === 'last') {
                this.selectLastRow();
            }
            this.willSelect = '';
        }
        else {
            this.selectFirstRow();
        }
        return this.selectedRow;
    };
    DataSet.prototype.createNewRow = function () {
        this.newRow = new _row__WEBPACK_IMPORTED_MODULE_0__["Row"](-1, {}, this);
        this.newRow.isInEditing = true;
    };
    /**
     * Create columns by mapping from the settings
     * @param settings
     * @private
     */
    /**
       * Create columns by mapping from the settings
       * @param settings
       * @private
       */
    DataSet.prototype.createColumns = /**
       * Create columns by mapping from the settings
       * @param settings
       * @private
       */
    function (settings) {
        for (var id in settings) {
            if (settings.hasOwnProperty(id)) {
                this.columns.push(new _column__WEBPACK_IMPORTED_MODULE_1__["Column"](id, settings[id], this));
            }
        }
    };
    /**
     * Create rows based on current data prepared in data source
     * @private
     */
    /**
       * Create rows based on current data prepared in data source
       * @private
       */
    DataSet.prototype.createRows = /**
       * Create rows based on current data prepared in data source
       * @private
       */
    function () {
        var _this = this;
        this.rows = [];
        this.data.forEach(function (el, index) {
            _this.rows.push(new _row__WEBPACK_IMPORTED_MODULE_0__["Row"](index, el, _this));
        });
    };
    return DataSet;
}());

//# sourceMappingURL=data-set.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/lib/data-set/row.js":
/*!**********************************************************!*\
  !*** ./node_modules/ng2-smart-table/lib/data-set/row.js ***!
  \**********************************************************/
/*! exports provided: Row */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return Row; });
/* harmony import */ var _cell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cell */ "./node_modules/ng2-smart-table/lib/data-set/cell.js");

var Row = /** @class */ (function () {
    function Row(index, data, _dataSet) {
        this.index = index;
        this.data = data;
        this._dataSet = _dataSet;
        this.isSelected = false;
        this.isInEditing = false;
        this.cells = [];
        this.process();
    }
    Row.prototype.getCell = function (column) {
        return this.cells.find(function (el) { return el.getColumn() === column; });
    };
    Row.prototype.getCells = function () {
        return this.cells;
    };
    Row.prototype.getData = function () {
        return this.data;
    };
    Row.prototype.getIsSelected = function () {
        return this.isSelected;
    };
    Row.prototype.getNewData = function () {
        var values = Object.assign({}, this.data);
        this.getCells().forEach(function (cell) { return values[cell.getColumn().id] = cell.newValue; });
        return values;
    };
    Row.prototype.setData = function (data) {
        this.data = data;
        this.process();
    };
    Row.prototype.process = function () {
        var _this = this;
        this.cells = [];
        this._dataSet.getColumns().forEach(function (column) {
            var cell = _this.createCell(column);
            _this.cells.push(cell);
        });
    };
    Row.prototype.createCell = function (column) {
        var defValue = column.settings.defaultValue ? column.settings.defaultValue : '';
        var value = typeof this.data[column.id] === 'undefined' ? defValue : this.data[column.id];
        return new _cell__WEBPACK_IMPORTED_MODULE_0__["Cell"](value, this, column, this._dataSet);
    };
    return Row;
}());

//# sourceMappingURL=row.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/lib/grid.js":
/*!**************************************************!*\
  !*** ./node_modules/ng2-smart-table/lib/grid.js ***!
  \**************************************************/
/*! exports provided: Grid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./node_modules/ng2-smart-table/lib/helpers.js");
/* harmony import */ var _data_set_data_set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-set/data-set */ "./node_modules/ng2-smart-table/lib/data-set/data-set.js");



var Grid = /** @class */ (function () {
    function Grid(source, settings) {
        this.createFormShown = false;
        this.onSelectRowSource = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.setSettings(settings);
        this.setSource(source);
    }
    Grid.prototype.showActionColumn = function (position) {
        return this.isCurrentActionsPosition(position) && this.isActionsVisible();
    };
    Grid.prototype.isCurrentActionsPosition = function (position) {
        return position == this.getSetting('actions.position');
    };
    Grid.prototype.isActionsVisible = function () {
        return this.getSetting('actions.add') || this.getSetting('actions.edit') || this.getSetting('actions.delete') || this.getSetting('actions.custom').length;
    };
    Grid.prototype.isMultiSelectVisible = function () {
        return this.getSetting('selectMode') === 'multi';
    };
    Grid.prototype.getNewRow = function () {
        return this.dataSet.newRow;
    };
    Grid.prototype.setSettings = function (settings) {
        this.settings = settings;
        this.dataSet = new _data_set_data_set__WEBPACK_IMPORTED_MODULE_2__["DataSet"]([], this.getSetting('columns'));
        if (this.source) {
            this.source.refresh();
        }
    };
    Grid.prototype.getDataSet = function () {
        return this.dataSet;
    };
    Grid.prototype.setSource = function (source) {
        var _this = this;
        this.source = this.prepareSource(source);
        this.source.onChanged().subscribe(function (changes) { return _this.processDataChange(changes); });
        this.source.onUpdated().subscribe(function (data) {
            var changedRow = _this.dataSet.findRowByData(data);
            changedRow.setData(data);
        });
    };
    Grid.prototype.getSetting = function (name, defaultValue) {
        return Object(_helpers__WEBPACK_IMPORTED_MODULE_1__["getDeepFromObject"])(this.settings, name, defaultValue);
    };
    Grid.prototype.getColumns = function () {
        return this.dataSet.getColumns();
    };
    Grid.prototype.getRows = function () {
        return this.dataSet.getRows();
    };
    Grid.prototype.selectRow = function (row) {
        this.dataSet.selectRow(row);
    };
    Grid.prototype.multipleSelectRow = function (row) {
        this.dataSet.multipleSelectRow(row);
    };
    Grid.prototype.onSelectRow = function () {
        return this.onSelectRowSource.asObservable();
    };
    Grid.prototype.edit = function (row) {
        row.isInEditing = true;
    };
    Grid.prototype.create = function (row, confirmEmitter) {
        var _this = this;
        var deferred = new _helpers__WEBPACK_IMPORTED_MODULE_1__["Deferred"]();
        deferred.promise.then(function (newData) {
            newData = newData ? newData : row.getNewData();
            if (deferred.resolve.skipAdd) {
                _this.createFormShown = false;
            }
            else {
                _this.source.prepend(newData).then(function () {
                    _this.createFormShown = false;
                    _this.dataSet.createNewRow();
                });
            }
        }).catch(function (err) {
            // doing nothing
        });
        if (this.getSetting('add.confirmCreate')) {
            confirmEmitter.emit({
                newData: row.getNewData(),
                source: this.source,
                confirm: deferred,
            });
        }
        else {
            deferred.resolve();
        }
    };
    Grid.prototype.save = function (row, confirmEmitter) {
        var _this = this;
        var deferred = new _helpers__WEBPACK_IMPORTED_MODULE_1__["Deferred"]();
        deferred.promise.then(function (newData) {
            newData = newData ? newData : row.getNewData();
            if (deferred.resolve.skipEdit) {
                row.isInEditing = false;
            }
            else {
                _this.source.update(row.getData(), newData).then(function () {
                    row.isInEditing = false;
                });
            }
        }).catch(function (err) {
            // doing nothing
        });
        if (this.getSetting('edit.confirmSave')) {
            confirmEmitter.emit({
                data: row.getData(),
                newData: row.getNewData(),
                source: this.source,
                confirm: deferred,
            });
        }
        else {
            deferred.resolve();
        }
    };
    Grid.prototype.delete = function (row, confirmEmitter) {
        var _this = this;
        var deferred = new _helpers__WEBPACK_IMPORTED_MODULE_1__["Deferred"]();
        deferred.promise.then(function () {
            _this.source.remove(row.getData());
        }).catch(function (err) {
            // doing nothing
        });
        if (this.getSetting('delete.confirmDelete')) {
            confirmEmitter.emit({
                data: row.getData(),
                source: this.source,
                confirm: deferred,
            });
        }
        else {
            deferred.resolve();
        }
    };
    Grid.prototype.processDataChange = function (changes) {
        if (this.shouldProcessChange(changes)) {
            this.dataSet.setData(changes['elements']);
            if (this.getSetting('selectMode') !== 'multi') {
                var row = this.determineRowToSelect(changes);
                if (row) {
                    this.onSelectRowSource.next(row);
                }
            }
        }
    };
    Grid.prototype.shouldProcessChange = function (changes) {
        if (['filter', 'sort', 'page', 'remove', 'refresh', 'load', 'paging'].indexOf(changes['action']) !== -1) {
            return true;
        }
        else if (['prepend', 'append'].indexOf(changes['action']) !== -1 && !this.getSetting('pager.display')) {
            return true;
        }
        return false;
    };
    // TODO: move to selectable? Separate directive
    // TODO: move to selectable? Separate directive
    Grid.prototype.determineRowToSelect = 
    // TODO: move to selectable? Separate directive
    function (changes) {
        if (['load', 'page', 'filter', 'sort', 'refresh'].indexOf(changes['action']) !== -1) {
            return this.dataSet.select();
        }
        if (changes['action'] === 'remove') {
            if (changes['elements'].length === 0) {
                // we have to store which one to select as the data will be reloaded
                this.dataSet.willSelectLastRow();
            }
            else {
                return this.dataSet.selectPreviousRow();
            }
        }
        if (changes['action'] === 'append') {
            // we have to store which one to select as the data will be reloaded
            this.dataSet.willSelectLastRow();
        }
        if (changes['action'] === 'add') {
            return this.dataSet.selectFirstRow();
        }
        if (changes['action'] === 'update') {
            return this.dataSet.selectFirstRow();
        }
        if (changes['action'] === 'prepend') {
            // we have to store which one to select as the data will be reloaded
            this.dataSet.willSelectFirstRow();
        }
        return null;
    };
    Grid.prototype.prepareSource = function (source) {
        var initialSource = this.getInitialSort();
        if (initialSource && initialSource['field'] && initialSource['direction']) {
            source.setSort([initialSource], false);
        }
        if (this.getSetting('pager.display') === true) {
            source.setPaging(1, this.getSetting('pager.perPage'), false);
        }
        source.refresh();
        return source;
    };
    Grid.prototype.getInitialSort = function () {
        var sortConf = {};
        this.getColumns().forEach(function (column) {
            if (column.isSortable && column.defaultSortDirection) {
                sortConf['field'] = column.id;
                sortConf['direction'] = column.defaultSortDirection;
                sortConf['compare'] = column.getCompareFunction();
            }
        });
        return sortConf;
    };
    Grid.prototype.getSelectedRows = function () {
        return this.dataSet.getRows()
            .filter(function (r) { return r.isSelected; });
    };
    Grid.prototype.selectAllRows = function (status) {
        this.dataSet.getRows()
            .forEach(function (r) { return r.isSelected = status; });
    };
    Grid.prototype.getFirstRow = function () {
        return this.dataSet.getFirstRow();
    };
    Grid.prototype.getLastRow = function () {
        return this.dataSet.getLastRow();
    };
    return Grid;
}());

//# sourceMappingURL=grid.js.map

/***/ }),

/***/ "./node_modules/ng2-smart-table/lib/helpers.js":
/*!*****************************************************!*\
  !*** ./node_modules/ng2-smart-table/lib/helpers.js ***!
  \*****************************************************/
/*! exports provided: deepExtend, Deferred, getDeepFromObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deepExtend", function() { return deepExtend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Deferred", function() { return Deferred; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDeepFromObject", function() { return getDeepFromObject; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
var deepExtend = function () {
    var objects = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
    }
    if (arguments.length < 1 || typeof arguments[0] !== 'object') {
        return false;
    }
    if (arguments.length < 2) {
        return arguments[0];
    }
    var target = arguments[0];
    // convert arguments to array and cut off target object
    var args = Array.prototype.slice.call(arguments, 1);
    var val, src;
    args.forEach(function (obj) {
        // skip argument if it is array or isn't object
        if (typeof obj !== 'object' || Array.isArray(obj)) {
            return;
        }
        Object.keys(obj).forEach(function (key) {
            src = target[key]; // source value
            val = obj[key]; // new value
            // recursion prevention
            if (val === target) {
                return;
                /**
                         * if new value isn't object then just overwrite by new value
                         * instead of extending.
                         */
            }
            else if (typeof val !== 'object' || val === null) {
                target[key] = val;
                return;
                // just clone arrays (and recursive clone objects inside)
            }
            else if (Array.isArray(val)) {
                target[key] = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"])(val);
                return;
                // overwrite by new value if source isn't object or array
            }
            else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
                target[key] = deepExtend({}, val);
                return;
                // source value and new value is objects both, extending...
            }
            else {
                target[key] = deepExtend(src, val);
                return;
            }
        });
    });
    return target;
};
var Deferred = /** @class */ (function () {
    function Deferred() {
        var _this = this;
        this.promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
        });
    }
    return Deferred;
}());

// getDeepFromObject({result: {data: 1}}, 'result.data', 2); // returns 1
function getDeepFromObject(object, name, defaultValue) {
    if (object === void 0) { object = {}; }
    var keys = name.split('.');
    // clone the object
    var level = deepExtend({}, object);
    keys.forEach(function (k) {
        if (level && typeof level[k] !== 'undefined') {
            level = level[k];
        }
    });
    return typeof level === 'undefined' ? defaultValue : level;
}
//# sourceMappingURL=helpers.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/Observable.js":
/*!******************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/Observable.js ***!
  \******************************************************/
/*! exports provided: Observable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/internal/Observable */ "./node_modules/rxjs/internal/Observable.js");
/* harmony import */ var rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Observable", function() { return rxjs_internal_Observable__WEBPACK_IMPORTED_MODULE_0__["Observable"]; });


//# sourceMappingURL=Observable.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/Subject.js":
/*!***************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/Subject.js ***!
  \***************************************************/
/*! exports provided: Subject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Subject", function() { return rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]; });


//# sourceMappingURL=Subject.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/add/operator/catch.js":
/*!**************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/add/operator/catch.js ***!
  \**************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _operator_catch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../operator/catch */ "./node_modules/rxjs-compat/_esm5/operator/catch.js");


rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype.catch = _operator_catch__WEBPACK_IMPORTED_MODULE_1__["_catch"];
rxjs__WEBPACK_IMPORTED_MODULE_0__["Observable"].prototype._catch = _operator_catch__WEBPACK_IMPORTED_MODULE_1__["_catch"];
//# sourceMappingURL=catch.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/observable/timer.js":
/*!************************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/observable/timer.js ***!
  \************************************************************/
/*! exports provided: timer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timer", function() { return rxjs__WEBPACK_IMPORTED_MODULE_0__["timer"]; });


//# sourceMappingURL=timer.js.map

/***/ }),

/***/ "./node_modules/rxjs-compat/_esm5/operator/catch.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs-compat/_esm5/operator/catch.js ***!
  \**********************************************************/
/*! exports provided: _catch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_catch", function() { return _catch; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");

function _catch(selector) {
    return Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["catchError"])(selector)(this);
}
//# sourceMappingURL=catch.js.map

/***/ })

}]);
//# sourceMappingURL=default~clients-clients-module~links-links-module~office-admin-office-admin-module~products-products~96014c38.js.map