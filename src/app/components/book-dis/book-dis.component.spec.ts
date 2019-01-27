import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDisComponent } from './book-dis.component';

describe('BookDisComponent', () => {
  let component: BookDisComponent;
  let fixture: ComponentFixture<BookDisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
