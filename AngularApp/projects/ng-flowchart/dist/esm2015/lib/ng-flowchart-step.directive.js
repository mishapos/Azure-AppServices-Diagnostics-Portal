import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgFlowchart } from './model/flow.model';
import { DropDataService } from './services/dropdata.service';
export class NgFlowchartStepDirective {
    constructor(element, data) {
        this.element = element;
        this.data = data;
        this.element.nativeElement.setAttribute('draggable', 'true');
    }
    onDragStart(event) {
        this.data.setDragStep(this.flowStep);
        event.dataTransfer.setData('type', 'FROM_PALETTE');
    }
    onDragEnd(event) {
        this.data.setDragStep(null);
    }
    ngAfterViewInit() {
    }
}
NgFlowchartStepDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngFlowchartStep]'
            },] }
];
NgFlowchartStepDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: DropDataService }
];
NgFlowchartStepDirective.propDecorators = {
    onDragStart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
    onDragEnd: [{ type: HostListener, args: ['dragend', ['$event'],] }],
    flowStep: [{ type: Input, args: ['ngFlowchartStep',] }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZmxvd2NoYXJ0LXN0ZXAuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9uZy1mbG93Y2hhcnQtc3RlcC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUs5RCxNQUFNLE9BQU8sd0JBQXdCO0lBa0JqQyxZQUNjLE9BQWdDLEVBQ2xDLElBQXFCO1FBRG5CLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2xDLFNBQUksR0FBSixJQUFJLENBQWlCO1FBRTdCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQXBCRCxXQUFXLENBQUMsS0FBZ0I7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBR0QsU0FBUyxDQUFDLEtBQWdCO1FBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWhDLENBQUM7SUFZRCxlQUFlO0lBQ2YsQ0FBQzs7O1lBN0JKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsbUJBQW1CO2FBQ2hDOzs7WUFOa0MsVUFBVTtZQUVwQyxlQUFlOzs7MEJBT25CLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBTXBDLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7dUJBT2xDLEtBQUssU0FBQyxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdGbG93Y2hhcnQgfSBmcm9tICcuL21vZGVsL2Zsb3cubW9kZWwnO1xyXG5pbXBvcnQgeyBEcm9wRGF0YVNlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Ryb3BkYXRhLnNlcnZpY2UnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tuZ0Zsb3djaGFydFN0ZXBdJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdGbG93Y2hhcnRTdGVwRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSlcclxuICAgIG9uRHJhZ1N0YXJ0KGV2ZW50OiBEcmFnRXZlbnQpIHtcclxuICAgICAgICB0aGlzLmRhdGEuc2V0RHJhZ1N0ZXAodGhpcy5mbG93U3RlcCk7XHJcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ3R5cGUnLCAnRlJPTV9QQUxFVFRFJyk7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZHJhZ2VuZCcsIFsnJGV2ZW50J10pXHJcbiAgICBvbkRyYWdFbmQoZXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGF0YS5zZXREcmFnU3RlcChudWxsKTtcclxuICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgnbmdGbG93Y2hhcnRTdGVwJylcclxuICAgIGZsb3dTdGVwOiBOZ0Zsb3djaGFydC5QZW5kaW5nU3RlcDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcm90ZWN0ZWQgZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXHJcbiAgICAgICAgcHJpdmF0ZSBkYXRhOiBEcm9wRGF0YVNlcnZpY2VcclxuICAgICkge1xyXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZHJhZ2dhYmxlJywgJ3RydWUnKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB9XHJcbn0iXX0=