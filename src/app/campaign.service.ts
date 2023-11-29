import { Injectable, PLATFORM_ID, Inject, EventEmitter } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private storageKey = 'campaigns';
  private campaigns: any[] = this.loadCampaigns();
  private currentCampaign: any;
  campaignsUpdated: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  private loadCampaigns(): any[] {
    if (isPlatformBrowser(this.platformId)) {
      const storedData = localStorage.getItem(this.storageKey);
      const campaigns = storedData ? JSON.parse(storedData) : [];
      console.log('Loaded campaigns:', campaigns);
      return campaigns;
    } else {
      return [];
    }
  }

  private saveCampaigns() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, JSON.stringify(this.campaigns));
      console.log('Saved campaigns:', this.campaigns);
    }
  }


  addCampaign(campaign: any) {
    this.campaigns.push({ ...campaign, id: this.generateId() });
    this.saveCampaigns();
  }

  updateCampaign(updatedCampaign: any) {
    const index = this.campaigns.findIndex(c => c.id === updatedCampaign.id);
    if (index !== -1) {
      this.campaigns[index] = { ...this.campaigns[index], ...updatedCampaign };
      this.saveCampaigns();
    }

    console.log('Updating campaign:', updatedCampaign);
  }


  deleteCampaign(campaignId: number): void {
    const storedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
    const updatedCampaigns = storedCampaigns.filter(c => c.id !== campaignId);
    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    location.reload();
  }

  getCampaigns() {
    return this.campaigns;
  }

  setCurrentCampaign(campaign: any) {
    this.currentCampaign = { ...campaign };
  }

  getCurrentCampaign() {
    return this.currentCampaign;
  }

  clearCurrentCampaign() {
    this.currentCampaign = null;
  }

  private generateId(): number {
    return Math.floor(Math.random() * 1000);
  }
}
