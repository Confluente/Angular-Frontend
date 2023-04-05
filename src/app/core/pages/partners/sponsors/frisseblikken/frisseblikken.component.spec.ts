import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FrisseBlikkenComponent} from './frisseblikken.component';

describe('FrisseBlikkenComponent', () => {
    let component: FrisseBlikkenComponent;
    let fixture: ComponentFixture<FrisseBlikkenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FrisseBlikkenComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FrisseBlikkenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
