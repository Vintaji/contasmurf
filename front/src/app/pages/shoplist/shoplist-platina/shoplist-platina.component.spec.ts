import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistPlatinaComponent } from './shoplist-platina.component';

describe('ShoplistPlatinaComponent', () => {
  let component: ShoplistPlatinaComponent;
  let fixture: ComponentFixture<ShoplistPlatinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoplistPlatinaComponent]
    });
    fixture = TestBed.createComponent(ShoplistPlatinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
