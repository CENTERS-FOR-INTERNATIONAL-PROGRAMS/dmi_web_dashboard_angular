import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Covid19resultsComponent } from './covid19results.component';

describe('Covid19resultsComponent', () => {
  let component: Covid19resultsComponent;
  let fixture: ComponentFixture<Covid19resultsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Covid19resultsComponent]
    });
    fixture = TestBed.createComponent(Covid19resultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
