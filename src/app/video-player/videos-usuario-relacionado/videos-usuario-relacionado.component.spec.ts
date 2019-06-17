import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideosUsuarioRelacionadoComponent } from './videos-usuario-relacionado.component';

describe('VideosUsuarioRelacionadoComponent', () => {
  let component: VideosUsuarioRelacionadoComponent;
  let fixture: ComponentFixture<VideosUsuarioRelacionadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideosUsuarioRelacionadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideosUsuarioRelacionadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
