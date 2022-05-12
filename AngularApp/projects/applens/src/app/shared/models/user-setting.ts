import { DetectorType } from "diagnostic-data";

export class UserSetting {
    public resources: RecentResource[];
    public favoriteDetectors: { [key: string]: FavoriteDetectorProps };
    public id: string;
    public theme: string;
    public viewMode: string;
    public expandAnalysisCheckCard: boolean;
    public defaultServiceType: string;

    // constructor(id: string, resources: RecentResource[] = [], theme: string = "light", viewMode: string = "smarter", expandAnalysisCheckCard: boolean = false, defaultServiceType = "", favoriteDetectors: FavoriteDetector[] = []) {
    //     this.id = id;
    //     this.resources = resources;
    //     this.theme = theme;
    //     this.viewMode = viewMode;
    //     this.expandAnalysisCheckCard = expandAnalysisCheckCard;
    //     this.defaultServiceType = defaultServiceType;
    //     this.favoriteDetectors = favoriteDetectors;
    // }


}

export interface RecentResource {
    kind: string;
    resourceUri: string;
    //Todo: starttime and endtime
}


export interface FavoriteDetectorProps {
    type: DetectorType;
}