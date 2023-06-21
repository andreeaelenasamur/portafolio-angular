import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { InfoEquipo } from '../interfaces/info-equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] =  [];

  constructor( private http: HttpClient ) {

    this.cargarInfo();
    this.cargarEquipo();

   }

   private cargarInfo() {
        // Leer el archivo JSON
      this.http.get('assets/data/data-pagina.json').subscribe((resp: InfoPagina) => {

      this.cargada = true;
      this.info = resp;
    });
   }

   private cargarEquipo() {
        // Leer el archivo JSON
      this.http.get('https://firestore.googleapis.com/v1/projects/angular-udemy-3e2e5/databases/(default)/documents/equipo')
      .subscribe((resp: any) => {
        this.equipo = resp.documents.map((elemento) => elemento.fields);
        });
     }
}
