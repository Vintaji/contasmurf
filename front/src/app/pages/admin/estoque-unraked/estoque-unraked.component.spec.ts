import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueUnrakedComponent } from './estoque-unraked.component';

describe('EstoqueUnrakedComponent', () => {
  let component: EstoqueUnrakedComponent;
  let fixture: ComponentFixture<EstoqueUnrakedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstoqueUnrakedComponent]
    });
    fixture = TestBed.createComponent(EstoqueUnrakedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
