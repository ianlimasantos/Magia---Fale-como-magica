import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CuriosidadesPage } from './curiosidades.page';

describe('CuriosidadesPage', () => {
  let component: CuriosidadesPage;
  let fixture: ComponentFixture<CuriosidadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CuriosidadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
