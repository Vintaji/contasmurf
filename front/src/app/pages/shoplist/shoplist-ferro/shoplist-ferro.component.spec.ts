import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistFerroComponent } from './shoplist-ferro.component';

describe('ShoplistFerroComponent', () => {
  let component: ShoplistFerroComponent;
  let fixture: ComponentFixture<ShoplistFerroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoplistFerroComponent]
    });
    fixture = TestBed.createComponent(ShoplistFerroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
