import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operators/switchMap';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  products:Product[] = [];
  filteredCategory: Product[] = [];
  category:any;
  constructor(
    private route:ActivatedRoute,
    private productService: ProductService
  ) {
   productService.getAllProducts()
    .switchMap(p => {
     this.products = p;
      return route.queryParamMap;
    }
      )
    .subscribe(params => {
      this.category = params.get('category');
      this.filteredCategory = (this.category) ? this.products
    .filter(p => p.category === this.category):
    this.products;
    });
 
}
}
