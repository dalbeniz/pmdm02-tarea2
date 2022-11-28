import { GestionStorageService } from './gestion-storage.service';
import { Article } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GestionNoticiasLeerService {

  private noticiasLeer: Article [] = [];

  constructor(private almacen: GestionStorageService) {
    let datosPromesa: Promise<Article[]> = almacen.getObject("leer");

    // Si hay datos en local se recuperan. Si no se leen del fichero
    datosPromesa.then( datos => {
      if (datos)
        this.noticiasLeer.push(...datos);
    });
  }

  // Añade una nueva noticia a leer
  addNoticia(item : Article) {
    // copiar item
    let itemString = JSON.stringify(item);
    item = JSON.parse(itemString);

    // Añadirlo
    this.noticiasLeer.push(item);
    //Añade las noticias leidas al almacen
    this.almacen.setObject("leer", this.noticiasLeer);
    // console.log(this.noticiasLeer);
  }

  // Comprueba si una noticia ya está en el array
  buscar(item: Article): number  {
    let articuloEncontrado: any = this.noticiasLeer.find(
      function(cadaArticulo) { 
        return JSON.stringify(cadaArticulo) == JSON.stringify(item);
      }
    );
    let indice = this.noticiasLeer.indexOf(articuloEncontrado);
    return indice;
  }

  // Borra una noticia
  borrarNoticia(item: Article) {
    let indice = this.buscar(item);
    if (indice != -1) {
      this.noticiasLeer.splice(indice, 1);
      //Añade las noticias leidas  menos la borrada al almacen
      this.almacen.setObject("leer", this.noticiasLeer);
      // console.log(this.noticiasLeer); 
    }
  }

  // Devuelve todas las noticias para leer
  getNoticias() {
    return this.noticiasLeer;
  }
}
