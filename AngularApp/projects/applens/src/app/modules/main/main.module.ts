import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { FabDialogModule, FabButtonModule, FabTextFieldModule, FabCalloutModule, FabChoiceGroupModule, FabIconModule, FabDropdownModule, FabPanelModule, FabSpinnerModule} from '@angular-react/fabric';
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
  providers: [],
  declarations: [MainComponent]
})
export class MainModule { }
