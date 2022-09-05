import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './components/tree-view/tree-view.component';
import { DiagnosticApiService } from './services/diagnostic-api.service';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { HttpClientModule } from '@angular/common/http';
import { SiteService } from './services/site.service';
import { ContainerAppService } from "./services/containerapp.service";
import { FormsModule } from '@angular/forms';
import { StartupService } from './services/startup.service';
import { ObserverService } from './services/observer.service';
import { GithubApiService } from './services/github-api.service';
import { AseService } from './services/ase.service';
import { ApplensGlobal as ApplensGlobals } from '../applens-global';
import { CacheService } from './services/cache.service';
import { ResourceService } from './services/resource.service';
import { AadAuthGuard } from './auth/aad-auth-guard.service';
import { LoginComponent } from './components/login/login.component';
import { RouterModule } from '@angular/router';
import { CaseCleansingApiService } from './services/casecleansing-api.service';
import { ApplensBannerComponent } from './applens-banner/applens-preview-banner.component';
import { ApplensHeaderComponent } from './components/applens-header/applens-header.component';
import { ApplensDiagnosticService } from '../modules/dashboard/services/applens-diagnostic.service';
import { FabFabricModule } from '@angular-react/fabric/lib/components/fabric';
import { FabIconModule } from '@angular-react/fabric/lib/components/icon';
import { FabButtonModule } from '@angular-react/fabric/lib/components/button';
import { FabDialogModule } from '@angular-react/fabric/lib/components/dialog';
import { FabImageModule } from '@angular-react/fabric/lib/components/image';
import { FabDropdownModule } from '@angular-react/fabric/lib/components/dropdown';
import { FabPanelModule } from '@angular-react/fabric/lib/components/panel';
import { FabCommandBarModule } from '@angular-react/fabric/lib/components/command-bar';
import { FabBreadcrumbModule } from '@angular-react/fabric/lib/components/breadcrumb';
import { FabCalloutModule } from '@angular-react/fabric/lib/components/callout';
import { FabCheckboxModule } from '@angular-react/fabric/lib/components/checkbox';
import { FabChoiceGroupModule } from '@angular-react/fabric/lib/components/choice-group';
import { FabComboBoxModule } from '@angular-react/fabric/lib/components/combo-box';
import { FabGroupedListModule } from '@angular-react/fabric/lib/components/grouped-list';
import { FabDatePickerModule } from '@angular-react/fabric/lib/components/date-picker';
import { FabDividerModule } from '@angular-react/fabric/lib/components/divider';
import { FabSpinnerModule } from '@angular-react/fabric/lib/components/spinner';
import { FabToggleModule } from '@angular-react/fabric/lib/components/toggle';
import { FabPersonaModule } from '@angular-react/fabric/lib/components/persona';
import { FabPivotModule } from '@angular-react/fabric/lib/components/pivot';
import { FabLinkModule } from '@angular-react/fabric/lib/components/link';
import { FabMessageBarModule } from '@angular-react/fabric/lib/components/message-bar';
import { FabHoverCardModule } from '@angular-react/fabric/lib/components/hover-card';
import { FabModalModule } from '@angular-react/fabric/lib/components/modal';
import { FabTooltipModule } from '@angular-react/fabric/lib/components/tooltip';
import { FabShimmerModule } from '@angular-react/fabric/lib/components/shimmer';
import { FabSliderModule } from '@angular-react/fabric/lib/components/slider';
import { FabSearchBoxModule } from '@angular-react/fabric/lib/components/search-box';
import { FabCalendarModule } from '@angular-react/fabric/lib/components/calendar';
import { FabDetailsListModule } from '@angular-react/fabric/lib/components/details-list';
import { FabGroupModule } from '@angular-react/fabric/lib/components/group';
import { FabMarqueeSelectionModule } from '@angular-react/fabric/lib/components/marquee-selection';
import { FabSpinButtonModule } from '@angular-react/fabric/lib/components/spin-button';
import { FabTextFieldModule } from '@angular-react/fabric/lib/components/text-field';
import { FabPeoplePickerModule, FabTagPickerModule } from '@angular-react/fabric/lib/components/pickers';
import { FabProgressIndicatorModule } from '@angular-react/fabric/lib/components/progress-indicator';
import { FabRatingModule } from '@angular-react/fabric/lib/components/rating';
import { L1SideNavComponent } from './components/l1-side-nav/l1-side-nav.component';
import { UserSettingService } from '../modules/dashboard/services/user-setting.service';
import { ApplensDocsComponent } from './components/applens-docs/applens-docs.component';
import { StaticWebAppService } from './services/staticwebapp.service';
import { StampService } from './services/stamp.service';
import { DetectorGistApiService } from './services/detectorgist-template-api.service';
import { AlertService } from './services/alert.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    FabPanelModule,
    FabDialogModule,
    FabButtonModule,
    FabSearchBoxModule,
    FabCalloutModule,
    FabToggleModule,
    FabChoiceGroupModule
  ],
  declarations: [TreeViewComponent, LoginComponent, ApplensBannerComponent, L1SideNavComponent, ApplensHeaderComponent, ApplensDocsComponent],
  exports: [TreeViewComponent, ApplensBannerComponent, L1SideNavComponent, ApplensHeaderComponent, ApplensDocsComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApplensDiagnosticService,
        DiagnosticApiService,
        ResourceService,
        SiteService,
        ContainerAppService,
        StaticWebAppService,
        StampService,
        AseService,
        ApplensGlobals,
        StartupService,
        ObserverService,
        GithubApiService,
        CacheService,
        AadAuthGuard,
        CaseCleansingApiService,
        UserSettingService,
        DetectorGistApiService,
        AlertService
      ]
    }
  }
}
