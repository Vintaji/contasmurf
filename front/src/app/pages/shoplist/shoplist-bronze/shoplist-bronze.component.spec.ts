import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistBronzeComponent } from './shoplist-bronze.component';

describe('ShoplistBronzeComponent', () => {
  let component: ShoplistBronzeComponent;
  let fixture: ComponentFixture<ShoplistBronzeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoplistBronzeComponent]
    });
    fixture = TestBed.createComponent(ShoplistBronzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
