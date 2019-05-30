import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIntentSingleComponent } from './edit-intent-single.component';

describe('EditIntentSingleComponent', () => {
  let component: EditIntentSingleComponent;
  let fixture: ComponentFixture<EditIntentSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditIntentSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditIntentSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
