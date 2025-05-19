import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharPieComponent } from './char-pie.component';

describe('CharPieComponent', () => {
  let component: CharPieComponent;
  let fixture: ComponentFixture<CharPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharPieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
