import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmOvedComponent } from './am-oved.component';

describe('AmOvedComponent', () => {
  let component: AmOvedComponent;
  let fixture: ComponentFixture<AmOvedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmOvedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmOvedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
