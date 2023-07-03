import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/models/item.model';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user = {
    id:'',
    userName: '',
    email: '',
    phone: ''
  };
  items: Item[] = [];
  private itemSub: Subscription;


  constructor(private authService: AuthService,
    private itemService: ItemService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(userData => {
      this.user = {
        id: userData.id,
        userName: userData.userName,
        email: userData.email,
        phone: userData.phone
      }
      this.itemService.getUserItems(userData.id);
      this.itemSub = this.itemService.getItemListener().subscribe((items: Item[]) => {
        this.items = items;
      });

    })
  }

  onDelete(id:string){
    this.itemService.deleteItem(id).subscribe(response => {
      this.itemService.getUserItems(this.user.id);
      this.itemSub = this.itemService.getItemListener().subscribe((items: Item[]) => {
        this.items = items;
      });

    })
  }

  ngOnDestroy(): void {
    this.itemSub.unsubscribe();
  }

}
