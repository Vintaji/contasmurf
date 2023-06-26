import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistPrataComponent } from './shoplist-prata.component';

describe('ShoplistPrataComponent', () => {
  let component: ShoplistPrataComponent;
  let fixture: ComponentFixture<ShoplistPrataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoplistPrataComponent]
    });
    fixture = TestBed.createComponent(ShoplistPrataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
