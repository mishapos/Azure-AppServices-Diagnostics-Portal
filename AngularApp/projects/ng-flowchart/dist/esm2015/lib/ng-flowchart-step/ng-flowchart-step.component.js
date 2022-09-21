var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Component, ComponentRef, ElementRef, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { CONSTANTS } from '../model/flowchart.constants';
import { NgFlowchartArrowComponent } from '../ng-flowchart-arrow/ng-flowchart-arrow.component';
import { NgFlowchartCanvasService } from '../ng-flowchart-canvas.service';
export class NgFlowchartStepComponent {
    constructor() {
        this.viewInit = new EventEmitter();
        this._currentPosition = [0, 0];
        this._isHidden = false;
        this._children = [];
    }
    onMoveStart(event) {
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
    }
    onMoveEnd(event) {
        this.showTree();
    }
    init(drop, viewContainer, compFactory) {
        this.drop = drop;
        this.viewContainer = viewContainer;
        this.compFactory = compFactory;
    }
    canDeleteStep() {
        return true;
    }
    canDrop(dropEvent, error) {
        return true;
    }
    shouldEvalDropHover(coords, stepToDrop) {
        return true;
    }
    onUpload(data) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    getDropPositionsForStep(step) {
        return ['BELOW', 'LEFT', 'RIGHT', 'ABOVE'];
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
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
    }
    get id() {
        if (this._id == null) {
            this._id = 's' + Date.now();
        }
        return this._id;
    }
    get currentPosition() {
        return this._currentPosition;
    }
    /**
     * Creates and adds a child to this step
     * @param template The template or component type to create
     * @param options Add options
     */
    addChild(pending, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let componentRef = yield this.canvas.createStep(pending);
            this.canvas.addToCanvas(componentRef);
            if (options === null || options === void 0 ? void 0 : options.sibling) {
                this.zaddChildSibling0(componentRef.instance, options === null || options === void 0 ? void 0 : options.index);
            }
            else {
                this.zaddChild0(componentRef.instance);
            }
            this.canvas.flow.addStep(componentRef.instance);
            this.canvas.reRender();
            return componentRef.instance;
        });
    }
    /**
     * Destroys this step component and updates all necessary child and parent relationships
     * @param recursive
     * @param checkCallbacks
     */
    destroy(recursive = true, checkCallbacks = true) {
        if (!checkCallbacks || this.canDeleteStep()) {
            this.canvas.options.callbacks.beforeDeleteStep &&
                this.canvas.options.callbacks.beforeDeleteStep(this);
            let parentIndex;
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
    }
    /**
     * Remove a child from this step. Returns the index at which the child was found or -1 if not found.
     * @param childToRemove Step component to remove
     */
    removeChild(childToRemove) {
        if (!this.children) {
            return -1;
        }
        const i = this.children.findIndex(child => child.id == childToRemove.id);
        if (i > -1) {
            this.children.splice(i, 1);
        }
        return i;
    }
    /**
     * Re-parent this step
     * @param newParent The new parent for this step
     * @param force Force the re-parent if a parent already exists
     */
    setParent(newParent, force = false) {
        if (this.parent && !force) {
            console.warn('This child already has a parent, use force if you know what you are doing');
            return;
        }
        this._parent = newParent;
        if (!this._parent && this.arrow) {
            this.arrow.destroy();
            this.arrow = null;
        }
    }
    /**
     * Called when no longer trying to drop or move a step adjacent to this one
     * @param position Position to render the icon
     */
    clearHoverIcons() {
        this.nativeElement.removeAttribute(CONSTANTS.DROP_HOVER_ATTR);
    }
    /**
     * Called when a step is trying to be dropped or moved adjacent to this step.
     * @param position Position to render the icon
     */
    showHoverIcon(position) {
        this.nativeElement.setAttribute(CONSTANTS.DROP_HOVER_ATTR, position.toLowerCase());
    }
    /**
     * Is this the root element of the tree
     */
    isRootElement() {
        return !this.parent;
    }
    /**
     * Does this step have any children?
     * @param count Optional count of children to check. Defaults to 1. I.E has at least 1 child.
     */
    hasChildren(count = 1) {
        return this.children && this.children.length >= count;
    }
    /** Array of children steps for this step */
    get children() {
        return this._children;
    }
    /** The parent step of this step */
    get parent() {
        return this._parent;
    }
    /**
     * Returns the total width extent (in pixels) of this node tree
     * @param stepGap The current step gap for the flow canvas
     */
    getNodeTreeWidth(stepGap) {
        const currentNodeWidth = this.nativeElement.getBoundingClientRect().width;
        if (!this.hasChildren()) {
            return this.nativeElement.getBoundingClientRect().width;
        }
        let childWidth = this._children.reduce((childTreeWidth, child) => {
            return childTreeWidth += child.getNodeTreeWidth(stepGap);
        }, 0);
        childWidth += stepGap * (this._children.length - 1);
        return Math.max(currentNodeWidth, childWidth);
    }
    /**
     * Is this step currently hidden and unavailable as a drop location
     */
    isHidden() {
        return this._isHidden;
    }
    /**
     * Return current rect of this step. The position can be animated so getBoundingClientRect cannot
     * be reliable for positions
     * @param canvasRect Optional canvasRect to provide to offset the values
     */
    getCurrentRect(canvasRect) {
        let clientRect = this.nativeElement.getBoundingClientRect();
        return {
            bottom: this._currentPosition[1] + clientRect.height + ((canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) || 0),
            left: this._currentPosition[0] + ((canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) || 0),
            height: clientRect.height,
            width: clientRect.width,
            right: this._currentPosition[0] + clientRect.width + ((canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.left) || 0),
            top: this._currentPosition[1] + ((canvasRect === null || canvasRect === void 0 ? void 0 : canvasRect.top) || 0)
        };
    }
    /**
     * Returns the JSON representation of this flow step
     */
    toJSON() {
        return {
            id: this.id,
            type: this.type,
            data: this.data,
            children: this.hasChildren() ? this._children.map(child => {
                return child.toJSON();
            }) : []
        };
    }
    /** The native HTMLElement of this step */
    get nativeElement() {
        var _a;
        return (_a = this.view) === null || _a === void 0 ? void 0 : _a.nativeElement;
    }
    setId(id) {
        this._id = id;
    }
    zsetPosition(pos, offsetCenter = false) {
        if (!this.view) {
            console.warn('Trying to set position before view init');
            //save pos and set in after view init
            this._initPosition = [...pos];
            return;
        }
        let adjustedX = Math.max(pos[0] - (offsetCenter ? this.nativeElement.offsetWidth / 2 : 0), 0);
        let adjustedY = Math.max(pos[1] - (offsetCenter ? this.nativeElement.offsetHeight / 2 : 0), 0);
        this.nativeElement.style.left = `${adjustedX}px`;
        this.nativeElement.style.top = `${adjustedY}px`;
        this._currentPosition = [adjustedX, adjustedY];
    }
    zaddChild0(newChild) {
        let oldChildIndex = null;
        if (newChild._parent) {
            oldChildIndex = newChild._parent.removeChild(newChild);
        }
        if (this.hasChildren()) {
            if (newChild.hasChildren()) {
                //if we have children and the child has children we need to confirm the child doesnt have multiple children at any point
                let newChildLastChild = newChild.findLastSingleChild();
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
    }
    zaddChildSibling0(child, index) {
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
    }
    zdrawArrow(start, end) {
        if (!this.arrow) {
            this.createArrow();
        }
        this.arrow.instance.position = {
            start: start,
            end: end
        };
    }
    ////////////////////////
    // PRIVATE IMPL
    destroy0(parentIndex, recursive = true) {
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
                    let newRoot = this._children[0];
                    //set first child as new root
                    this.canvas.flow.rootStep = newRoot;
                    newRoot.setParent(null, true);
                    //make previous siblings children of the new root
                    if (this.hasChildren(2)) {
                        for (let i = 1; i < this._children.length; i++) {
                            let child = this._children[i];
                            child.setParent(newRoot, true);
                            newRoot._children.push(child);
                        }
                    }
                }
            }
            //update children
            let length = this._children.length;
            for (let i = 0; i < length; i++) {
                let child = this._children[i];
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
    }
    createArrow() {
        const factory = this.compFactory.resolveComponentFactory(NgFlowchartArrowComponent);
        this.arrow = this.viewContainer.createComponent(factory);
        this.nativeElement.parentElement.appendChild(this.arrow.location.nativeElement);
    }
    hideTree() {
        this._isHidden = true;
        this.nativeElement.style.opacity = '.4';
        if (this.arrow) {
            this.arrow.instance.hideArrow();
        }
        if (this.hasChildren()) {
            this._children.forEach(child => {
                child.hideTree();
            });
        }
    }
    showTree() {
        this._isHidden = false;
        if (this.arrow) {
            this.arrow.instance.showArrow();
        }
        this.nativeElement.style.opacity = '1';
        if (this.hasChildren()) {
            this._children.forEach(child => {
                child.showTree();
            });
        }
    }
    findLastSingleChild() {
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
    }
    setChildren(children) {
        this._children = children;
        this.children.forEach(child => {
            child.setParent(this, true);
        });
    }
}
NgFlowchartStepComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-flowchart-step',
                template: "<div #canvasContent [id]=\"id\">\r\n  <ng-container\r\n    *ngTemplateOutlet=\"\r\n      contentTemplate;\r\n      context: {\r\n        $implicit: {\r\n          data: data,\r\n          id: id\r\n        }\r\n      }\r\n    \"\r\n  >\r\n  </ng-container>\r\n</div>\r\n",
                encapsulation: ViewEncapsulation.None,
                styles: [".ngflowchart-canvas{overflow:auto;display:flex}.ngflowchart-canvas-content.scaling .ngflowchart-step-wrapper,.ngflowchart-canvas-content.scaling svg{transition:none!important}.ngflowchart-canvas-content{position:relative;min-height:100%;min-width:100%;flex:1 1 100%}.ngflowchart-step-wrapper{height:auto;width:auto;position:absolute;box-sizing:border-box;transition:all .2s;cursor:-webkit-grab;cursor:grab}.ngflowchart-step-wrapper[ngflowchart-drop-hover]:before{content:\"\";width:12px;height:12px;border-radius:100%;position:absolute;z-index:1;background:#8b0000}.ngflowchart-step-wrapper[ngflowchart-drop-hover]:after{content:\"\";width:20px;height:20px;border-radius:100%;position:absolute;z-index:0;background:#c07b7b;-webkit-animation:backgroundOpacity 2s linear infinite;animation:backgroundOpacity 2s linear infinite}.ngflowchart-step-wrapper[ngflowchart-drop-hover=above]:after,.ngflowchart-step-wrapper[ngflowchart-drop-hover=above]:before{top:0;right:50%;transform:translate(50%,-50%)}.ngflowchart-step-wrapper[ngflowchart-drop-hover=below]:after,.ngflowchart-step-wrapper[ngflowchart-drop-hover=below]:before{bottom:0;right:50%;transform:translate(50%,50%)}.ngflowchart-step-wrapper[ngflowchart-drop-hover=right]:after,.ngflowchart-step-wrapper[ngflowchart-drop-hover=right]:before{right:0;top:50%;transform:translate(50%,-50%)}.ngflowchart-step-wrapper[ngflowchart-drop-hover=left]:after,.ngflowchart-step-wrapper[ngflowchart-drop-hover=left]:before{left:0;top:50%;transform:translate(-50%,-50%)}@-webkit-keyframes wiggle{0%{transform:translateX(0);border:2px solid red}25%{transform:translateX(-10px)}50%{transform:translateX(0)}75%{transform:translateX(10px)}to{transform:translateX(0);border:2px solid red}}@keyframes wiggle{0%{transform:translateX(0);border:2px solid red}25%{transform:translateX(-10px)}50%{transform:translateX(0)}75%{transform:translateX(10px)}to{transform:translateX(0);border:2px solid red}}@-webkit-keyframes backgroundOpacity{0%{opacity:.8}50%{opacity:.3}to{opacity:.8}}@keyframes backgroundOpacity{0%{opacity:.8}50%{opacity:.3}to{opacity:.8}}"]
            },] }
];
NgFlowchartStepComponent.ctorParameters = () => [];
NgFlowchartStepComponent.propDecorators = {
    onMoveStart: [{ type: HostListener, args: ['dragstart', ['$event'],] }],
    onMoveEnd: [{ type: HostListener, args: ['dragend', ['$event'],] }],
    view: [{ type: ViewChild, args: ['canvasContent',] }],
    data: [{ type: Input }],
    type: [{ type: Input }],
    canvas: [{ type: Input }],
    compRef: [{ type: Input }],
    viewInit: [{ type: Output }],
    contentTemplate: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZmxvd2NoYXJ0LXN0ZXAuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9uZy1mbG93Y2hhcnQtc3RlcC9uZy1mbG93Y2hhcnQtc3RlcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBNEIsWUFBWSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBb0IsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFdE0sT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLG9EQUFvRCxDQUFDO0FBQy9GLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBb0IxRSxNQUFNLE9BQU8sd0JBQXdCO0lBMkRuQztRQXBCQSxhQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU90QixxQkFBZ0IsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUkxQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBVXhCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUExREQsV0FBVyxDQUFDLEtBQWdCO1FBQzFCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDckMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hCLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNsRCxLQUFLLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUd4RCxJQUFJ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QUMsUUFBUSxFQUFFLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUM7SUFFTyxtQkFBbUI7UUFDekIsb0RBQW9EO1FBQ3BELElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsZ0ZBQWdGO2FBQzNFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzNCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1NBQ2hEO1FBQ0QsbURBQW1EOztZQUM5QyxPQUFPLElBQUksQ0FBQztJQUNuQixDQUFDO0lBRU8sV0FBVyxDQUFDLFFBQXlDO1FBQzNELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzVCLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7O1lBOWZGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsbUJBQW1CO2dCQUM3QiwwUkFBaUQ7Z0JBRWpELGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOzthQUN0Qzs7OzswQkFHRSxZQUFZLFNBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDO3dCQWVwQyxZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO21CQU1sQyxTQUFTLFNBQUMsZUFBZTttQkFHekIsS0FBSzttQkFHTCxLQUFLO3FCQUdMLEtBQUs7c0JBR0wsS0FBSzt1QkFHTCxNQUFNOzhCQUdOLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgQ29tcG9uZW50UmVmLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE91dHB1dCwgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCwgVmlld0NvbnRhaW5lclJlZiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTmdGbG93Y2hhcnQgfSBmcm9tICcuLi9tb2RlbC9mbG93Lm1vZGVsJztcclxuaW1wb3J0IHsgQ09OU1RBTlRTIH0gZnJvbSAnLi4vbW9kZWwvZmxvd2NoYXJ0LmNvbnN0YW50cyc7XHJcbmltcG9ydCB7IE5nRmxvd2NoYXJ0QXJyb3dDb21wb25lbnQgfSBmcm9tICcuLi9uZy1mbG93Y2hhcnQtYXJyb3cvbmctZmxvd2NoYXJ0LWFycm93LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5nRmxvd2NoYXJ0Q2FudmFzU2VydmljZSB9IGZyb20gJy4uL25nLWZsb3djaGFydC1jYW52YXMuc2VydmljZSc7XHJcbmltcG9ydCB7IERyb3BEYXRhU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2Ryb3BkYXRhLnNlcnZpY2UnO1xyXG5cclxuZXhwb3J0IHR5cGUgQWRkQ2hpbGRPcHRpb25zID0ge1xyXG4gIC8qKiBTaG91bGQgdGhlIGNoaWxkIGJlIGFkZGVkIGFzIGEgc2libGluZyB0byBleGlzdGluZyBjaGlsZHJlbiwgaWYgZmFsc2UgdGhlIGV4aXN0aW5nIGNoaWxkcmVuIHdpbGwgYmUgcmVwYXJlbnRlZCB0byB0aGlzIG5ldyBjaGlsZC5cclxuICAgKiBEZWZhdWx0IGlzIHRydWUuXHJcbiAgICogKi9cclxuICBzaWJsaW5nPzogYm9vbGVhbixcclxuICAvKiogVGhlIGluZGV4IG9mIHRoZSBjaGlsZC4gT25seSB1c2VkIHdoZW4gc2libGluZyBpcyB0cnVlLlxyXG4gICAqIERlZmF1bHRzIHRvIHRoZSBlbmQgb2YgdGhlIGNoaWxkIGFycmF5LiBcclxuICAgKi9cclxuICBpbmRleD86IG51bWJlclxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nLWZsb3djaGFydC1zdGVwJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmctZmxvd2NoYXJ0LXN0ZXAuY29tcG9uZW50Lmh0bWwnLFxyXG4gIHN0eWxlVXJsczogWycuL25nLWZsb3djaGFydC1zdGVwLmNvbXBvbmVudC5zY3NzJ10sXHJcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50PFQgPSBhbnk+IHtcclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignZHJhZ3N0YXJ0JywgWyckZXZlbnQnXSlcclxuICBvbk1vdmVTdGFydChldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICBpZiAodGhpcy5jYW52YXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcbiAgICB0aGlzLmhpZGVUcmVlKCk7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndHlwZScsICdGUk9NX0NBTlZBUycpO1xyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoJ2lkJywgdGhpcy5uYXRpdmVFbGVtZW50LmlkKTtcclxuXHJcblxyXG4gICAgdGhpcy5kcm9wLmRyYWdTdGVwID0ge1xyXG4gICAgICB0eXBlOiB0aGlzLnR5cGUsXHJcbiAgICAgIGRhdGE6IHRoaXMuZGF0YSxcclxuICAgICAgaW5zdGFuY2U6IHRoaXNcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2RyYWdlbmQnLCBbJyRldmVudCddKVxyXG4gIG9uTW92ZUVuZChldmVudDogRHJhZ0V2ZW50KSB7XHJcbiAgICB0aGlzLnNob3dUcmVlKCk7XHJcbiAgfVxyXG5cclxuICAvL2NvdWxkIHBvdGVudGlhbGx5IHRyeSB0byBtYWtlIHRoaXMgYWJzdHJhY3RcclxuICBAVmlld0NoaWxkKCdjYW52YXNDb250ZW50JylcclxuICBwcm90ZWN0ZWQgdmlldzogRWxlbWVudFJlZjtcclxuXHJcbiAgQElucHV0KClcclxuICBkYXRhOiBUO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHR5cGU6IHN0cmluZztcclxuXHJcbiAgQElucHV0KClcclxuICBjYW52YXM6IE5nRmxvd2NoYXJ0Q2FudmFzU2VydmljZTtcclxuXHJcbiAgQElucHV0KClcclxuICBjb21wUmVmOiBDb21wb25lbnRSZWY8TmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50PjtcclxuXHJcbiAgQE91dHB1dCgpXHJcbiAgdmlld0luaXQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuXHJcbiAgcHJpdmF0ZSBfaWQ6IGFueTtcclxuICBwcml2YXRlIF9jdXJyZW50UG9zaXRpb24gPSBbMCwgMF07XHJcblxyXG4gIC8vb25seSB1c2VkIGlmIHNvbWV0aGluZyB0cmllcyB0byBzZXQgdGhlIHBvc2l0aW9uIGJlZm9yZSB2aWV3IGhhcyBiZWVuIGluaXRpYWxpemVkXHJcbiAgcHJpdmF0ZSBfaW5pdFBvc2l0aW9uO1xyXG4gIHByaXZhdGUgX2lzSGlkZGVuID0gZmFsc2U7XHJcbiAgcHJpdmF0ZSBfcGFyZW50OiBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQ7XHJcbiAgcHJpdmF0ZSBfY2hpbGRyZW46IEFycmF5PE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudD47XHJcbiAgcHJpdmF0ZSBhcnJvdzogQ29tcG9uZW50UmVmPE5nRmxvd2NoYXJ0QXJyb3dDb21wb25lbnQ+O1xyXG5cclxuICBwcml2YXRlIGRyb3A6IERyb3BEYXRhU2VydmljZTtcclxuICBwcml2YXRlIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWY7XHJcbiAgcHJpdmF0ZSBjb21wRmFjdG9yeTogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2NoaWxkcmVuID0gW107XHJcbiAgfVxyXG5cclxuICBpbml0KGRyb3AsIHZpZXdDb250YWluZXIsIGNvbXBGYWN0b3J5KSB7XHJcbiAgICB0aGlzLmRyb3AgPSBkcm9wO1xyXG4gICAgdGhpcy52aWV3Q29udGFpbmVyID0gdmlld0NvbnRhaW5lcjtcclxuICAgIHRoaXMuY29tcEZhY3RvcnkgPSBjb21wRmFjdG9yeTtcclxuICB9XHJcblxyXG4gIGNhbkRlbGV0ZVN0ZXAoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGNhbkRyb3AoZHJvcEV2ZW50OiBOZ0Zsb3djaGFydC5Ecm9wVGFyZ2V0LCBlcnJvcjogTmdGbG93Y2hhcnQuRXJyb3JNZXNzYWdlKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHNob3VsZEV2YWxEcm9wSG92ZXIoY29vcmRzOiBudW1iZXJbXSwgc3RlcFRvRHJvcDogTmdGbG93Y2hhcnQuU3RlcCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcblxyXG4gIGFzeW5jIG9uVXBsb2FkKGRhdGE6IFQpIHsgfVxyXG5cclxuICBnZXREcm9wUG9zaXRpb25zRm9yU3RlcChzdGVwOiBOZ0Zsb3djaGFydC5TdGVwKTogTmdGbG93Y2hhcnQuRHJvcFBvc2l0aW9uW10ge1xyXG4gICAgcmV0dXJuIFsnQkVMT1cnLCAnTEVGVCcsICdSSUdIVCcsICdBQk9WRSddO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcblxyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgaWYgKCF0aGlzLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgdGhyb3cgJ01pc3NpbmcgY2FudmFzQ29udGVudCBWaWV3Q2hpbGQuIEJlIHN1cmUgdG8gYWRkICNjYW52YXNDb250ZW50IHRvIHlvdXIgcm9vdCBodG1sIGVsZW1lbnQuJ1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbmdmbG93Y2hhcnQtc3RlcC13cmFwcGVyJyk7XHJcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkcmFnZ2FibGUnLCAndHJ1ZScpO1xyXG5cclxuICAgIGlmICh0aGlzLl9pbml0UG9zaXRpb24pIHtcclxuICAgICAgdGhpcy56c2V0UG9zaXRpb24odGhpcy5faW5pdFBvc2l0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvL2ZvcmNlIGlkIGNyZWF0aW9uIGlmIG5vdCBhbHJlYWR5IHRoZXJlXHJcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuaWQgPSB0aGlzLmlkO1xyXG5cclxuICAgIHRoaXMudmlld0luaXQuZW1pdCgpO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlkKCkge1xyXG4gICAgaWYgKHRoaXMuX2lkID09IG51bGwpIHtcclxuICAgICAgdGhpcy5faWQgPSAncycgKyBEYXRlLm5vdygpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX2lkO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGN1cnJlbnRQb3NpdGlvbigpIHtcclxuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UG9zaXRpb247XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGFuZCBhZGRzIGEgY2hpbGQgdG8gdGhpcyBzdGVwXHJcbiAgICogQHBhcmFtIHRlbXBsYXRlIFRoZSB0ZW1wbGF0ZSBvciBjb21wb25lbnQgdHlwZSB0byBjcmVhdGVcclxuICAgKiBAcGFyYW0gb3B0aW9ucyBBZGQgb3B0aW9ucyBcclxuICAgKi9cclxuICBhc3luYyBhZGRDaGlsZChwZW5kaW5nOiBOZ0Zsb3djaGFydC5QZW5kaW5nU3RlcCwgb3B0aW9uczogQWRkQ2hpbGRPcHRpb25zKTogUHJvbWlzZTxOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQgfCBudWxsPiB7XHJcblxyXG4gICAgbGV0IGNvbXBvbmVudFJlZiA9IGF3YWl0IHRoaXMuY2FudmFzLmNyZWF0ZVN0ZXAocGVuZGluZyk7XHJcbiAgICB0aGlzLmNhbnZhcy5hZGRUb0NhbnZhcyhjb21wb25lbnRSZWYpO1xyXG4gICAgaWYgKG9wdGlvbnM/LnNpYmxpbmcpIHtcclxuICAgICAgdGhpcy56YWRkQ2hpbGRTaWJsaW5nMChjb21wb25lbnRSZWYuaW5zdGFuY2UsIG9wdGlvbnM/LmluZGV4KTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLnphZGRDaGlsZDAoY29tcG9uZW50UmVmLmluc3RhbmNlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhbnZhcy5mbG93LmFkZFN0ZXAoY29tcG9uZW50UmVmLmluc3RhbmNlKTtcclxuXHJcbiAgICB0aGlzLmNhbnZhcy5yZVJlbmRlcigpO1xyXG5cclxuICAgIHJldHVybiBjb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZXN0cm95cyB0aGlzIHN0ZXAgY29tcG9uZW50IGFuZCB1cGRhdGVzIGFsbCBuZWNlc3NhcnkgY2hpbGQgYW5kIHBhcmVudCByZWxhdGlvbnNoaXBzXHJcbiAgICogQHBhcmFtIHJlY3Vyc2l2ZSBcclxuICAgKiBAcGFyYW0gY2hlY2tDYWxsYmFja3MgXHJcbiAgICovXHJcbiAgZGVzdHJveShyZWN1cnNpdmU6IGJvb2xlYW4gPSB0cnVlLCBjaGVja0NhbGxiYWNrczogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcclxuXHJcbiAgICBpZiAoIWNoZWNrQ2FsbGJhY2tzIHx8IHRoaXMuY2FuRGVsZXRlU3RlcCgpKSB7XHJcbiAgICAgIHRoaXMuY2FudmFzLm9wdGlvbnMuY2FsbGJhY2tzLmJlZm9yZURlbGV0ZVN0ZXAgJiYgXHJcbiAgICAgIHRoaXMuY2FudmFzLm9wdGlvbnMuY2FsbGJhY2tzLmJlZm9yZURlbGV0ZVN0ZXAodGhpcylcclxuICAgICAgXHJcbiAgICAgIGxldCBwYXJlbnRJbmRleDtcclxuICAgICAgaWYgKHRoaXMuX3BhcmVudCkge1xyXG4gICAgICAgIHBhcmVudEluZGV4ID0gdGhpcy5fcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmRlc3Ryb3kwKHBhcmVudEluZGV4LCByZWN1cnNpdmUpO1xyXG5cclxuICAgICAgdGhpcy5jYW52YXMucmVSZW5kZXIoKTtcclxuXHJcbiAgICAgIHRoaXMuY2FudmFzLm9wdGlvbnMuY2FsbGJhY2tzLmFmdGVyRGVsZXRlU3RlcCAmJiBcclxuICAgICAgdGhpcy5jYW52YXMub3B0aW9ucy5jYWxsYmFja3MuYWZ0ZXJEZWxldGVTdGVwKHRoaXMpXHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogUmVtb3ZlIGEgY2hpbGQgZnJvbSB0aGlzIHN0ZXAuIFJldHVybnMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBjaGlsZCB3YXMgZm91bmQgb3IgLTEgaWYgbm90IGZvdW5kLlxyXG4gICAqIEBwYXJhbSBjaGlsZFRvUmVtb3ZlIFN0ZXAgY29tcG9uZW50IHRvIHJlbW92ZVxyXG4gICAqL1xyXG4gIHJlbW92ZUNoaWxkKGNoaWxkVG9SZW1vdmU6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCk6IG51bWJlciB7XHJcbiAgICBpZiAoIXRoaXMuY2hpbGRyZW4pIHtcclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaSA9IHRoaXMuY2hpbGRyZW4uZmluZEluZGV4KGNoaWxkID0+IGNoaWxkLmlkID09IGNoaWxkVG9SZW1vdmUuaWQpO1xyXG4gICAgaWYgKGkgPiAtMSkge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpLCAxKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlLXBhcmVudCB0aGlzIHN0ZXBcclxuICAgKiBAcGFyYW0gbmV3UGFyZW50IFRoZSBuZXcgcGFyZW50IGZvciB0aGlzIHN0ZXBcclxuICAgKiBAcGFyYW0gZm9yY2UgRm9yY2UgdGhlIHJlLXBhcmVudCBpZiBhIHBhcmVudCBhbHJlYWR5IGV4aXN0c1xyXG4gICAqL1xyXG4gIHNldFBhcmVudChuZXdQYXJlbnQ6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCwgZm9yY2U6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMucGFyZW50ICYmICFmb3JjZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oJ1RoaXMgY2hpbGQgYWxyZWFkeSBoYXMgYSBwYXJlbnQsIHVzZSBmb3JjZSBpZiB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcnKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fcGFyZW50ID0gbmV3UGFyZW50O1xyXG4gICAgaWYgKCF0aGlzLl9wYXJlbnQgJiYgdGhpcy5hcnJvdykge1xyXG4gICAgICB0aGlzLmFycm93LmRlc3Ryb3koKTtcclxuICAgICAgdGhpcy5hcnJvdyA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsbGVkIHdoZW4gbm8gbG9uZ2VyIHRyeWluZyB0byBkcm9wIG9yIG1vdmUgYSBzdGVwIGFkamFjZW50IHRvIHRoaXMgb25lXHJcbiAgICogQHBhcmFtIHBvc2l0aW9uIFBvc2l0aW9uIHRvIHJlbmRlciB0aGUgaWNvblxyXG4gICAqL1xyXG4gIGNsZWFySG92ZXJJY29ucygpIHtcclxuICAgIHRoaXMubmF0aXZlRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoQ09OU1RBTlRTLkRST1BfSE9WRVJfQVRUUik7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDYWxsZWQgd2hlbiBhIHN0ZXAgaXMgdHJ5aW5nIHRvIGJlIGRyb3BwZWQgb3IgbW92ZWQgYWRqYWNlbnQgdG8gdGhpcyBzdGVwLlxyXG4gICAqIEBwYXJhbSBwb3NpdGlvbiBQb3NpdGlvbiB0byByZW5kZXIgdGhlIGljb25cclxuICAgKi9cclxuICBzaG93SG92ZXJJY29uKHBvc2l0aW9uOiBOZ0Zsb3djaGFydC5Ecm9wUG9zaXRpb24pIHtcclxuICAgIHRoaXMubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoQ09OU1RBTlRTLkRST1BfSE9WRVJfQVRUUiwgcG9zaXRpb24udG9Mb3dlckNhc2UoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJcyB0aGlzIHRoZSByb290IGVsZW1lbnQgb2YgdGhlIHRyZWVcclxuICAgKi9cclxuICBpc1Jvb3RFbGVtZW50KCkge1xyXG4gICAgcmV0dXJuICF0aGlzLnBhcmVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIERvZXMgdGhpcyBzdGVwIGhhdmUgYW55IGNoaWxkcmVuP1xyXG4gICAqIEBwYXJhbSBjb3VudCBPcHRpb25hbCBjb3VudCBvZiBjaGlsZHJlbiB0byBjaGVjay4gRGVmYXVsdHMgdG8gMS4gSS5FIGhhcyBhdCBsZWFzdCAxIGNoaWxkLlxyXG4gICAqL1xyXG4gIGhhc0NoaWxkcmVuKGNvdW50OiBudW1iZXIgPSAxKSB7XHJcbiAgICByZXR1cm4gdGhpcy5jaGlsZHJlbiAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+PSBjb3VudDtcclxuICB9XHJcblxyXG4gIC8qKiBBcnJheSBvZiBjaGlsZHJlbiBzdGVwcyBmb3IgdGhpcyBzdGVwICovXHJcbiAgZ2V0IGNoaWxkcmVuKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX2NoaWxkcmVuO1xyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBwYXJlbnQgc3RlcCBvZiB0aGlzIHN0ZXAgKi9cclxuICBnZXQgcGFyZW50KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHRvdGFsIHdpZHRoIGV4dGVudCAoaW4gcGl4ZWxzKSBvZiB0aGlzIG5vZGUgdHJlZVxyXG4gICAqIEBwYXJhbSBzdGVwR2FwIFRoZSBjdXJyZW50IHN0ZXAgZ2FwIGZvciB0aGUgZmxvdyBjYW52YXNcclxuICAgKi9cclxuICBnZXROb2RlVHJlZVdpZHRoKHN0ZXBHYXA6IG51bWJlcikge1xyXG4gICAgY29uc3QgY3VycmVudE5vZGVXaWR0aCA9IHRoaXMubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcclxuXHJcbiAgICBpZiAoIXRoaXMuaGFzQ2hpbGRyZW4oKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjaGlsZFdpZHRoID0gdGhpcy5fY2hpbGRyZW4ucmVkdWNlKChjaGlsZFRyZWVXaWR0aCwgY2hpbGQpID0+IHtcclxuICAgICAgcmV0dXJuIGNoaWxkVHJlZVdpZHRoICs9IGNoaWxkLmdldE5vZGVUcmVlV2lkdGgoc3RlcEdhcCk7XHJcbiAgICB9LCAwKVxyXG5cclxuICAgIGNoaWxkV2lkdGggKz0gc3RlcEdhcCAqICh0aGlzLl9jaGlsZHJlbi5sZW5ndGggLSAxKTtcclxuXHJcbiAgICByZXR1cm4gTWF0aC5tYXgoY3VycmVudE5vZGVXaWR0aCwgY2hpbGRXaWR0aCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBJcyB0aGlzIHN0ZXAgY3VycmVudGx5IGhpZGRlbiBhbmQgdW5hdmFpbGFibGUgYXMgYSBkcm9wIGxvY2F0aW9uXHJcbiAgICovXHJcbiAgaXNIaWRkZW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNIaWRkZW47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm4gY3VycmVudCByZWN0IG9mIHRoaXMgc3RlcC4gVGhlIHBvc2l0aW9uIGNhbiBiZSBhbmltYXRlZCBzbyBnZXRCb3VuZGluZ0NsaWVudFJlY3QgY2Fubm90IFxyXG4gICAqIGJlIHJlbGlhYmxlIGZvciBwb3NpdGlvbnNcclxuICAgKiBAcGFyYW0gY2FudmFzUmVjdCBPcHRpb25hbCBjYW52YXNSZWN0IHRvIHByb3ZpZGUgdG8gb2Zmc2V0IHRoZSB2YWx1ZXNcclxuICAgKi9cclxuICBnZXRDdXJyZW50UmVjdChjYW52YXNSZWN0PzogRE9NUmVjdCk6IFBhcnRpYWw8RE9NUmVjdD4ge1xyXG4gICAgbGV0IGNsaWVudFJlY3QgPSB0aGlzLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgYm90dG9tOiB0aGlzLl9jdXJyZW50UG9zaXRpb25bMV0gKyBjbGllbnRSZWN0LmhlaWdodCArIChjYW52YXNSZWN0Py50b3AgfHwgMCksXHJcbiAgICAgIGxlZnQ6IHRoaXMuX2N1cnJlbnRQb3NpdGlvblswXSArIChjYW52YXNSZWN0Py5sZWZ0IHx8IDApLFxyXG4gICAgICBoZWlnaHQ6IGNsaWVudFJlY3QuaGVpZ2h0LFxyXG4gICAgICB3aWR0aDogY2xpZW50UmVjdC53aWR0aCxcclxuICAgICAgcmlnaHQ6IHRoaXMuX2N1cnJlbnRQb3NpdGlvblswXSArIGNsaWVudFJlY3Qud2lkdGggKyAoY2FudmFzUmVjdD8ubGVmdCB8fCAwKSxcclxuICAgICAgdG9wOiB0aGlzLl9jdXJyZW50UG9zaXRpb25bMV0gKyAoY2FudmFzUmVjdD8udG9wIHx8IDApXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgZmxvdyBzdGVwXHJcbiAgICovXHJcbiAgdG9KU09OKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgaWQ6IHRoaXMuaWQsXHJcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcclxuICAgICAgZGF0YTogdGhpcy5kYXRhLFxyXG4gICAgICBjaGlsZHJlbjogdGhpcy5oYXNDaGlsZHJlbigpID8gdGhpcy5fY2hpbGRyZW4ubWFwKGNoaWxkID0+IHtcclxuICAgICAgICByZXR1cm4gY2hpbGQudG9KU09OKClcclxuICAgICAgfSkgOiBbXVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqIFRoZSBuYXRpdmUgSFRNTEVsZW1lbnQgb2YgdGhpcyBzdGVwICovXHJcbiAgZ2V0IG5hdGl2ZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xyXG4gICAgcmV0dXJuIHRoaXMudmlldz8ubmF0aXZlRWxlbWVudDtcclxuICB9XHJcblxyXG4gIHNldElkKGlkKSB7XHJcbiAgICB0aGlzLl9pZCA9IGlkO1xyXG4gIH1cclxuXHJcbiAgenNldFBvc2l0aW9uKHBvczogbnVtYmVyW10sIG9mZnNldENlbnRlcjogYm9vbGVhbiA9IGZhbHNlKSB7XHJcblxyXG4gICAgaWYgKCF0aGlzLnZpZXcpIHtcclxuICAgICAgY29uc29sZS53YXJuKCdUcnlpbmcgdG8gc2V0IHBvc2l0aW9uIGJlZm9yZSB2aWV3IGluaXQnKTtcclxuICAgICAgLy9zYXZlIHBvcyBhbmQgc2V0IGluIGFmdGVyIHZpZXcgaW5pdFxyXG4gICAgICB0aGlzLl9pbml0UG9zaXRpb24gPSBbLi4ucG9zXTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBhZGp1c3RlZFggPSBNYXRoLm1heChwb3NbMF0gLSAob2Zmc2V0Q2VudGVyID8gdGhpcy5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoIC8gMiA6IDApLCAwKTtcclxuICAgIGxldCBhZGp1c3RlZFkgPSBNYXRoLm1heChwb3NbMV0gLSAob2Zmc2V0Q2VudGVyID8gdGhpcy5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCAvIDIgOiAwKSwgMCk7XHJcblxyXG4gICAgdGhpcy5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBgJHthZGp1c3RlZFh9cHhgO1xyXG4gICAgdGhpcy5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IGAke2FkanVzdGVkWX1weGA7XHJcblxyXG4gICAgdGhpcy5fY3VycmVudFBvc2l0aW9uID0gW2FkanVzdGVkWCwgYWRqdXN0ZWRZXTtcclxuICB9XHJcblxyXG4gIHphZGRDaGlsZDAobmV3Q2hpbGQ6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IG9sZENoaWxkSW5kZXggPSBudWxsXHJcbiAgICBpZiAobmV3Q2hpbGQuX3BhcmVudCkge1xyXG4gICAgICBvbGRDaGlsZEluZGV4ID0gbmV3Q2hpbGQuX3BhcmVudC5yZW1vdmVDaGlsZChuZXdDaGlsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaGFzQ2hpbGRyZW4oKSkge1xyXG4gICAgICBpZiAobmV3Q2hpbGQuaGFzQ2hpbGRyZW4oKSkge1xyXG4gICAgICAgIC8vaWYgd2UgaGF2ZSBjaGlsZHJlbiBhbmQgdGhlIGNoaWxkIGhhcyBjaGlsZHJlbiB3ZSBuZWVkIHRvIGNvbmZpcm0gdGhlIGNoaWxkIGRvZXNudCBoYXZlIG11bHRpcGxlIGNoaWxkcmVuIGF0IGFueSBwb2ludFxyXG4gICAgICAgIGxldCBuZXdDaGlsZExhc3RDaGlsZCA9IG5ld0NoaWxkLmZpbmRMYXN0U2luZ2xlQ2hpbGQoKTtcclxuICAgICAgICBpZiAoIW5ld0NoaWxkTGFzdENoaWxkKSB7XHJcbiAgICAgICAgICBuZXdDaGlsZC5fcGFyZW50LnphZGRDaGlsZFNpYmxpbmcwKG5ld0NoaWxkLCBvbGRDaGlsZEluZGV4KVxyXG4gICAgICAgICAgY29uc29sZS5lcnJvcignSW52YWxpZCBtb3ZlLiBBIG5vZGUgY2Fubm90IGhhdmUgbXVsdGlwbGUgcGFyZW50cycpO1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL21vdmUgdGhlIHRoaXMgbm9kZXMgY2hpbGRyZW4gdG8gbGFzdCBjaGlsZCBvZiB0aGUgc3RlcCBhcmdcclxuICAgICAgICBuZXdDaGlsZExhc3RDaGlsZC5zZXRDaGlsZHJlbih0aGlzLl9jaGlsZHJlbi5zbGljZSgpKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICAvL21vdmUgYWRqYWNlbnQncyBjaGlsZHJlbiB0byBuZXdTdGVwXHJcbiAgICAgICAgbmV3Q2hpbGQuc2V0Q2hpbGRyZW4odGhpcy5fY2hpbGRyZW4uc2xpY2UoKSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICAvL2ZpbmFsbHkgcmVzZXQgdGhpcyBub2RlcyB0byBjaGlsZHJlbiB0byB0aGUgc2luZ2xlIG5ldyBjaGlsZFxyXG4gICAgdGhpcy5zZXRDaGlsZHJlbihbbmV3Q2hpbGRdKTtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgemFkZENoaWxkU2libGluZzAoY2hpbGQ6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmIChjaGlsZC5fcGFyZW50KSB7XHJcbiAgICAgIGNoaWxkLl9wYXJlbnQucmVtb3ZlQ2hpbGQoY2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5jaGlsZHJlbikge1xyXG4gICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKGluZGV4ID09IG51bGwpIHtcclxuICAgICAgdGhpcy5jaGlsZHJlbi5wdXNoKGNoaWxkKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZShpbmRleCwgMCwgY2hpbGQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vc2luY2Ugd2UgYXJlIGFkZGluZyBhIG5ldyBjaGlsZCBoZXJlLCBpdCBpcyBzYWZlIHRvIGZvcmNlIHNldCB0aGUgcGFyZW50XHJcbiAgICBjaGlsZC5zZXRQYXJlbnQodGhpcywgdHJ1ZSk7XHJcbiAgfVxyXG5cclxuICB6ZHJhd0Fycm93KHN0YXJ0OiBudW1iZXJbXSwgZW5kOiBudW1iZXJbXSkge1xyXG4gICAgaWYgKCF0aGlzLmFycm93KSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlQXJyb3coKTtcclxuICAgIH1cclxuICAgIHRoaXMuYXJyb3cuaW5zdGFuY2UucG9zaXRpb24gPSB7XHJcbiAgICAgIHN0YXJ0OiBzdGFydCxcclxuICAgICAgZW5kOiBlbmRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cclxuICAvLyBQUklWQVRFIElNUExcclxuXHJcbiAgcHJpdmF0ZSBkZXN0cm95MChwYXJlbnRJbmRleCwgcmVjdXJzaXZlOiBib29sZWFuID0gdHJ1ZSkge1xyXG5cclxuICAgIHRoaXMuY29tcFJlZi5kZXN0cm95KCk7XHJcbiAgICBcclxuICAgIC8vIHJlbW92ZSBmcm9tIG1hc3RlciBhcnJheVxyXG4gICAgdGhpcy5jYW52YXMuZmxvdy5yZW1vdmVTdGVwKHRoaXMpXHJcblxyXG4gICAgaWYgKHRoaXMuaXNSb290RWxlbWVudCgpKSB7XHJcbiAgICAgIHRoaXMuY2FudmFzLmZsb3cucm9vdFN0ZXAgPSBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmhhc0NoaWxkcmVuKCkpIHtcclxuXHJcbiAgICAgIC8vdGhpcyB3YXMgdGhlIHJvb3Qgbm9kZVxyXG4gICAgICBpZiAodGhpcy5pc1Jvb3RFbGVtZW50KCkpIHtcclxuXHJcbiAgICAgICAgaWYgKCFyZWN1cnNpdmUpIHtcclxuXHJcbiAgICAgICAgICBsZXQgbmV3Um9vdCA9IHRoaXMuX2NoaWxkcmVuWzBdO1xyXG4gICAgICAgICAgLy9zZXQgZmlyc3QgY2hpbGQgYXMgbmV3IHJvb3RcclxuICAgICAgICAgIHRoaXMuY2FudmFzLmZsb3cucm9vdFN0ZXAgPSBuZXdSb290O1xyXG4gICAgICAgICAgbmV3Um9vdC5zZXRQYXJlbnQobnVsbCwgdHJ1ZSk7XHJcblxyXG4gICAgICAgICAgLy9tYWtlIHByZXZpb3VzIHNpYmxpbmdzIGNoaWxkcmVuIG9mIHRoZSBuZXcgcm9vdFxyXG4gICAgICAgICAgaWYgKHRoaXMuaGFzQ2hpbGRyZW4oMikpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoaXMuX2NoaWxkcmVuW2ldO1xyXG4gICAgICAgICAgICAgIGNoaWxkLnNldFBhcmVudChuZXdSb290LCB0cnVlKTtcclxuICAgICAgICAgICAgICBuZXdSb290Ll9jaGlsZHJlbi5wdXNoKGNoaWxkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vdXBkYXRlIGNoaWxkcmVuXHJcbiAgICAgIGxldCBsZW5ndGggPSB0aGlzLl9jaGlsZHJlbi5sZW5ndGg7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBsZXQgY2hpbGQgPSB0aGlzLl9jaGlsZHJlbltpXTtcclxuICAgICAgICBpZiAocmVjdXJzaXZlKSB7XHJcbiAgICAgICAgICAoY2hpbGQgYXMgTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50KS5kZXN0cm95MChudWxsLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbm90IHRoZSBvcmlnaW5hbCByb290IG5vZGVcclxuICAgICAgICBlbHNlIGlmICghIXRoaXMuX3BhcmVudCkge1xyXG4gICAgICAgICAgdGhpcy5fcGFyZW50Ll9jaGlsZHJlbi5zcGxpY2UoaSArIHBhcmVudEluZGV4LCAwLCBjaGlsZCk7XHJcbiAgICAgICAgICBjaGlsZC5zZXRQYXJlbnQodGhpcy5fcGFyZW50LCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zZXRDaGlsZHJlbihbXSk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjcmVhdGVBcnJvdygpIHtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLmNvbXBGYWN0b3J5LnJlc29sdmVDb21wb25lbnRGYWN0b3J5KE5nRmxvd2NoYXJ0QXJyb3dDb21wb25lbnQpXHJcbiAgICB0aGlzLmFycm93ID0gdGhpcy52aWV3Q29udGFpbmVyLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5KTtcclxuICAgIHRoaXMubmF0aXZlRWxlbWVudC5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuYXJyb3cubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhpZGVUcmVlKCkge1xyXG4gICAgdGhpcy5faXNIaWRkZW4gPSB0cnVlO1xyXG4gICAgdGhpcy5uYXRpdmVFbGVtZW50LnN0eWxlLm9wYWNpdHkgPSAnLjQnO1xyXG5cclxuICAgIGlmICh0aGlzLmFycm93KSB7XHJcbiAgICAgIHRoaXMuYXJyb3cuaW5zdGFuY2UuaGlkZUFycm93KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuaGFzQ2hpbGRyZW4oKSkge1xyXG4gICAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcclxuICAgICAgICBjaGlsZC5oaWRlVHJlZSgpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzaG93VHJlZSgpIHtcclxuICAgIHRoaXMuX2lzSGlkZGVuID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKHRoaXMuYXJyb3cpIHtcclxuICAgICAgdGhpcy5hcnJvdy5pbnN0YW5jZS5zaG93QXJyb3coKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm5hdGl2ZUVsZW1lbnQuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgIGlmICh0aGlzLmhhc0NoaWxkcmVuKCkpIHtcclxuICAgICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgICAgY2hpbGQuc2hvd1RyZWUoKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmluZExhc3RTaW5nbGVDaGlsZCgpIHtcclxuICAgIC8vdHdvIG9yIG1vcmUgY2hpbGRyZW4gbWVhbnMgd2UgaGF2ZSBubyBzaW5nbGUgY2hpbGRcclxuICAgIGlmICh0aGlzLmhhc0NoaWxkcmVuKDIpKSB7XHJcbiAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgLy9pZiBvbmUgY2hpbGQuLiBrZWVwIGdvaW5nIGRvd24gdGhlIHRyZWUgdW50aWwgd2UgZmluZCBubyBjaGlsZHJlbiBvciAyIG9yIG1vcmVcclxuICAgIGVsc2UgaWYgKHRoaXMuaGFzQ2hpbGRyZW4oKSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY2hpbGRyZW5bMF0uZmluZExhc3RTaW5nbGVDaGlsZCgpO1xyXG4gICAgfVxyXG4gICAgLy9pZiBubyBjaGlsZHJlbiB0aGVuIHRoaXMgaXMgdGhlIGxhc3Qgc2luZ2xlIGNoaWxkXHJcbiAgICBlbHNlIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZXRDaGlsZHJlbihjaGlsZHJlbjogQXJyYXk8TmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50Pik6IHZvaWQge1xyXG4gICAgdGhpcy5fY2hpbGRyZW4gPSBjaGlsZHJlbjtcclxuICAgIHRoaXMuY2hpbGRyZW4uZm9yRWFjaChjaGlsZCA9PiB7XHJcbiAgICAgIGNoaWxkLnNldFBhcmVudCh0aGlzLCB0cnVlKTtcclxuICAgIH0pXHJcbiAgfVxyXG5cclxufVxyXG4iXX0=