import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  subscription: Subscription;
  tableResource: DataTableResource<Product> | undefined;
  items: Product[] = [];
  itemsCount: number | undefined;

  constructor(private productService: ProductService) {
    this.subscription = productService
      .getAllProducts()
      .subscribe((products: any) => {
        this.products = products;
        this.initializeTable(products);
      });
  }
  ngOnInit(): void {}
  filter(query: string) {
    let filterProduct = query
      ? this.products?.filter((product) =>
          product.title.toLowerCase().includes(query.toLocaleLowerCase())
        )
      : this.products;
      this.initializeTable(filterProduct);
  }
  private initializeTable(product: any) {
    this.tableResource
      ?.query({ offset: 0 })
      .then((item) => (this.items = item));
    this.tableResource?.count().then((count) => (this.itemsCount = count));
  }
  reload(product: any) {
    if (!this.tableResource) return;
    this.tableResource?.query(product).then((items) => (this.items = items));
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
