import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipDeleteComponent } from './internship-delete.component';

describe('InternshipDeleteComponent', () => {
  let component: InternshipDeleteComponent;
  let fixture: ComponentFixture<InternshipDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
