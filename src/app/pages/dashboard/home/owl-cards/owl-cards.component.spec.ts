import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwlCardsComponent } from './owl-cards.component';

describe('OwlCardsComponent', () => {
  let component: OwlCardsComponent;
  let fixture: ComponentFixture<OwlCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwlCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwlCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
