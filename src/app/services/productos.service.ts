import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: any[] = [];
  producto: any[] = [];
  productosFiltrado: any[] = [];

  constructor( private http: HttpClient ) {
    this.cargarProductos();
  }

  private cargarProductos() {

    return new Promise<void>( (resolve, reject) => {
      this.http.get('https://firestore.googleapis.com/v1/projects/angular-udemy-3e2e5/databases/(default)/documents/productos_idx')
      .subscribe((resp:any) => {
        this.productos = resp.documents.map((elemento) => elemento.fields)
        // console.log(this.productos);
          this.cargando = false;
          resolve();

        // La siguiente función hace que el cargando tarde más
        // setTimeout(() => {
        //   this.cargando = false;
        // }, 2000);
      }
    );
    });
  }

  getProducto( id: string) {
     return this.http.get(`https://firestore.googleapis.com/v1/projects/angular-udemy-3e2e5/databases/(default)/documents/productos/${id}`);
  }

  buscarProducto(termino: string) {
    if ( this.productos.length === 0 ){
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar después de tener los productos
        // Aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      // aplicar el filtro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];

    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.stringValue.toLocaleLowerCase();

      if ( prod.categoria.stringValue.indexOf( termino ) >= 0 || tituloLower.indexOf( termino ) >= 0 ){
        this.productosFiltrado.push(prod);
      }
    })
  }
}
