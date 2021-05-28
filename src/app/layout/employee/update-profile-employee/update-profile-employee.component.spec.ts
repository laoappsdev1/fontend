import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfileEmployeeComponent } from './update-profile-employee.component';

describe('UpdateProfileEmployeeComponent', () => {
  let component: UpdateProfileEmployeeComponent;
  let fixture: ComponentFixture<UpdateProfileEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateProfileEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProfileEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
