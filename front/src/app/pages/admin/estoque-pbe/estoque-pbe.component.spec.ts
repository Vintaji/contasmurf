import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoquePbeComponent } from './estoque-pbe.component';

describe('EstoquePbeComponent', () => {
  let component: EstoquePbeComponent;
  let fixture: ComponentFixture<EstoquePbeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstoquePbeComponent]
    });
    fixture = TestBed.createComponent(EstoquePbeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
