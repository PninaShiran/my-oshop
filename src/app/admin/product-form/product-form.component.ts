import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';
import { ProductService } from 'src/app/product.service';
import 'rxjs/add/operator/take'; 
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  categories$;
  product : any = {};
  id;
  constructor(
    private routr: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productsService: ProductService
  ) {
    this.categories$ = categoryService.getAllCategories();
    this.id = route.snapshot.paramMap.get('id');
    if (this.id)
      this.productsService
        .getProduct(this.id)
        .take(1)
        .subscribe((res: any) => (this.product = res));
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  save(product: Observable<any>) {
    if(this.id){
      this.productsService.updateProduct(this.id, product);
    }
    else{
       this.productsService.createProduct(product);
    }
   
    this.routr.navigate(['/.admin/products']);
  }
  delete(product: Observable<any>) {
    if(!confirm('Are you sure you sure you whant delete product')) return;
    this.productsService.deleteProduct(this.id);
    this.routr.navigate(['/.admin/products']);
  }
}
