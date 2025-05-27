import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAnnouncementsComponent } from './table-announcements.component';

describe('TableComponent', () => {
  let component: TableAnnouncementsComponent;
  let fixture: ComponentFixture<TableAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableAnnouncementsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
