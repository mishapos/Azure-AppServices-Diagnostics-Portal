import { AfterViewInit, ElementRef } from '@angular/core';
import { NgFlowchart } from './model/flow.model';
import { DropDataService } from './services/dropdata.service';
import * as ɵngcc0 from '@angular/core';
export declare class NgFlowchartStepDirective implements AfterViewInit {
    protected element: ElementRef<HTMLElement>;
    private data;
    onDragStart(event: DragEvent): void;
    onDragEnd(event: DragEvent): void;
    flowStep: NgFlowchart.PendingStep;
    constructor(element: ElementRef<HTMLElement>, data: DropDataService);
    ngAfterViewInit(): void;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgFlowchartStepDirective, never>;
    static ɵdir: ɵngcc0.ɵɵDirectiveDefWithMeta<NgFlowchartStepDirective, "[ngFlowchartStep]", never, { "flowStep": "ngFlowchartStep"; }, {}, never>;
}

//# sourceMappingURL=ng-flowchart-step.directive.d.ts.map