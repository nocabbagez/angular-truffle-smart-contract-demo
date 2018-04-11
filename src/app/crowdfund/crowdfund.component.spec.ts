import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrowdfundComponent } from './crowdfund.component';

describe('CrowdfundComponent', () => {
  let component: CrowdfundComponent;
  let fixture: ComponentFixture<CrowdfundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrowdfundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrowdfundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
