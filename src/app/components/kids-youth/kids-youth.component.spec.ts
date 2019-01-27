import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KidsYouthComponent } from './kids-youth.component';

describe('KidsYouthComponent', () => {
  let component: KidsYouthComponent;
  let fixture: ComponentFixture<KidsYouthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidsYouthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KidsYouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
