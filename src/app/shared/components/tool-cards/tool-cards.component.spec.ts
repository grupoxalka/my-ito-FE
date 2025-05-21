import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolCardsComponent } from './tool-cards.component';

describe('ToolCardsComponent', () => {
  let component: ToolCardsComponent;
  let fixture: ComponentFixture<ToolCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
