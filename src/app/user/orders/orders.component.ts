import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Order } from '../../models/order.model';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit, OnDestroy {

  orders : Order[] =[];
  private orderSub: Subscription;
  showBuyItems = 'Show items to sell';
  showItems = true;


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrdders(this.showItems)
    this.orderSub = this.orderService.getItemListener().subscribe((orders: [Order]) => {
      this.orders = orders;
    })
    
  }

  showBuyItemsFun() {
    if (this.showItems) {
      this.showBuyItems = 'Show items to buy'
      this.showItems = false;
      this.orderService.getOrdders(this.showItems)
      this.orderSub = this.orderService.getItemListener().subscribe((orders: [Order]) => {
        this.orders = orders;
      })
    } else {
      this.showBuyItems = 'Show items to sell'
      this.showItems = true;
      this.orderService.getOrdders(this.showItems)
      this.orderSub = this.orderService.getItemListener().subscribe((orders: [Order]) => {
        this.orders = orders;
      })
    }
  }

  onConfirmPurchase(orderId: string){
    this.orderService.confirmoPurchase(orderId);
  }

  onDelete(orderId: string) {
    this.orderService.onDelete(orderId, this.showItems)
  }



  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
}
