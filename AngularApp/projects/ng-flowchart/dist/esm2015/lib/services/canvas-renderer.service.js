import { Injectable } from '@angular/core';
import { CONSTANTS } from '../model/flowchart.constants';
import { OptionsService } from './options.service';
export class CanvasRendererService {
    constructor(options) {
        this.options = options;
        this.scale = 1;
        this.scaleDebounceTimer = null;
    }
    init(viewContainer) {
        this.viewContainer = viewContainer;
    }
    renderRoot(step, dragEvent) {
        this.getCanvasContentElement().appendChild((step.location.nativeElement));
        this.setRootPosition(step.instance, dragEvent);
    }
    renderNonRoot(step, dragEvent) {
        this.getCanvasContentElement().appendChild((step.location.nativeElement));
    }
    updatePosition(step, dragEvent) {
        let relativeXY = this.getRelativeXY(dragEvent);
        relativeXY = relativeXY.map(coord => coord / this.scale);
        step.zsetPosition(relativeXY, true);
    }
    getStepGap() {
        return this.options.options.stepGap;
    }
    renderChildTree(rootNode, rootRect, canvasRect) {
        //the rootNode passed in is already rendered. just need to render its children /subtree
        if (!rootNode.hasChildren()) {
            return;
        }
        //top of the child row is simply the relative bottom of the root + stepGap
        const childYTop = (rootRect.bottom - canvasRect.top * this.scale) + this.getStepGap();
        const rootWidth = rootRect.width / this.scale;
        const rootXCenter = (rootRect.left - canvasRect.left) + (rootWidth / 2);
        //get the width of the child trees
        let childTreeWidths = {};
        let totalTreeWidth = 0;
        rootNode.children.forEach(child => {
            let totalChildWidth = child.getNodeTreeWidth(this.getStepGap());
            totalChildWidth = totalChildWidth / this.scale;
            childTreeWidths[child.nativeElement.id] = totalChildWidth;
            totalTreeWidth += totalChildWidth;
        });
        //add length for stepGaps between child trees
        totalTreeWidth += (rootNode.children.length - 1) * this.getStepGap();
        //if we have more than 1 child, we want half the extent on the left and half on the right
        let leftXTree = rootXCenter - (totalTreeWidth / 2);
        // dont allow it to go negative since you cant scroll that way
        leftXTree = Math.max(0, leftXTree);
        rootNode.children.forEach(child => {
            let childExtent = childTreeWidths[child.nativeElement.id];
            let childLeft = leftXTree + (childExtent / 2) - (child.nativeElement.offsetWidth / 2);
            child.zsetPosition([childLeft, childYTop]);
            const currentChildRect = child.getCurrentRect(canvasRect);
            const childWidth = currentChildRect.width / this.scale;
            child.zdrawArrow([rootXCenter, (rootRect.bottom - canvasRect.top * this.scale)], [currentChildRect.left + childWidth / 2 - canvasRect.left, currentChildRect.top - canvasRect.top]);
            this.renderChildTree(child, currentChildRect, canvasRect);
            leftXTree += childExtent + this.getStepGap();
        });
    }
    render(flow, pretty, skipAdjustDimensions = false) {
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
        const canvasRect = this.getCanvasContentElement().getBoundingClientRect();
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
    }
    resetAdjustDimensions() {
        // reset canvas auto sizing to original size if empty
        if (this.viewContainer) {
            const canvasWrapper = this.getCanvasContentElement();
            canvasWrapper.style.minWidth = null;
            canvasWrapper.style.minHeight = null;
        }
    }
    findDropLocationForHover(absMouseXY, targetStep, stepToDrop) {
        if (!targetStep.shouldEvalDropHover(absMouseXY, stepToDrop)) {
            return 'deadzone';
        }
        const stepRect = targetStep.nativeElement.getBoundingClientRect();
        const yStepCenter = stepRect.bottom - stepRect.height / 2;
        const xStepCenter = stepRect.left + stepRect.width / 2;
        const yDiff = absMouseXY[1] - yStepCenter;
        const xDiff = absMouseXY[0] - xStepCenter;
        const absYDistance = Math.abs(yDiff);
        const absXDistance = Math.abs(xDiff);
        //#math class #Pythagoras
        const distance = Math.sqrt(absYDistance * absYDistance + absXDistance * absXDistance);
        const accuracyRadius = (stepRect.height + stepRect.width) / 2;
        let result = null;
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
    }
    adjustDimensions(flow, canvasRect) {
        let maxRight = 0;
        let maxBottom = 0;
        //TODO this can be better
        flow.steps.forEach(ele => {
            let rect = ele.getCurrentRect(canvasRect);
            maxRight = Math.max(rect.right, maxRight);
            maxBottom = Math.max(rect.bottom, maxBottom);
        });
        const widthBorderGap = 100;
        const widthDiff = canvasRect.width - (maxRight - canvasRect.left);
        if (widthDiff < widthBorderGap) {
            let growWidth = widthBorderGap;
            if (widthDiff < 0) {
                growWidth += Math.abs(widthDiff);
            }
            this.getCanvasContentElement().style.minWidth = `${canvasRect.width + growWidth}px`;
            if (this.options.options.centerOnResize) {
                this.render(flow, true, true);
            }
        }
        else if (widthDiff > widthBorderGap) {
            var totalTreeWidth = this.getTotalTreeWidth(flow);
            if (this.isNestedCanvas()) {
                this.getCanvasContentElement().style.minWidth = `${totalTreeWidth + widthBorderGap}px`;
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
        const heightBorderGap = 50;
        const heightDiff = canvasRect.height - (maxBottom - canvasRect.top);
        if (heightDiff < heightBorderGap) {
            let growHeight = heightBorderGap;
            if (heightDiff < 0) {
                growHeight += Math.abs(heightDiff);
            }
            this.getCanvasContentElement().style.minHeight = `${canvasRect.height + growHeight}px`;
        }
        else if (heightDiff > heightBorderGap) {
            if (this.isNestedCanvas()) {
                let shrinkHeight = heightDiff - heightBorderGap;
                this.getCanvasContentElement().style.minHeight = `${canvasRect.height - shrinkHeight}px`;
            }
            else if (this.getCanvasContentElement().style.minHeight) {
                // reset normal canvas height if auto height set
                this.getCanvasContentElement().style.minHeight = null;
            }
        }
    }
    getTotalTreeWidth(flow) {
        let totalTreeWidth = 0;
        const rootWidth = flow.rootStep.getCurrentRect().width / this.scale;
        flow.rootStep.children.forEach(child => {
            let totalChildWidth = child.getNodeTreeWidth(this.getStepGap());
            totalTreeWidth += totalChildWidth / this.scale;
        });
        totalTreeWidth += (flow.rootStep.children.length - 1) * this.getStepGap();
        // total tree width doesn't give root width
        return Math.max(totalTreeWidth, rootWidth);
    }
    findBestMatchForSteps(dragStep, event, steps) {
        const absXY = [event.clientX, event.clientY];
        let bestMatch = null;
        for (let i = 0; i < steps.length; i++) {
            const step = steps[i];
            if (step.isHidden()) {
                continue;
            }
            const position = this.findDropLocationForHover(absXY, step, dragStep);
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
    }
    findAndShowClosestDrop(dragStep, event, steps) {
        if (!steps || steps.length == 0) {
            return;
        }
        let bestMatch = this.findBestMatchForSteps(dragStep, event, steps);
        // TODO make this more efficient. two loops
        steps.forEach(step => {
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
    }
    showSnaps(dragStep) {
    }
    clearAllSnapIndicators(steps) {
        steps.forEach(step => step.clearHoverIcons());
    }
    setRootPosition(step, dragEvent) {
        if (!dragEvent) {
            const canvasTop = this.getCanvasTopCenterPosition(step.nativeElement);
            step.zsetPosition(canvasTop, true);
            return;
        }
        switch (this.options.options.rootPosition) {
            case 'CENTER':
                const canvasCenter = this.getCanvasCenterPosition();
                step.zsetPosition(canvasCenter, true);
                return;
            case 'TOP_CENTER':
                const canvasTop = this.getCanvasTopCenterPosition(step.nativeElement);
                step.zsetPosition(canvasTop, true);
                return;
            default:
                const relativeXY = this.getRelativeXY(dragEvent);
                step.zsetPosition(relativeXY, true);
                return;
        }
    }
    getRelativeXY(dragEvent) {
        const canvasRect = this.getCanvasContentElement().getBoundingClientRect();
        return [
            dragEvent.clientX - canvasRect.left,
            dragEvent.clientY - canvasRect.top
        ];
    }
    getCanvasTopCenterPosition(htmlRootElement) {
        const canvasRect = this.getCanvasContentElement().getBoundingClientRect();
        const rootElementHeight = htmlRootElement.getBoundingClientRect().height;
        const yCoord = rootElementHeight / 2 + this.options.options.stepGap;
        const scaleYOffset = (1 - this.scale) * 100;
        return [
            canvasRect.width / (this.scale * 2),
            yCoord + scaleYOffset
        ];
    }
    getCanvasCenterPosition() {
        const canvasRect = this.getCanvasContentElement().getBoundingClientRect();
        return [
            canvasRect.width / 2,
            canvasRect.height / 2
        ];
    }
    getCanvasContentElement() {
        const canvas = this.viewContainer.element.nativeElement;
        let canvasContent = canvas.getElementsByClassName(CONSTANTS.CANVAS_CONTENT_CLASS).item(0);
        return canvasContent;
    }
    isNestedCanvas() {
        if (this.viewContainer) {
            const canvasWrapper = this.viewContainer.element.nativeElement.parentElement;
            if (canvasWrapper) {
                return canvasWrapper.classList.contains('ngflowchart-step-wrapper');
            }
        }
        return false;
    }
    resetScale(flow) {
        this.setScale(flow, 1);
    }
    scaleUp(flow, step) {
        const newScale = this.scale + (this.scale * step || this.options.options.zoom.defaultStep);
        this.setScale(flow, newScale);
    }
    scaleDown(flow, step) {
        const newScale = this.scale - (this.scale * step || this.options.options.zoom.defaultStep);
        this.setScale(flow, newScale);
    }
    setScale(flow, scaleValue) {
        var _a;
        const minDimAdjust = `${1 / scaleValue * 100}%`;
        const canvasContent = this.getCanvasContentElement();
        canvasContent.style.transform = `scale(${scaleValue})`;
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
        this.scaleDebounceTimer = setTimeout(() => {
            canvasContent.classList.remove('scaling');
        }, 300);
    }
}
CanvasRendererService.decorators = [
    { type: Injectable }
];
CanvasRendererService.ctorParameters = () => [
    { type: OptionsService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FudmFzLXJlbmRlcmVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbGliL3NlcnZpY2VzL2NhbnZhcy1yZW5kZXJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBZ0IsVUFBVSxFQUFvQixNQUFNLGVBQWUsQ0FBQztBQUUzRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFHekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBU25ELE1BQU0sT0FBTyxxQkFBcUI7SUFNOUIsWUFDWSxPQUF1QjtRQUF2QixZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUozQixVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBQ2xCLHVCQUFrQixHQUFHLElBQUksQ0FBQTtJQU1qQyxDQUFDO0lBRU0sSUFBSSxDQUFDLGFBQStCO1FBQ3ZDLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSxVQUFVLENBQUMsSUFBNEMsRUFBRSxTQUFxQjtRQUNqRixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDMUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTSxhQUFhLENBQUMsSUFBNEMsRUFBRSxTQUFxQjtRQUNwRixJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVNLGNBQWMsQ0FBQyxJQUE4QixFQUFFLFNBQW9CO1FBQ3RFLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFF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RyxVQUFVLENBQUE7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFFdkIsVUFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsMENBQUUsVUFBVSxFQUFFO1lBQ25DLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDaEQ7UUFFRCxJQUFJLENBQUMsa0JBQWtCLElBQUksWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQ2hFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ3RDLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQzdDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQTtJQUVYLENBQUM7OztZQXpiSixVQUFVOzs7WUFSRixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50UmVmLCBJbmplY3RhYmxlLCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nRmxvd2NoYXJ0IH0gZnJvbSAnLi4vbW9kZWwvZmxvdy5tb2RlbCc7XHJcbmltcG9ydCB7IENPTlNUQU5UUyB9IGZyb20gJy4uL21vZGVsL2Zsb3djaGFydC5jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBDYW52YXNGbG93IH0gZnJvbSAnLi4vbmctZmxvd2NoYXJ0LWNhbnZhcy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50IH0gZnJvbSAnLi4vbmctZmxvd2NoYXJ0LXN0ZXAvbmctZmxvd2NoYXJ0LXN0ZXAuY29tcG9uZW50JztcclxuaW1wb3J0IHsgT3B0aW9uc1NlcnZpY2UgfSBmcm9tICcuL29wdGlvbnMuc2VydmljZSc7XHJcblxyXG5leHBvcnQgdHlwZSBEcm9wUHJveGltaXR5ID0ge1xyXG4gICAgc3RlcDogTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50LFxyXG4gICAgcG9zaXRpb246IE5nRmxvd2NoYXJ0LkRyb3BQb3NpdGlvbixcclxuICAgIHByb3hpbWl0eTogbnVtYmVyXHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBDYW52YXNSZW5kZXJlclNlcnZpY2Uge1xyXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmO1xyXG5cclxuICAgIHByaXZhdGUgc2NhbGU6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIHNjYWxlRGVib3VuY2VUaW1lciA9IG51bGxcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIG9wdGlvbnM6IE9wdGlvbnNTZXJ2aWNlXHJcbiAgICApIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGluaXQodmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikge1xyXG4gICAgICAgIHRoaXMudmlld0NvbnRhaW5lciA9IHZpZXdDb250YWluZXI7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHJlbmRlclJvb3Qoc3RlcDogQ29tcG9uZW50UmVmPE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudD4sIGRyYWdFdmVudD86IERyYWdFdmVudCkge1xyXG4gICAgICAgIHRoaXMuZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKS5hcHBlbmRDaGlsZCgoc3RlcC5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KSk7XHJcbiAgICAgICAgdGhpcy5zZXRSb290UG9zaXRpb24oc3RlcC5pbnN0YW5jZSwgZHJhZ0V2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVuZGVyTm9uUm9vdChzdGVwOiBDb21wb25lbnRSZWY8TmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50PiwgZHJhZ0V2ZW50PzogRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5nZXRDYW52YXNDb250ZW50RWxlbWVudCgpLmFwcGVuZENoaWxkKChzdGVwLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlUG9zaXRpb24oc3RlcDogTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50LCBkcmFnRXZlbnQ6IERyYWdFdmVudCkge1xyXG4gICAgICAgIGxldCByZWxhdGl2ZVhZID0gdGhpcy5nZXRSZWxhdGl2ZVhZKGRyYWdFdmVudCk7XHJcblxyXG4gICAgICAgIHJlbGF0aXZlWFkgPSByZWxhdGl2ZVhZLm1hcChjb29yZCA9PiBjb29yZCAvIHRoaXMuc2NhbGUpXHJcbiAgICAgICAgc3RlcC56c2V0UG9zaXRpb24ocmVsYXRpdmVYWSwgdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRTdGVwR2FwKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wdGlvbnMub3B0aW9ucy5zdGVwR2FwO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVuZGVyQ2hpbGRUcmVlKHJvb3ROb2RlOiBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQsIHJvb3RSZWN0OiBQYXJ0aWFsPERPTVJlY3Q+LCBjYW52YXNSZWN0OiBET01SZWN0KSB7XHJcbiAgICAgICAgLy90aGUgcm9vdE5vZGUgcGFzc2VkIGluIGlzIGFscmVhZHkgcmVuZGVyZWQuIGp1c3QgbmVlZCB0byByZW5kZXIgaXRzIGNoaWxkcmVuIC9zdWJ0cmVlXHJcblxyXG4gICAgICAgIGlmICghcm9vdE5vZGUuaGFzQ2hpbGRyZW4oKSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL3RvcCBvZiB0aGUgY2hpbGQgcm93IGlzIHNpbXBseSB0aGUgcmVsYXRpdmUgYm90dG9tIG9mIHRoZSByb290ICsgc3RlcEdhcFxyXG4gICAgICAgIGNvbnN0IGNoaWxkWVRvcCA9IChyb290UmVjdC5ib3R0b20gLSBjYW52YXNSZWN0LnRvcCAqIHRoaXMuc2NhbGUpICsgdGhpcy5nZXRTdGVwR2FwKCk7XHJcbiAgXHJcbiAgICAgICAgY29uc3Qgcm9vdFdpZHRoID0gcm9vdFJlY3Qud2lkdGggLyB0aGlzLnNjYWxlXHJcblxyXG4gICAgICAgIGNvbnN0IHJvb3RYQ2VudGVyID0gKHJvb3RSZWN0LmxlZnQgLSBjYW52YXNSZWN0LmxlZnQpICsgKHJvb3RXaWR0aCAvIDIpO1xyXG5cclxuXHJcbiAgICAgICAgLy9nZXQgdGhlIHdpZHRoIG9mIHRoZSBjaGlsZCB0cmVlc1xyXG4gICAgICAgIGxldCBjaGlsZFRyZWVXaWR0aHMgPSB7fTtcclxuICAgICAgICBsZXQgdG90YWxUcmVlV2lkdGggPSAwO1xyXG5cclxuICAgICAgICByb290Tm9kZS5jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICAgICAgbGV0IHRvdGFsQ2hpbGRXaWR0aCA9IGNoaWxkLmdldE5vZGVUcmVlV2lkdGgodGhpcy5nZXRTdGVwR2FwKCkpO1xyXG4gICAgICAgICAgICB0b3RhbENoaWxkV2lkdGggPSB0b3RhbENoaWxkV2lkdGggLyB0aGlzLnNjYWxlXHJcbiAgICAgICAgICAgIGNoaWxkVHJlZVdpZHRoc1tjaGlsZC5uYXRpdmVFbGVtZW50LmlkXSA9IHRvdGFsQ2hpbGRXaWR0aDtcclxuXHJcbiAgICAgICAgICAgIHRvdGFsVHJlZVdpZHRoICs9IHRvdGFsQ2hpbGRXaWR0aDtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9hZGQgbGVuZ3RoIGZvciBzdGVwR2FwcyBiZXR3ZWVuIGNoaWxkIHRyZWVzXHJcbiAgICAgICAgdG90YWxUcmVlV2lkdGggKz0gKHJvb3ROb2RlLmNoaWxkcmVuLmxlbmd0aCAtIDEpICogdGhpcy5nZXRTdGVwR2FwKCk7XHJcblxyXG4gICAgICAgIC8vaWYgd2UgaGF2ZSBtb3JlIHRoYW4gMSBjaGlsZCwgd2Ugd2FudCBoYWxmIHRoZSBleHRlbnQgb24gdGhlIGxlZnQgYW5kIGhhbGYgb24gdGhlIHJpZ2h0XHJcbiAgICAgICAgbGV0IGxlZnRYVHJlZSA9IHJvb3RYQ2VudGVyIC0gKHRvdGFsVHJlZVdpZHRoIC8gMik7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZG9udCBhbGxvdyBpdCB0byBnbyBuZWdhdGl2ZSBzaW5jZSB5b3UgY2FudCBzY3JvbGwgdGhhdCB3YXlcclxuICAgICAgICBsZWZ0WFRyZWUgPSBNYXRoLm1heCgwLCBsZWZ0WFRyZWUpXHJcblxyXG4gICAgICAgIHJvb3ROb2RlLmNoaWxkcmVuLmZvckVhY2goY2hpbGQgPT4ge1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoaWxkRXh0ZW50ID0gY2hpbGRUcmVlV2lkdGhzW2NoaWxkLm5hdGl2ZUVsZW1lbnQuaWRdO1xyXG5cclxuICAgICAgICAgICAgbGV0IGNoaWxkTGVmdCA9IGxlZnRYVHJlZSArIChjaGlsZEV4dGVudCAvIDIpIC0gKGNoaWxkLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggLyAyKTtcclxuXHJcblxyXG4gICAgICAgICAgICBjaGlsZC56c2V0UG9zaXRpb24oW2NoaWxkTGVmdCwgY2hpbGRZVG9wXSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q2hpbGRSZWN0ID0gY2hpbGQuZ2V0Q3VycmVudFJlY3QoY2FudmFzUmVjdCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjaGlsZFdpZHRoID0gY3VycmVudENoaWxkUmVjdC53aWR0aCAvIHRoaXMuc2NhbGVcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgY2hpbGQuemRyYXdBcnJvdyhcclxuICAgICAgICAgICAgICAgIFtyb290WENlbnRlciwgKHJvb3RSZWN0LmJvdHRvbSAtIGNhbnZhc1JlY3QudG9wICogdGhpcy5zY2FsZSldLFxyXG4gICAgICAgICAgICAgICAgW2N1cnJlbnRDaGlsZFJlY3QubGVmdCArIGNoaWxkV2lkdGggLyAyIC0gY2FudmFzUmVjdC5sZWZ0LCBjdXJyZW50Q2hpbGRSZWN0LnRvcCAtIGNhbnZhc1JlY3QudG9wXVxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDaGlsZFRyZWUoY2hpbGQsIGN1cnJlbnRDaGlsZFJlY3QsIGNhbnZhc1JlY3QpO1xyXG4gICAgICAgICAgICBsZWZ0WFRyZWUgKz0gY2hpbGRFeHRlbnQgKyB0aGlzLmdldFN0ZXBHYXAoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHJlbmRlcihmbG93OiBDYW52YXNGbG93LCBwcmV0dHk/OiBib29sZWFuLCBza2lwQWRqdXN0RGltZW5zaW9ucyA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKCFmbG93Lmhhc1Jvb3QoKSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLm9wdGlvbnMuem9vbS5tb2RlID09PSAnRElTQUJMRUQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0QWRqdXN0RGltZW5zaW9ucygpO1xyXG4gICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBhZnRlclJlbmRlciB0byBhbGxvdyBuZXN0ZWQgY2FudmFzIHRvIHJlZHJhdyBwYXJlbnQgY2FudmFzLlxyXG4gICAgICAgICAgICAgICAgLy8gTm90IHN1cmUgaWYgdGhpcyBzY2VuYXJpbyBzaG91bGQgYWxzbyB0cmlnZ2VyIGJlZm9yZVJlbmRlci5cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2FsbGJhY2tzPy5hZnRlclJlbmRlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jYWxsYmFja3MuYWZ0ZXJSZW5kZXIoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMuY2FsbGJhY2tzPy5iZWZvcmVSZW5kZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmNhbGxiYWNrcy5iZWZvcmVSZW5kZXIoKVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2FudmFzUmVjdCA9IHRoaXMuZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBpZiAocHJldHR5KSB7XHJcbiAgICAgICAgICAgIC8vdGhpcyB3aWxsIHBsYWNlIHRoZSByb290IGF0IHRoZSB0b3AgY2VudGVyIG9mIHRoZSBjYW52YXMgYW5kIHJlbmRlciBmcm9tIHRoZXJlXHJcbiAgICAgICAgICAgIHRoaXMuc2V0Um9vdFBvc2l0aW9uKGZsb3cucm9vdFN0ZXAsIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlckNoaWxkVHJlZShmbG93LnJvb3RTdGVwLCBmbG93LnJvb3RTdGVwLmdldEN1cnJlbnRSZWN0KGNhbnZhc1JlY3QpLCBjYW52YXNSZWN0KTtcclxuICAgICAgICBcclxuICAgICAgICBpZiAoIXNraXBBZGp1c3REaW1lbnNpb25zICYmIHRoaXMub3B0aW9ucy5vcHRpb25zLnpvb20ubW9kZSA9PT0gJ0RJU0FCTEVEJykge1xyXG4gICAgICAgICAgICB0aGlzLmFkanVzdERpbWVuc2lvbnMoZmxvdywgY2FudmFzUmVjdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5vcHRpb25zLmNhbGxiYWNrcz8uYWZ0ZXJSZW5kZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmNhbGxiYWNrcy5hZnRlclJlbmRlcigpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgcmVzZXRBZGp1c3REaW1lbnNpb25zKCk6IHZvaWQge1xyXG4gICAgICAgIC8vIHJlc2V0IGNhbnZhcyBhdXRvIHNpemluZyB0byBvcmlnaW5hbCBzaXplIGlmIGVtcHR5XHJcbiAgICAgICAgaWYgKHRoaXMudmlld0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBjb25zdCBjYW52YXNXcmFwcGVyID0gdGhpcy5nZXRDYW52YXNDb250ZW50RWxlbWVudCgpO1xyXG4gICAgICAgICAgICBjYW52YXNXcmFwcGVyLnN0eWxlLm1pbldpZHRoID0gbnVsbDtcclxuICAgICAgICAgICAgY2FudmFzV3JhcHBlci5zdHlsZS5taW5IZWlnaHQgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgICAgICAgICBcclxuXHJcbiAgICBwcml2YXRlIGZpbmREcm9wTG9jYXRpb25Gb3JIb3ZlcihhYnNNb3VzZVhZOiBudW1iZXJbXSwgdGFyZ2V0U3RlcDogTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50LCBzdGVwVG9Ecm9wOiBOZ0Zsb3djaGFydC5TdGVwKTogRHJvcFByb3hpbWl0eSB8ICdkZWFkem9uZScgfCBudWxsIHtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXRTdGVwLnNob3VsZEV2YWxEcm9wSG92ZXIoYWJzTW91c2VYWSwgc3RlcFRvRHJvcCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuICdkZWFkem9uZSdcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN0ZXBSZWN0ID0gdGFyZ2V0U3RlcC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICBjb25zdCB5U3RlcENlbnRlciA9IHN0ZXBSZWN0LmJvdHRvbSAtIHN0ZXBSZWN0LmhlaWdodCAvIDI7XHJcbiAgICAgICAgY29uc3QgeFN0ZXBDZW50ZXIgPSBzdGVwUmVjdC5sZWZ0ICsgc3RlcFJlY3Qud2lkdGggLyAyO1xyXG5cclxuICAgICAgICBjb25zdCB5RGlmZiA9IGFic01vdXNlWFlbMV0gLSB5U3RlcENlbnRlcjtcclxuICAgICAgICBjb25zdCB4RGlmZiA9IGFic01vdXNlWFlbMF0gLSB4U3RlcENlbnRlcjtcclxuXHJcbiAgICAgICAgY29uc3QgYWJzWURpc3RhbmNlID0gTWF0aC5hYnMoeURpZmYpO1xyXG4gICAgICAgIGNvbnN0IGFic1hEaXN0YW5jZSA9IE1hdGguYWJzKHhEaWZmKTtcclxuXHJcbiAgICAgICAgLy8jbWF0aCBjbGFzcyAjUHl0aGFnb3Jhc1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGFic1lEaXN0YW5jZSAqIGFic1lEaXN0YW5jZSArIGFic1hEaXN0YW5jZSAqIGFic1hEaXN0YW5jZSk7XHJcbiAgICAgICAgY29uc3QgYWNjdXJhY3lSYWRpdXMgPSAoc3RlcFJlY3QuaGVpZ2h0ICsgc3RlcFJlY3Qud2lkdGgpIC8gMjtcclxuXHJcbiAgICAgICAgbGV0IHJlc3VsdDogRHJvcFByb3hpbWl0eSB8ICdkZWFkem9uZScgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgaWYgKGRpc3RhbmNlIDwgYWNjdXJhY3lSYWRpdXMpIHtcclxuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgdGhpcy5vcHRpb25zLm9wdGlvbnMuaG92ZXJEZWFkem9uZVJhZGl1cykge1xyXG4gICAgICAgICAgICAgICAgLy9iYXNpY2FsbHkgd2UgYXJlIHRvbyBjbG9zZSB0byB0aGUgbWlkZGxlIHRvIGFjY3VyYXRlbHkgcHJlZGljdCB3aGF0IHBvc2l0aW9uIHRoZXkgd2FudFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gJ2RlYWR6b25lJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGFic1lEaXN0YW5jZSA+IGFic1hEaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXA6IHRhcmdldFN0ZXAsXHJcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHlEaWZmID4gMCA/ICdCRUxPVycgOiAnQUJPVkUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHByb3hpbWl0eTogYWJzWURpc3RhbmNlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLm9wdGlvbnMub3B0aW9ucy5pc1NlcXVlbnRpYWwgJiYgIXRhcmdldFN0ZXAuaXNSb290RWxlbWVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcDogdGFyZ2V0U3RlcCxcclxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogeERpZmYgPiAwID8gJ1JJR0hUJyA6ICdMRUZUJyxcclxuICAgICAgICAgICAgICAgICAgICBwcm94aW1pdHk6IGFic1hEaXN0YW5jZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdCAmJiByZXN1bHQgIT09ICdkZWFkem9uZScpIHtcclxuICAgICAgICAgICAgaWYgKCF0YXJnZXRTdGVwLmdldERyb3BQb3NpdGlvbnNGb3JTdGVwKHN0ZXBUb0Ryb3ApLmluY2x1ZGVzKHJlc3VsdC5wb3NpdGlvbikpIHtcclxuICAgICAgICAgICAgICAgIC8vd2UgaGFkIGEgdmFsaWQgZHJvcCBidXQgdGhlIHRhcmdldCBzdGVwIGRvZXNudCBhbGxvdyB0aGlzIGxvY2F0aW9uXHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgYWRqdXN0RGltZW5zaW9ucyhmbG93OiBDYW52YXNGbG93LCBjYW52YXNSZWN0OiBET01SZWN0KTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1heFJpZ2h0ID0gMDtcclxuICAgICAgICBsZXQgbWF4Qm90dG9tID0gMDtcclxuXHJcbiAgICAgICAgLy9UT0RPIHRoaXMgY2FuIGJlIGJldHRlclxyXG4gICAgICAgIGZsb3cuc3RlcHMuZm9yRWFjaChcclxuICAgICAgICAgICAgZWxlID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCByZWN0ID0gZWxlLmdldEN1cnJlbnRSZWN0KGNhbnZhc1JlY3QpO1xyXG4gICAgICAgICAgICAgICAgbWF4UmlnaHQgPSBNYXRoLm1heChyZWN0LnJpZ2h0LCBtYXhSaWdodCk7XHJcbiAgICAgICAgICAgICAgICBtYXhCb3R0b20gPSBNYXRoLm1heChyZWN0LmJvdHRvbSwgbWF4Qm90dG9tKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcblxyXG4gICAgICAgIGNvbnN0IHdpZHRoQm9yZGVyR2FwID0gMTAwO1xyXG4gICAgICAgIGNvbnN0IHdpZHRoRGlmZiA9IGNhbnZhc1JlY3Qud2lkdGggLSAobWF4UmlnaHQgLSBjYW52YXNSZWN0LmxlZnQpO1xyXG4gICAgICAgIGlmICh3aWR0aERpZmYgPCB3aWR0aEJvcmRlckdhcCkge1xyXG4gICAgICAgICAgICBsZXQgZ3Jvd1dpZHRoID0gd2lkdGhCb3JkZXJHYXA7XHJcbiAgICAgICAgICAgIGlmKHdpZHRoRGlmZiA8IDApIHtcclxuICAgICAgICAgICAgICAgIGdyb3dXaWR0aCArPSBNYXRoLmFicyh3aWR0aERpZmYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKS5zdHlsZS5taW5XaWR0aCA9IGAke2NhbnZhc1JlY3Qud2lkdGggKyBncm93V2lkdGh9cHhgO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLm9wdGlvbnMuY2VudGVyT25SZXNpemUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKGZsb3csIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmKHdpZHRoRGlmZiA+IHdpZHRoQm9yZGVyR2FwKSB7XHJcbiAgICAgICAgICAgIHZhciB0b3RhbFRyZWVXaWR0aCA9IHRoaXMuZ2V0VG90YWxUcmVlV2lkdGgoZmxvdyk7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuaXNOZXN0ZWRDYW52YXMoKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYW52YXNDb250ZW50RWxlbWVudCgpLnN0eWxlLm1pbldpZHRoID0gYCR7dG90YWxUcmVlV2lkdGggKyB3aWR0aEJvcmRlckdhcH1weGA7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLm9wdGlvbnMuY2VudGVyT25SZXNpemUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcihmbG93LCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKS5zdHlsZS5taW5XaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgbm9ybWFsIGNhbnZhcyB3aWR0aCBpZiBhdXRvIHdpZHRoIHNldFxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDYW52YXNDb250ZW50RWxlbWVudCgpLnN0eWxlLm1pbldpZHRoID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMub3B0aW9ucy5jZW50ZXJPblJlc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyKGZsb3csIHRydWUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGNvbnN0IGhlaWdodEJvcmRlckdhcCA9IDUwO1xyXG4gICAgICAgIGNvbnN0IGhlaWdodERpZmYgPSBjYW52YXNSZWN0LmhlaWdodCAtIChtYXhCb3R0b20gLSBjYW52YXNSZWN0LnRvcCk7XHJcbiAgICAgICAgaWYgKGhlaWdodERpZmYgPCBoZWlnaHRCb3JkZXJHYXApIHtcclxuICAgICAgICAgICAgbGV0IGdyb3dIZWlnaHQgPSBoZWlnaHRCb3JkZXJHYXA7XHJcbiAgICAgICAgICAgIGlmKGhlaWdodERpZmYgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBncm93SGVpZ2h0ICs9IE1hdGguYWJzKGhlaWdodERpZmYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKS5zdHlsZS5taW5IZWlnaHQgPSBgJHtjYW52YXNSZWN0LmhlaWdodCArIGdyb3dIZWlnaHR9cHhgO1xyXG4gICAgICAgIH0gZWxzZSBpZihoZWlnaHREaWZmID4gaGVpZ2h0Qm9yZGVyR2FwKXtcclxuICAgICAgICAgICAgaWYodGhpcy5pc05lc3RlZENhbnZhcygpKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2hyaW5rSGVpZ2h0ID0gaGVpZ2h0RGlmZiAtIGhlaWdodEJvcmRlckdhcDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKS5zdHlsZS5taW5IZWlnaHQgPSBgJHtjYW52YXNSZWN0LmhlaWdodCAtIHNocmlua0hlaWdodH1weGA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLmdldENhbnZhc0NvbnRlbnRFbGVtZW50KCkuc3R5bGUubWluSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAvLyByZXNldCBub3JtYWwgY2FudmFzIGhlaWdodCBpZiBhdXRvIGhlaWdodCBzZXRcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKS5zdHlsZS5taW5IZWlnaHQgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0VG90YWxUcmVlV2lkdGgoZmxvdzogQ2FudmFzRmxvdyk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IHRvdGFsVHJlZVdpZHRoID0gMDtcclxuICAgICAgICBjb25zdCByb290V2lkdGggPSBmbG93LnJvb3RTdGVwLmdldEN1cnJlbnRSZWN0KCkud2lkdGggLyB0aGlzLnNjYWxlO1xyXG4gICAgICAgIGZsb3cucm9vdFN0ZXAuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0b3RhbENoaWxkV2lkdGggPSBjaGlsZC5nZXROb2RlVHJlZVdpZHRoKHRoaXMuZ2V0U3RlcEdhcCgpKTtcclxuICAgICAgICAgICAgdG90YWxUcmVlV2lkdGggKz0gdG90YWxDaGlsZFdpZHRoIC8gdGhpcy5zY2FsZTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0b3RhbFRyZWVXaWR0aCArPSAoZmxvdy5yb290U3RlcC5jaGlsZHJlbi5sZW5ndGggLSAxKSAqIHRoaXMuZ2V0U3RlcEdhcCgpO1xyXG4gICAgICAgIC8vIHRvdGFsIHRyZWUgd2lkdGggZG9lc24ndCBnaXZlIHJvb3Qgd2lkdGhcclxuICAgICAgICByZXR1cm4gTWF0aC5tYXgodG90YWxUcmVlV2lkdGgsIHJvb3RXaWR0aCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBmaW5kQmVzdE1hdGNoRm9yU3RlcHMoZHJhZ1N0ZXA6IE5nRmxvd2NoYXJ0LlN0ZXAsIGV2ZW50OiBEcmFnRXZlbnQsIHN0ZXBzOiBSZWFkb25seUFycmF5PE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudD4pOiBEcm9wUHJveGltaXR5IHwgbnVsbCB7XHJcbiAgICAgICAgY29uc3QgYWJzWFkgPSBbZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WV07XHJcblxyXG4gICAgICAgIGxldCBiZXN0TWF0Y2g6IERyb3BQcm94aW1pdHkgPSBudWxsO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0ZXBzLmxlbmd0aDsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzdGVwID0gc3RlcHNbaV07XHJcblxyXG4gICAgICAgICAgICBpZiAoc3RlcC5pc0hpZGRlbigpKSB7XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLmZpbmREcm9wTG9jYXRpb25Gb3JIb3ZlcihhYnNYWSwgc3RlcCwgZHJhZ1N0ZXApO1xyXG4gICAgICAgICAgICBpZiAocG9zaXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PSAnZGVhZHpvbmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmVzdE1hdGNoID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vaWYgdGhpcyBzdGVwIGlzIGNsb3NlciB0aGFuIHByZXZpb3VzIGJlc3QgbWF0Y2ggdGhlbiB3ZSBoYXZlIGEgbmV3IGJlc3RcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGJlc3RNYXRjaCA9PSBudWxsIHx8IGJlc3RNYXRjaC5wcm94aW1pdHkgPiBwb3NpdGlvbi5wcm94aW1pdHkpIHtcclxuICAgICAgICAgICAgICAgICAgICBiZXN0TWF0Y2ggPSBwb3NpdGlvbjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGJlc3RNYXRjaFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBmaW5kQW5kU2hvd0Nsb3Nlc3REcm9wKGRyYWdTdGVwOiBOZ0Zsb3djaGFydC5TdGVwLCBldmVudDogRHJhZ0V2ZW50LCBzdGVwczogUmVhZG9ubHlBcnJheTxOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQ+KTogTmdGbG93Y2hhcnQuRHJvcFRhcmdldCB7XHJcbiAgICAgICAgaWYgKCFzdGVwcyB8fCBzdGVwcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgYmVzdE1hdGNoOiBEcm9wUHJveGltaXR5ID0gdGhpcy5maW5kQmVzdE1hdGNoRm9yU3RlcHMoZHJhZ1N0ZXAsIGV2ZW50LCBzdGVwcyk7XHJcblxyXG4gICAgICAgIC8vIFRPRE8gbWFrZSB0aGlzIG1vcmUgZWZmaWNpZW50LiB0d28gbG9vcHNcclxuICAgICAgICBzdGVwcy5mb3JFYWNoKHN0ZXAgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYmVzdE1hdGNoID09IG51bGwgfHwgc3RlcC5uYXRpdmVFbGVtZW50LmlkICE9PSBiZXN0TWF0Y2guc3RlcC5uYXRpdmVFbGVtZW50LmlkKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgc3RlcC5jbGVhckhvdmVySWNvbnMoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGlmICghYmVzdE1hdGNoKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGJlc3RNYXRjaC5zdGVwLnNob3dIb3Zlckljb24oYmVzdE1hdGNoLnBvc2l0aW9uKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc3RlcDogYmVzdE1hdGNoLnN0ZXAsXHJcbiAgICAgICAgICAgIHBvc2l0aW9uOiBiZXN0TWF0Y2gucG9zaXRpb25cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG93U25hcHMoZHJhZ1N0ZXA6IE5nRmxvd2NoYXJ0LlBlbmRpbmdTdGVwKSB7XHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXJBbGxTbmFwSW5kaWNhdG9ycyhzdGVwczogUmVhZG9ubHlBcnJheTxOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQ+KSB7XHJcbiAgICAgICAgc3RlcHMuZm9yRWFjaChcclxuICAgICAgICAgICAgc3RlcCA9PiBzdGVwLmNsZWFySG92ZXJJY29ucygpXHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc2V0Um9vdFBvc2l0aW9uKHN0ZXA6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCwgZHJhZ0V2ZW50PzogRHJhZ0V2ZW50KSB7XHJcblxyXG4gICAgICAgIGlmICghZHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhc1RvcCA9IHRoaXMuZ2V0Q2FudmFzVG9wQ2VudGVyUG9zaXRpb24oc3RlcC5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgICAgICAgc3RlcC56c2V0UG9zaXRpb24oY2FudmFzVG9wLCB0cnVlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzd2l0Y2ggKHRoaXMub3B0aW9ucy5vcHRpb25zLnJvb3RQb3NpdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlICdDRU5URVInOlxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzQ2VudGVyID0gdGhpcy5nZXRDYW52YXNDZW50ZXJQb3NpdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgc3RlcC56c2V0UG9zaXRpb24oY2FudmFzQ2VudGVyLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgY2FzZSAnVE9QX0NFTlRFUic6XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW52YXNUb3AgPSB0aGlzLmdldENhbnZhc1RvcENlbnRlclBvc2l0aW9uKHN0ZXAubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLnpzZXRQb3NpdGlvbihjYW52YXNUb3AsIHRydWUpXHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWxhdGl2ZVhZID0gdGhpcy5nZXRSZWxhdGl2ZVhZKGRyYWdFdmVudCk7XHJcbiAgICAgICAgICAgICAgICBzdGVwLnpzZXRQb3NpdGlvbihyZWxhdGl2ZVhZLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSZWxhdGl2ZVhZKGRyYWdFdmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICAgICAgY29uc3QgY2FudmFzUmVjdCA9IHRoaXMuZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgZHJhZ0V2ZW50LmNsaWVudFggLSBjYW52YXNSZWN0LmxlZnQsXHJcbiAgICAgICAgICAgIGRyYWdFdmVudC5jbGllbnRZIC0gY2FudmFzUmVjdC50b3BcclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRDYW52YXNUb3BDZW50ZXJQb3NpdGlvbihodG1sUm9vdEVsZW1lbnQ6IEhUTUxFbGVtZW50KSB7XHJcbiAgICAgICAgY29uc3QgY2FudmFzUmVjdCA9IHRoaXMuZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByb290RWxlbWVudEhlaWdodCA9IGh0bWxSb290RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcclxuICAgICAgICBjb25zdCB5Q29vcmQgPSByb290RWxlbWVudEhlaWdodCAvIDIgKyB0aGlzLm9wdGlvbnMub3B0aW9ucy5zdGVwR2FwXHJcbiAgICAgICAgY29uc3Qgc2NhbGVZT2Zmc2V0ID0gKDEgLSB0aGlzLnNjYWxlKSAqIDEwMFxyXG4gICAgICAgICAgICBcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBjYW52YXNSZWN0LndpZHRoIC8gKHRoaXMuc2NhbGUgKiAyKSxcclxuICAgICAgICAgICAgeUNvb3JkICsgc2NhbGVZT2Zmc2V0XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2FudmFzQ2VudGVyUG9zaXRpb24oKSB7XHJcbiAgICAgICAgY29uc3QgY2FudmFzUmVjdCA9IHRoaXMuZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBjYW52YXNSZWN0LndpZHRoIC8gMixcclxuICAgICAgICAgICAgY2FudmFzUmVjdC5oZWlnaHQgLyAyXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgZ2V0Q2FudmFzQ29udGVudEVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMudmlld0NvbnRhaW5lci5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICAgICAgbGV0IGNhbnZhc0NvbnRlbnQgPSBjYW52YXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShDT05TVEFOVFMuQ0FOVkFTX0NPTlRFTlRfQ0xBU1MpLml0ZW0oMCk7XHJcbiAgICAgICAgcmV0dXJuIGNhbnZhc0NvbnRlbnQgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpc05lc3RlZENhbnZhcygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy52aWV3Q29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhc1dyYXBwZXIgPSAodGhpcy52aWV3Q29udGFpbmVyLmVsZW1lbnQubmF0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudCkucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgaWYgKGNhbnZhc1dyYXBwZXIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjYW52YXNXcmFwcGVyLmNsYXNzTGlzdC5jb250YWlucygnbmdmbG93Y2hhcnQtc3RlcC13cmFwcGVyJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXNldFNjYWxlKGZsb3c6IENhbnZhc0Zsb3cpIHtcclxuICAgICAgICB0aGlzLnNldFNjYWxlKGZsb3csIDEpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjYWxlVXAoZmxvdzogQ2FudmFzRmxvdywgc3RlcD8gOiBudW1iZXIpIHtcclxuICAgICAgICBjb25zdCBuZXdTY2FsZSA9IHRoaXMuc2NhbGUgKyAodGhpcy5zY2FsZSAqIHN0ZXAgfHwgdGhpcy5vcHRpb25zLm9wdGlvbnMuem9vbS5kZWZhdWx0U3RlcClcclxuICAgICAgICB0aGlzLnNldFNjYWxlKGZsb3csIG5ld1NjYWxlKVxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNjYWxlRG93bihmbG93OiBDYW52YXNGbG93LCBzdGVwPyA6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IG5ld1NjYWxlID0gdGhpcy5zY2FsZSAtICh0aGlzLnNjYWxlICogc3RlcCB8fCB0aGlzLm9wdGlvbnMub3B0aW9ucy56b29tLmRlZmF1bHRTdGVwKVxyXG4gICAgICAgIHRoaXMuc2V0U2NhbGUoZmxvdywgbmV3U2NhbGUpXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFNjYWxlKGZsb3c6IENhbnZhc0Zsb3csIHNjYWxlVmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IG1pbkRpbUFkanVzdCA9IGAkezEvc2NhbGVWYWx1ZSAqIDEwMH0lYFxyXG5cclxuICAgICAgICBjb25zdCBjYW52YXNDb250ZW50ID0gdGhpcy5nZXRDYW52YXNDb250ZW50RWxlbWVudCgpXHJcblxyXG4gICAgICAgIGNhbnZhc0NvbnRlbnQuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7c2NhbGVWYWx1ZX0pYDtcclxuICAgICAgICBjYW52YXNDb250ZW50LnN0eWxlLm1pbkhlaWdodCA9IG1pbkRpbUFkanVzdFxyXG4gICAgICAgIGNhbnZhc0NvbnRlbnQuc3R5bGUubWluV2lkdGggPSBtaW5EaW1BZGp1c3RcclxuICAgICAgICBjYW52YXNDb250ZW50LnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICd0b3AgbGVmdCdcclxuICAgICAgICBjYW52YXNDb250ZW50LmNsYXNzTGlzdC5hZGQoJ3NjYWxpbmcnKVxyXG5cclxuICAgICAgICB0aGlzLnNjYWxlID0gc2NhbGVWYWx1ZVxyXG4gICAgICAgIHRoaXMucmVuZGVyKGZsb3csIHRydWUpXHJcblxyXG4gICAgICAgIGlmKHRoaXMub3B0aW9ucy5jYWxsYmFja3M/LmFmdGVyU2NhbGUpIHtcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLmNhbGxiYWNrcy5hZnRlclNjYWxlKHRoaXMuc2NhbGUpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuc2NhbGVEZWJvdW5jZVRpbWVyICYmIGNsZWFyVGltZW91dCh0aGlzLnNjYWxlRGVib3VuY2VUaW1lcilcclxuICAgICAgICB0aGlzLnNjYWxlRGVib3VuY2VUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjYW52YXNDb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ3NjYWxpbmcnKVxyXG4gICAgICAgIH0sIDMwMClcclxuXHJcbiAgICB9XHJcblxyXG5cclxufSJdfQ==