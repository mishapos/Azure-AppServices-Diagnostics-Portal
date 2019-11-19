import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { IPanelHeaderRenderer, IPanelProps } from 'office-ui-fabric-react/lib/Panel';


@Component({
  selector: 'category-overview',
  templateUrl: './category-overview.component.html',
  styleUrls: ['./category-overview.component.scss']
})
export class CategoryOverviewComponent implements OnInit {

  categoryId: string = "";
  isOpen: boolean = true;
  navigationContent: InputRendererOptions<IPanelProps>;
  constructor(private _activatedRoute: ActivatedRoute) {


    // this._activatedRoute.paramMap.subscribe(params => {
    //     console.log("category params", params);
    //     this.categoryId = params.get('category');
    //   });
  }

  ngOnInit() {
    this.categoryId = this._activatedRoute.parent.snapshot.params.category;
    // this.navigationContent = useConstCallback((props, defaultRender) => (
    //     <>
    //       <SearchBox placeholder="Search here..." styles={searchboxStyles} ariaLabel="Sample search box. Does not actually search anything." />
    //       {// This custom navigation still renders the close button (defaultRender).
    //       // If you don't use defaultRender, be sure to provide some other way to close the panel.
    //       defaultRender!(props)}
    //     </>
    //   ));

    // this.navigationContent =  {
    //     getProps: defaultProps => ({
    //       ...defaultProps,
    //       label: defaultProps.label.toUpperCase(),
    //       onRenderNavigationContent: (props, defaultRender) => {
    //         <>
    //     <SearchBox placeholder="Search here..." styles={searchboxStyles} ariaLabel="Sample search box. Does not actually search anything." />
    //     {// This custom navigation still renders the close button (defaultRender).
    //     // If you don't use defaultRender, be sure to provide some other way to close the panel.
    //     ${defaultRender!(props)}
    //   </>
    //     }),
    //   };

//     this.navigationContent =   (props, defaultRender) => {
//         `<>
//     <SearchBox placeholder="Search here..." styles={searchboxStyles} ariaLabel="Sample search box. Does not actually search anything." />
//     {// This custom navigation still renders the close button (defaultRender).
//     // If you don't use defaultRender, be sure to provide some other way to close the panel.
//     ${defaultRender!(props)}
//   </>`;
// };
    console.log("routes", this._activatedRoute.parent);
    console.log("categoryId", this.categoryId);
  }

}
