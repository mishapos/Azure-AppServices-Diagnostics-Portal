(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('@joelwenzel/ng-flowchart', ['exports', '@angular/core', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.joelwenzel = global.joelwenzel || {}, global.joelwenzel['ng-flowchart'] = {}), global.ng.core, global.ng.common));
}(this, (function (exports, i0, common) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function () { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from, pack) {
        if (pack || arguments.length === 2)
            for (var i = 0, l = from.length, ar; i < l; i++) {
                if (ar || !(i in from)) {
                    if (!ar)
                        ar = Array.prototype.slice.call(from, 0, i);
                    ar[i] = from[i];
                }
            }
        return to.concat(ar || Array.prototype.slice.call(from));
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    }
    function __classPrivateFieldIn(state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function"))
            throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    }

    var __awaiter$1 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    (function (NgFlowchart) {
        var Flow = /** @class */ (function () {
            function Flow(canvas) {
                this.canvas = canvas;
            }
            /**
             * Returns the json representation of this flow
             * @param indent Optional indent to specify for formatting
             */
            Flow.prototype.toJSON = function (indent) {
                return JSON.stringify(this.toObject(), null, indent);
            };
            Flow.prototype.toObject = function () {
                var _a;
                return {
                    root: (_a = this.canvas.flow.rootStep) === null || _a === void 0 ? void 0 : _a.toJSON()
                };
            };
            /**
             * Create a flow and render it on the canvas from a json string
             * @param json The json string of the flow to render
             */
            Flow.prototype.upload = function (json) {
                return __awaiter$1(this, void 0, void 0, function () {
                    var jsonObj, root;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                jsonObj = typeof json === 'string' ? JSON.parse(json) : json;
                                root = jsonObj.root;
                                this.clear();
                                return [4 /*yield*/, this.canvas.upload(root)];
                            case 1:
                                _b.sent();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Returns the root step of the flow chart
             */
            Flow.prototype.getRoot = function () {
                return this.canvas.flow.rootStep;
            };
            /**
             * Finds a step in the flow chart by a given id
             * @param id Id of the step to find. By default, the html id of the step
             */
            Flow.prototype.getStep = function (id) {
                return this.canvas.flow.steps.find(function (child) { return child.id == id; });
            };
            /**
             * Re-renders the canvas. Generally this should only be used in rare circumstances
             * @param pretty Attempt to recenter the flow in the canvas
             */
            Flow.prototype.render = function (pretty) {
                this.canvas.reRender(pretty);
            };
            /**
             * Clears all flow chart, reseting the current canvas
             */
            Flow.prototype.clear = function () {
                var _a;
                if ((_a = this.canvas.flow) === null || _a === void 0 ? void 0 : _a.rootStep) {
                    this.canvas.flow.rootStep.destroy(true, false);
                    this.canvas.reRender();
                }
            };
            return Flow;
        }());
        NgFlowchart.Flow = Flow;
        var Options = /** @class */ (function () {
            function Options() {
                /** The gap (in pixels) between flow steps*/
                this.stepGap = 40;
                /** An inner deadzone radius (in pixels) that will not register the hover icon  */
                this.hoverDeadzoneRadius = 20;
                /** Is the flow sequential? If true, then you will not be able to drag parallel steps */
                this.isSequential = false;
                /** The default root position when dropped. Default is TOP_CENTER */
                this.rootPosition = 'TOP_CENTER';
                /** Should the canvas be centered when a resize is detected? */
                this.centerOnResize = true;
                /** Canvas zoom options. Defaults to mouse wheel zoom */
                this.zoom = {
                    mode: 'WHEEL',
                    defaultStep: .1
                };
            }
            return Options;
        }());
        NgFlowchart.Options = Options;
    })(exports.NgFlowchart || (exports.NgFlowchart = {}));

    var CONSTANTS = {
        DROP_HOVER_ATTR: 'ngflowchart-drop-hover',
        CANVAS_CONTENT_CLASS: 'ngflowchart-canvas-content',
        CANVAS_CONTENT_ID: 'ngflowchart-canvas-content',
        CANVAS_CLASS: 'ngflowchart-canvas',
        CANVAS_STEP_CLASS: 'ngflowchart-canvas-step',
    };

    var NgFlowchartArrowComponent = /** @class */ (function () {
        function NgFlowchartArrowComponent() {
            this.opacity = 1;
            this.containerWidth = 0;
            this.containerHeight = 0;
            this.containerLeft = 0;
            this.containerTop = 0;
            //to be applied on left and right edges
            this.padding = 10;
            this.isLeftFlowing = false;
        }
        Object.defineProperty(NgFlowchartArrowComponent.prototype, "position", {
            set: function (pos) {
                this._position = pos;
                this.isLeftFlowing = pos.start[0] > pos.end[0];
                //in the case where steps are directly underneath we need some minimum width
                this.containerWidth = Math.abs(pos.start[0] - pos.end[0]) + (this.padding * 2);
                this.containerLeft = Math.min(pos.start[0], pos.end[0]) - this.padding;
                this.containerHeight = Math.abs(pos.start[1] - pos.end[1]);
                this.containerTop = pos.start[1];
                this.updatePath();
            },
            enumerable: false,
            configurable: true
        });
        NgFlowchartArrowComponent.prototype.ngOnInit = function () {
        };
        NgFlowchartArrowComponent.prototype.ngAfterViewInit = function () {
            this.updatePath();
        };
        NgFlowchartArrowComponent.prototype.hideArrow = function () {
            this.opacity = .2;
        };
        NgFlowchartArrowComponent.prototype.showArrow = function () {
            this.opacity = 1;
        };
        NgFlowchartArrowComponent.prototype.updatePath = function () {
            var _a;
            if (!((_a = this.arrow) === null || _a === void 0 ? void 0 : _a.nativeElement)) {
                return;
            }
            if (this.isLeftFlowing) {
                this.arrow.nativeElement.setAttribute("d", "\n        M" + (this.containerWidth - this.padding) + ",0 \n        L" + (this.containerWidth - this.padding) + "," + this.containerHeight / 2 + "\n        L" + this.padding + "," + this.containerHeight / 2 + "\n        L" + this.padding + "," + (this.containerHeight - 4) + "\n      ");
            }
            else {
                this.arrow.nativeElement.setAttribute("d", "\n        M" + this.padding + ",0 \n        L" + this.padding + "," + this.containerHeight / 2 + "\n        L" + (this.containerWidth - this.padding) + "," + this.containerHeight / 2 + "\n        L" + (this.containerWidth - this.padding) + "," + (this.containerHeight - 4) + "\n      ");
            }
        };
        return NgFlowchartArrowComponent;
    }());
    NgFlowchartArrowComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'lib-ng-flowchart-arrow',
                    template: "<svg\r\n  xmlns=\"http://www.w3.org/2000/svg\"\r\n  [ngStyle]=\"{\r\n      height: containerHeight+'px',\r\n      width: containerWidth+'px',\r\n      left: containerLeft+'px',\r\n      top: containerTop+'px',\r\n      opacity: opacity\r\n  }\"\r\n  class=\"ngflowchart-arrow\"\r\n>\r\n  <defs>\r\n    <marker\r\n      id=\"arrowhead\"\r\n      viewBox=\"0 0 10 10\"\r\n      refX=\"3\"\r\n      refY=\"5\"\r\n      markerWidth=\"5\"\r\n      markerHeight=\"5\"\r\n      orient=\"auto\"\r\n      fill=\"grey\"\r\n    >\r\n      <path d=\"M 0 0 L 10 5 L 0 10 z\" />\r\n    </marker>\r\n  </defs>\r\n  <g id=\"arrowpath\" fill=\"none\" stroke=\"grey\" stroke-width=\"2\" marker-end=\"url(#arrowhead)\">\r\n    <path id=\"arrow\" #arrow />\r\n  </g>\r\n</svg>\r\n",
                    styles: ["svg{position:absolute;z-index:0;transition:all .2s}"]
                },] }
    ];
    NgFlowchartArrowComponent.ctorParameters = function () { return []; };
    NgFlowchartArrowComponent.propDecorators = {
        arrow: [{ type: i0.ViewChild, args: ['arrow',] }],
        position: [{ type: i0.Input }]
    };

    var __awaiter$2 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var NgFlowchartStepComponent = /** @class */ (function () {
        function NgFlowchartStepComponent() {
            this.viewInit = new i0.EventEmitter();
            this._currentPosition = [0, 0];
            this._isHidden = false;
            this._children = [];
        }
        NgFlowchartStepComponent.prototype.onMoveStart = function (event) {
            if (this.canvas.disabled) {
                return;
            }
            this.hideTree();
            event.dataTransfer.setData('type', 'FROM_CANVAS');
            event.dataTransfer.setData('id', this.nativeElement.id);
            this.drop.dragStep = {
                type: this.type,
                data: this.data,
                instance: this
            };
        };
        NgFlowchartStepComponent.prototype.onMoveEnd = function (event) {
            this.showTree();
        };
        NgFlowchartStepComponent.prototype.init = function (drop, viewContainer, compFactory) {
            this.drop = drop;
            this.viewContainer = viewContainer;
            this.compFactory = compFactory;
        };
        NgFlowchartStepComponent.prototype.canDeleteStep = function () {
            return true;
        };
        NgFlowchartStepComponent.prototype.canDrop = function (dropEvent, error) {
            return true;
        };
        NgFlowchartStepComponent.prototype.shouldEvalDropHover = function (coords, stepToDrop) {
            return true;
        };
        NgFlowchartStepComponent.prototype.onUpload = function (data) {
            return __awaiter$2(this, void 0, void 0, function () { return __generator(this, function (_b) {
                return [2 /*return*/];
            }); });
        };
        NgFlowchartStepComponent.prototype.getDropPositionsForStep = function (step) {
            return ['BELOW', 'LEFT', 'RIGHT', 'ABOVE'];
        };
        NgFlowchartStepComponent.prototype.ngOnInit = function () {
        };
        NgFlowchartStepComponent.prototype.ngAfterViewInit = function () {
            if (!this.nativeElement) {
                throw 'Missing canvasContent ViewChild. Be sure to add #canvasContent to your root html element.';
            }
            this.nativeElement.classList.add('ngflowchart-step-wrapper');
            this.nativeElement.setAttribute('draggable', 'true');
            if (this._initPosition) {
                this.zsetPosition(this._initPosition);
            }
            //force id creation if not already there
            this.nativeElement.id = this.id;
            this.viewInit.emit();
        };
        Object.defineProperty(NgFlowchartStepComponent.prototype, "id", {
            get: function () {
                if (this._id == null) {
                    this._id = 's' + Date.now();
                }
                return this._id;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgFlowchartStepComponent.prototype, "currentPosition", {
            get: function () {
                return this._currentPosition;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Creates and adds a child to this step
         * @param template The template or component type to create
         * @param options Add options
         */
        NgFlowchartStepComponent.prototype.addChild = function (pending, options) {
            return __awaiter$2(this, void 0, void 0, function () {
                var componentRef;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.canvas.createStep(pending)];
                        case 1:
                            componentRef = _b.sent();
                            this.canvas.addToCanvas(componentRef);
                            if (options === null || options === void 0 ? void 0 : options.sibling) {
                                this.zaddChildSibling0(componentRef.instance, options === null || options === void 0 ? void 0 : options.index);
                            }
                            else {
                                this.zaddChild0(componentRef.instance);
                            }
                            this.canvas.flow.addStep(componentRef.instance);
                            this.canvas.reRender();
                            return [2 /*return*/, componentRef.instance];
                    }
                });
            });
        };
        /**
         * Destroys this step component and updates all necessary child and parent relationships
         * @param recursive
         * @param checkCallbacks
         */
        NgFlowchartStepComponent.prototype.destroy = function (recursive, checkCallbacks) {
            if (recursive === void 0) { recursive = true; }
            if (checkCallbacks === void 0) { checkCallbacks = true; }
            if (!checkCallbacks || this.canDeleteStep()) {
                this.canvas.options.callbacks.beforeDeleteStep &&
                    this.canvas.options.callbacks.beforeDeleteStep(this);
                var parentIndex = void 0;
                if (this._parent) {
                    parentIndex = this._parent.removeChild(this);
                }
                this.destroy0(parentIndex, recursive);
                this.canvas.reRender();
                this.canvas.options.callbacks.afterDeleteStep &&
                    this.canvas.options.callbacks.afterDeleteStep(this);
                return true;
            }
            return false;
        };
        /**
         * Remove a child from this step. Returns the index at which the child was found or -1 if not found.
         * @param childToRemove Step component to remove
         */
        NgFlowchartStepComponent.prototype.removeChild = function (childToRemove) {
            if (!this.children) {
                return -1;
            }
            var i = this.children.findIndex(function (child) { return child.id == childToRemove.id; });
            if (i > -1) {
                this.children.splice(i, 1);
            }
            return i;
        };
        /**
         * Re-parent this step
         * @param newParent The new parent for this step
         * @param force Force the re-parent if a parent already exists
         */
        NgFlowchartStepComponent.prototype.setParent = function (newParent, force) {
            if (force === void 0) { force = false; }
            if (this.parent && !force) {
                console.warn('This child already has a parent, use force if you know what you are doing');
                return;
            }
            this._parent = newParent;
            if (!this._parent && this.arrow) {
                this.arrow.destroy();
                this.arrow = null;
            }
        };
        /**
         * Called when no longer trying to drop or move a step adjacent to this one
         * @param position Position to render the icon
         */
        NgFlowchartStepComponent.prototype.clearHoverIcons = function () {
            this.nativeElement.removeAttribute(CONSTANTS.DROP_HOVER_ATTR);
        };
        /**
         * Called when a step is trying to be dropped or moved adjacent to this step.
         * @param position Position to render the icon
         */
        NgFlowchartStepComponent.prototype.showHoverIcon = function (position) {
            this.nativeElement.setAttribute(CONSTANTS.DROP_HOVER_ATTR, position.toLowerCase());
        };
        /**
         * Is this the root element of the tree
         */
        NgFlowchartStepComponent.prototype.isRootElement = function () {
            return !this.parent;
        };
        /**
         * Does this step have any children?
         * @param count Optional count of children to check. Defaults to 1. I.E has at least 1 child.
         */
        NgFlowchartStepComponent.prototype.hasChildren = function (count) {
            if (count === void 0) { count = 1; }
            return this.children && this.children.length >= count;
        };
        Object.defineProperty(NgFlowchartStepComponent.prototype, "children", {
            /** Array of children steps for this step */
            get: function () {
                return this._children;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgFlowchartStepComponent.prototype, "parent", {
            /** The parent step of this step */
            get: function () {
                return this._parent;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * Returns the total width extent (in pixels) of this node tree
         * @param stepGap The current step gap for the flow canvas
         */
        NgFlowchartStepComponent.prototype.getNodeTreeWidth = function (stepGap) {
            var currentNodeWidth = this.nativeElement.getBoundingClientRect().width;
            if (!this.hasChildren()) {
                return this.nativeElement.getBoundingClientRect().width;
            }
            var childWidth = this._children.reduce(function (childTreeWidth, child) {
                return childTreeWidth += child.getNodeTreeWidth(stepGap);
            }, 0);
            childWidth += stepGap * (this._children.length - 1);
            return Math.max(currentNodeWidth, childWidth);
        };
        /**
         * Is this step currently hidden and unavailable as a drop location
         */
        NgFlowchartStepComponent.prototype.isHidden = function () {
            return this._isHidden;
        };
        /**
         * Return current rect of this step. The position can be animated so getBoundingClientRect cannot
         * be reliable for positions
         * @param canvasRect Optional canvasRect to provide to offset the values
         */
        NgFlowchartStepComponent.prototype.getCurrentRect = function (canvasRect) {
            var clientRect = this.nativeElement.getBoundingClientRect();
            return {
                bottom: this._currentPosition[1] + clientRect.height + ((canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) || 0),
                left: this._currentPosition[0] + ((canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) || 0),
                height: clientRect.height,
                width: clientRect.width,
                right: this._currentPosition[0] + clientRect.width + ((canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) || 0),
                top: this._currentPosition[1] + ((canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) || 0)
            };
        };
        /**
         * Returns the JSON representation of this flow step
         */
        NgFlowchartStepComponent.prototype.toJSON = function () {
            return {
                id: this.id,
                type: this.type,
                data: this.data,
                children: this.hasChildren() ? this._children.map(function (child) {
                    return child.toJSON();
                }) : []
            };
        };
        Object.defineProperty(NgFlowchartStepComponent.prototype, "nativeElement", {
            /** The native HTMLElement of this step */
            get: function () {
                var _a;
                return (_a = this.view) === null || _a === void 0 ? void 0 : _a.nativeElement;
            },
            enumerable: false,
            configurable: true
        });
        NgFlowchartStepComponent.prototype.setId = function (id) {
            this._id = id;
        };
        NgFlowchartStepComponent.prototype.zsetPosition = function (pos, offsetCenter) {
            if (offsetCenter === void 0) { offsetCenter = false; }
            if (!this.view) {
                console.warn('Trying to set position before view init');
                //save pos and set in after view init
                this._initPosition = __spread(pos);
                return;
            }
            var adjustedX = Math.max(pos[0] - (offsetCenter ? this.nativeElement.offsetWidth / 2 : 0), 0);
            var adjustedY = Math.max(pos[1] - (offsetCenter ? this.nativeElement.offsetHeight / 2 : 0), 0);
            this.nativeElement.style.left = adjustedX + "px";
            this.nativeElement.style.top = adjustedY + "px";
            this._currentPosition = [adjustedX, adjustedY];
        };
        NgFlowchartStepComponent.prototype.zaddChild0 = function (newChild) {
            var oldChildIndex = null;
            if (newChild._parent) {
                oldChildIndex = newChild._parent.removeChild(newChild);
            }
            if (this.hasChildren()) {
                if (newChild.hasChildren()) {
                    //if we have children and the child has children we need to confirm the child doesnt have multiple children at any point
                    var newChildLastChild = newChild.findLastSingleChild();
                    if (!newChildLastChild) {
                        newChild._parent.zaddChildSibling0(newChild, oldChildIndex);
                        console.error('Invalid move. A node cannot have multiple parents');
                        return false;
                    }
                    //move the this nodes children to last child of the step arg
                    newChildLastChild.setChildren(this._children.slice());
                }
                else {
                    //move adjacent's children to newStep
                    newChild.setChildren(this._children.slice());
                }
            }
            //finally reset this nodes to children to the single new child
            this.setChildren([newChild]);
            return true;
        };
        NgFlowchartStepComponent.prototype.zaddChildSibling0 = function (child, index) {
            if (child._parent) {
                child._parent.removeChild(child);
            }
            if (!this.children) {
                this._children = [];
            }
            if (index == null) {
                this.children.push(child);
            }
            else {
                this.children.splice(index, 0, child);
            }
            //since we are adding a new child here, it is safe to force set the parent
            child.setParent(this, true);
        };
        NgFlowchartStepComponent.prototype.zdrawArrow = function (start, end) {
            if (!this.arrow) {
                this.createArrow();
            }
            this.arrow.instance.position = {
                start: start,
                end: end
            };
        };
        ////////////////////////
        // PRIVATE IMPL
        NgFlowchartStepComponent.prototype.destroy0 = function (parentIndex, recursive) {
            if (recursive === void 0) { recursive = true; }
            this.compRef.destroy();
            // remove from master array
            this.canvas.flow.removeStep(this);
            if (this.isRootElement()) {
                this.canvas.flow.rootStep = null;
            }
            if (this.hasChildren()) {
                //this was the root node
                if (this.isRootElement()) {
                    if (!recursive) {
                        var newRoot = this._children[0];
                        //set first child as new root
                        this.canvas.flow.rootStep = newRoot;
                        newRoot.setParent(null, true);
                        //make previous siblings children of the new root
                        if (this.hasChildren(2)) {
                            for (var i = 1; i < this._children.length; i++) {
                                var child = this._children[i];
                                child.setParent(newRoot, true);
                                newRoot._children.push(child);
                            }
                        }
                    }
                }
                //update children
                var length = this._children.length;
                for (var i = 0; i < length; i++) {
                    var child = this._children[i];
                    if (recursive) {
                        child.destroy0(null, true);
                    }
                    //not the original root node
                    else if (!!this._parent) {
                        this._parent._children.splice(i + parentIndex, 0, child);
                        child.setParent(this._parent, true);
                    }
                }
                this.setChildren([]);
            }
            this._parent = null;
        };
        NgFlowchartStepComponent.prototype.createArrow = function () {
            var factory = this.compFactory.resolveComponentFactory(NgFlowchartArrowComponent);
            this.arrow = this.viewContainer.createComponent(factory);
            this.nativeElement.parentElement.appendChild(this.arrow.location.nativeElement);
        };
        NgFlowchartStepComponent.prototype.hideTree = function () {
            this._isHidden = true;
            this.nativeElement.style.opacity = '.4';
            if (this.arrow) {
                this.arrow.instance.hideArrow();
            }
            if (this.hasChildren()) {
                this._children.forEach(function (child) {
                    child.hideTree();
                });
            }
        };
        NgFlowchartStepComponent.prototype.showTree = function () {
            this._isHidden = false;
            if (this.arrow) {
                this.arrow.instance.showArrow();
            }
            this.nativeElement.style.opacity = '1';
            if (this.hasChildren()) {
                this._children.forEach(function (child) {
                    child.showTree();
                });
            }
        };
        NgFlowchartStepComponent.prototype.findLastSingleChild = function () {
            //two or more children means we have no single child
            if (this.hasChildren(2)) {
                return null;
            }
            //if one child.. keep going down the tree until we find no children or 2 or more
            else if (this.hasChildren()) {
                return this._children[0].findLastSingleChild();
            }
            //if no children then this is the last single child
            else
                return this;
        };
        NgFlowchartStepComponent.prototype.setChildren = function (children) {
            var _this = this;
            this._children = children;
            this.children.forEach(function (child) {
                child.setParent(_this, true);
            });
        };
        return NgFlowchartStepComponent;
    }());
    NgFlowchartStepComponent.decorators = [
        { type: i0.Component, args: [{
                    selector: 'ng-flowchart-step',
                    template: "<div #canvasContent [id]=\"id\">\r\n  <ng-container\r\n    *ngTemplateOutlet=\"\r\n      contentTemplate;\r\n      context: {\r\n        $implicit: {\r\n          data: data,\r\n          id: id\r\n        }\r\n      }\r\n    \"\r\n  >\r\n  </ng-container>\r\n</div>\r\n",
                    encapsulation: i0.ViewEncapsulation.None,
                    styles: [".ngflowchart-canvas{overflow:auto;display:flex}.ngflowchart-canvas-content.scaling .ngflowchart-step-wrapper,.ngflowchart-canvas-content.scaling svg{transition:none!important}.ngflowchart-canvas-content{position:relative;min-height:100%;min-width:100%;flex:1 1 100%}.ngflowchart-step-wrapper{height:auto;width:auto;position:absolute;box-sizing:border-box;transition:all .2s;cursor:-webkit-grab;cursor:grab}.ngflowchart-step-wrapper[ngflowchart-drop-hover]:before{content:\"\";width:12px;height:12px;border-radius:100%;position:absolute;z-index:1;background:#8b0000}.ngflowchart-step-wrapper[ngflowchart-drop-hover]:after{content:\"\";width:20px;height:20px;border-radius:100%;position:absolute;z-index:0;background:#c07b7b;-webkit-animation:backgroundOpacity 2s linear infinite;animation:backgroundOpacity 2s linear infinite}.ngflowchart-step-wrapper[ngflowchart-drop-hover=above]:after,.ngflowchart-step-wrapper[ngflowchart-drop-hover=above]:before{top:0;right:50%;transform:translate(50%,-50%)}.ngflowchart-step-wrapper[ngflowchart-drop-hover=below]:after,.ngflowchart-step-wrapper[ngflowchart-drop-hover=below]:before{bottom:0;right:50%;transform:translate(50%,50%)}.ngflowchart-step-wrapper[ngflowchart-drop-hover=right]:after,.ngflowchart-step-wrapper[ngflowchart-drop-hover=right]:before{right:0;top:50%;transform:translate(50%,-50%)}.ngflowchart-step-wrapper[ngflowchart-drop-hover=left]:after,.ngflowchart-step-wrapper[ngflowchart-drop-hover=left]:before{left:0;top:50%;transform:translate(-50%,-50%)}@-webkit-keyframes wiggle{0%{transform:translateX(0);border:2px solid red}25%{transform:translateX(-10px)}50%{transform:translateX(0)}75%{transform:translateX(10px)}to{transform:translateX(0);border:2px solid red}}@keyframes wiggle{0%{transform:translateX(0);border:2px solid red}25%{transform:translateX(-10px)}50%{transform:translateX(0)}75%{transform:translateX(10px)}to{transform:translateX(0);border:2px solid red}}@-webkit-keyframes backgroundOpacity{0%{opacity:.8}50%{opacity:.3}to{opacity:.8}}@keyframes backgroundOpacity{0%{opacity:.8}50%{opacity:.3}to{opacity:.8}}"]
                },] }
    ];
    NgFlowchartStepComponent.ctorParameters = function () { return []; };
    NgFlowchartStepComponent.propDecorators = {
        onMoveStart: [{ type: i0.HostListener, args: ['dragstart', ['$event'],] }],
        onMoveEnd: [{ type: i0.HostListener, args: ['dragend', ['$event'],] }],
        view: [{ type: i0.ViewChild, args: ['canvasContent',] }],
        data: [{ type: i0.Input }],
        type: [{ type: i0.Input }],
        canvas: [{ type: i0.Input }],
        compRef: [{ type: i0.Input }],
        viewInit: [{ type: i0.Output }],
        contentTemplate: [{ type: i0.Input }]
    };

    var OptionsService = /** @class */ (function () {
        function OptionsService() {
            this._callbacks = {};
            this._options = new exports.NgFlowchart.Options();
        }
        OptionsService.prototype.setOptions = function (options) {
            this._options = this.sanitizeOptions(options);
        };
        OptionsService.prototype.setCallbacks = function (callbacks) {
            this._callbacks = callbacks;
        };
        Object.defineProperty(OptionsService.prototype, "options", {
            get: function () {
                return this._options;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(OptionsService.prototype, "callbacks", {
            get: function () {
                return this._callbacks;
            },
            enumerable: false,
            configurable: true
        });
        OptionsService.prototype.sanitizeOptions = function (options) {
            var defaultOpts = new exports.NgFlowchart.Options();
            options = Object.assign(Object.assign({}, defaultOpts), options);
            options.stepGap = Math.max(options.stepGap, 20) || 40;
            options.hoverDeadzoneRadius = Math.max(options.hoverDeadzoneRadius, 0) || 20;
            return options;
        };
        return OptionsService;
    }());
    OptionsService.decorators = [
        { type: i0.Injectable }
    ];
    OptionsService.ctorParameters = function () { return []; };

    var CanvasRendererService = /** @class */ (function () {
        function CanvasRendererService(options) {
            this.options = options;
            this.scale = 1;
            this.scaleDebounceTimer = null;
        }
        CanvasRendererService.prototype.init = function (viewContainer) {
            this.viewContainer = viewContainer;
        };
        CanvasRendererService.prototype.renderRoot = function (step, dragEvent) {
            this.getCanvasContentElement().appendChild((step.location.nativeElement));
            this.setRootPosition(step.instance, dragEvent);
        };
        CanvasRendererService.prototype.renderNonRoot = function (step, dragEvent) {
            this.getCanvasContentElement().appendChild((step.location.nativeElement));
        };
        CanvasRendererService.prototype.updatePosition = function (step, dragEvent) {
            var _this = this;
            var relativeXY = this.getRelativeXY(dragEvent);
            relativeXY = relativeXY.map(function (coord) { return coord / _this.scale; });
            step.zsetPosition(relativeXY, true);
        };
        CanvasRendererService.prototype.getStepGap = function () {
            return this.options.options.stepGap;
        };
        CanvasRendererService.prototype.renderChildTree = function (rootNode, rootRect, canvasRect) {
            var _this = this;
            //the rootNode passed in is already rendered. just need to render its children /subtree
            if (!rootNode.hasChildren()) {
                return;
            }
            //top of the child row is simply the relative bottom of the root + stepGap
            var childYTop = (rootRect.bottom - canvasRect.top * this.scale) + this.getStepGap();
            var rootWidth = rootRect.width / this.scale;
            var rootXCenter = (rootRect.left - canvasRect.left) + (rootWidth / 2);
            //get the width of the child trees
            var childTreeWidths = {};
            var totalTreeWidth = 0;
            rootNode.children.forEach(function (child) {
                var totalChildWidth = child.getNodeTreeWidth(_this.getStepGap());
                totalChildWidth = totalChildWidth / _this.scale;
                childTreeWidths[child.nativeElement.id] = totalChildWidth;
                totalTreeWidth += totalChildWidth;
            });
            //add length for stepGaps between child trees
            totalTreeWidth += (rootNode.children.length - 1) * this.getStepGap();
            //if we have more than 1 child, we want half the extent on the left and half on the right
            var leftXTree = rootXCenter - (totalTreeWidth / 2);
            // dont allow it to go negative since you cant scroll that way
            leftXTree = Math.max(0, leftXTree);
            rootNode.children.forEach(function (child) {
                var childExtent = childTreeWidths[child.nativeElement.id];
                var childLeft = leftXTree + (childExtent / 2) - (child.nativeElement.offsetWidth / 2);
                child.zsetPosition([childLeft, childYTop]);
                var currentChildRect = child.getCurrentRect(canvasRect);
                var childWidth = currentChildRect.width / _this.scale;
                child.zdrawArrow([rootXCenter, (rootRect.bottom - canvasRect.top * _this.scale)], [currentChildRect.left + childWidth / 2 - canvasRect.left, currentChildRect.top - canvasRect.top]);
                _this.renderChildTree(child, currentChildRect, canvasRect);
                leftXTree += childExtent + _this.getStepGap();
            });
        };
        CanvasRendererService.prototype.render = function (flow, pretty, skipAdjustDimensions) {
            if (skipAdjustDimensions === void 0) { skipAdjustDimensions = false; }
            var _a, _b, _c;
            if (!flow.hasRoot()) {
                if (this.options.options.zoom.mode === 'DISABLED') {
                    this.resetAdjustDimensions();
                    // Trigger afterRender to allow nested canvas to redraw parent canvas.
                    // Not sure if this scenario should also trigger beforeRender.
                    if ((_a = this.options.callbacks) === null || _a === void 0 ? void 0 : _a.afterRender) {
                        this.options.callbacks.afterRender();
                    }
                }
                return;
            }
            if ((_b = this.options.callbacks) === null || _b === void 0 ? void 0 : _b.beforeRender) {
                this.options.callbacks.beforeRender();
            }
            var canvasRect = this.getCanvasContentElement().getBoundingClientRect();
            if (pretty) {
                //this will place the root at the top center of the canvas and render from there
                this.setRootPosition(flow.rootStep, null);
            }
            this.renderChildTree(flow.rootStep, flow.rootStep.getCurrentRect(canvasRect), canvasRect);
            if (!skipAdjustDimensions && this.options.options.zoom.mode === 'DISABLED') {
                this.adjustDimensions(flow, canvasRect);
            }
            if ((_c = this.options.callbacks) === null || _c === void 0 ? void 0 : _c.afterRender) {
                this.options.callbacks.afterRender();
            }
        };
        CanvasRendererService.prototype.resetAdjustDimensions = function () {
            // reset canvas auto sizing to original size if empty
            if (this.viewContainer) {
                var canvasWrapper = this.getCanvasContentElement();
                canvasWrapper.style.minWidth = null;
                canvasWrapper.style.minHeight = null;
            }
        };
        CanvasRendererService.prototype.findDropLocationForHover = function (absMouseXY, targetStep, stepToDrop) {
            if (!targetStep.shouldEvalDropHover(absMouseXY, stepToDrop)) {
                return 'deadzone';
            }
            var stepRect = targetStep.nativeElement.getBoundingClientRect();
            var yStepCenter = stepRect.bottom - stepRect.height / 2;
            var xStepCenter = stepRect.left + stepRect.width / 2;
            var yDiff = absMouseXY[1] - yStepCenter;
            var xDiff = absMouseXY[0] - xStepCenter;
            var absYDistance = Math.abs(yDiff);
            var absXDistance = Math.abs(xDiff);
            //#math class #Pythagoras
            var distance = Math.sqrt(absYDistance * absYDistance + absXDistance * absXDistance);
            var accuracyRadius = (stepRect.height + stepRect.width) / 2;
            var result = null;
            if (distance < accuracyRadius) {
                if (distance < this.options.options.hoverDeadzoneRadius) {
                    //basically we are too close to the middle to accurately predict what position they want
                    result = 'deadzone';
                }
                if (absYDistance > absXDistance) {
                    result = {
                        step: targetStep,
                        position: yDiff > 0 ? 'BELOW' : 'ABOVE',
                        proximity: absYDistance
                    };
                }
                else if (!this.options.options.isSequential && !targetStep.isRootElement()) {
                    result = {
                        step: targetStep,
                        position: xDiff > 0 ? 'RIGHT' : 'LEFT',
                        proximity: absXDistance
                    };
                }
            }
            if (result && result !== 'deadzone') {
                if (!targetStep.getDropPositionsForStep(stepToDrop).includes(result.position)) {
                    //we had a valid drop but the target step doesnt allow this location
                    result = null;
                }
            }
            return result;
        };
        CanvasRendererService.prototype.adjustDimensions = function (flow, canvasRect) {
            var maxRight = 0;
            var maxBottom = 0;
            //TODO this can be better
            flow.steps.forEach(function (ele) {
                var rect = ele.getCurrentRect(canvasRect);
                maxRight = Math.max(rect.right, maxRight);
                maxBottom = Math.max(rect.bottom, maxBottom);
            });
            var widthBorderGap = 100;
            var widthDiff = canvasRect.width - (maxRight - canvasRect.left);
            if (widthDiff < widthBorderGap) {
                var growWidth = widthBorderGap;
                if (widthDiff < 0) {
                    growWidth += Math.abs(widthDiff);
                }
                this.getCanvasContentElement().style.minWidth = canvasRect.width + growWidth + "px";
                if (this.options.options.centerOnResize) {
                    this.render(flow, true, true);
                }
            }
            else if (widthDiff > widthBorderGap) {
                var totalTreeWidth = this.getTotalTreeWidth(flow);
                if (this.isNestedCanvas()) {
                    this.getCanvasContentElement().style.minWidth = totalTreeWidth + widthBorderGap + "px";
                    if (this.options.options.centerOnResize) {
                        this.render(flow, true, true);
                    }
                }
                else if (this.getCanvasContentElement().style.minWidth) {
                    // reset normal canvas width if auto width set
                    this.getCanvasContentElement().style.minWidth = null;
                    if (this.options.options.centerOnResize) {
                        this.render(flow, true, true);
                    }
                }
            }
            var heightBorderGap = 50;
            var heightDiff = canvasRect.height - (maxBottom - canvasRect.top);
            if (heightDiff < heightBorderGap) {
                var growHeight = heightBorderGap;
                if (heightDiff < 0) {
                    growHeight += Math.abs(heightDiff);
                }
                this.getCanvasContentElement().style.minHeight = canvasRect.height + growHeight + "px";
            }
            else if (heightDiff > heightBorderGap) {
                if (this.isNestedCanvas()) {
                    var shrinkHeight = heightDiff - heightBorderGap;
                    this.getCanvasContentElement().style.minHeight = canvasRect.height - shrinkHeight + "px";
                }
                else if (this.getCanvasContentElement().style.minHeight) {
                    // reset normal canvas height if auto height set
                    this.getCanvasContentElement().style.minHeight = null;
                }
            }
        };
        CanvasRendererService.prototype.getTotalTreeWidth = function (flow) {
            var _this = this;
            var totalTreeWidth = 0;
            var rootWidth = flow.rootStep.getCurrentRect().width / this.scale;
            flow.rootStep.children.forEach(function (child) {
                var totalChildWidth = child.getNodeTreeWidth(_this.getStepGap());
                totalTreeWidth += totalChildWidth / _this.scale;
            });
            totalTreeWidth += (flow.rootStep.children.length - 1) * this.getStepGap();
            // total tree width doesn't give root width
            return Math.max(totalTreeWidth, rootWidth);
        };
        CanvasRendererService.prototype.findBestMatchForSteps = function (dragStep, event, steps) {
            var absXY = [event.clientX, event.clientY];
            var bestMatch = null;
            for (var i = 0; i < steps.length; i++) {
                var step = steps[i];
                if (step.isHidden()) {
                    continue;
                }
                var position = this.findDropLocationForHover(absXY, step, dragStep);
                if (position) {
                    if (position == 'deadzone') {
                        bestMatch = null;
                        break;
                    }
                    //if this step is closer than previous best match then we have a new best
                    else if (bestMatch == null || bestMatch.proximity > position.proximity) {
                        bestMatch = position;
                    }
                }
            }
            return bestMatch;
        };
        CanvasRendererService.prototype.findAndShowClosestDrop = function (dragStep, event, steps) {
            if (!steps || steps.length == 0) {
                return;
            }
            var bestMatch = this.findBestMatchForSteps(dragStep, event, steps);
            // TODO make this more efficient. two loops
            steps.forEach(function (step) {
                if (bestMatch == null || step.nativeElement.id !== bestMatch.step.nativeElement.id) {
                    step.clearHoverIcons();
                }
            });
            if (!bestMatch) {
                return;
            }
            bestMatch.step.showHoverIcon(bestMatch.position);
            return {
                step: bestMatch.step,
                position: bestMatch.position
            };
        };
        CanvasRendererService.prototype.showSnaps = function (dragStep) {
        };
        CanvasRendererService.prototype.clearAllSnapIndicators = function (steps) {
            steps.forEach(function (step) { return step.clearHoverIcons(); });
        };
        CanvasRendererService.prototype.setRootPosition = function (step, dragEvent) {
            if (!dragEvent) {
                var canvasTop = this.getCanvasTopCenterPosition(step.nativeElement);
                step.zsetPosition(canvasTop, true);
                return;
            }
            switch (this.options.options.rootPosition) {
                case 'CENTER':
                    var canvasCenter = this.getCanvasCenterPosition();
                    step.zsetPosition(canvasCenter, true);
                    return;
                case 'TOP_CENTER':
                    var canvasTop = this.getCanvasTopCenterPosition(step.nativeElement);
                    step.zsetPosition(canvasTop, true);
                    return;
                default:
                    var relativeXY = this.getRelativeXY(dragEvent);
                    step.zsetPosition(relativeXY, true);
                    return;
            }
        };
        CanvasRendererService.prototype.getRelativeXY = function (dragEvent) {
            var canvasRect = this.getCanvasContentElement().getBoundingClientRect();
            return [
                dragEvent.clientX - canvasRect.left,
                dragEvent.clientY - canvasRect.top
            ];
        };
        CanvasRendererService.prototype.getCanvasTopCenterPosition = function (htmlRootElement) {
            var canvasRect = this.getCanvasContentElement().getBoundingClientRect();
            var rootElementHeight = htmlRootElement.getBoundingClientRect().height;
            var yCoord = rootElementHeight / 2 + this.options.options.stepGap;
            var scaleYOffset = (1 - this.scale) * 100;
            return [
                canvasRect.width / (this.scale * 2),
                yCoord + scaleYOffset
            ];
        };
        CanvasRendererService.prototype.getCanvasCenterPosition = function () {
            var canvasRect = this.getCanvasContentElement().getBoundingClientRect();
            return [
                canvasRect.width / 2,
                canvasRect.height / 2
            ];
        };
        CanvasRendererService.prototype.getCanvasContentElement = function () {
            var canvas = this.viewContainer.element.nativeElement;
            var canvasContent = canvas.getElementsByClassName(CONSTANTS.CANVAS_CONTENT_CLASS).item(0);
            return canvasContent;
        };
        CanvasRendererService.prototype.isNestedCanvas = function () {
            if (this.viewContainer) {
                var canvasWrapper = this.viewContainer.element.nativeElement.parentElement;
                if (canvasWrapper) {
                    return canvasWrapper.classList.contains('ngflowchart-step-wrapper');
                }
            }
            return false;
        };
        CanvasRendererService.prototype.resetScale = function (flow) {
            this.setScale(flow, 1);
        };
        CanvasRendererService.prototype.scaleUp = function (flow, step) {
            var newScale = this.scale + (this.scale * step || this.options.options.zoom.defaultStep);
            this.setScale(flow, newScale);
        };
        CanvasRendererService.prototype.scaleDown = function (flow, step) {
            var newScale = this.scale - (this.scale * step || this.options.options.zoom.defaultStep);
            this.setScale(flow, newScale);
        };
        CanvasRendererService.prototype.setScale = function (flow, scaleValue) {
            var _a;
            var minDimAdjust = 1 / scaleValue * 100 + "%";
            var canvasContent = this.getCanvasContentElement();
            canvasContent.style.transform = "scale(" + scaleValue + ")";
            canvasContent.style.minHeight = minDimAdjust;
            canvasContent.style.minWidth = minDimAdjust;
            canvasContent.style.transformOrigin = 'top left';
            canvasContent.classList.add('scaling');
            this.scale = scaleValue;
            this.render(flow, true);
            if ((_a = this.options.callbacks) === null || _a === void 0 ? void 0 : _a.afterScale) {
                this.options.callbacks.afterScale(this.scale);
            }
            this.scaleDebounceTimer && clearTimeout(this.scaleDebounceTimer);
            this.scaleDebounceTimer = setTimeout(function () {
                canvasContent.classList.remove('scaling');
            }, 300);
        };
        return CanvasRendererService;
    }());
    CanvasRendererService.decorators = [
        { type: i0.Injectable }
    ];
    CanvasRendererService.ctorParameters = function () { return [
        { type: OptionsService }
    ]; };

    var DropDataService = /** @class */ (function () {
        function DropDataService() {
        }
        DropDataService.prototype.setDragStep = function (ref) {
            this.dragStep = ref;
        };
        DropDataService.prototype.getDragStep = function () {
            return this.dragStep;
        };
        return DropDataService;
    }());
    DropDataService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DropDataService_Factory() { return new DropDataService(); }, token: DropDataService, providedIn: "root" });
    DropDataService.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    DropDataService.ctorParameters = function () { return []; };

    var NgFlowchartStepRegistry = /** @class */ (function () {
        function NgFlowchartStepRegistry() {
            this.registry = new Map();
        }
        /**
         * Register a step implementation. Only needed if you are uploading a flow from json
         * @param type The unique type of the step
         * @param step The step templateRef or component type to create for this key
         */
        NgFlowchartStepRegistry.prototype.registerStep = function (type, step) {
            this.registry.set(type, step);
        };
        NgFlowchartStepRegistry.prototype.getStepImpl = function (type) {
            return this.registry.get(type);
        };
        return NgFlowchartStepRegistry;
    }());
    NgFlowchartStepRegistry.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgFlowchartStepRegistry_Factory() { return new NgFlowchartStepRegistry(); }, token: NgFlowchartStepRegistry, providedIn: "root" });
    NgFlowchartStepRegistry.decorators = [
        { type: i0.Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    NgFlowchartStepRegistry.ctorParameters = function () { return []; };

    /**
     * This service handles adding new steps to the canvas
     */
    var StepManagerService = /** @class */ (function () {
        function StepManagerService(componentFactoryResolver, registry) {
            this.componentFactoryResolver = componentFactoryResolver;
            this.registry = registry;
        }
        StepManagerService.prototype.init = function (viewContainer) {
            this.viewContainer = viewContainer;
        };
        StepManagerService.prototype.createFromRegistry = function (id, type, data, canvas) {
            var templateComp = this.registry.getStepImpl(type);
            var compRef;
            if (templateComp instanceof i0.TemplateRef || templateComp instanceof i0.Type) {
                compRef = this.create({
                    template: templateComp,
                    type: type,
                    data: data
                }, canvas);
            }
            else {
                throw 'Invalid registry implementation found for type ' + type;
            }
            compRef.instance.setId(id);
            return compRef;
        };
        StepManagerService.prototype.create = function (pendingStep, canvas) {
            var componentRef;
            if (pendingStep.template instanceof i0.TemplateRef) {
                var factory = this.componentFactoryResolver.resolveComponentFactory(NgFlowchartStepComponent);
                componentRef = this.viewContainer.createComponent(factory);
                componentRef.instance.contentTemplate = pendingStep.template;
            }
            else {
                var factory = this.componentFactoryResolver.resolveComponentFactory(pendingStep.template);
                componentRef = this.viewContainer.createComponent(factory);
            }
            componentRef.instance.data = JSON.parse(JSON.stringify(pendingStep.data));
            componentRef.instance.type = pendingStep.type;
            componentRef.instance.canvas = canvas;
            componentRef.instance.compRef = componentRef;
            componentRef.instance.init(componentRef.injector.get(DropDataService), componentRef.injector.get(i0.ViewContainerRef), componentRef.injector.get(i0.ComponentFactoryResolver));
            return componentRef;
        };
        return StepManagerService;
    }());
    StepManagerService.decorators = [
        { type: i0.Injectable }
    ];
    StepManagerService.ctorParameters = function () { return [
        { type: i0.ComponentFactoryResolver },
        { type: NgFlowchartStepRegistry }
    ]; };

    var __awaiter$3 = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var CanvasFlow = /** @class */ (function () {
        function CanvasFlow() {
            // steps from this canvas only
            this._steps = [];
        }
        CanvasFlow.prototype.hasRoot = function () {
            return !!this.rootStep;
        };
        CanvasFlow.prototype.addStep = function (step) {
            this._steps.push(step);
        };
        CanvasFlow.prototype.removeStep = function (step) {
            var index = this._steps.findIndex(function (ele) { return ele.id == step.id; });
            if (index >= 0) {
                this._steps.splice(index, 1);
            }
        };
        Object.defineProperty(CanvasFlow.prototype, "steps", {
            get: function () {
                return this._steps;
            },
            enumerable: false,
            configurable: true
        });
        return CanvasFlow;
    }());
    var NgFlowchartCanvasService = /** @class */ (function () {
        function NgFlowchartCanvasService(drag, options, renderer, stepmanager) {
            this.drag = drag;
            this.options = options;
            this.renderer = renderer;
            this.stepmanager = stepmanager;
            this.isDragging = false;
            this.flow = new CanvasFlow();
            this._disabled = false;
            this.noParentError = {
                code: 'NO_PARENT',
                message: 'Step was not dropped under a parent and is not the root node'
            };
        }
        Object.defineProperty(NgFlowchartCanvasService.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            enumerable: false,
            configurable: true
        });
        NgFlowchartCanvasService.prototype.init = function (view) {
            this.viewContainer = view;
            this.renderer.init(view);
            this.stepmanager.init(view);
            //hack to load the css
            var ref = this.stepmanager.create({
                template: NgFlowchartStepComponent,
                type: '',
                data: null
            }, this);
            var i = this.viewContainer.indexOf(ref.hostView);
            this.viewContainer.remove(i);
        };
        NgFlowchartCanvasService.prototype.moveStep = function (drag, id) {
            var _a;
            this.renderer.clearAllSnapIndicators(this.flow.steps);
            var step = this.flow.steps.find(function (step) { return step.nativeElement.id === id; });
            var error = {};
            if (!step) {
                // step cannot be moved if not in this canvas
                return;
            }
            if (step.canDrop(this.currentDropTarget, error)) {
                if (step.isRootElement()) {
                    this.renderer.updatePosition(step, drag);
                    this.renderer.render(this.flow);
                }
                else if (this.currentDropTarget) {
                    var response = this.addStepToFlow(step, this.currentDropTarget, true);
                    this.renderer.render(this.flow, response.prettyRender);
                }
                else {
                    this.moveError(step, this.noParentError);
                }
                if (((_a = this.options.callbacks) === null || _a === void 0 ? void 0 : _a.onDropStep) && (this.currentDropTarget || step.isRootElement())) {
                    this.options.callbacks.onDropStep({
                        isMove: true,
                        step: step,
                        parent: step.parent
                    });
                }
            }
            else {
                this.moveError(step, error);
            }
        };
        NgFlowchartCanvasService.prototype.onDrop = function (drag) {
            var _a;
            return __awaiter$3(this, void 0, void 0, function () {
                var componentRef, dropTarget, error, i;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            this.renderer.clearAllSnapIndicators(this.flow.steps);
                            if (this.flow.hasRoot() && !this.currentDropTarget) {
                                this.dropError(this.noParentError);
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.createStep(this.drag.dragStep)];
                        case 1:
                            componentRef = _e.sent();
                            dropTarget = this.currentDropTarget || null;
                            error = {};
                            if (componentRef.instance.canDrop(dropTarget, error)) {
                                if (!this.flow.hasRoot()) {
                                    this.renderer.renderRoot(componentRef, drag);
                                    this.setRoot(componentRef.instance);
                                }
                                else {
                                    // if root is replaced by another step, rerender root to proper position
                                    if (dropTarget.step.isRootElement() && dropTarget.position === 'ABOVE') {
                                        this.renderer.renderRoot(componentRef, drag);
                                    }
                                    this.addChildStep(componentRef, dropTarget);
                                }
                                if ((_a = this.options.callbacks) === null || _a === void 0 ? void 0 : _a.onDropStep) {
                                    this.options.callbacks.onDropStep({
                                        step: componentRef.instance,
                                        isMove: false,
                                        parent: componentRef.instance.parent
                                    });
                                }
                            }
                            else {
                                i = this.viewContainer.indexOf(componentRef.hostView);
                                this.viewContainer.remove(i);
                                this.dropError(error);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        NgFlowchartCanvasService.prototype.onDragStart = function (drag) {
            this.isDragging = true;
            this.currentDropTarget = this.renderer.findAndShowClosestDrop(this.drag.dragStep, drag, this.flow.steps);
        };
        NgFlowchartCanvasService.prototype.createStepFromType = function (id, type, data) {
            var _this = this;
            var compRef = this.stepmanager.createFromRegistry(id, type, data, this);
            return new Promise(function (resolve) {
                var sub = compRef.instance.viewInit.subscribe(function () { return __awaiter$3(_this, void 0, void 0, function () {
                    return __generator(this, function (_e) {
                        sub.unsubscribe();
                        setTimeout(function () {
                            compRef.instance.onUpload(data);
                        });
                        resolve(compRef);
                        return [2 /*return*/];
                    });
                }); });
            });
        };
        NgFlowchartCanvasService.prototype.createStep = function (pending) {
            var componentRef;
            componentRef = this.stepmanager.create(pending, this);
            return new Promise(function (resolve) {
                var sub = componentRef.instance.viewInit.subscribe(function () {
                    sub.unsubscribe();
                    resolve(componentRef);
                }, function (error) { return console.error(error); });
            });
        };
        NgFlowchartCanvasService.prototype.resetScale = function () {
            if (this.options.options.zoom.mode === 'DISABLED') {
                return;
            }
            this.renderer.resetScale(this.flow);
        };
        NgFlowchartCanvasService.prototype.scaleUp = function (step) {
            if (this.options.options.zoom.mode === 'DISABLED') {
                return;
            }
            this.renderer.scaleUp(this.flow, step);
        };
        NgFlowchartCanvasService.prototype.scaleDown = function (step) {
            if (this.options.options.zoom.mode === 'DISABLED') {
                return;
            }
            this.renderer.scaleDown(this.flow, step);
        };
        NgFlowchartCanvasService.prototype.setScale = function (scaleValue) {
            if (this.options.options.zoom.mode === 'DISABLED') {
                return;
            }
            this.renderer.setScale(this.flow, scaleValue);
        };
        NgFlowchartCanvasService.prototype.addChildStep = function (componentRef, dropTarget) {
            this.addToCanvas(componentRef);
            var response = this.addStepToFlow(componentRef.instance, dropTarget);
            this.renderer.render(this.flow, response.prettyRender);
        };
        NgFlowchartCanvasService.prototype.addToCanvas = function (componentRef) {
            this.renderer.renderNonRoot(componentRef);
        };
        NgFlowchartCanvasService.prototype.reRender = function (pretty) {
            this.renderer.render(this.flow, pretty);
        };
        NgFlowchartCanvasService.prototype.upload = function (root) {
            return __awaiter$3(this, void 0, void 0, function () {
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.uploadNode(root)];
                        case 1:
                            _e.sent();
                            this.reRender(true);
                            return [2 /*return*/];
                    }
                });
            });
        };
        NgFlowchartCanvasService.prototype.uploadNode = function (node, parentNode) {
            return __awaiter$3(this, void 0, void 0, function () {
                var comp, i, child, childComp;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (!node) {
                                // no node to upload when uploading empty nested flow
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.createStepFromType(node.id, node.type, node.data)];
                        case 1:
                            comp = _e.sent();
                            if (!parentNode) {
                                this.setRoot(comp.instance);
                                this.renderer.renderRoot(comp, null);
                            }
                            else {
                                this.renderer.renderNonRoot(comp);
                                this.flow.addStep(comp.instance);
                            }
                            i = 0;
                            _e.label = 2;
                        case 2:
                            if (!(i < node.children.length)) return [3 /*break*/, 5];
                            child = node.children[i];
                            return [4 /*yield*/, this.uploadNode(child, comp.instance)];
                        case 3:
                            childComp = _e.sent();
                            comp.instance.children.push(childComp);
                            childComp.setParent(comp.instance, true);
                            _e.label = 4;
                        case 4:
                            i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/, comp.instance];
                    }
                });
            });
        };
        NgFlowchartCanvasService.prototype.setRoot = function (step, force) {
            if (force === void 0) { force = true; }
            if (this.flow.hasRoot()) {
                if (!force) {
                    console.warn('Already have a root and force is false');
                    return;
                }
                //reparent root
                var oldRoot = this.flow.rootStep;
                this.flow.rootStep = step;
                step.zaddChild0(oldRoot);
            }
            else {
                this.flow.rootStep = step;
            }
            this.flow.addStep(step);
        };
        NgFlowchartCanvasService.prototype.addStepToFlow = function (step, dropTarget, isMove) {
            if (isMove === void 0) { isMove = false; }
            var response = {
                added: false,
                prettyRender: false,
            };
            switch (dropTarget.position) {
                case 'ABOVE':
                    response = this.placeStepAbove(step, dropTarget.step);
                    break;
                case 'BELOW':
                    response = this.placeStepBelow(step, dropTarget.step);
                    console.log(response, __spread(dropTarget.step.children));
                    break;
                case 'LEFT':
                    response = this.placeStepAdjacent(step, dropTarget.step, true);
                    break;
                case 'RIGHT':
                    response = this.placeStepAdjacent(step, dropTarget.step, false);
                    break;
                default:
                    break;
            }
            if (!isMove && response.added) {
                this.flow.addStep(step);
            }
            return response;
        };
        NgFlowchartCanvasService.prototype.placeStepBelow = function (newStep, parentStep) {
            return {
                added: parentStep.zaddChild0(newStep),
                prettyRender: false,
            };
        };
        NgFlowchartCanvasService.prototype.placeStepAdjacent = function (newStep, siblingStep, isLeft) {
            if (isLeft === void 0) { isLeft = true; }
            if (siblingStep.parent) {
                //find the adjacent steps index in the parents child array
                var adjacentIndex = siblingStep.parent.children.findIndex(function (child) { return child.nativeElement.id == siblingStep.nativeElement.id; });
                siblingStep.parent.zaddChildSibling0(newStep, adjacentIndex + (isLeft ? 0 : 1));
            }
            else {
                console.warn('Parallel actions must have a common parent');
                return {
                    added: false,
                    prettyRender: false,
                };
            }
            return {
                added: true,
                prettyRender: false,
            };
        };
        NgFlowchartCanvasService.prototype.placeStepAbove = function (newStep, childStep) {
            var _a;
            var prettyRender = false;
            var newParent = childStep.parent;
            if (newParent) {
                //we want to remove child and insert our newStep at the same index
                var index = newParent.removeChild(childStep);
                newStep.zaddChild0(childStep);
                newParent.zaddChild0(newStep);
            }
            else { // new root node
                (_a = newStep.parent) === null || _a === void 0 ? void 0 : _a.removeChild(newStep);
                newStep.setParent(null, true);
                //if the new step was a direct child of the root step, we need to break that connection
                childStep.removeChild(newStep);
                this.setRoot(newStep);
                prettyRender = true;
            }
            return {
                added: true,
                prettyRender: prettyRender
            };
        };
        NgFlowchartCanvasService.prototype.dropError = function (error) {
            var _a, _b, _c, _d;
            if ((_a = this.options.callbacks) === null || _a === void 0 ? void 0 : _a.onDropError) {
                var parent = ((_b = this.currentDropTarget) === null || _b === void 0 ? void 0 : _b.position) !== 'BELOW' ? (_c = this.currentDropTarget) === null || _c === void 0 ? void 0 : _c.step.parent : (_d = this.currentDropTarget) === null || _d === void 0 ? void 0 : _d.step;
                this.options.callbacks.onDropError({
                    step: this.drag.dragStep,
                    parent: parent || null,
                    error: error
                });
            }
        };
        NgFlowchartCanvasService.prototype.moveError = function (step, error) {
            var _a, _b, _c, _d;
            if ((_a = this.options.callbacks) === null || _a === void 0 ? void 0 : _a.onMoveError) {
                var parent = ((_b = this.currentDropTarget) === null || _b === void 0 ? void 0 : _b.position) !== 'BELOW' ? (_c = this.currentDropTarget) === null || _c === void 0 ? void 0 : _c.step.parent : (_d = this.currentDropTarget) === null || _d === void 0 ? void 0 : _d.step;
                this.options.callbacks.onMoveError({
                    step: {
                        instance: step,
                        type: step.type,
                        data: step.data
                    },
                    parent: parent,
                    error: error
                });
            }
        };
        return NgFlowchartCanvasService;
    }());
    NgFlowchartCanvasService.decorators = [
        { type: i0.Injectable }
    ];
    NgFlowchartCanvasService.ctorParameters = function () { return [
        { type: DropDataService },
        { type: OptionsService },
        { type: CanvasRendererService },
        { type: StepManagerService }
    ]; };

    var NgFlowchartCanvasDirective = /** @class */ (function () {
        function NgFlowchartCanvasDirective(canvasEle, viewContainer, canvas, optionService) {
            this.canvasEle = canvasEle;
            this.viewContainer = viewContainer;
            this.canvas = canvas;
            this.optionService = optionService;
            this._disabled = false;
            this._id = null;
            this.canvasEle.nativeElement.classList.add(CONSTANTS.CANVAS_CLASS);
            this.canvasContent = this.createCanvasContent(this.viewContainer);
            this._id = this.canvasContent.id;
        }
        NgFlowchartCanvasDirective.prototype.onDrop = function (event) {
            var _a;
            if (this._disabled) {
                return;
            }
            // its possible multiple canvases exist so make sure we only move/drop on the closest one
            var closestCanvasId = (_a = event.target.closest('.ngflowchart-canvas-content')) === null || _a === void 0 ? void 0 : _a.id;
            if (this._id !== closestCanvasId) {
                return;
            }
            var type = event.dataTransfer.getData('type');
            if ('FROM_CANVAS' == type) {
                this.canvas.moveStep(event, event.dataTransfer.getData('id'));
            }
            else {
                this.canvas.onDrop(event);
            }
        };
        NgFlowchartCanvasDirective.prototype.onDragOver = function (event) {
            event.preventDefault();
            if (this._disabled) {
                return;
            }
            this.canvas.onDragStart(event);
        };
        NgFlowchartCanvasDirective.prototype.onResize = function (event) {
            if (this._options.centerOnResize) {
                this.canvas.reRender(true);
            }
        };
        NgFlowchartCanvasDirective.prototype.onZoom = function (event) {
            if (this._options.zoom.mode === 'WHEEL') {
                this.adjustWheelScale(event);
            }
        };
        Object.defineProperty(NgFlowchartCanvasDirective.prototype, "callbacks", {
            set: function (callbacks) {
                this.optionService.setCallbacks(callbacks);
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgFlowchartCanvasDirective.prototype, "options", {
            get: function () {
                return this._options;
            },
            set: function (options) {
                this.optionService.setOptions(options);
                this._options = this.optionService.options;
                this.canvas.reRender();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(NgFlowchartCanvasDirective.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                this._disabled = val !== false;
                if (this.canvas) {
                    this.canvas._disabled = this._disabled;
                }
            },
            enumerable: false,
            configurable: true
        });
        NgFlowchartCanvasDirective.prototype.ngOnInit = function () {
            this.canvas.init(this.viewContainer);
            if (!this._options) {
                this.options = new exports.NgFlowchart.Options();
            }
            this.canvas._disabled = this._disabled;
        };
        NgFlowchartCanvasDirective.prototype.ngAfterViewInit = function () {
        };
        NgFlowchartCanvasDirective.prototype.ngOnDestroy = function () {
            for (var i = 0; i < this.viewContainer.length; i++) {
                this.viewContainer.remove(i);
            }
            this.canvasEle.nativeElement.remove();
            this.viewContainer.element.nativeElement.remove();
            this.viewContainer = undefined;
        };
        NgFlowchartCanvasDirective.prototype.createCanvasContent = function (viewContainer) {
            var canvasId = 'c' + Date.now();
            var canvasEle = viewContainer.element.nativeElement;
            var canvasContent = document.createElement('div');
            canvasContent.id = canvasId;
            canvasContent.classList.add(CONSTANTS.CANVAS_CONTENT_CLASS);
            canvasEle.appendChild(canvasContent);
            return canvasContent;
        };
        /**
         * Returns the Flow object representing this flow chart.
         */
        NgFlowchartCanvasDirective.prototype.getFlow = function () {
            return new exports.NgFlowchart.Flow(this.canvas);
        };
        NgFlowchartCanvasDirective.prototype.scaleDown = function () {
            this.canvas.scaleDown();
        };
        NgFlowchartCanvasDirective.prototype.scaleUp = function () {
            this.canvas.scaleUp();
        };
        NgFlowchartCanvasDirective.prototype.setScale = function (scaleValue) {
            var scaleVal = Math.max(0, scaleValue);
            this.canvas.setScale(scaleVal);
        };
        NgFlowchartCanvasDirective.prototype.adjustWheelScale = function (event) {
            if (this.canvas.flow.hasRoot()) {
                event.preventDefault();
                // scale down / zoom out
                if (event.deltaY > 0) {
                    this.scaleDown();
                }
                // scale up / zoom in
                else if (event.deltaY < 0) {
                    this.scaleUp();
                }
            }
        };
        ;
        return NgFlowchartCanvasDirective;
    }());
    NgFlowchartCanvasDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngFlowchartCanvas]',
                    providers: [
                        NgFlowchartCanvasService,
                        StepManagerService,
                        OptionsService,
                        CanvasRendererService
                    ]
                },] }
    ];
    NgFlowchartCanvasDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: i0.ViewContainerRef },
        { type: NgFlowchartCanvasService },
        { type: OptionsService }
    ]; };
    NgFlowchartCanvasDirective.propDecorators = {
        onDrop: [{ type: i0.HostListener, args: ['drop', ['$event'],] }],
        onDragOver: [{ type: i0.HostListener, args: ['dragover', ['$event'],] }],
        onResize: [{ type: i0.HostListener, args: ['window:resize', ['$event'],] }],
        onZoom: [{ type: i0.HostListener, args: ['wheel', ['$event'],] }],
        callbacks: [{ type: i0.Input, args: ['ngFlowchartCallbacks',] }],
        options: [{ type: i0.Input, args: ['ngFlowchartOptions',] }],
        disabled: [{ type: i0.Input, args: ['disabled',] }, { type: i0.HostBinding, args: ['attr.disabled',] }]
    };

    var NgFlowchartStepDirective = /** @class */ (function () {
        function NgFlowchartStepDirective(element, data) {
            this.element = element;
            this.data = data;
            this.element.nativeElement.setAttribute('draggable', 'true');
        }
        NgFlowchartStepDirective.prototype.onDragStart = function (event) {
            this.data.setDragStep(this.flowStep);
            event.dataTransfer.setData('type', 'FROM_PALETTE');
        };
        NgFlowchartStepDirective.prototype.onDragEnd = function (event) {
            this.data.setDragStep(null);
        };
        NgFlowchartStepDirective.prototype.ngAfterViewInit = function () {
        };
        return NgFlowchartStepDirective;
    }());
    NgFlowchartStepDirective.decorators = [
        { type: i0.Directive, args: [{
                    selector: '[ngFlowchartStep]'
                },] }
    ];
    NgFlowchartStepDirective.ctorParameters = function () { return [
        { type: i0.ElementRef },
        { type: DropDataService }
    ]; };
    NgFlowchartStepDirective.propDecorators = {
        onDragStart: [{ type: i0.HostListener, args: ['dragstart', ['$event'],] }],
        onDragEnd: [{ type: i0.HostListener, args: ['dragend', ['$event'],] }],
        flowStep: [{ type: i0.Input, args: ['ngFlowchartStep',] }]
    };

    var NgFlowchartModule = /** @class */ (function () {
        function NgFlowchartModule() {
        }
        return NgFlowchartModule;
    }());
    NgFlowchartModule.decorators = [
        { type: i0.NgModule, args: [{
                    declarations: [NgFlowchartCanvasDirective, NgFlowchartStepDirective, NgFlowchartStepComponent, NgFlowchartArrowComponent],
                    imports: [
                        common.CommonModule
                    ],
                    exports: [NgFlowchartCanvasDirective, NgFlowchartStepDirective, NgFlowchartStepComponent, NgFlowchartArrowComponent],
                    entryComponents: [
                        NgFlowchartStepComponent,
                        NgFlowchartArrowComponent
                    ]
                },] }
    ];

    /*
     * Public API Surface of ng-flowchart
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.NgFlowchartArrowComponent = NgFlowchartArrowComponent;
    exports.NgFlowchartCanvasDirective = NgFlowchartCanvasDirective;
    exports.NgFlowchartModule = NgFlowchartModule;
    exports.NgFlowchartStepComponent = NgFlowchartStepComponent;
    exports.NgFlowchartStepDirective = NgFlowchartStepDirective;
    exports.NgFlowchartStepRegistry = NgFlowchartStepRegistry;
    exports.OptionsService = OptionsService;
    exports.ɵa = NgFlowchartCanvasService;
    exports.ɵb = DropDataService;
    exports.ɵc = CanvasRendererService;
    exports.ɵd = StepManagerService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=joelwenzel-ng-flowchart.umd.js.map
