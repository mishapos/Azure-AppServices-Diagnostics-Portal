import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class NgFlowchartStepRegistry {
    constructor() {
        this.registry = new Map();
    }
    /**
     * Register a step implementation. Only needed if you are uploading a flow from json
     * @param type The unique type of the step
     * @param step The step templateRef or component type to create for this key
     */
    registerStep(type, step) {
        this.registry.set(type, step);
    }
    getStepImpl(type) {
        return this.registry.get(type);
    }
}
NgFlowchartStepRegistry.ɵprov = i0.ɵɵdefineInjectable({ factory: function NgFlowchartStepRegistry_Factory() { return new NgFlowchartStepRegistry(); }, token: NgFlowchartStepRegistry, providedIn: "root" });
NgFlowchartStepRegistry.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
NgFlowchartStepRegistry.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZmxvd2NoYXJ0LXN0ZXAtcmVnaXN0cnkuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbmctZmxvd2NoYXJ0LXN0ZXAtcmVnaXN0cnkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFxQixNQUFNLGVBQWUsQ0FBQzs7QUFNOUQsTUFBTSxPQUFPLHVCQUF1QjtJQUloQztRQUZRLGFBQVEsR0FBRyxJQUFJLEdBQUcsRUFBNkQsQ0FBQztJQUl4RixDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFlBQVksQ0FBQyxJQUFZLEVBQUUsSUFBdUQ7UUFDOUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBWTtRQUNwQixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7WUF0QkosVUFBVSxTQUFDO2dCQUNSLFVBQVUsRUFBRSxNQUFNO2FBQ3JCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgVGVtcGxhdGVSZWYsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1mbG93Y2hhcnQtc3RlcC9uZy1mbG93Y2hhcnQtc3RlcC5jb21wb25lbnQnO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBOZ0Zsb3djaGFydFN0ZXBSZWdpc3RyeSB7XHJcbiAgICBcclxuICAgIHByaXZhdGUgcmVnaXN0cnkgPSBuZXcgTWFwPHN0cmluZywgVHlwZTxOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQ+IHwgVGVtcGxhdGVSZWY8YW55Pj4oKTtcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVnaXN0ZXIgYSBzdGVwIGltcGxlbWVudGF0aW9uLiBPbmx5IG5lZWRlZCBpZiB5b3UgYXJlIHVwbG9hZGluZyBhIGZsb3cgZnJvbSBqc29uXHJcbiAgICAgKiBAcGFyYW0gdHlwZSBUaGUgdW5pcXVlIHR5cGUgb2YgdGhlIHN0ZXBcclxuICAgICAqIEBwYXJhbSBzdGVwIFRoZSBzdGVwIHRlbXBsYXRlUmVmIG9yIGNvbXBvbmVudCB0eXBlIHRvIGNyZWF0ZSBmb3IgdGhpcyBrZXlcclxuICAgICAqL1xyXG4gICAgcmVnaXN0ZXJTdGVwKHR5cGU6IHN0cmluZywgc3RlcDogVHlwZTxOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQ+IHwgVGVtcGxhdGVSZWY8YW55Pikge1xyXG4gICAgICAgIHRoaXMucmVnaXN0cnkuc2V0KHR5cGUsIHN0ZXApO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFN0ZXBJbXBsKHR5cGU6IHN0cmluZyk6IFR5cGU8TmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50PiB8IFRlbXBsYXRlUmVmPGFueT4gfCBudWxsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RyeS5nZXQodHlwZSk7XHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==