import { Component, OnInit, ViewChild } from '@angular/core';
import { CampaignService } from './campaign.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  campaigns: any[] = [];
  campaign: any = {};

  towns: string[] = ['Kraków', 'Wrocław', 'Gdańsk'];
  submitted: boolean = false;
  isEditing: boolean = false;
  @ViewChild('campaignForm') campaignForm: NgForm;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.campaigns = this.campaignService.getCampaigns();
    this.campaignService.campaignsUpdated.subscribe(() => {
      this.campaigns = this.campaignService.getCampaigns();
    });
  }

  editCampaign(campaign: any) {
    this.isEditing = true;
    this.campaign = { ...campaign };
  }

  cancelEdit() {
    this.isEditing = false;
    this.campaign = {};
  }

  deleteCampaign(campaignId: number) {
      this.campaignService.deleteCampaign(campaignId);
  }

  submitForm() {
    if (this.campaignForm.valid) {
      this.campaignService.updateCampaign(this.campaign);
    }
    this.submitted = true;
    this.isEditing = false
  }
}
