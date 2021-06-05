
import { Component, Pipe, PipeTransform, Inject, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DiagnosticData, HealthStatus, RenderingType, TelemetryService } from 'diagnostic-data';
import { IDropdownOption, ISelectableOption } from 'office-ui-fabric-react';
import { DataRenderBaseComponent } from 'projects/diagnostic-data/src/lib/components/data-render-base/data-render-base.component';
import { CheckStepView, DropdownStepView, InfoStepView, StepViewContainer } from '../step-view-lib';



@Component({
  selector: 'info-step',
  templateUrl: './info-step.component.html',
  styleUrls: ['./info-step.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InfoStepComponent extends DataRenderBaseComponent implements OnInit{
  @Input() viewModel: StepViewContainer;
  infoStepView: InfoStepView;
  DataRenderingType = RenderingType.StepViews;
  constructor(private _telemetryService: TelemetryService){
    super(_telemetryService);
  }

  protected processData(data: DiagnosticData) {
    super.processData(data);
  }
  
  ngOnInit(): void {
    super.ngOnInit();
    this.infoStepView = <InfoStepView> this.viewModel.stepView; 
  }

}


