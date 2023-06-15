import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperNomeComponent } from './recuper-nome.component';

describe('RecuperNomeComponent', () => {
  let component: RecuperNomeComponent;
  let fixture: ComponentFixture<RecuperNomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperNomeComponent]
    });
    fixture = TestBed.createComponent(RecuperNomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
