import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolledComponent } from './enrolled.component';

describe('EnrolledComponent', () => {
  let component: EnrolledComponent;
  let fixture: ComponentFixture<EnrolledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnrolledComponent]
    });
    fixture = TestBed.createComponent(EnrolledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
