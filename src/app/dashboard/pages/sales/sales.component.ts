import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from 'rxjs';
import { SaleActions } from "./store/sale.actions";

@Component({
    selector: 'app-sales',
    templateUrl: './sales.component.html',
    styles: [],
})
export class SalesComponent implements OnInit {
    displayedColumns = ['id', 'product', 'buyer', 'total'];
    sales$ = [{}]
    constructor(private store: Store) {}

    ngOnInit(): void {
        this.store.dispatch(SaleActions.loadSales())
    }
}