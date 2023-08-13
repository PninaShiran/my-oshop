import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private db: AngularFireDatabase) {}
  createProduct(product: Observable<any>) {
    return this.db.list('/products').push(product);
  }
  getAllProducts() {
    return this.db.list('/products');
  }
  getProduct(productId: string) {
    return this.db.object('/products/' + productId);
  }
  updateProduct(productId: string, product:Observable<any>){
    return this.db.object('/products/' + productId).update(product);
  }
  deleteProduct(productId: string | null){
    return this.db.object('/products/' + productId).remove();
  }
}
