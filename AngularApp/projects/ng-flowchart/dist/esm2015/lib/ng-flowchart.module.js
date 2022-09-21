import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgFlowchartArrowComponent } from './ng-flowchart-arrow/ng-flowchart-arrow.component';
import { NgFlowchartCanvasDirective } from './ng-flowchart-canvas.directive';
import { NgFlowchartStepDirective } from './ng-flowchart-step.directive';
import { NgFlowchartStepComponent } from './ng-flowchart-step/ng-flowchart-step.component';
export class NgFlowchartModule {
}
NgFlowchartModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgFlowchartCanvasDirective, NgFlowchartStepDirective, NgFlowchartStepComponent, NgFlowchartArrowComponent],
                imports: [
                    CommonModule
                ],
                exports: [NgFlowchartCanvasDirective, NgFlowchartStepDirective, NgFlowchartStepComponent, NgFlowchartArrowComponent],
                entryComponents: [
                    NgFlowchartStepComponent,
                    NgFlowchartArrowComponent
                ]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZmxvd2NoYXJ0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbmctZmxvd2NoYXJ0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxtREFBbUQsQ0FBQztBQUM5RixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN6RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxpREFBaUQsQ0FBQztBQWEzRixNQUFNLE9BQU8saUJBQWlCOzs7WUFYN0IsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLDBCQUEwQixFQUFFLHdCQUF3QixFQUFFLHdCQUF3QixFQUFFLHlCQUF5QixDQUFDO2dCQUN6SCxPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxPQUFPLEVBQUUsQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsRUFBRSx3QkFBd0IsRUFBRSx5QkFBeUIsQ0FBQztnQkFDcEgsZUFBZSxFQUFFO29CQUNmLHdCQUF3QjtvQkFDeEIseUJBQXlCO2lCQUMxQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdGbG93Y2hhcnRBcnJvd0NvbXBvbmVudCB9IGZyb20gJy4vbmctZmxvd2NoYXJ0LWFycm93L25nLWZsb3djaGFydC1hcnJvdy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ0Zsb3djaGFydENhbnZhc0RpcmVjdGl2ZSB9IGZyb20gJy4vbmctZmxvd2NoYXJ0LWNhbnZhcy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBOZ0Zsb3djaGFydFN0ZXBEaXJlY3RpdmUgfSBmcm9tICcuL25nLWZsb3djaGFydC1zdGVwLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCB9IGZyb20gJy4vbmctZmxvd2NoYXJ0LXN0ZXAvbmctZmxvd2NoYXJ0LXN0ZXAuY29tcG9uZW50JztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbTmdGbG93Y2hhcnRDYW52YXNEaXJlY3RpdmUsIE5nRmxvd2NoYXJ0U3RlcERpcmVjdGl2ZSwgTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50LCBOZ0Zsb3djaGFydEFycm93Q29tcG9uZW50XSxcclxuICBpbXBvcnRzOiBbXHJcbiAgICBDb21tb25Nb2R1bGVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtOZ0Zsb3djaGFydENhbnZhc0RpcmVjdGl2ZSwgTmdGbG93Y2hhcnRTdGVwRGlyZWN0aXZlLCBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQsIE5nRmxvd2NoYXJ0QXJyb3dDb21wb25lbnRdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogW1xyXG4gICAgTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50LFxyXG4gICAgTmdGbG93Y2hhcnRBcnJvd0NvbXBvbmVudFxyXG4gIF1cclxufSlcclxuZXhwb3J0IGNsYXNzIE5nRmxvd2NoYXJ0TW9kdWxlIHsgfVxyXG4iXX0=