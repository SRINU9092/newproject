import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SrinuComponent } from './srinu.component';

describe('SrinuComponent', () => {
  let component: SrinuComponent;
  let fixture: ComponentFixture<SrinuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SrinuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SrinuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
