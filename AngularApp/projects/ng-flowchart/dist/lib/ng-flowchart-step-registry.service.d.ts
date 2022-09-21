import { TemplateRef, Type } from '@angular/core';
import { NgFlowchartStepComponent } from './ng-flowchart-step/ng-flowchart-step.component';
import * as ɵngcc0 from '@angular/core';
export declare class NgFlowchartStepRegistry {
    private registry;
    constructor();
    /**
     * Register a step implementation. Only needed if you are uploading a flow from json
     * @param type The unique type of the step
     * @param step The step templateRef or component type to create for this key
     */
    registerStep(type: string, step: Type<NgFlowchartStepComponent> | TemplateRef<any>): void;
    getStepImpl(type: string): Type<NgFlowchartStepComponent> | TemplateRef<any> | null;
    static ɵfac: ɵngcc0.ɵɵFactoryDef<NgFlowchartStepRegistry, never>;
}

//# sourceMappingURL=ng-flowchart-step-registry.service.d.ts.map