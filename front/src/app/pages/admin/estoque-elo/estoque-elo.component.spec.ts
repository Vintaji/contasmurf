import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstoqueEloComponent } from './estoque-elo.component';

describe('EstoqueEloComponent', () => {
  let component: EstoqueEloComponent;
  let fixture: ComponentFixture<EstoqueEloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstoqueEloComponent]
    });
    fixture = TestBed.createComponent(EstoqueEloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
