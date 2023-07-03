import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders : any;
  private ordersUpdated = new Subject<[{
    id: string,
    title:string,
    price: number,
    address:string,
    confirmation: boolean,
  }]>();


  constructor(private http: HttpClient) { }

  getItemListener() {
    return this.ordersUpdated.asObservable();
  }

  putOrder(userName: string, address: string, itemId: string, sellerId: string){
    const orderData = {userName, address, itemId, sellerId}
    console.log(name)
    this.http.post<{message: string}>("http://localhost:3000/api/order", orderData)
    .subscribe((messageData) => {
      console.log(messageData.message); 
    });

  }

  getOrdders(buyer: boolean) {
    return this.http.get<any>("http://localhost:3000/api/order/" + buyer)
    .pipe(map((orderData) => {
      return orderData.orders.map((order:any ) => {

        return {
          id: order._id,
          title: order.itemOrderd.title,
          price: order.itemOrderd.price,
          address: order.address,
          confirmation: order.confirmation,
          image: order.image
        };
      });
    }))
    .subscribe((orders: [Order]) => {
      this.orders = orders;
      this.ordersUpdated.next([...orders]);
    });
  }

  confirmoPurchase(orderId: string) {
    this.http.put("http://localhost:3000/api/order/confirm", {orderId})
    .subscribe(response => {
      console.log("confirmed purchase " + orderId);
    })
  }
  onDelete(orderId: string, showItems:boolean) {
    this.http.delete("http://localhost:3000/api/order/" + orderId).subscribe(response => {
      console.log("deleted " + orderId)
      this.getOrdders(showItems)
    })
  }
  
}
