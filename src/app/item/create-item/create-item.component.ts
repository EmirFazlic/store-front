import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ItemService } from '../../services/item.service';
import { Item } from '../../models/item.model';
// import { mimeType } from "./mime-type.validator";




@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  styleUrls: ['./create-item.component.css']
})
export class CreateItemComponent implements OnInit {
  form: FormGroup;
  private mode = 'create';
  private itemId: any;
  item: Item;
  imagePreview: string | ArrayBuffer;

  


  constructor(public itemService: ItemService,
    public route: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, { validators: [Validators.required] }),
      price: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("itemId")) {
        this.mode = "edit";
        this.itemId = paramMap.get("itemId");
        // this.isLoading = true;
        this.itemService.getItem(this.itemId).subscribe(itemData => {
          this.imagePreview = itemData.image;
          // this.isLoading = false;
          this.item = {
            id: itemData._id,
            title: itemData.title,
            description: itemData.description,
            price: itemData.price,
            image: itemData.image
          };
          this.form.setValue({
            title: this.item.title,
            description: itemData.description,
            price: itemData.price,
            image: itemData.image
          });
        });
      } else {
        this.mode = "create";
        this.itemId = null;
      }
    });
  }
  get title() {
    return this.form.get('title')!;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.mode === 'create'){
      this.itemService.addItem(this.form.value.title,this.form.value.description, this.form.value.price, this.form.value.image)
      this.form.reset()

    } else {
      this.itemService.updateItem(this.item.id, this.form.value.title,this.form.value.description, this.form.value.price, this.form.value.image)
    }

  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

}
