import { ExploreContainerComponent } from './explore-container/explore-container.component';
import { IonicModule } from '@ionic/angular';
import { NoticiaComponent } from './noticia/noticia.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NoticiaComponent,
    ExploreContainerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NoticiaComponent,
    ExploreContainerComponent
  ]
})
export class ComponentsModule { }
