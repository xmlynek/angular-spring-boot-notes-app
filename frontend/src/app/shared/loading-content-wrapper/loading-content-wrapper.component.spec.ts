import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingContentWrapperComponent } from './loading-content-wrapper.component';
import {Component, provideExperimentalZonelessChangeDetection, signal} from "@angular/core";

describe('LoadingContentWrapperComponent', () => {
  let component: LoadingContentWrapperComponent;
  let fixture: ComponentFixture<LoadingContentWrapperComponent>;

  @Component({
    selector: 'app-test-host',
    imports: [
      LoadingContentWrapperComponent
    ],
    template: `
      <app-loading-content-wrapper
        [isLoading]="isLoading()"
        [error]="error()"
        [hasData]="hasData()"
        [errorFallbackText]="errorFallbackText"
      >
        <div class="test-content">Test Content</div>
      </app-loading-content-wrapper>
    `
  })
  class TestHostComponent {
    isLoading = signal(false);
    error= signal<string | null>(null);
    hasData = signal(false);
    errorFallbackText = 'Custom error message.';
  }

  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingContentWrapperComponent],
      providers: [provideExperimentalZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingContentWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading spinner when isLoading is true', () => {
    hostComponent.isLoading.set(true);
    hostFixture.detectChanges();

    const spinner = hostFixture.nativeElement.querySelector('p-progressspinner');
    expect(spinner).toBeTruthy();
  });

  it('should display error message when error is set', () => {
    hostComponent.isLoading.set(false);
    hostComponent.error.set('Error occurred');
    hostFixture.detectChanges();

    const errorText = hostFixture.nativeElement.querySelector('.fallback-text');
    expect(errorText.textContent).toContain('Custom error message.');
  });

  it('should display content when hasData is true and no error', () => {
    hostComponent.isLoading.set(false);
    hostComponent.error.set(null);
    hostComponent.hasData.set(true);
    hostFixture.detectChanges();

    const content = hostFixture.nativeElement.querySelector('.test-content');
    expect(content).toBeTruthy();
    expect(content.textContent).toContain('Test Content');
  });

  it('should prioritize error message over content if both are set', () => {
    hostComponent.isLoading.set(false);
    hostComponent.error.set('Error occurred');
    hostComponent.hasData.set(true);
    hostFixture.detectChanges();

    const errorText = hostFixture.nativeElement.querySelector('.fallback-text');
    expect(errorText.textContent).toContain('Custom error message.');

    const content = hostFixture.nativeElement.querySelector('.test-content');
    expect(content).toBeFalsy();
  });

  it('should display error when else', () => {
    hostComponent.isLoading.set(false);
    hostComponent.error.set(null);
    hostComponent.hasData.set(false);
    hostFixture.detectChanges();

    const spinner = hostFixture.nativeElement.querySelector('p-progressspinner');
    const errorText = hostFixture.nativeElement.querySelector('.fallback-text');
    const content = hostFixture.nativeElement.querySelector('.test-content');

    expect(spinner).toBeFalsy();
    expect(errorText).toBeTruthy();
    expect(content).toBeFalsy();
  });
});
