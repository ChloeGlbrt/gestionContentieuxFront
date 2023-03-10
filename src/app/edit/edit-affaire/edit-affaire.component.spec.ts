import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAffaireComponent } from './edit-affaire.component';

describe('EditAffaireComponent', () => {
  let component: EditAffaireComponent;
  let fixture: ComponentFixture<EditAffaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAffaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAffaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
