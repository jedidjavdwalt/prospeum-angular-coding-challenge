import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService, mockData } from './app.service';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should retrieve the questionnaire`, (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const appService = fixture.debugElement.injector.get(AppService);
    fixture.detectChanges();
    appService.getQuestionnaire().subscribe((data) => {
      expect(app.questionnaire.length).toEqual(data.length);
      done();
    });
  });

  it(`should update is_triggered`, (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const appService = fixture.debugElement.injector.get(AppService);
    fixture.detectChanges();
    const questionnaire = structuredClone(mockData);
    questionnaire[2].answer = 'should update is_triggered';
    appService.updateIsTriggered(questionnaire).subscribe((data) => {
      expect(data[2].is_triggered).toBeTruthy();
      done();
    });
  });
});
