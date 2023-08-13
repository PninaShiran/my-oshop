import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopingCardComponent } from './shoping-card.component';

describe('ShopingCardComponent', () => {
  let component: ShopingCardComponent;
  let fixture: ComponentFixture<ShopingCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopingCardComponent]
    });
    fixture = TestBed.createComponent(ShopingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
