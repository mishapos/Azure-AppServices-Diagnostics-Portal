import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetectorMetaData, DetectorType, HealthStatus } from 'diagnostic-data';
import { IIconProps, ILinkProps, IPanelProps, PanelType } from 'office-ui-fabric-react';
import { FavoriteDetectors } from '../../../shared/models/user-setting';
import { ApplensDiagnosticService } from '../services/applens-diagnostic.service';
import { UserSettingService } from '../services/user-setting.service';

@Component({
  selector: 'favorite-detectors',
  templateUrl: './favorite-detectors.component.html',
  styleUrls: ['./favorite-detectors.component.scss']
})
export class FavoriteDetectorsComponent implements OnInit {

  constructor(private _userSettingService: UserSettingService, private _applensDiagnosticService: ApplensDiagnosticService, private _router: Router, private _activatedRoute: ActivatedRoute) { }
  HealthStatus = HealthStatus;
  allDetectors: DetectorMetaData[] = [];
  favoriteDetectorsForDisplay: DetectorMetaData[] = [];
  unPinnedIconStyles: IIconProps['styles'] = {
    root: {
      height: "16px",
      width: "16px",
      color: "#0078D4",
      cursor: "pointer"
    }
  };

  panelStyles: IPanelProps['styles'] = {
    root: {
      height: "60px",
    },
    content: {
      padding: "0px"
    }
  };

  PanelType = PanelType;
  panelHealthStatus = HealthStatus.Success;
  panelTimer = null;
  showPanel: boolean = false;
  panelMessage: string = "";
  panelErrorMessage: string = "";


  ngOnInit() {
    this._applensDiagnosticService.getDetectors().subscribe(detectors => {
      this.allDetectors = detectors;
      this._userSettingService.getUserSetting().subscribe(userSetting => {
        const favoriteDetectors = userSetting.favoriteDetectors;
        this.favoriteDetectorsForDisplay = this.filterDetectors(favoriteDetectors);
      });
    });
  }

  public navigate(detector: DetectorMetaData) {
    if (detector.type === DetectorType.Detector) {
      this._router.navigate([`./detectors/${detector.id}`], { relativeTo: this._activatedRoute });
    } else {
      this._router.navigate([`./analysis/${detector.id}`,], { relativeTo: this._activatedRoute });
    }
  }

  public removeDetector(detector: DetectorMetaData) {
    this.panelErrorMessage = "";
    this.panelHealthStatus = HealthStatus.Success;

    this._userSettingService.removeFavoriteDetector(detector.id).subscribe(_ => {
      this.autoDismissPanel();
      this.panelMessage = `${detector.type} has been removed`;
    }, err => {
      this.autoDismissPanel();
      this.panelHealthStatus = HealthStatus.Critical;
      this.panelErrorMessage = `Some issue happened while unpinning ${detector.type.toLowerCase()}, Please try again later`;
    });
  }

  private filterDetectors(favoriteDetectors: FavoriteDetectors): DetectorMetaData[] {
    const favoriteDetectorIds = Object.keys(favoriteDetectors);
    const detectors = this.allDetectors.filter(detector => {
      return favoriteDetectorIds.indexOf(detector.id) > -1 && favoriteDetectors[detector.id].type === detector.type;
    });
    this.sortFavoriteDetectorsForDisplay(detectors);
    return detectors;
  }

  private sortFavoriteDetectorsForDisplay(detectors: DetectorMetaData[]): void {
    const typeOrderForDisplay = [DetectorType.Analysis, DetectorType.Detector];
    detectors.sort((a, b) => {
      const aTypeIndex = typeOrderForDisplay.findIndex(t => t === a.type);
      const bTypeIndex = typeOrderForDisplay.findIndex(t => t === b.type);
      if (aTypeIndex === bTypeIndex) return a.name > b.name ? 1 : -1;
      else return aTypeIndex > bTypeIndex ? 1 : -1;
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
