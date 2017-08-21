/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscription = (function () {
    function Subscription(sourceObj, eventName, eventHandler) {
        this.sourceObj = sourceObj;
        this.eventName = eventName;
        this.eventHandler = eventHandler;
    }
    Subscription.prototype.unsubscibe = function () {
        this.sourceObj.removeEventListener(this.eventName, this.eventHandler);
    };
    return Subscription;
}());
exports.default = Subscription;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = __webpack_require__(2);
var Subject_1 = __webpack_require__(4);
var Frx = {
    Observable: Observable_1.default,
    Subject: Subject_1.default
};
window.Frx = Frx;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscription_1 = __webpack_require__(0);
var FromEventObservable_1 = __webpack_require__(3);
var Observable = (function () {
    function Observable() {
    }
    Observable.fromEvent = function (node, event) {
        var observable = new Observable();
        observable.eventName = event;
        observable.sourceObj = node;
        return observable;
    };
    Observable.from = function (array) {
    };
    Observable.prototype.subscribe = function (observer) {
        var type = Object.prototype.toString.call(observer).toLowerCase().slice(8, -1);
        if (type === 'function') {
            this.sourceObj.addEventListener(this.eventName, observer);
        }
        else if (type === 'object') {
            this.sourceObj.addEventListener(this.eventName, observer.next);
        }
        return new Subscription_1.default(this.sourceObj, this.eventName, observer);
    };
    Observable.prototype.multicast = function (subject) {
        return new FromEventObservable_1.default(this, subject);
    };
    return Observable;
}());
exports.default = Observable;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subscription_1 = __webpack_require__(0);
var FromEventObservable = (function () {
    function FromEventObservable(source, subject) {
        var _this = this;
        this.subjectFactory = function (v) {
            _this.subject.next(v);
        };
        this.source = source;
        this.subject = subject;
    }
    FromEventObservable.prototype.subscribe = function (observer) {
        var type = Object.prototype.toString.call(observer).toLowerCase().slice(8, -1);
        observer = type === 'function' ? observer : observer.next;
        this.subject.observers.push(observer);
    };
    FromEventObservable.prototype.connect = function () {
        this.source.sourceObj.addEventListener(this.source.eventName, this.subjectFactory);
        return new Subscription_1.default(this.source.sourceObj, this.source.eventName, this.subjectFactory);
    };
    return FromEventObservable;
}());
exports.default = FromEventObservable;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Subject = (function () {
    function Subject() {
        var _this = this;
        this.observers = [];
        this.next = function (v) { _this.observers.forEach(function (observer) { return observer(v); }); };
        this.complete = function (v) { _this.observers.forEach(function (observer) { return observer(v); }); };
        this.error = function (v) { _this.observers.forEach(function (observer) { return observer(v); }); };
    }
    return Subject;
}());
exports.default = Subject;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWI3MDRiYTNiNmNlMWY4ZTc2M2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL1N1YnNjcmlwdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvRnJ4LnRzIiwid2VicGFjazovLy8uL3NyYy9PYnNlcnZhYmxlLnRzIiwid2VicGFjazovLy8uL3NyYy9Gcm9tRXZlbnRPYnNlcnZhYmxlLnRzIiwid2VicGFjazovLy8uL3NyYy9TdWJqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7OztBQzdEQTtJQUtFLHNCQUFZLFNBQXNCLEVBQUUsU0FBaUIsRUFBRSxZQUFpQjtRQUN0RSxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVM7UUFDMUIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTO1FBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWTtJQUNsQyxDQUFDO0lBQ00saUNBQVUsR0FBakI7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQztJQUN2RSxDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDO0FBRUQsa0JBQWUsWUFBWTs7Ozs7Ozs7OztBQ2YzQiwwQ0FBcUM7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Q3pCbEM7SUFFRTtRQUFBLGlCQUFpQjtRQURWLGNBQVMsR0FBb0IsRUFBRTtRQUUvQixTQUFJLEdBQUcsVUFBQyxDQUFNLElBQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0JBQVEsSUFBSSxlQUFRLENBQUMsQ0FBQyxDQUFDLEVBQVgsQ0FBVyxDQUFDLEVBQUMsQ0FBQztRQUN0RSxhQUFRLEdBQUcsVUFBQyxDQUFNLElBQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0JBQVEsSUFBSSxlQUFRLENBQUMsQ0FBQyxDQUFDLEVBQVgsQ0FBVyxDQUFDLEVBQUMsQ0FBQztRQUMxRSxVQUFLLEdBQUcsVUFBQyxDQUFNLElBQU8sS0FBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0JBQVEsSUFBSSxlQUFRLENBQUMsQ0FBQyxDQUFDLEVBQVgsQ0FBVyxDQUFDLEVBQUMsQ0FBQztJQUg5RCxDQUFDO0lBSW5CLGNBQUM7QUFBRCxDQUFDO0FBQ0Qsa0JBQWUsT0FBTyIsImZpbGUiOiJGcnguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlYjcwNGJhM2I2Y2UxZjhlNzYzZCIsImNsYXNzIFN1YnNjcmlwdGlvbiB7XG4gIHByaXZhdGUgc291cmNlT2JqOiBIVE1MRWxlbWVudFxuICBwcml2YXRlIGV2ZW50SGFuZGxlcjogYW55XG4gIHByaXZhdGUgZXZlbnROYW1lOiBzdHJpbmdcblxuICBjb25zdHJ1Y3Rvcihzb3VyY2VPYmo6IEhUTUxFbGVtZW50LCBldmVudE5hbWU6IHN0cmluZywgZXZlbnRIYW5kbGVyOiBhbnkpIHtcbiAgICB0aGlzLnNvdXJjZU9iaiA9IHNvdXJjZU9ialxuICAgIHRoaXMuZXZlbnROYW1lID0gZXZlbnROYW1lXG4gICAgdGhpcy5ldmVudEhhbmRsZXIgPSBldmVudEhhbmRsZXJcbiAgfVxuICBwdWJsaWMgdW5zdWJzY2liZSgpIHtcbiAgICB0aGlzLnNvdXJjZU9iai5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZXZlbnROYW1lLCB0aGlzLmV2ZW50SGFuZGxlcilcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdWJzY3JpcHRpb25cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvU3Vic2NyaXB0aW9uLnRzIiwiaW1wb3J0IE9ic2VydmFibGUgZnJvbSAnLi9PYnNlcnZhYmxlJ1xuaW1wb3J0IFN1YmplY3QgZnJvbSAnLi9TdWJqZWN0J1xuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBGcng6IGFueVxuICB9XG59XG5cbmNvbnN0IEZyeCA9IHtcbiAgT2JzZXJ2YWJsZSxcbiAgU3ViamVjdFxufVxud2luZG93LkZyeCA9IEZyeFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9GcngudHMiLCJpbXBvcnQgU3Vic2NyaXB0aW9uIGZyb20gJy4vU3Vic2NyaXB0aW9uJ1xuaW1wb3J0IFN1YmplY3QgZnJvbSAnLi9TdWJqZWN0J1xuaW1wb3J0IEZyb21FdmVudE9ic2VydmFibGUgZnJvbSAnLi9Gcm9tRXZlbnRPYnNlcnZhYmxlJ1xuXG50eXBlIE9ic2VydmVyID0gYW55XG5cbmNsYXNzIE9ic2VydmFibGUge1xuICBwdWJsaWMgc3RhdGljIGZyb21FdmVudChub2RlOiBIVE1MRWxlbWVudCwgZXZlbnQ6IHN0cmluZykge1xuICAgIGNvbnN0IG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpXG4gICAgb2JzZXJ2YWJsZS5ldmVudE5hbWUgPSBldmVudFxuICAgIG9ic2VydmFibGUuc291cmNlT2JqID0gbm9kZVxuICAgIHJldHVybiBvYnNlcnZhYmxlXG4gIH1cbiAgcHVibGljIHN0YXRpYyBmcm9tKGFycmF5OiBhbnlbXSkge1xuXG4gIH1cbiAgY29uc3RydWN0b3IoKSB7XG4gIH1cbiAgcHVibGljIGV2ZW50TmFtZTogc3RyaW5nXG4gIHB1YmxpYyBzb3VyY2VPYmo6IEhUTUxFbGVtZW50XG5cbiAgcHVibGljIHN1YnNjcmliZShvYnNlcnZlcjogT2JzZXJ2ZXIpIHtcbiAgICBjb25zdCB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ic2VydmVyKS50b0xvd2VyQ2FzZSgpLnNsaWNlKDgsIC0xKVxuICAgIGlmICh0eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aGlzLnNvdXJjZU9iai5hZGRFdmVudExpc3RlbmVyKHRoaXMuZXZlbnROYW1lLCBvYnNlcnZlcilcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLnNvdXJjZU9iai5hZGRFdmVudExpc3RlbmVyKHRoaXMuZXZlbnROYW1lLCBvYnNlcnZlci5uZXh0KVxuICAgIH1cbiAgICByZXR1cm4gbmV3IFN1YnNjcmlwdGlvbih0aGlzLnNvdXJjZU9iaiwgdGhpcy5ldmVudE5hbWUsIG9ic2VydmVyKVxuICB9XG5cbiAgcHVibGljIG11bHRpY2FzdChzdWJqZWN0OiBTdWJqZWN0KSB7XG4gICAgcmV0dXJuIG5ldyBGcm9tRXZlbnRPYnNlcnZhYmxlKHRoaXMsIHN1YmplY3QpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgT2JzZXJ2YWJsZVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9PYnNlcnZhYmxlLnRzIiwiaW1wb3J0IE9ic2VydmFibGUgZnJvbSAnLi9PYnNlcnZhYmxlJ1xuaW1wb3J0IFN1YmplY3QgZnJvbSAnLi9TdWJqZWN0J1xuaW1wb3J0IFN1YnNjcmlwdGlvbiBmcm9tICcuL1N1YnNjcmlwdGlvbidcbnR5cGUgT2JzZXJ2ZXIgPSBhbnlcblxuY2xhc3MgRnJvbUV2ZW50T2JzZXJ2YWJsZSB7XG4gIHByaXZhdGUgc291cmNlOiBPYnNlcnZhYmxlXG4gIHByaXZhdGUgc3ViamVjdDogU3ViamVjdFxuXG4gIGNvbnN0cnVjdG9yKHNvdXJjZTogT2JzZXJ2YWJsZSwgc3ViamVjdDogU3ViamVjdCkge1xuICAgIHRoaXMuc291cmNlID0gc291cmNlXG4gICAgdGhpcy5zdWJqZWN0ID0gc3ViamVjdFxuICB9XG4gIHB1YmxpYyBzdWJzY3JpYmUob2JzZXJ2ZXI6IE9ic2VydmVyKSB7XG4gICAgY29uc3QgdHlwZSA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYnNlcnZlcikudG9Mb3dlckNhc2UoKS5zbGljZSg4LCAtMSlcbiAgICBvYnNlcnZlciA9IHR5cGUgPT09ICdmdW5jdGlvbicgPyBvYnNlcnZlciA6IG9ic2VydmVyLm5leHRcbiAgICB0aGlzLnN1YmplY3Qub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpXG4gIH1cbiAgcHVibGljIGNvbm5lY3QoKSB7XG4gICAgdGhpcy5zb3VyY2Uuc291cmNlT2JqLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5zb3VyY2UuZXZlbnROYW1lLCB0aGlzLnN1YmplY3RGYWN0b3J5KVxuICAgIHJldHVybiBuZXcgU3Vic2NyaXB0aW9uKHRoaXMuc291cmNlLnNvdXJjZU9iaiwgdGhpcy5zb3VyY2UuZXZlbnROYW1lLCB0aGlzLnN1YmplY3RGYWN0b3J5KVxuICB9XG4gIHB1YmxpYyBzdWJqZWN0RmFjdG9yeSA9ICh2OiBhbnkpID0+IHtcbiAgICB0aGlzLnN1YmplY3QubmV4dCh2KVxuICB9XG59XG5leHBvcnQgZGVmYXVsdCBGcm9tRXZlbnRPYnNlcnZhYmxlXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL0Zyb21FdmVudE9ic2VydmFibGUudHMiLCJ0eXBlIE9ic2VydmVyID0gYW55XG5jbGFzcyBTdWJqZWN0IHtcbiAgcHVibGljIG9ic2VydmVyczogQXJyYXk8T2JzZXJ2ZXI+ID0gW11cbiAgY29uc3RydWN0b3IoKSB7IH1cbiAgcHVibGljIG5leHQgPSAodjogYW55KSA9PiB7IHRoaXMub2JzZXJ2ZXJzLmZvckVhY2gob2JzZXJ2ZXIgPT4gb2JzZXJ2ZXIodikpIH1cbiAgcHVibGljIGNvbXBsZXRlID0gKHY6IGFueSkgPT4geyB0aGlzLm9ic2VydmVycy5mb3JFYWNoKG9ic2VydmVyID0+IG9ic2VydmVyKHYpKSB9XG4gIHB1YmxpYyBlcnJvciA9ICh2OiBhbnkpID0+IHsgdGhpcy5vYnNlcnZlcnMuZm9yRWFjaChvYnNlcnZlciA9PiBvYnNlcnZlcih2KSkgfVxufVxuZXhwb3J0IGRlZmF1bHQgU3ViamVjdFxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9TdWJqZWN0LnRzIl0sInNvdXJjZVJvb3QiOiIifQ==