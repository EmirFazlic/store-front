import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeItemComponent } from './see-item.component';

describe('SeeItemComponent', () => {
  let component: SeeItemComponent;
  let fixture: ComponentFixture<SeeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
