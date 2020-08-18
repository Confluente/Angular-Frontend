import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipCreateComponent } from './internship-create.component';

describe('InternshipCreateComponent', () => {
  let component: InternshipCreateComponent;
  let fixture: ComponentFixture<InternshipCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
