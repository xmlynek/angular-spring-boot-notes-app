import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DeleteButtonComponent} from './delete-button.component';
import {DebugElement, provideExperimentalZonelessChangeDetection} from "@angular/core";
import {ConfirmationService} from "primeng/api";
import {By} from "@angular/platform-browser";

describe('DeleteButtonComponent', () => {
  let component: DeleteButtonComponent;
  let fixture: ComponentFixture<DeleteButtonComponent>;
  let confirmationServiceSpy: jasmine.SpyObj<ConfirmationService>;

  beforeEach(async () => {
    confirmationServiceSpy = jasmine.createSpyObj<ConfirmationService>('ConfirmationService', ['confirm']);
    await TestBed.configureTestingModule({
      imports: [DeleteButtonComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {provide: ConfirmationService, useValue: confirmationServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call confirmationService.confirm when confirmDelete is triggered', () => {
    const mockConfirmCallback = { accept: () => {}, reject: () => {} };

    spyOn(mockConfirmCallback, 'accept');

    confirmationServiceSpy.confirm.and.callFake((options) => {
      return options.accept?.();
    });

    spyOn(component.onConfirm, 'emit');

    component.confirmDelete();

    expect(confirmationServiceSpy.confirm).toHaveBeenCalledWith(
      jasmine.objectContaining({
        message: 'Are you sure you want to delete this item?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: jasmine.any(Function),
        reject: jasmine.any(Function),
      })
    );

    expect(component.onConfirm.emit).toHaveBeenCalled();
  });

  it('should display button with the correct title', () => {
    let title = 'Delete Note Test';
    fixture.componentRef.setInput('title', title);
    fixture.detectChanges();

    const buttonDe: DebugElement = fixture.debugElement.query(By.css('button'));
    const buttonElement: HTMLElement = buttonDe.nativeElement;

    expect(buttonElement.title).toContain(title);
  });
});
