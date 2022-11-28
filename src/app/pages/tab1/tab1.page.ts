import { HttpClient } from '@angular/common/http';
import { GestionNoticiasLeerService } from './../../services/gestion-noticias-leer.service';
import { RespuestaNoticias, Article } from './../../interfaces/interfaces';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // Creo e inicializo un array vacío
  listaNoticias: Article[] = [];
  respuesta: Observable<RespuestaNoticias> = {} as Observable<RespuestaNoticias>;

  constructor(private leerFichero: HttpClient, public gestionNoticiasLeer: GestionNoticiasLeerService) {
    this.cargarArticulos(["q=all"]); 
  }

  // Cuando cambia el check, en función de su valor añade o borra la noticia
  check(eventoRecibido: any, item: Article) {
    let estado: boolean = eventoRecibido.detail.checked;
    if (estado) {
      this.gestionNoticiasLeer.addNoticia(item);
    } else {
      this.gestionNoticiasLeer.borrarNoticia(item);
    }
    
  }

  // Lee el fichero con los artículos y los guarda en el array "listaNoticias"
  private cargarArticulos(values: string[]) {
    let url: string = "https://newsapi.org/v2/everything?";
    if(values.length > 0)
      url+= values.join("&") + "&";
    url+= "apiKey=494c77c77c8f4b8d90c0015b62ac5dcd";


    let respuesta: Observable<RespuestaNoticias> = this.leerFichero.get<RespuestaNoticias>(url);

    respuesta.subscribe( (resp  : RespuestaNoticias) => {
      console.log("Noticias", resp);
      this.listaNoticias = resp.articles;
    } );
  }
  cambiado(evento: any){
    let value: string = evento.detail.value;
    this.cargarArticulos( ["q=" + value]);
  }

  // Comprueba si una noticia está para leer o no
  seleccionado(item: Article): boolean {
    let indice: number = this.gestionNoticiasLeer.buscar(item);
    if (indice != -1) {
      return true;
    }
    return false; 
  }

  ngOnInit() { 
  }
}
