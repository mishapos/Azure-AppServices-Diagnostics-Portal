import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { GenericApiService } from '../../shared/services/generic-api.service';
import { ActivatedRoute } from '@angular/router';
import { DetectorResponse } from 'applens-diagnostics/src/app/diagnostic-data/models/detector';

@Component({
  selector: 'generic-detector',
  templateUrl: './generic-detector.component.html',
  styleUrls: ['./generic-detector.component.css']
})
export class GenericDetectorComponent implements OnInit {

  startTime: moment.Moment;
  endTime: moment.Moment;

  detector: string;

  response: DetectorResponse;

  constructor(private _genericDetectorApi: GenericApiService, private _activatedRoute: ActivatedRoute) {
    this.endTime = moment.tz('Etc/UTC');
    this.startTime = this.endTime.clone().add(-1, 'days');

    this.detector = this._activatedRoute.snapshot.params['detectorName'];
  }

  ngOnInit() {
    this._genericDetectorApi.getDetector(this.detector).subscribe(res => {
      if(res) {
        this.response = res;
      }
    });
  }
}
