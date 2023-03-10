import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUtilisateurComponent } from './edit-utilisateur.component';

describe('EditUtilisateurComponent', () => {
  let component: EditUtilisateurComponent;
  let fixture: ComponentFixture<EditUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUtilisateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
