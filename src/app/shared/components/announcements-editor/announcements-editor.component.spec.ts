import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsEditorComponent } from './announcements-editor.component';

describe('AnnouncementsEditorComponent', () => {
  let component: AnnouncementsEditorComponent;
  let fixture: ComponentFixture<AnnouncementsEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnouncementsEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
