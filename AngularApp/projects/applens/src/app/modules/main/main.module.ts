import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { CUSTOM_MOMENT_FORMATS } from '../../shared/models/datetime';
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
import { DiagnosticDataModule } from 'diagnostic-data';
import { SharedModule } from '../../shared/shared.module';

export const MainModuleRoutes : ModuleWithProviders<MainModule> = RouterModule.forChild([
  {
    path: '',
    component: MainComponent
  }
])

@NgModule({
  imports: [
    CommonModule,
    MainModuleRoutes,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlMomentDateTimeModule ,
    SharedModule,
    FabButtonModule,
    FabDialogModule,
    FabTextFieldModule,
    FabCalloutModule,
    FabChoiceGroupModule,
    FabIconModule,
    FabDropdownModule,
    FabPanelModule,
    FabSpinnerModule,
    DiagnosticDataModule,
    SharedModule
  ],
  providers: [{
    provide: OWL_DATE_TIME_FORMATS,
    useValue: CUSTOM_MOMENT_FORMATS
  }],
  declarations: [MainComponent]
})
export class MainModule { }
