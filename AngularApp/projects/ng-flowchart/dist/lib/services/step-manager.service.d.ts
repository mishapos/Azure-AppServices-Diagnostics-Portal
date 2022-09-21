import { ComponentFactoryResolver, ComponentRef, ViewContainerRef } from '@angular/core';
import { NgFlowchart } from '../model/flow.model';
import { NgFlowchartCanvasService } from '../ng-flowchart-canvas.service';
import { NgFlowchartStepRegistry } from '../ng-flowchart-step-registry.service';
import { NgFlowchartStepComponent } from '../ng-flowchart-step/ng-flowchart-step.component';
/**
 * This service handles adding new steps to the canvas
 */
import * as ɵngcc0 from '@angular/core';
export declare class StepManagerService {
    private componentFactoryResolver;
    private registry;
    private viewContainer;
    constructor(componentFactoryResolver: ComponentFactoryResolver, registry: NgFlowchartStepRegistry);
    init(viewContainer: ViewContainerRef): void;
    createFromRegistry(id: string, type: string, data: any, canvas: NgFlowchartCanvasService): ComponentRef<NgFlowchartStepComponent>;
    create(pendingStep: NgFlowchart.PendingStep, canvas: NgFlowchartCanvasService): ComponentRef<NgFlowchartStepComponent>;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<StepManagerService, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDef<StepManagerService>;
}

//# sourceMappingURL=step-manager.service.d.ts.map