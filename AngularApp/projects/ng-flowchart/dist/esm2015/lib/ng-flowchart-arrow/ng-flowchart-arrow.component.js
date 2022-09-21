import { Component, ElementRef, Input, ViewChild } from '@angular/core';
export class NgFlowchartArrowComponent {
    constructor() {
        this.opacity = 1;
        this.containerWidth = 0;
        this.containerHeight = 0;
        this.containerLeft = 0;
        this.containerTop = 0;
        //to be applied on left and right edges
        this.padding = 10;
        this.isLeftFlowing = false;
    }
    set position(pos) {
        this._position = pos;
        this.isLeftFlowing = pos.start[0] > pos.end[0];
        //in the case where steps are directly underneath we need some minimum width
        this.containerWidth = Math.abs(pos.start[0] - pos.end[0]) + (this.padding * 2);
        this.containerLeft = Math.min(pos.start[0], pos.end[0]) - this.padding;
        this.containerHeight = Math.abs(pos.start[1] - pos.end[1]);
        this.containerTop = pos.start[1];
        this.updatePath();
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.updatePath();
    }
    hideArrow() {
        this.opacity = .2;
    }
    showArrow() {
        this.opacity = 1;
    }
    updatePath() {
        var _a;
        if (!((_a = this.arrow) === null || _a === void 0 ? void 0 : _a.nativeElement)) {
            return;
        }
        if (this.isLeftFlowing) {
            this.arrow.nativeElement.setAttribute("d", `
        M${this.containerWidth - this.padding},0 
        L${this.containerWidth - this.padding},${this.containerHeight / 2}
        L${this.padding},${this.containerHeight / 2}
        L${this.padding},${this.containerHeight - 4}
      `);
        }
        else {
            this.arrow.nativeElement.setAttribute("d", `
        M${this.padding},0 
        L${this.padding},${this.containerHeight / 2}
        L${this.containerWidth - this.padding},${this.containerHeight / 2}
        L${this.containerWidth - this.padding},${this.containerHeight - 4}
      `);
        }
    }
}
NgFlowchartArrowComponent.decorators = [
    { type: Component, args: [{
                selector: 'lib-ng-flowchart-arrow',
                template: "<svg\r\n  xmlns=\"http://www.w3.org/2000/svg\"\r\n  [ngStyle]=\"{\r\n      height: containerHeight+'px',\r\n      width: containerWidth+'px',\r\n      left: containerLeft+'px',\r\n      top: containerTop+'px',\r\n      opacity: opacity\r\n  }\"\r\n  class=\"ngflowchart-arrow\"\r\n>\r\n  <defs>\r\n    <marker\r\n      id=\"arrowhead\"\r\n      viewBox=\"0 0 10 10\"\r\n      refX=\"3\"\r\n      refY=\"5\"\r\n      markerWidth=\"5\"\r\n      markerHeight=\"5\"\r\n      orient=\"auto\"\r\n      fill=\"grey\"\r\n    >\r\n      <path d=\"M 0 0 L 10 5 L 0 10 z\" />\r\n    </marker>\r\n  </defs>\r\n  <g id=\"arrowpath\" fill=\"none\" stroke=\"grey\" stroke-width=\"2\" marker-end=\"url(#arrowhead)\">\r\n    <path id=\"arrow\" #arrow />\r\n  </g>\r\n</svg>\r\n",
                styles: ["svg{position:absolute;z-index:0;transition:all .2s}"]
            },] }
];
NgFlowchartArrowComponent.ctorParameters = () => [];
NgFlowchartArrowComponent.propDecorators = {
    arrow: [{ type: ViewChild, args: ['arrow',] }],
    position: [{ type: Input }]
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZmxvd2NoYXJ0LWFycm93LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbmctZmxvd2NoYXJ0LWFycm93L25nLWZsb3djaGFydC1hcnJvdy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBVSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFPL0YsTUFBTSxPQUFPLHlCQUF5QjtJQWtDcEM7UUFaQSxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ1osbUJBQWMsR0FBVyxDQUFDLENBQUM7UUFDM0Isb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFJekIsdUNBQXVDO1FBQy9CLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFDYixrQkFBYSxHQUFHLEtBQUssQ0FBQztJQUVkLENBQUM7SUE3QmpCLElBQ0ksUUFBUSxDQUFDLEdBQXVDO1FBQ2xELElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDO1FBRXJCLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9DLDRFQUE0RTtRQUM1RSxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRS9FLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRXZFLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFnQkQsUUFBUTtJQUNSLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFNBQVM7UUFDUCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRU8sVUFBVTs7UUFDaEIsSUFBSSxRQUFDLElBQUksQ0FBQyxLQUFLLDBDQUFFLGFBQWEsQ0FBQSxFQUFFO1lBQzlCLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO1dBQ3RDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU87V0FDbEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQztXQUM5RCxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQztXQUN4QyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQztPQUM1QyxDQUFDLENBQUM7U0FDSjthQUNJO1lBQ0gsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTtXQUN0QyxJQUFJLENBQUMsT0FBTztXQUNaLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDO1dBQ3hDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZUFBZSxHQUFHLENBQUM7V0FDOUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQztPQUNsRSxDQUFDLENBQUM7U0FDSjtJQUdILENBQUM7OztZQS9FRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsb3dCQUFrRDs7YUFFbkQ7Ozs7b0JBR0UsU0FBUyxTQUFDLE9BQU87dUJBR2pCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdsaWItbmctZmxvd2NoYXJ0LWFycm93JyxcclxuICB0ZW1wbGF0ZVVybDogJy4vbmctZmxvd2NoYXJ0LWFycm93LmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi9uZy1mbG93Y2hhcnQtYXJyb3cuY29tcG9uZW50LnNjc3MnXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTmdGbG93Y2hhcnRBcnJvd0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJWaWV3SW5pdCB7XHJcblxyXG4gIEBWaWV3Q2hpbGQoJ2Fycm93JylcclxuICBhcnJvdzogRWxlbWVudFJlZjtcclxuXHJcbiAgQElucHV0KClcclxuICBzZXQgcG9zaXRpb24ocG9zOiB7IHN0YXJ0OiBudW1iZXJbXSwgZW5kOiBudW1iZXJbXSB9KSB7XHJcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvcztcclxuXHJcbiAgICB0aGlzLmlzTGVmdEZsb3dpbmcgPSBwb3Muc3RhcnRbMF0gPiBwb3MuZW5kWzBdO1xyXG5cclxuICAgIC8vaW4gdGhlIGNhc2Ugd2hlcmUgc3RlcHMgYXJlIGRpcmVjdGx5IHVuZGVybmVhdGggd2UgbmVlZCBzb21lIG1pbmltdW0gd2lkdGhcclxuICAgIHRoaXMuY29udGFpbmVyV2lkdGggPSBNYXRoLmFicyhwb3Muc3RhcnRbMF0gLSBwb3MuZW5kWzBdKSArICh0aGlzLnBhZGRpbmcgKiAyKTtcclxuXHJcbiAgICB0aGlzLmNvbnRhaW5lckxlZnQgPSBNYXRoLm1pbihwb3Muc3RhcnRbMF0sIHBvcy5lbmRbMF0pIC0gdGhpcy5wYWRkaW5nO1xyXG5cclxuICAgIHRoaXMuY29udGFpbmVySGVpZ2h0ID0gTWF0aC5hYnMocG9zLnN0YXJ0WzFdIC0gcG9zLmVuZFsxXSk7XHJcbiAgICB0aGlzLmNvbnRhaW5lclRvcCA9IHBvcy5zdGFydFsxXTtcclxuXHJcbiAgICB0aGlzLnVwZGF0ZVBhdGgoKTtcclxuICB9XHJcblxyXG4gIG9wYWNpdHkgPSAxO1xyXG4gIGNvbnRhaW5lcldpZHRoOiBudW1iZXIgPSAwO1xyXG4gIGNvbnRhaW5lckhlaWdodDogbnVtYmVyID0gMDtcclxuICBjb250YWluZXJMZWZ0OiBudW1iZXIgPSAwO1xyXG4gIGNvbnRhaW5lclRvcDogbnVtYmVyID0gMDtcclxuICBfcG9zaXRpb246IHsgc3RhcnQ6IG51bWJlcltdLCBlbmQ6IG51bWJlcltdIH1cclxuXHJcblxyXG4gIC8vdG8gYmUgYXBwbGllZCBvbiBsZWZ0IGFuZCByaWdodCBlZGdlc1xyXG4gIHByaXZhdGUgcGFkZGluZyA9IDEwO1xyXG4gIHByaXZhdGUgaXNMZWZ0Rmxvd2luZyA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHsgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgIHRoaXMudXBkYXRlUGF0aCgpO1xyXG4gIH1cclxuXHJcbiAgaGlkZUFycm93KCkge1xyXG4gICAgdGhpcy5vcGFjaXR5ID0gLjI7XHJcbiAgfVxyXG5cclxuICBzaG93QXJyb3coKSB7XHJcbiAgICB0aGlzLm9wYWNpdHkgPSAxO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB1cGRhdGVQYXRoKCkge1xyXG4gICAgaWYgKCF0aGlzLmFycm93Py5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5pc0xlZnRGbG93aW5nKSB7XHJcbiAgICAgIHRoaXMuYXJyb3cubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkXCIsIGBcclxuICAgICAgICBNJHt0aGlzLmNvbnRhaW5lcldpZHRoIC0gdGhpcy5wYWRkaW5nfSwwIFxyXG4gICAgICAgIEwke3RoaXMuY29udGFpbmVyV2lkdGggLSB0aGlzLnBhZGRpbmd9LCR7dGhpcy5jb250YWluZXJIZWlnaHQgLyAyfVxyXG4gICAgICAgIEwke3RoaXMucGFkZGluZ30sJHt0aGlzLmNvbnRhaW5lckhlaWdodCAvIDJ9XHJcbiAgICAgICAgTCR7dGhpcy5wYWRkaW5nfSwke3RoaXMuY29udGFpbmVySGVpZ2h0IC0gNH1cclxuICAgICAgYCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgdGhpcy5hcnJvdy5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRcIiwgYFxyXG4gICAgICAgIE0ke3RoaXMucGFkZGluZ30sMCBcclxuICAgICAgICBMJHt0aGlzLnBhZGRpbmd9LCR7dGhpcy5jb250YWluZXJIZWlnaHQgLyAyfVxyXG4gICAgICAgIEwke3RoaXMuY29udGFpbmVyV2lkdGggLSB0aGlzLnBhZGRpbmd9LCR7dGhpcy5jb250YWluZXJIZWlnaHQgLyAyfVxyXG4gICAgICAgIEwke3RoaXMuY29udGFpbmVyV2lkdGggLSB0aGlzLnBhZGRpbmd9LCR7dGhpcy5jb250YWluZXJIZWlnaHQgLSA0fVxyXG4gICAgICBgKTtcclxuICAgIH1cclxuXHJcblxyXG4gIH1cclxuXHJcbn1cclxuIl19