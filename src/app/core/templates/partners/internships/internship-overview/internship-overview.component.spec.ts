import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipOverviewComponent } from './internship-overview.component';

describe('InternshipOverviewComponent', () => {
  let component: InternshipOverviewComponent;
  let fixture: ComponentFixture<InternshipOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternshipOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternshipOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
