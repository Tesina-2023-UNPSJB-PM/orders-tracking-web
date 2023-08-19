import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralMapPage } from './general-map.page';

describe('GeneralMapComponent', () => {
  let component: GeneralMapPage;
  let fixture: ComponentFixture<GeneralMapPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GeneralMapPage],
      providers: [],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneralMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
