import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { MDBBootstrapModule, CarouselModule, WavesModule } from 'angular-bootstrap-md'
import { BittrexService } from './servicos/bittrex.service'
import { ExmoService } from './servicos/exmo.service'
import { MexcService } from './servicos/mexc.service'
import { ExchangesService } from './servicos/exchanges.service'
import { Funcoes } from './servicos/funcoes.service'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';

import { OrderModule } from 'ngx-order-pipe'
import { Ng2SearchPipeModule } from 'ng2-search-filter'


// import { SlideshowModule } from 'ng-simple-slideshow';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent  ],
  imports: 
  [
      BrowserModule, 
      MDBBootstrapModule, 
      CarouselModule, 
      WavesModule, 
      OrderModule,
      BrowserAnimationsModule,
      BrowserModule,
      FormsModule,
      HttpClientModule,
      MatNativeDateModule,
      MaterialExampleModule,
      ReactiveFormsModule,
      Ng2SearchPipeModule
  ],
  providers: [BittrexService, ExmoService, MexcService, ExchangesService, Funcoes ],
  bootstrap: [AppComponent],
})
export class AppModule { }
