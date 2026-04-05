import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstudoIAPage } from './estudo-ia.page';

describe('EstudoIAPage', () => {
  let component: EstudoIAPage;
  let fixture: ComponentFixture<EstudoIAPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudoIAPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
