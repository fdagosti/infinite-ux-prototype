/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JawboneComponent } from './jawbone.component';

describe('JawboneComponent', () => {
  let component: JawboneComponent;
  let fixture: ComponentFixture<JawboneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JawboneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JawboneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
