import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Item } from '../models/item.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [];

  private itemsUpdated = new Subject<Item[]>();

  constructor(private http: HttpClient, private router: Router) {}


  getItems() {
    this.http.get<{message:string, items: any}>("http://localhost:3000/api/items")
    .pipe(map((itemData) => {
      return itemData.items.map((item:any ) => {

        return {
          id: item._id,
          title: item.title,
          description: item.description,
          price: item.price,
          creator: item.creator,
          image: item.image
        };
      });
    }))
    .subscribe((items) => {
      this.items = items
      this.itemsUpdated.next([...items]);
    });
  }
  getUserItems(userId: string) {
    this.http.get<{message:string, items: any}>("http://localhost:3000/api/items/user/" + userId)
    .pipe(map((itemData) => {
      return itemData.items.map((item:any ) => {
        return {
          id: item._id,
          title: item.title,
          description: item.description,
          price: item.price,
          creator: item.creator,
          image: item.image
        };
      });
    }))
    .subscribe((items) => {
      this.items = items
      this.itemsUpdated.next([...items]);
    });
  }

  getItem(id: string) {
    return this.http.get<{
      _id: string;
      title: string;
      description: string;
      price: number;
      creator: string;
      image: string;
    }>("http://localhost:3000/api/items/" + id);
  }

  getItemListener() {
    return this.itemsUpdated.asObservable();
  }

  addItem(title: string, description: string, price: number, image: File) {
    const item: Item = {id: '', title: title, description: description, price: price, image: null};
    const itemData = new FormData();
    itemData.append("title", title);
    itemData.append("description", description);
    itemData.append("price", price.toString());
    itemData.append("image", image, title);
    this.http.post<{message: string}>
    ("http://localhost:3000/api/items", itemData)
    .subscribe((messageData) => {
      console.log(messageData.message); 
      this.items.push(item);
      this.itemsUpdated.next([...this.items]);
    });
  }

  updateItem(id: string, title: string, description: string, price: number, image: File | string) {
    const item: Item = {id: id, title: title, description: description, price: price, image: image};
    let itemData: Item | FormData;
    if (typeof image === "object") {
      itemData = new FormData();
      itemData.append("id", id);
      itemData.append("title", title);
      itemData.append("description", description);
      itemData.append("price", price.toString());
      itemData.append("image", image, title);
    } else {
      itemData = {
        id: id,
        title: title,
        description: description,
        price: price,
        image: image,
      };
    }
    this.http.put<{message: string}>
    ("http://localhost:3000/api/items", itemData)
    .subscribe(response => {
      this.router.navigate(["/user"]);
    });
  }

  deleteItem(id: string) {
    return this.http.delete("http://localhost:3000/api/items/" + id)
  }

}
