import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

Injectable()
@Injectable()
export class FeatureNavigationService {

  public lastDetector: string = null;

  private _navigateToDetector :BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor() { }

  public get OnDetectorNavigate(): BehaviorSubject<string> {
    return this._navigateToDetector;
  }

  public NavigateToDetector(sourceDetector: string, detector: string) {
    this.lastDetector = sourceDetector;
    this._navigateToDetector.next(detector);
    this._navigateToDetector.next(null);
  }
}
