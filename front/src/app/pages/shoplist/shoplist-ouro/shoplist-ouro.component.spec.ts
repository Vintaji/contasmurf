import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistOuroComponent } from './shoplist-ouro.component';

describe('ShoplistOuroComponent', () => {
  let component: ShoplistOuroComponent;
  let fixture: ComponentFixture<ShoplistOuroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoplistOuroComponent]
    });
    fixture = TestBed.createComponent(ShoplistOuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
