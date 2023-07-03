import { Component, OnDestroy, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { Item } from '../../models/item.model';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-see-item',
  templateUrl: './see-item.component.html',
  styleUrls: ['./see-item.component.css']
})
export class SeeItemComponent implements OnInit,OnDestroy {
  items: Item[] = [];
  private itemSub: Subscription;

  constructor(public itemService: ItemService) { }
  



  ngOnInit(): void {
    this.itemService.getItems();
    this.itemSub = this.itemService.getItemListener().subscribe((items: Item[]) => {
      this.items = items;
    })
  }

  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
  }
}
