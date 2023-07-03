import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { AuthService } from 'src/app/services/auth.service';
import { ItemService } from 'src/app/services/item.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
   form: FormGroup;
  private itemId: any;
  item = { id: '',
    title: '',
    description: '',
    price: 0,
    creator: '',
    image: ''};
  
  user = {
    id: '',
    userName: '',
    email: '',
    phone: ''
  };

   buy: boolean = false;
  
  constructor(private itemService: ItemService, 
    private authService: AuthService, 
    public route: ActivatedRoute,
    private orderService: OrderService
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.itemId = paramMap.get("itemId");
        // this.isLoading = true;
        this.itemService.getItem(this.itemId).subscribe(itemData => {
          // this.isLoading = false;
          this.item = {
            id: itemData._id,
            title: itemData.title,
            description: itemData.description,
            price: itemData.price,
            creator: itemData.creator,
            image: itemData.image
          };
          this.authService.getUserById(this.item.creator).subscribe(userData => {
            this.user = {
              id: userData.id,
              userName: userData.userName,
              email: userData.email,
              phone: userData.phone

            }
          })
        });
    });
    this.form = new FormGroup({
      userName: new FormControl(null, {validators: [Validators.required]}),
      address: new FormControl(null, {validators: [Validators.required]}),
    })
  }


  onSubmit() {
    if(this.form.invalid) {
      console.log('est1')
      return;
    }
    // console.log(this.form.value.userName)
    this.orderService.putOrder(this.form.value.userName, this.form.value.address, this.item.id, this.user.id);
    this.form.reset();
  }



}
