/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TabMoreLikeThisComponent } from './tab-more-like-this.component';

describe('TabMoreLikeThisComponent', () => {
  let component: TabMoreLikeThisComponent;
  let fixture: ComponentFixture<TabMoreLikeThisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabMoreLikeThisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabMoreLikeThisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
