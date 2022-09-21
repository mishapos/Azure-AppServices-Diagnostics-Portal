var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Injectable } from '@angular/core';
import { NgFlowchartStepComponent } from './ng-flowchart-step/ng-flowchart-step.component';
import { CanvasRendererService } from './services/canvas-renderer.service';
import { DropDataService as DragService } from './services/dropdata.service';
import { OptionsService } from './services/options.service';
import { StepManagerService } from './services/step-manager.service';
export class CanvasFlow {
    constructor() {
        // steps from this canvas only
        this._steps = [];
    }
    hasRoot() {
        return !!this.rootStep;
    }
    addStep(step) {
        this._steps.push(step);
    }
    removeStep(step) {
        let index = this._steps.findIndex(ele => ele.id == step.id);
        if (index >= 0) {
            this._steps.splice(index, 1);
        }
    }
    get steps() {
        return this._steps;
    }
}
export class NgFlowchartCanvasService {
    constructor(drag, options, renderer, stepmanager) {
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
    get disabled() {
        return this._disabled;
    }
    init(view) {
        this.viewContainer = view;
        this.renderer.init(view);
        this.stepmanager.init(view);
        //hack to load the css
        let ref = this.stepmanager.create({
            template: NgFlowchartStepComponent,
            type: '',
            data: null
        }, this);
        const i = this.viewContainer.indexOf(ref.hostView);
        this.viewContainer.remove(i);
    }
    moveStep(drag, id) {
        var _a;
        this.renderer.clearAllSnapIndicators(this.flow.steps);
        let step = this.flow.steps.find(step => step.nativeElement.id === id);
        let error = {};
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
                const response = this.addStepToFlow(step, this.currentDropTarget, true);
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
    }
    onDrop(drag) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            this.renderer.clearAllSnapIndicators(this.flow.steps);
            if (this.flow.hasRoot() && !this.currentDropTarget) {
                this.dropError(this.noParentError);
                return;
            }
            //TODO just pass dragStep here, but come up with a better name and move the type to flow.model
            let componentRef = yield this.createStep(this.drag.dragStep);
            const dropTarget = this.currentDropTarget || null;
            let error = {};
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
                const i = this.viewContainer.indexOf(componentRef.hostView);
                this.viewContainer.remove(i);
                this.dropError(error);
            }
        });
    }
    onDragStart(drag) {
        this.isDragging = true;
        this.currentDropTarget = this.renderer.findAndShowClosestDrop(this.drag.dragStep, drag, this.flow.steps);
    }
    createStepFromType(id, type, data) {
        let compRef = this.stepmanager.createFromRegistry(id, type, data, this);
        return new Promise((resolve) => {
            let sub = compRef.instance.viewInit.subscribe(() => __awaiter(this, void 0, void 0, function* () {
                sub.unsubscribe();
                setTimeout(() => {
                    compRef.instance.onUpload(data);
                });
                resolve(compRef);
            }));
        });
    }
    createStep(pending) {
        let componentRef;
        componentRef = this.stepmanager.create(pending, this);
        return new Promise((resolve) => {
            let sub = componentRef.instance.viewInit.subscribe(() => {
                sub.unsubscribe();
                resolve(componentRef);
            }, error => console.error(error));
        });
    }
    resetScale() {
        if (this.options.options.zoom.mode === 'DISABLED') {
            return;
        }
        this.renderer.resetScale(this.flow);
    }
    scaleUp(step) {
        if (this.options.options.zoom.mode === 'DISABLED') {
            return;
        }
        this.renderer.scaleUp(this.flow, step);
    }
    scaleDown(step) {
        if (this.options.options.zoom.mode === 'DISABLED') {
            return;
        }
        this.renderer.scaleDown(this.flow, step);
    }
    setScale(scaleValue) {
        if (this.options.options.zoom.mode === 'DISABLED') {
            return;
        }
        this.renderer.setScale(this.flow, scaleValue);
    }
    addChildStep(componentRef, dropTarget) {
        this.addToCanvas(componentRef);
        const response = this.addStepToFlow(componentRef.instance, dropTarget);
        this.renderer.render(this.flow, response.prettyRender);
    }
    addToCanvas(componentRef) {
        this.renderer.renderNonRoot(componentRef);
    }
    reRender(pretty) {
        this.renderer.render(this.flow, pretty);
    }
    upload(root) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.uploadNode(root);
            this.reRender(true);
        });
    }
    uploadNode(node, parentNode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!node) {
                // no node to upload when uploading empty nested flow
                return;
            }
            let comp = yield this.createStepFromType(node.id, node.type, node.data);
            if (!parentNode) {
                this.setRoot(comp.instance);
                this.renderer.renderRoot(comp, null);
            }
            else {
                this.renderer.renderNonRoot(comp);
                this.flow.addStep(comp.instance);
            }
            for (let i = 0; i < node.children.length; i++) {
                let child = node.children[i];
                let childComp = yield this.uploadNode(child, comp.instance);
                comp.instance.children.push(childComp);
                childComp.setParent(comp.instance, true);
            }
            return comp.instance;
        });
    }
    setRoot(step, force = true) {
        if (this.flow.hasRoot()) {
            if (!force) {
                console.warn('Already have a root and force is false');
                return;
            }
            //reparent root
            let oldRoot = this.flow.rootStep;
            this.flow.rootStep = step;
            step.zaddChild0(oldRoot);
        }
        else {
            this.flow.rootStep = step;
        }
        this.flow.addStep(step);
    }
    addStepToFlow(step, dropTarget, isMove = false) {
        let response = {
            added: false,
            prettyRender: false,
        };
        switch (dropTarget.position) {
            case 'ABOVE':
                response = this.placeStepAbove(step, dropTarget.step);
                break;
            case 'BELOW':
                response = this.placeStepBelow(step, dropTarget.step);
                console.log(response, [...dropTarget.step.children]);
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
    }
    placeStepBelow(newStep, parentStep) {
        return {
            added: parentStep.zaddChild0(newStep),
            prettyRender: false,
        };
    }
    placeStepAdjacent(newStep, siblingStep, isLeft = true) {
        if (siblingStep.parent) {
            //find the adjacent steps index in the parents child array
            const adjacentIndex = siblingStep.parent.children.findIndex(child => child.nativeElement.id == siblingStep.nativeElement.id);
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
    }
    placeStepAbove(newStep, childStep) {
        var _a;
        let prettyRender = false;
        let newParent = childStep.parent;
        if (newParent) {
            //we want to remove child and insert our newStep at the same index
            let index = newParent.removeChild(childStep);
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
            prettyRender
        };
    }
    dropError(error) {
        var _a, _b, _c, _d;
        if ((_a = this.options.callbacks) === null || _a === void 0 ? void 0 : _a.onDropError) {
            let parent = ((_b = this.currentDropTarget) === null || _b === void 0 ? void 0 : _b.position) !== 'BELOW' ? (_c = this.currentDropTarget) === null || _c === void 0 ? void 0 : _c.step.parent : (_d = this.currentDropTarget) === null || _d === void 0 ? void 0 : _d.step;
            this.options.callbacks.onDropError({
                step: this.drag.dragStep,
                parent: parent || null,
                error: error
            });
        }
    }
    moveError(step, error) {
        var _a, _b, _c, _d;
        if ((_a = this.options.callbacks) === null || _a === void 0 ? void 0 : _a.onMoveError) {
            let parent = ((_b = this.currentDropTarget) === null || _b === void 0 ? void 0 : _b.position) !== 'BELOW' ? (_c = this.currentDropTarget) === null || _c === void 0 ? void 0 : _c.step.parent : (_d = this.currentDropTarget) === null || _d === void 0 ? void 0 : _d.step;
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
    }
}
NgFlowchartCanvasService.decorators = [
    { type: Injectable }
];
NgFlowchartCanvasService.ctorParameters = () => [
    { type: DragService },
    { type: OptionsService },
    { type: CanvasRendererService },
    { type: StepManagerService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZmxvd2NoYXJ0LWNhbnZhcy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9uZy1mbG93Y2hhcnQtY2FudmFzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFnQixVQUFVLEVBQW9CLE1BQU0sZUFBZSxDQUFDO0FBRTNFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGlEQUFpRCxDQUFDO0FBQzNGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxlQUFlLElBQUksV0FBVyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDN0UsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBT3JFLE1BQU0sT0FBTyxVQUFVO0lBMEJyQjtRQXZCQSw4QkFBOEI7UUFDdEIsV0FBTSxHQUErQixFQUFFLENBQUM7SUF3QmhELENBQUM7SUF0QkQsT0FBTztRQUNMLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELE9BQU8sQ0FBQyxJQUE4QjtRQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBRUQsVUFBVSxDQUFDLElBQThCO1FBRXZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDNUQsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlCO0lBQ0gs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LElBQUksQ0FBQyxJQUFJO29CQUNmLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDaEI7Z0JBQ0QsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsS0FBSyxFQUFFLEtBQUs7YUFDYixDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7OztZQXpXRixVQUFVOzs7WUF4Q2lCLFdBQVc7WUFDOUIsY0FBYztZQUZkLHFCQUFxQjtZQUdyQixrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnRSZWYsIEluamVjdGFibGUsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdGbG93Y2hhcnQgfSBmcm9tICcuL21vZGVsL2Zsb3cubW9kZWwnO1xyXG5pbXBvcnQgeyBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQgfSBmcm9tICcuL25nLWZsb3djaGFydC1zdGVwL25nLWZsb3djaGFydC1zdGVwLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IENhbnZhc1JlbmRlcmVyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY2FudmFzLXJlbmRlcmVyLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBEcm9wRGF0YVNlcnZpY2UgYXMgRHJhZ1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2Ryb3BkYXRhLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBPcHRpb25zU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvb3B0aW9ucy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgU3RlcE1hbmFnZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9zdGVwLW1hbmFnZXIuc2VydmljZSc7XHJcblxyXG50eXBlIERyb3BSZXNwb25zZSA9IHtcclxuICBhZGRlZDogYm9vbGVhbixcclxuICBwcmV0dHlSZW5kZXI6IGJvb2xlYW5cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIENhbnZhc0Zsb3cge1xyXG4gIHJvb3RTdGVwOiBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQ7XHJcblxyXG4gIC8vIHN0ZXBzIGZyb20gdGhpcyBjYW52YXMgb25seVxyXG4gIHByaXZhdGUgX3N0ZXBzOiBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnRbXSA9IFtdO1xyXG5cclxuICBoYXNSb290KCkge1xyXG4gICAgcmV0dXJuICEhdGhpcy5yb290U3RlcDtcclxuICB9XHJcblxyXG4gIGFkZFN0ZXAoc3RlcDogTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50KSB7XHJcbiAgICB0aGlzLl9zdGVwcy5wdXNoKHN0ZXApXHJcbiAgfVxyXG5cclxuICByZW1vdmVTdGVwKHN0ZXA6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCkge1xyXG5cclxuICAgIGxldCBpbmRleCA9IHRoaXMuX3N0ZXBzLmZpbmRJbmRleChlbGUgPT4gZWxlLmlkID09IHN0ZXAuaWQpO1xyXG4gICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgdGhpcy5fc3RlcHMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBzdGVwcygpOiBSZWFkb25seUFycmF5PE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudD4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0ZXBzO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gIH1cclxufVxyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgTmdGbG93Y2hhcnRDYW52YXNTZXJ2aWNlIHtcclxuXHJcbiAgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcclxuICBpc0RyYWdnaW5nOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGN1cnJlbnREcm9wVGFyZ2V0OiBOZ0Zsb3djaGFydC5Ecm9wVGFyZ2V0O1xyXG5cclxuICBmbG93OiBDYW52YXNGbG93ID0gbmV3IENhbnZhc0Zsb3coKTtcclxuXHJcbiAgX2Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIGdldCBkaXNhYmxlZCgpIHtcclxuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcclxuICB9XHJcblxyXG4gIG5vUGFyZW50RXJyb3IgPSB7XHJcbiAgICBjb2RlOiAnTk9fUEFSRU5UJyxcclxuICAgIG1lc3NhZ2U6ICdTdGVwIHdhcyBub3QgZHJvcHBlZCB1bmRlciBhIHBhcmVudCBhbmQgaXMgbm90IHRoZSByb290IG5vZGUnXHJcbiAgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGRyYWc6IERyYWdTZXJ2aWNlLFxyXG4gICAgcHVibGljIG9wdGlvbnM6IE9wdGlvbnNTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogQ2FudmFzUmVuZGVyZXJTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBzdGVwbWFuYWdlcjogU3RlcE1hbmFnZXJTZXJ2aWNlXHJcbiAgKSB7XHJcblxyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyBpbml0KHZpZXc6IFZpZXdDb250YWluZXJSZWYpIHtcclxuICAgIHRoaXMudmlld0NvbnRhaW5lciA9IHZpZXc7XHJcbiAgICB0aGlzLnJlbmRlcmVyLmluaXQodmlldyk7XHJcbiAgICB0aGlzLnN0ZXBtYW5hZ2VyLmluaXQodmlldyk7XHJcblxyXG4gICAgLy9oYWNrIHRvIGxvYWQgdGhlIGNzc1xyXG4gICAgbGV0IHJlZiA9IHRoaXMuc3RlcG1hbmFnZXIuY3JlYXRlKHtcclxuICAgICAgdGVtcGxhdGU6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCxcclxuICAgICAgdHlwZTogJycsXHJcbiAgICAgIGRhdGE6IG51bGxcclxuICAgIH0sIHRoaXMpO1xyXG4gICAgY29uc3QgaSA9IHRoaXMudmlld0NvbnRhaW5lci5pbmRleE9mKHJlZi5ob3N0VmlldylcclxuICAgIHRoaXMudmlld0NvbnRhaW5lci5yZW1vdmUoaSk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIG1vdmVTdGVwKGRyYWc6IERyYWdFdmVudCwgaWQ6IGFueSkge1xyXG4gICAgdGhpcy5yZW5kZXJlci5jbGVhckFsbFNuYXBJbmRpY2F0b3JzKHRoaXMuZmxvdy5zdGVwcyk7XHJcblxyXG4gICAgbGV0IHN0ZXA6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCA9IHRoaXMuZmxvdy5zdGVwcy5maW5kKHN0ZXAgPT4gc3RlcC5uYXRpdmVFbGVtZW50LmlkID09PSBpZCk7XHJcbiAgICBsZXQgZXJyb3IgPSB7fTtcclxuICAgIGlmKCFzdGVwKSB7XHJcbiAgICAgIC8vIHN0ZXAgY2Fubm90IGJlIG1vdmVkIGlmIG5vdCBpbiB0aGlzIGNhbnZhc1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoc3RlcC5jYW5Ecm9wKHRoaXMuY3VycmVudERyb3BUYXJnZXQsIGVycm9yKSkge1xyXG4gICAgICBpZiAoc3RlcC5pc1Jvb3RFbGVtZW50KCkpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcmVyLnVwZGF0ZVBvc2l0aW9uKHN0ZXAsIGRyYWcpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuZmxvdyk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAodGhpcy5jdXJyZW50RHJvcFRhcmdldCkge1xyXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5hZGRTdGVwVG9GbG93KHN0ZXAsIHRoaXMuY3VycmVudERyb3BUYXJnZXQsIHRydWUpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuZmxvdywgcmVzcG9uc2UucHJldHR5UmVuZGVyKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICB0aGlzLm1vdmVFcnJvcihzdGVwLCB0aGlzLm5vUGFyZW50RXJyb3IpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2FsbGJhY2tzPy5vbkRyb3BTdGVwICYmICh0aGlzLmN1cnJlbnREcm9wVGFyZ2V0IHx8IHN0ZXAuaXNSb290RWxlbWVudCgpKSkge1xyXG4gICAgICAgIHRoaXMub3B0aW9ucy5jYWxsYmFja3Mub25Ecm9wU3RlcCh7XHJcbiAgICAgICAgICBpc01vdmU6IHRydWUsXHJcbiAgICAgICAgICBzdGVwOiBzdGVwLFxyXG4gICAgICAgICAgcGFyZW50OiBzdGVwLnBhcmVudFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLm1vdmVFcnJvcihzdGVwLCBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcblxyXG5cclxuICBwdWJsaWMgYXN5bmMgb25Ecm9wKGRyYWc6IERyYWdFdmVudCkge1xyXG4gICAgdGhpcy5yZW5kZXJlci5jbGVhckFsbFNuYXBJbmRpY2F0b3JzKHRoaXMuZmxvdy5zdGVwcyk7XHJcblxyXG4gICAgaWYgKHRoaXMuZmxvdy5oYXNSb290KCkgJiYgIXRoaXMuY3VycmVudERyb3BUYXJnZXQpIHtcclxuICAgICAgdGhpcy5kcm9wRXJyb3IodGhpcy5ub1BhcmVudEVycm9yKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyBqdXN0IHBhc3MgZHJhZ1N0ZXAgaGVyZSwgYnV0IGNvbWUgdXAgd2l0aCBhIGJldHRlciBuYW1lIGFuZCBtb3ZlIHRoZSB0eXBlIHRvIGZsb3cubW9kZWxcclxuICAgIGxldCBjb21wb25lbnRSZWYgPSBhd2FpdCB0aGlzLmNyZWF0ZVN0ZXAodGhpcy5kcmFnLmRyYWdTdGVwIGFzIE5nRmxvd2NoYXJ0LlBlbmRpbmdTdGVwKTtcclxuXHJcbiAgICBjb25zdCBkcm9wVGFyZ2V0ID0gdGhpcy5jdXJyZW50RHJvcFRhcmdldCB8fCBudWxsO1xyXG4gICAgbGV0IGVycm9yID0ge307XHJcbiAgICBpZiAoY29tcG9uZW50UmVmLmluc3RhbmNlLmNhbkRyb3AoZHJvcFRhcmdldCwgZXJyb3IpKSB7XHJcbiAgICAgIGlmICghdGhpcy5mbG93Lmhhc1Jvb3QoKSkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyUm9vdChjb21wb25lbnRSZWYsIGRyYWcpO1xyXG4gICAgICAgIHRoaXMuc2V0Um9vdChjb21wb25lbnRSZWYuaW5zdGFuY2UpO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgICAvLyBpZiByb290IGlzIHJlcGxhY2VkIGJ5IGFub3RoZXIgc3RlcCwgcmVyZW5kZXIgcm9vdCB0byBwcm9wZXIgcG9zaXRpb25cclxuICAgICAgICAgaWYoZHJvcFRhcmdldC5zdGVwLmlzUm9vdEVsZW1lbnQoKSAmJiBkcm9wVGFyZ2V0LnBvc2l0aW9uID09PSAnQUJPVkUnKSB7XHJcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlclJvb3QoY29tcG9uZW50UmVmLCBkcmFnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZFN0ZXAoY29tcG9uZW50UmVmLCBkcm9wVGFyZ2V0KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5jYWxsYmFja3M/Lm9uRHJvcFN0ZXApIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuY2FsbGJhY2tzLm9uRHJvcFN0ZXAoe1xyXG4gICAgICAgICAgc3RlcDogY29tcG9uZW50UmVmLmluc3RhbmNlLFxyXG4gICAgICAgICAgaXNNb3ZlOiBmYWxzZSxcclxuICAgICAgICAgIHBhcmVudDogY29tcG9uZW50UmVmLmluc3RhbmNlLnBhcmVudFxyXG4gICAgICAgIH0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zdCBpID0gdGhpcy52aWV3Q29udGFpbmVyLmluZGV4T2YoY29tcG9uZW50UmVmLmhvc3RWaWV3KVxyXG4gICAgICB0aGlzLnZpZXdDb250YWluZXIucmVtb3ZlKGkpO1xyXG4gICAgICB0aGlzLmRyb3BFcnJvcihlcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgcHVibGljIG9uRHJhZ1N0YXJ0KGRyYWc6IERyYWdFdmVudCkge1xyXG5cclxuICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5jdXJyZW50RHJvcFRhcmdldCA9IHRoaXMucmVuZGVyZXIuZmluZEFuZFNob3dDbG9zZXN0RHJvcCh0aGlzLmRyYWcuZHJhZ1N0ZXAsIGRyYWcsIHRoaXMuZmxvdy5zdGVwcyk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgY3JlYXRlU3RlcEZyb21UeXBlKGlkOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxDb21wb25lbnRSZWY8TmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50Pj4ge1xyXG4gICAgbGV0IGNvbXBSZWYgPSB0aGlzLnN0ZXBtYW5hZ2VyLmNyZWF0ZUZyb21SZWdpc3RyeShpZCwgdHlwZSwgZGF0YSwgdGhpcyk7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgbGV0IHN1YiA9IGNvbXBSZWYuaW5zdGFuY2Uudmlld0luaXQuc3Vic2NyaWJlKGFzeW5jICgpID0+IHtcclxuICAgICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIGNvbXBSZWYuaW5zdGFuY2Uub25VcGxvYWQoZGF0YSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIHJlc29sdmUoY29tcFJlZik7XHJcbiAgICAgIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNyZWF0ZVN0ZXAocGVuZGluZzogTmdGbG93Y2hhcnQuUGVuZGluZ1N0ZXApOiBQcm9taXNlPENvbXBvbmVudFJlZjxOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQ+PiB7XHJcbiAgICBsZXQgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8TmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50PjtcclxuXHJcbiAgICBjb21wb25lbnRSZWYgPSB0aGlzLnN0ZXBtYW5hZ2VyLmNyZWF0ZShwZW5kaW5nLCB0aGlzKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcclxuICAgICAgbGV0IHN1YiA9IGNvbXBvbmVudFJlZi5pbnN0YW5jZS52aWV3SW5pdC5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIHJlc29sdmUoY29tcG9uZW50UmVmKTtcclxuICAgICAgfSwgZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvcikpXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHJlc2V0U2NhbGUoKSB7XHJcbiAgICBpZih0aGlzLm9wdGlvbnMub3B0aW9ucy56b29tLm1vZGUgPT09ICdESVNBQkxFRCcpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlc2V0U2NhbGUodGhpcy5mbG93KVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjYWxlVXAoc3RlcD86IG51bWJlcikge1xyXG4gICAgaWYodGhpcy5vcHRpb25zLm9wdGlvbnMuem9vbS5tb2RlID09PSAnRElTQUJMRUQnKSB7XHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gICAgdGhpcy5yZW5kZXJlci5zY2FsZVVwKHRoaXMuZmxvdywgc3RlcCk7XHJcblxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNjYWxlRG93bihzdGVwPzogbnVtYmVyKSB7XHJcbiAgICBpZih0aGlzLm9wdGlvbnMub3B0aW9ucy56b29tLm1vZGUgPT09ICdESVNBQkxFRCcpIHtcclxuICAgICAgcmV0dXJuXHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbmRlcmVyLnNjYWxlRG93bih0aGlzLmZsb3csIHN0ZXApO1xyXG5cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRTY2FsZShzY2FsZVZhbHVlOiBudW1iZXIpIHtcclxuICAgIGlmKHRoaXMub3B0aW9ucy5vcHRpb25zLnpvb20ubW9kZSA9PT0gJ0RJU0FCTEVEJykge1xyXG4gICAgICByZXR1cm5cclxuICAgIH1cclxuICAgIHRoaXMucmVuZGVyZXIuc2V0U2NhbGUodGhpcy5mbG93LCBzY2FsZVZhbHVlKVxyXG4gIH1cclxuXHJcblxyXG4gIGFkZENoaWxkU3RlcChjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQ+LCBkcm9wVGFyZ2V0OiBOZ0Zsb3djaGFydC5Ecm9wVGFyZ2V0KSB7XHJcbiAgICB0aGlzLmFkZFRvQ2FudmFzKGNvbXBvbmVudFJlZik7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IHRoaXMuYWRkU3RlcFRvRmxvdyhjb21wb25lbnRSZWYuaW5zdGFuY2UsIGRyb3BUYXJnZXQpO1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5mbG93LCByZXNwb25zZS5wcmV0dHlSZW5kZXIpO1xyXG4gIH1cclxuXHJcbiAgYWRkVG9DYW52YXMoY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8TmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50Pikge1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXJOb25Sb290KGNvbXBvbmVudFJlZik7XHJcbiAgfVxyXG5cclxuICByZVJlbmRlcihwcmV0dHk/OiBib29sZWFuKSB7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLmZsb3csIHByZXR0eSk7XHJcbiAgfVxyXG5cclxuICBhc3luYyB1cGxvYWQocm9vdDogYW55KSB7XHJcbiAgICBhd2FpdCB0aGlzLnVwbG9hZE5vZGUocm9vdCk7XHJcbiAgICB0aGlzLnJlUmVuZGVyKHRydWUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhc3luYyB1cGxvYWROb2RlKG5vZGU6IGFueSwgcGFyZW50Tm9kZT86IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCk6IFByb21pc2U8TmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50PiB7XHJcbiAgICBpZighbm9kZSl7XHJcbiAgICAgIC8vIG5vIG5vZGUgdG8gdXBsb2FkIHdoZW4gdXBsb2FkaW5nIGVtcHR5IG5lc3RlZCBmbG93XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY29tcCA9IGF3YWl0IHRoaXMuY3JlYXRlU3RlcEZyb21UeXBlKG5vZGUuaWQsIG5vZGUudHlwZSwgbm9kZS5kYXRhKTtcclxuICAgIGlmICghcGFyZW50Tm9kZSkge1xyXG4gICAgICB0aGlzLnNldFJvb3QoY29tcC5pbnN0YW5jZSk7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyUm9vdChjb21wLCBudWxsKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlck5vblJvb3QoY29tcCk7XHJcbiAgICAgIHRoaXMuZmxvdy5hZGRTdGVwKGNvbXAuaW5zdGFuY2UpO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgY2hpbGQgPSBub2RlLmNoaWxkcmVuW2ldO1xyXG4gICAgICBsZXQgY2hpbGRDb21wID0gYXdhaXQgdGhpcy51cGxvYWROb2RlKGNoaWxkLCBjb21wLmluc3RhbmNlKTtcclxuICAgICAgY29tcC5pbnN0YW5jZS5jaGlsZHJlbi5wdXNoKGNoaWxkQ29tcCk7XHJcbiAgICAgIGNoaWxkQ29tcC5zZXRQYXJlbnQoY29tcC5pbnN0YW5jZSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGNvbXAuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNldFJvb3Qoc3RlcDogTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50LCBmb3JjZTogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgIGlmICh0aGlzLmZsb3cuaGFzUm9vdCgpKSB7XHJcbiAgICAgIGlmICghZm9yY2UpIHtcclxuICAgICAgICBjb25zb2xlLndhcm4oJ0FscmVhZHkgaGF2ZSBhIHJvb3QgYW5kIGZvcmNlIGlzIGZhbHNlJyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvL3JlcGFyZW50IHJvb3RcclxuICAgICAgbGV0IG9sZFJvb3QgPSB0aGlzLmZsb3cucm9vdFN0ZXA7XHJcbiAgICAgIHRoaXMuZmxvdy5yb290U3RlcCA9IHN0ZXA7XHJcbiAgICAgIHN0ZXAuemFkZENoaWxkMChvbGRSb290KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmZsb3cucm9vdFN0ZXAgPSBzdGVwO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmxvdy5hZGRTdGVwKHN0ZXApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhZGRTdGVwVG9GbG93KHN0ZXA6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCwgZHJvcFRhcmdldDogTmdGbG93Y2hhcnQuRHJvcFRhcmdldCwgaXNNb3ZlID0gZmFsc2UpOiBEcm9wUmVzcG9uc2Uge1xyXG5cclxuICAgIGxldCByZXNwb25zZSA9IHtcclxuICAgICAgICBhZGRlZDogZmFsc2UsXHJcbiAgICAgICAgcHJldHR5UmVuZGVyOiBmYWxzZSxcclxuICAgIH07XHJcblxyXG4gICAgc3dpdGNoIChkcm9wVGFyZ2V0LnBvc2l0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ0FCT1ZFJzpcclxuICAgICAgICByZXNwb25zZSA9IHRoaXMucGxhY2VTdGVwQWJvdmUoc3RlcCwgZHJvcFRhcmdldC5zdGVwKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnQkVMT1cnOlxyXG4gICAgICAgIHJlc3BvbnNlID0gdGhpcy5wbGFjZVN0ZXBCZWxvdyhzdGVwLCBkcm9wVGFyZ2V0LnN0ZXApO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLCBbLi4uZHJvcFRhcmdldC5zdGVwLmNoaWxkcmVuXSlcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnTEVGVCc6XHJcbiAgICAgICAgcmVzcG9uc2UgPSB0aGlzLnBsYWNlU3RlcEFkamFjZW50KHN0ZXAsIGRyb3BUYXJnZXQuc3RlcCwgdHJ1ZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ1JJR0hUJzpcclxuICAgICAgICByZXNwb25zZSA9IHRoaXMucGxhY2VTdGVwQWRqYWNlbnQoc3RlcCwgZHJvcFRhcmdldC5zdGVwLCBmYWxzZSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFpc01vdmUgJiYgcmVzcG9uc2UuYWRkZWQpIHtcclxuICAgICAgdGhpcy5mbG93LmFkZFN0ZXAoc3RlcCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBsYWNlU3RlcEJlbG93KG5ld1N0ZXA6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCwgcGFyZW50U3RlcDogTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50KTogRHJvcFJlc3BvbnNlIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGFkZGVkOiBwYXJlbnRTdGVwLnphZGRDaGlsZDAobmV3U3RlcCksXHJcbiAgICAgIHByZXR0eVJlbmRlcjogZmFsc2UsXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHBsYWNlU3RlcEFkamFjZW50KG5ld1N0ZXA6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCwgc2libGluZ1N0ZXA6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCwgaXNMZWZ0OiBib29sZWFuID0gdHJ1ZSk6IERyb3BSZXNwb25zZSB7XHJcbiAgICBpZiAoc2libGluZ1N0ZXAucGFyZW50KSB7XHJcbiAgICAgIC8vZmluZCB0aGUgYWRqYWNlbnQgc3RlcHMgaW5kZXggaW4gdGhlIHBhcmVudHMgY2hpbGQgYXJyYXlcclxuICAgICAgY29uc3QgYWRqYWNlbnRJbmRleCA9IHNpYmxpbmdTdGVwLnBhcmVudC5jaGlsZHJlbi5maW5kSW5kZXgoY2hpbGQgPT4gY2hpbGQubmF0aXZlRWxlbWVudC5pZCA9PSBzaWJsaW5nU3RlcC5uYXRpdmVFbGVtZW50LmlkKTtcclxuICAgICAgc2libGluZ1N0ZXAucGFyZW50LnphZGRDaGlsZFNpYmxpbmcwKG5ld1N0ZXAsIGFkamFjZW50SW5kZXggKyAoaXNMZWZ0ID8gMCA6IDEpKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ1BhcmFsbGVsIGFjdGlvbnMgbXVzdCBoYXZlIGEgY29tbW9uIHBhcmVudCcpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGFkZGVkOiBmYWxzZSxcclxuICAgICAgICBwcmV0dHlSZW5kZXI6IGZhbHNlLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYWRkZWQ6IHRydWUsXHJcbiAgICAgIHByZXR0eVJlbmRlcjogZmFsc2UsXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBwbGFjZVN0ZXBBYm92ZShuZXdTdGVwOiBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQsIGNoaWxkU3RlcDogTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50KTogRHJvcFJlc3BvbnNlIHtcclxuICAgIGxldCBwcmV0dHlSZW5kZXIgPSBmYWxzZVxyXG4gICAgbGV0IG5ld1BhcmVudCA9IGNoaWxkU3RlcC5wYXJlbnQ7XHJcbiAgICBpZiAobmV3UGFyZW50KSB7XHJcbiAgICAgIC8vd2Ugd2FudCB0byByZW1vdmUgY2hpbGQgYW5kIGluc2VydCBvdXIgbmV3U3RlcCBhdCB0aGUgc2FtZSBpbmRleFxyXG4gICAgICBsZXQgaW5kZXggPSBuZXdQYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGRTdGVwKTtcclxuICAgICAgbmV3U3RlcC56YWRkQ2hpbGQwKGNoaWxkU3RlcCk7XHJcbiAgICAgIG5ld1BhcmVudC56YWRkQ2hpbGQwKG5ld1N0ZXApO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7IC8vIG5ldyByb290IG5vZGVcclxuICAgICAgbmV3U3RlcC5wYXJlbnQ/LnJlbW92ZUNoaWxkKG5ld1N0ZXApXHJcbiAgICAgIG5ld1N0ZXAuc2V0UGFyZW50KG51bGwsIHRydWUpXHJcbiAgICAgIFxyXG4gICAgICAvL2lmIHRoZSBuZXcgc3RlcCB3YXMgYSBkaXJlY3QgY2hpbGQgb2YgdGhlIHJvb3Qgc3RlcCwgd2UgbmVlZCB0byBicmVhayB0aGF0IGNvbm5lY3Rpb25cclxuICAgICAgY2hpbGRTdGVwLnJlbW92ZUNoaWxkKG5ld1N0ZXApXHJcbiAgICAgIHRoaXMuc2V0Um9vdChuZXdTdGVwKTtcclxuXHJcbiAgICAgIHByZXR0eVJlbmRlciA9IHRydWVcclxuICAgICAgXHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhZGRlZDogdHJ1ZSxcclxuICAgICAgcHJldHR5UmVuZGVyXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBkcm9wRXJyb3IoZXJyb3I6IE5nRmxvd2NoYXJ0LkVycm9yTWVzc2FnZSkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jYWxsYmFja3M/Lm9uRHJvcEVycm9yKSB7XHJcbiAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmN1cnJlbnREcm9wVGFyZ2V0Py5wb3NpdGlvbiAhPT0gJ0JFTE9XJyA/IHRoaXMuY3VycmVudERyb3BUYXJnZXQ/LnN0ZXAucGFyZW50IDogdGhpcy5jdXJyZW50RHJvcFRhcmdldD8uc3RlcFxyXG4gICAgICB0aGlzLm9wdGlvbnMuY2FsbGJhY2tzLm9uRHJvcEVycm9yKHtcclxuICAgICAgICBzdGVwOiAodGhpcy5kcmFnLmRyYWdTdGVwIGFzIE5nRmxvd2NoYXJ0LlBlbmRpbmdTdGVwKSxcclxuICAgICAgICBwYXJlbnQ6IHBhcmVudCB8fCBudWxsLFxyXG4gICAgICAgIGVycm9yOiBlcnJvclxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtb3ZlRXJyb3Ioc3RlcDogTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50LCBlcnJvcikge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jYWxsYmFja3M/Lm9uTW92ZUVycm9yKSB7XHJcbiAgICAgIGxldCBwYXJlbnQgPSB0aGlzLmN1cnJlbnREcm9wVGFyZ2V0Py5wb3NpdGlvbiAhPT0gJ0JFTE9XJyA/IHRoaXMuY3VycmVudERyb3BUYXJnZXQ/LnN0ZXAucGFyZW50IDogdGhpcy5jdXJyZW50RHJvcFRhcmdldD8uc3RlcFxyXG4gICAgICB0aGlzLm9wdGlvbnMuY2FsbGJhY2tzLm9uTW92ZUVycm9yKHtcclxuICAgICAgICBzdGVwOiB7XHJcbiAgICAgICAgICBpbnN0YW5jZTogc3RlcCxcclxuICAgICAgICAgIHR5cGU6IHN0ZXAudHlwZSxcclxuICAgICAgICAgIGRhdGE6IHN0ZXAuZGF0YVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcGFyZW50OiBwYXJlbnQsXHJcbiAgICAgICAgZXJyb3I6IGVycm9yXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==