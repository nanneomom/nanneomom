import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferNewPage } from './offer-new';

@NgModule({
  declarations: [
    OfferNewPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferNewPage),
  ],
})
export class OfferNewPageModule {}
