import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenedComponent } from './screened.component';

describe('ScreenedComponent', () => {
  let component: ScreenedComponent;
  let fixture: ComponentFixture<ScreenedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenedComponent]
    });
    fixture = TestBed.createComponent(ScreenedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
