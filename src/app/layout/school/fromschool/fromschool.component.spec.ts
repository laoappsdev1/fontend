import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromschoolComponent } from './fromschool.component';

describe('FromschoolComponent', () => {
  let component: FromschoolComponent;
  let fixture: ComponentFixture<FromschoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FromschoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FromschoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
