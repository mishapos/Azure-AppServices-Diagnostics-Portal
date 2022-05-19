import { DetectorMetaData, DetectorResponse, DetectorType, HealthStatus } from 'diagnostic-data';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApplensDiagnosticService } from '../../services/applens-diagnostic.service';
import { DetectorControlService } from 'diagnostic-data';
import { ApplensCommandBarService } from '../../services/applens-command-bar.service';
import { ApplensGlobal } from 'projects/applens/src/app/applens-global';
import { UserSettingService } from '../../services/user-setting.service';
import { IPanelProps, PanelType } from 'office-ui-fabric-react';

@Component({
  selector: 'tab-data',
  templateUrl: './tab-data.component.html',
  styleUrls: ['./tab-data.component.scss']
})
export class TabDataComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _diagnosticApiService: ApplensDiagnosticService, private _detectorControlService: DetectorControlService, private _applensCommandBarService: ApplensCommandBarService, private _applensGlobal: ApplensGlobal, private _userSettingService: UserSettingService) { }

  detectorResponse: DetectorResponse;

  detector: string;
  detectorMetaData: DetectorMetaData;

  analysisMode: boolean = false;

  hideDetectorControl: boolean = false;

  internalExternalText: string = "";
  readonly internalViewText: string = "Internal view";
  readonly externalViewText: string = "Customer view";

  pinnedDetector: boolean = false;
  get pinUnpinDetectorText() {
    return this.pinnedDetector ? "UnPin" : "Pin"
  }

  get pinUnpinDetectorIcon() {
    return this.pinnedDetector ? "Unpin" : "Pinned"
  }
  panelStyles: IPanelProps['styles'] = {
    root: {
      height: "60px",
    },
    content: {
      padding: "0px"
    }
  }
  PanelType = PanelType;
  panelHealthStatus = HealthStatus.Success;
  panelTimer = null;
  showPanel: boolean = false;
  panelMessage: string = "";
  panelErrorMessage: string = "";



  ngOnInit() {

    this._route.params.subscribe((params: Params) => {
      this.refresh();
    });
    // If route query params contains detectorQueryParams, setting the values in shared service so it is accessible in all components
    this._route.queryParams.subscribe((queryParams: Params) => {
      if (queryParams.detectorQueryParams != undefined) {
        this._detectorControlService.setDetectorQueryParams(queryParams.detectorQueryParams);
      } else {
        this._detectorControlService.setDetectorQueryParams("");
      }

      this.analysisMode = this._route.snapshot.data['analysisMode'];
    });

    if (this._detectorControlService.isInternalView) {
      this.internalExternalText = this.internalViewText;
    }
    else {
      this.internalExternalText = this.externalViewText;
    }
  }

  refresh() {
    this.detector = this._route.snapshot.params['detector'];
    this._diagnosticApiService.getDetectorMetaDataById(this.detector).subscribe(metaData => {
      if (metaData) {
        this._applensGlobal.updateHeader(metaData.name);
        this.detectorMetaData = metaData;
      }
    });

    this._userSettingService.getUserSetting().subscribe(userSetting => {
      if (userSetting && userSetting.favoriteDetectors) {
        const favoriteDetectorIds = Object.keys(userSetting.favoriteDetectors);
        this.pinnedDetector = favoriteDetectorIds.findIndex(d => d.toLowerCase() === this.detector.toLowerCase()) > -1;
      }
    });
  }

  refreshPage() {
    this._applensCommandBarService.refreshPage();
  }

  emailToAuthor() {
    this._applensCommandBarService.getDetectorMeatData(this.detector).subscribe(metaData => {
      this._applensCommandBarService.emailToAuthor(metaData);
    });
  }

  openFeedback() {
    this._applensGlobal.openFeedback = true;
  }

  internalExternalToggle() {
    if (this.internalExternalText === this.externalViewText) {
      this.internalExternalText = this.internalViewText;
    }
    else {
      this.internalExternalText = this.externalViewText;
    }

    this._detectorControlService.toggleInternalExternal();
    this.refreshPage();
  }

  addOrRemoveDetector() {
    this.panelErrorMessage = "";
    this.panelHealthStatus = HealthStatus.Success;
    //Pinned detector can be analysis
    const detectorType = this.detectorMetaData ? this.detectorMetaData.type : DetectorType.Detector;
    const request = this.pinnedDetector ? this._userSettingService.removeFavoriteDetector(this.detector) : this._userSettingService.addFavoriteDetector(this.detector, { type: detectorType });
    
    
    request.subscribe(_ => {
      this.panelMessage = `Detector has been ${this.pinnedDetector ? 'pinned' : 'unpinned'}`;
      this.autoDismissPanel();
    }, err => {
      this.autoDismissPanel();
      this.panelHealthStatus = HealthStatus.Critical;
      if (err === this._userSettingService.overMaxFavoriteDetectorError) {
        this.panelErrorMessage = err;
      } else {
        this.panelErrorMessage = "Some issue happened while updating pinned detector, Please try again later";
      }
    });
  }

  private autoDismissPanel() {
    this.showPanel = true;
    if (this.panelTimer !== null) {
      clearTimeout(this.panelTimer);
    }
    this.panelTimer = setTimeout(() => {
      this.showPanel = false;
    }, 3000);
  }
}
