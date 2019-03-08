import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReligigionComponent } from './religigion.component';

describe('ReligigionComponent', () => {
  let component: ReligigionComponent;
  let fixture: ComponentFixture<ReligigionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReligigionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReligigionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
