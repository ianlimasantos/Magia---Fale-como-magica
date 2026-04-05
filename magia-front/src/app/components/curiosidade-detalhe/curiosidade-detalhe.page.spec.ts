import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuriosidadeDetalhePage } from './curiosidade-detalhe.page';

describe('CuriosidadeDetalhePage', () => {
  let component: CuriosidadeDetalhePage;
  let fixture: ComponentFixture<CuriosidadeDetalhePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuriosidadeDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
