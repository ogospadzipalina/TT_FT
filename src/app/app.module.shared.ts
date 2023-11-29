// app.module.shared.ts
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';

@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [CampaignFormComponent],
  exports: [FormsModule, CommonModule, CampaignFormComponent],
})
export class SharedModule { }
