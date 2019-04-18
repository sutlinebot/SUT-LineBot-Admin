import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelIntentComponent } from './del-intent.component';

describe('DelIntentComponent', () => {
  let component: DelIntentComponent;
  let fixture: ComponentFixture<DelIntentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelIntentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelIntentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
