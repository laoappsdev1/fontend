import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsuperadminComponent } from './formsuperadmin.component';

describe('FormsuperadminComponent', () => {
  let component: FormsuperadminComponent;
  let fixture: ComponentFixture<FormsuperadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsuperadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsuperadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
