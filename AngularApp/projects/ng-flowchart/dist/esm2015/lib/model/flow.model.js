var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export var NgFlowchart;
(function (NgFlowchart) {
    class Flow {
        constructor(canvas) {
            this.canvas = canvas;
        }
        /**
         * Returns the json representation of this flow
         * @param indent Optional indent to specify for formatting
         */
        toJSON(indent) {
            return JSON.stringify(this.toObject(), null, indent);
        }
        toObject() {
            var _a;
            return {
                root: (_a = this.canvas.flow.rootStep) === null || _a === void 0 ? void 0 : _a.toJSON()
            };
        }
        /**
         * Create a flow and render it on the canvas from a json string
         * @param json The json string of the flow to render
         */
        upload(json) {
            return __awaiter(this, void 0, void 0, function* () {
                let jsonObj = typeof json === 'string' ? JSON.parse(json) : json;
                let root = jsonObj.root;
                this.clear();
                yield this.canvas.upload(root);
            });
        }
        /**
         * Returns the root step of the flow chart
         */
        getRoot() {
            return this.canvas.flow.rootStep;
        }
        /**
         * Finds a step in the flow chart by a given id
         * @param id Id of the step to find. By default, the html id of the step
         */
        getStep(id) {
            return this.canvas.flow.steps.find(child => child.id == id);
        }
        /**
         * Re-renders the canvas. Generally this should only be used in rare circumstances
         * @param pretty Attempt to recenter the flow in the canvas
         */
        render(pretty) {
            this.canvas.reRender(pretty);
        }
        /**
         * Clears all flow chart, reseting the current canvas
         */
        clear() {
            var _a;
            if ((_a = this.canvas.flow) === null || _a === void 0 ? void 0 : _a.rootStep) {
                this.canvas.flow.rootStep.destroy(true, false);
                this.canvas.reRender();
            }
        }
    }
    NgFlowchart.Flow = Flow;
    class Options {
        constructor() {
            /** The gap (in pixels) between flow steps*/
            this.stepGap = 40;
            /** An inner deadzone radius (in pixels) that will not register the hover icon  */
            this.hoverDeadzoneRadius = 20;
            /** Is the flow sequential? If true, then you will not be able to drag parallel steps */
            this.isSequential = false;
            /** The default root position when dropped. Default is TOP_CENTER */
            this.rootPosition = 'TOP_CENTER';
            /** Should the canvas be centered when a resize is detected? */
            this.centerOnResize = true;
            /** Canvas zoom options. Defaults to mouse wheel zoom */
            this.zoom = {
                mode: 'WHEEL',
                defaultStep: .1
            };
        }
    }
    NgFlowchart.Options = Options;
})(NgFlowchart || (NgFlowchart = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvdy5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvbW9kZWwvZmxvdy5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFJQSxNQUFNLEtBQVcsV0FBVyxDQWlNM0I7QUFqTUQsV0FBaUIsV0FBVztJQUN4QixNQUFhLElBQUk7UUFDYixZQUFvQixNQUFnQztZQUFoQyxXQUFNLEdBQU4sTUFBTSxDQUEwQjtRQUVwRCxDQUFDO1FBRUQ7OztXQUdHO1FBQ0gsTUFBTSxDQUFDLE1BQWU7WUFDbEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUVELFFBQVE7O1lBQ0osT0FBTztnQkFDSCxJQUFJLFFBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSwwQ0FBRSxNQUFNLEVBQUU7YUFDNUMsQ0FBQTtRQUNMLENBQUM7UUFFRDs7O1dBR0c7UUFDRyxNQUFNLENBQUMsSUFBcUI7O2dCQUM5QixJQUFJLE9BQU8sR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQTtnQkFDaEUsSUFBSSxJQUFJLEdBQVEsT0FBTyxDQUFDLElBQUksQ0FBQztnQkFDN0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUViLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsQ0FBQztTQUFBO1FBRUQ7O1dBRUc7UUFDSCxPQUFPO1lBQ0gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDckMsQ0FBQztRQUVEOzs7V0FHRztRQUNILE9BQU8sQ0FBQyxFQUFFO1lBQ04sT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUNoRSxDQUFDO1FBRUQ7OztXQUdHO1FBQ0gsTUFBTSxDQUFDLE1BQWdCO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRDs7V0FFRztRQUNILEtBQUs7O1lBQ0QsVUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksMENBQUUsUUFBUSxFQUFFO2dCQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzthQUMxQjtRQUNMLENBQUM7S0FFSjtJQWhFWSxnQkFBSSxPQWdFaEIsQ0FBQTtJQUVELE1BQWEsT0FBTztRQUFwQjtZQUNJLDRDQUE0QztZQUM1QyxZQUFPLEdBQVksRUFBRSxDQUFDO1lBRXRCLGtGQUFrRjtZQUNsRix3QkFBbUIsR0FBWSxFQUFFLENBQUM7WUFFbEMsd0ZBQXdGO1lBQ3hGLGlCQUFZLEdBQWEsS0FBSyxDQUFDO1lBRS9CLG9FQUFvRTtZQUNwRSxpQkFBWSxHQUFzQyxZQUFZLENBQUM7WUFFL0QsK0RBQStEO1lBQy9ELG1CQUFjLEdBQWEsSUFBSSxDQUFDO1lBRWhDLHdEQUF3RDtZQUN4RCxTQUFJLEdBR0E7Z0JBQ0EsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsV0FBVyxFQUFFLEVBQUU7YUFDbEIsQ0FBQTtRQUNMLENBQUM7S0FBQTtJQXhCWSxtQkFBTyxVQXdCbkIsQ0FBQTtBQXNHTCxDQUFDLEVBak1nQixXQUFXLEtBQVgsV0FBVyxRQWlNM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUZW1wbGF0ZVJlZiwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBOZ0Zsb3djaGFydENhbnZhc1NlcnZpY2UgfSBmcm9tICcuLi9uZy1mbG93Y2hhcnQtY2FudmFzLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQgfSBmcm9tICcuLi9uZy1mbG93Y2hhcnQtc3RlcC9uZy1mbG93Y2hhcnQtc3RlcC5jb21wb25lbnQnO1xyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBOZ0Zsb3djaGFydCB7XHJcbiAgICBleHBvcnQgY2xhc3MgRmxvdyB7XHJcbiAgICAgICAgY29uc3RydWN0b3IocHJpdmF0ZSBjYW52YXM6IE5nRmxvd2NoYXJ0Q2FudmFzU2VydmljZSkge1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIFJldHVybnMgdGhlIGpzb24gcmVwcmVzZW50YXRpb24gb2YgdGhpcyBmbG93XHJcbiAgICAgICAgICogQHBhcmFtIGluZGVudCBPcHRpb25hbCBpbmRlbnQgdG8gc3BlY2lmeSBmb3IgZm9ybWF0dGluZ1xyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRvSlNPTihpbmRlbnQ/OiBudW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudG9PYmplY3QoKSwgbnVsbCwgaW5kZW50KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvT2JqZWN0KCkge1xyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgcm9vdDogdGhpcy5jYW52YXMuZmxvdy5yb290U3RlcD8udG9KU09OKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ3JlYXRlIGEgZmxvdyBhbmQgcmVuZGVyIGl0IG9uIHRoZSBjYW52YXMgZnJvbSBhIGpzb24gc3RyaW5nXHJcbiAgICAgICAgICogQHBhcmFtIGpzb24gVGhlIGpzb24gc3RyaW5nIG9mIHRoZSBmbG93IHRvIHJlbmRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGFzeW5jIHVwbG9hZChqc29uOiBzdHJpbmcgfCBvYmplY3QpOiBQcm9taXNlPHZvaWQ+IHtcclxuICAgICAgICAgICAgbGV0IGpzb25PYmogPSB0eXBlb2YganNvbiA9PT0gJ3N0cmluZycgPyBKU09OLnBhcnNlKGpzb24pIDoganNvblxyXG4gICAgICAgICAgICBsZXQgcm9vdDogYW55ID0ganNvbk9iai5yb290O1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XHJcblxyXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNhbnZhcy51cGxvYWQocm9vdCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZXR1cm5zIHRoZSByb290IHN0ZXAgb2YgdGhlIGZsb3cgY2hhcnRcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRSb290KCk6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5mbG93LnJvb3RTdGVwO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogRmluZHMgYSBzdGVwIGluIHRoZSBmbG93IGNoYXJ0IGJ5IGEgZ2l2ZW4gaWRcclxuICAgICAgICAgKiBAcGFyYW0gaWQgSWQgb2YgdGhlIHN0ZXAgdG8gZmluZC4gQnkgZGVmYXVsdCwgdGhlIGh0bWwgaWQgb2YgdGhlIHN0ZXBcclxuICAgICAgICAgKi9cclxuICAgICAgICBnZXRTdGVwKGlkKTogTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmZsb3cuc3RlcHMuZmluZChjaGlsZCA9PiBjaGlsZC5pZCA9PSBpZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBSZS1yZW5kZXJzIHRoZSBjYW52YXMuIEdlbmVyYWxseSB0aGlzIHNob3VsZCBvbmx5IGJlIHVzZWQgaW4gcmFyZSBjaXJjdW1zdGFuY2VzXHJcbiAgICAgICAgICogQHBhcmFtIHByZXR0eSBBdHRlbXB0IHRvIHJlY2VudGVyIHRoZSBmbG93IGluIHRoZSBjYW52YXNcclxuICAgICAgICAgKi9cclxuICAgICAgICByZW5kZXIocHJldHR5PzogYm9vbGVhbikge1xyXG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5yZVJlbmRlcihwcmV0dHkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2xlYXJzIGFsbCBmbG93IGNoYXJ0LCByZXNldGluZyB0aGUgY3VycmVudCBjYW52YXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBjbGVhcigpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2FudmFzLmZsb3c/LnJvb3RTdGVwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5mbG93LnJvb3RTdGVwLmRlc3Ryb3kodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMucmVSZW5kZXIoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIE9wdGlvbnMge1xyXG4gICAgICAgIC8qKiBUaGUgZ2FwIChpbiBwaXhlbHMpIGJldHdlZW4gZmxvdyBzdGVwcyovXHJcbiAgICAgICAgc3RlcEdhcD86IG51bWJlciA9IDQwO1xyXG5cclxuICAgICAgICAvKiogQW4gaW5uZXIgZGVhZHpvbmUgcmFkaXVzIChpbiBwaXhlbHMpIHRoYXQgd2lsbCBub3QgcmVnaXN0ZXIgdGhlIGhvdmVyIGljb24gICovXHJcbiAgICAgICAgaG92ZXJEZWFkem9uZVJhZGl1cz86IG51bWJlciA9IDIwO1xyXG5cclxuICAgICAgICAvKiogSXMgdGhlIGZsb3cgc2VxdWVudGlhbD8gSWYgdHJ1ZSwgdGhlbiB5b3Ugd2lsbCBub3QgYmUgYWJsZSB0byBkcmFnIHBhcmFsbGVsIHN0ZXBzICovXHJcbiAgICAgICAgaXNTZXF1ZW50aWFsPzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvKiogVGhlIGRlZmF1bHQgcm9vdCBwb3NpdGlvbiB3aGVuIGRyb3BwZWQuIERlZmF1bHQgaXMgVE9QX0NFTlRFUiAqL1xyXG4gICAgICAgIHJvb3RQb3NpdGlvbj86ICdUT1BfQ0VOVEVSJyB8ICdDRU5URVInIHwgJ0ZSRUUnID0gJ1RPUF9DRU5URVInO1xyXG5cclxuICAgICAgICAvKiogU2hvdWxkIHRoZSBjYW52YXMgYmUgY2VudGVyZWQgd2hlbiBhIHJlc2l6ZSBpcyBkZXRlY3RlZD8gKi9cclxuICAgICAgICBjZW50ZXJPblJlc2l6ZT86IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgICAgICAvKiogQ2FudmFzIHpvb20gb3B0aW9ucy4gRGVmYXVsdHMgdG8gbW91c2Ugd2hlZWwgem9vbSAqL1xyXG4gICAgICAgIHpvb20/OiB7XHJcbiAgICAgICAgICAgIG1vZGU6ICdXSEVFTCcgfCAnTUFOVUFMJyB8ICdESVNBQkxFRCdcclxuICAgICAgICAgICAgZGVmYXVsdFN0ZXA/OiBudW1iZXJcclxuICAgICAgICB9ID0ge1xyXG4gICAgICAgICAgICBtb2RlOiAnV0hFRUwnLFxyXG4gICAgICAgICAgICBkZWZhdWx0U3RlcDogLjFcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRHJvcEV2ZW50ID0ge1xyXG4gICAgICAgIHN0ZXA6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCxcclxuICAgICAgICBwYXJlbnQ/OiBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQsXHJcbiAgICAgICAgaXNNb3ZlOiBib29sZWFuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRHJvcEVycm9yID0ge1xyXG4gICAgICAgIHN0ZXA6IFBlbmRpbmdTdGVwLFxyXG4gICAgICAgIHBhcmVudD86IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCxcclxuICAgICAgICBlcnJvcjogRXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgTW92ZUVycm9yID0ge1xyXG4gICAgICAgIHN0ZXA6IE1vdmVTdGVwLFxyXG4gICAgICAgIHBhcmVudD86IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCxcclxuICAgICAgICBlcnJvcjogRXJyb3JNZXNzYWdlXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRXJyb3JNZXNzYWdlID0ge1xyXG4gICAgICAgIGNvZGU/OiBzdHJpbmcsXHJcbiAgICAgICAgbWVzc2FnZT86IHN0cmluZ1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgTW92ZVN0ZXAgZXh0ZW5kcyBTdGVwIHtcclxuICAgICAgICBpbnN0YW5jZTogTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBQZW5kaW5nU3RlcCBleHRlbmRzIFN0ZXAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEFuIE5nLXRlbXBsYXRlIGNvbnRhaW5pbmcgdGhlIGNhbnZhcyBjb250ZW50IHRvIGJlIGRpc3BsYXllZC4gXHJcbiAgICAgICAgICogT3IgYSBjb21wb25lbnQgdHlwZSB0aGF0IGV4dGVuZHMgTmdGbG93Y2hhcnRTdGVwQ29tcG9uZW50XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudD5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIFN0ZXAge1xyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEEgdW5pcXVlIHN0cmluZyBpbmRpY2F0aW5nIHRoZSB0eXBlIG9mIHN0ZXAgdGhpcyBpcy5cclxuICAgICAgICAgKiBUaGlzIHR5cGUgd2lsbCBiZSB1c2VkIHRvIHJlZ2lzdGVyIHN0ZXBzIGlmIHlvdSBhcmUgdXBsb2FkaW5nIGZyb20ganNvbi5cclxuICAgICAgICAgKi9cclxuICAgICAgICB0eXBlOiBzdHJpbmcsXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogT3B0aW9uYWwgZGF0YSB0byBnaXZlIHRoZSBzdGVwLiBUeXBpY2FsbHkgY29uZmlndXJhdGlvbiBkYXRhIHRoYXQgdXNlcnMgY2FuIGVkaXQgb24gdGhlIHN0ZXAuXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZGF0YT86IGFueVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRHJvcFRhcmdldCA9IHtcclxuICAgICAgICBzdGVwOiBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQsXHJcbiAgICAgICAgcG9zaXRpb246IERyb3BQb3NpdGlvblxyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCB0eXBlIERyb3BTdGF0dXMgPSAnU1VDQ0VTUycgfCAnUEVORElORycgfCAnRkFJTEVEJztcclxuICAgIGV4cG9ydCB0eXBlIERyb3BQb3NpdGlvbiA9ICdSSUdIVCcgfCAnTEVGVCcgfCAnQkVMT1cnIHwgJ0FCT1ZFJztcclxuXHJcbiAgICBleHBvcnQgdHlwZSBDYWxsYmFja3MgPSB7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB3aGVuIHVzZXIgZHJvcHMgYSBuZXcgc3RlcCBmcm9tIHRoZSBwYWxldHRlIG9yIG1vdmVzIGFuIGV4aXN0aW5nIHN0ZXBcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRyb3BTdGVwPzogKGRyb3A6IERyb3BFdmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHdoZW4gdGhlIGRlbGV0ZSBtZXRob2QgaGFzIGJlZW4gY2FsbGVkIG9uIHRoZSBzdGVwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYmVmb3JlRGVsZXRlU3RlcD86IChzdGVwOiBOZ0Zsb3djaGFydFN0ZXBDb21wb25lbnQpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCBhZnRlciB0aGUgZGVsZXRlIG1ldGhvZCBoYXMgcnVuIG9uIHRoZSBzdGVwLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3NcclxuICAgICAgICAgKiBzdGVwIGNoaWxkcmVuIG9yIHBhcmVudHMsIHVzZSBiZWZvcmVEZWxldGVTdGVwXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWZ0ZXJEZWxldGVTdGVwPzogKHN0ZXA6IE5nRmxvd2NoYXJ0U3RlcENvbXBvbmVudCkgPT4gdm9pZDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIHdoZW4gYSBuZXcgc3RlcCBmYWlscyB0byBkcm9wIG9uIHRoZSBjYW52YXNcclxuICAgICAgICAgKi9cclxuICAgICAgICBvbkRyb3BFcnJvcj86IChkcm9wOiBEcm9wRXJyb3IpID0+IHZvaWQ7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIENhbGxlZCB3aGVuIGFuIGV4aXN0aW5nIHN0ZXAgZmFpbHMgdG8gbW92ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIG9uTW92ZUVycm9yPzogKGRyb3A6IE1vdmVFcnJvcikgPT4gdm9pZDtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIGJlZm9yZSB0aGUgY2FudmFzIGlzIGFib3V0IHRvIHJlLXJlbmRlclxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGJlZm9yZVJlbmRlcj86ICgpID0+IHZvaWRcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIGFmdGVyIHRoZSBjYW52YXMgY29tcGxldGVzIGEgcmUtcmVuZGVyXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWZ0ZXJSZW5kZXI/OiAoKSA9PiB2b2lkICAgICAgICBcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQ2FsbGVkIGFmdGVyIHRoZSBjYW52YXMgaGFzIGJlZW4gc2NhbGVkXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgYWZ0ZXJTY2FsZT86IChuZXdTY2FsZTogbnVtYmVyKSA9PiB2b2lkXHJcbiAgICB9O1xyXG59XHJcblxyXG5cclxuXHJcblxyXG4iXX0=