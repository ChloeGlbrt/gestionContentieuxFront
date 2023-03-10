import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTacheComponent } from './edit-tache.component';

describe('EditTacheComponent', () => {
  let component: EditTacheComponent;
  let fixture: ComponentFixture<EditTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTacheComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
