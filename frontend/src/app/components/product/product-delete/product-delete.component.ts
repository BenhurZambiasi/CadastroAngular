import { Component, OnInit } from "@angular/core";
import { Product } from "../product.model";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductService } from "../product.service";

@Component({
  selector: "app-product-delete",
  templateUrl: "./product-delete.component.html",
  styleUrls: ["./product-delete.component.css"],
})
export class ProductDeleteComponent implements OnInit {
  product: Product = {
    name: "",
    price: 0,
  };

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id: string | null = this.route.snapshot.paramMap.get("id");

    this.productService.readById(id).subscribe((product) => {
      this.product = product;
    });
  }

  deleteProduct(): void {
    const id: string | null = this.route.snapshot.paramMap.get("id");
    this.productService.delete(id).subscribe(() => {
      this.productService.showMessage("Produto deletado com sucesso!");
    });
    this.cancel();
  }

  cancel(): void {
    this.router.navigate(["/products"]);
  }
}
