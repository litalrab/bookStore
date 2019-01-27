import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoamComponent } from './poam.component';

describe('PoamComponent', () => {
  let component: PoamComponent;
  let fixture: ComponentFixture<PoamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
