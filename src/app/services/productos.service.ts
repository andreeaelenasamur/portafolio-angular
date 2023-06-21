import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: any[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

    this.http.get('https://firestore.googleapis.com/v1/projects/angular-udemy-3e2e5/databases/(default)/documents/productos_idx')
      .subscribe( (resp:any) => {
        this.productos = resp.documents.map((elemento) => elemento.fields)
        console.log(this.productos);
          this.cargando = false;

        // La siguiente función hace que el cargando tarde más
        // setTimeout(() => {
        //   this.cargando = false;
        // }, 2000);
      }
    );
  }
}
