import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGroupComponent } from './field-group.component';

describe('FieldGroupComponent', () => {
  let component: FieldGroupComponent;
  let fixture: ComponentFixture<FieldGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
