import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatePickerCellEditorComponent } from './date-picker-cell-editor.component';

describe('DatePickerCellEditorComponent', () => {
  let component: DatePickerCellEditorComponent;
  let fixture: ComponentFixture<DatePickerCellEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatePickerCellEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatePickerCellEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
