// campaign-form.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from '../campaign.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.scss']
})
export class CampaignFormComponent implements OnInit {
  @ViewChild('campaignForm') campaignForm: NgForm;
  campaign: any = {};
  campaigns: any[];

  towns: string[] = ['Kraków', 'Wrocław', 'Gdańsk'];
  submitted: boolean = false;
  isEditing: boolean = false;

  constructor(
    private campaignService: CampaignService,
  ) {}


  ngOnInit() {
    // Retrieve the current campaign from the service when the component is initialized
    const currentCampaign = this.campaignService.getCurrentCampaign();
    this.isEditing = currentCampaign ? true : false;
    this.campaign = currentCampaign || {};
    console.log('Campaign:', this.campaign);
  }

  editCampaign() {
    if (this.campaign.id) {
      this.campaignService.setCurrentCampaign(this.campaign);
      this.isEditing = true;
    }

    console.log('Editing campaign:', this.campaign);
  }

  cancelEdit() {
    this.isEditing = false;
    this.campaignService.clearCurrentCampaign();
  }

  deleteCampaign(campaignId: number) {
    try {
      if (confirm('Are you sure you want to delete this campaign?')) {
        this.campaignService.deleteCampaign(campaignId);
        this.campaigns = this.campaignService.getCampaigns();
        location.reload();
      }
    } catch (error) {
      console.error('Error in deleteCampaign:', error);
    }
  }

  submitForm() {
    if (this.campaignForm.valid) {
      this.campaignService.addCampaign(this.campaign);
    }
    this.submitted = true;
  }


  resetForm() {
    this.campaign = {};
    this.submitted = false;
    this.isEditing = false;
    this.campaignService.clearCurrentCampaign();
  }
}
