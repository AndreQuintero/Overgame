import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoDescricaoComponent } from './video-descricao.component';

describe('VideoDescricaoComponent', () => {
  let component: VideoDescricaoComponent;
  let fixture: ComponentFixture<VideoDescricaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoDescricaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoDescricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
