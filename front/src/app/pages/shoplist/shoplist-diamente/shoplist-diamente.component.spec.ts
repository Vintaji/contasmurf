import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoplistDiamenteComponent } from './shoplist-diamente.component';

describe('ShoplistDiamenteComponent', () => {
  let component: ShoplistDiamenteComponent;
  let fixture: ComponentFixture<ShoplistDiamenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShoplistDiamenteComponent]
    });
    fixture = TestBed.createComponent(ShoplistDiamenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
