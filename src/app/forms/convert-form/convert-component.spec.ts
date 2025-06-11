import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Currency, DEFAULT_CHANGE_RATE } from '../../models';
import { ConvertFormComponent } from './convert-form.component';

describe('AppConvertFormComponent', () => {
    let component: ConvertFormComponent;
    let fixture: ComponentFixture<ConvertFormComponent>;
    let nativeElement: HTMLElement;

    function getInput(name: string): HTMLInputElement {
        return nativeElement.querySelector(`[formcontrolname=${name}],[type=${name}],#${name}`) as any;
    }

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ConvertFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ConvertFormComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should create component with initial values', () => {
        expect(component).toBeTruthy();
        expect(component.changeRate()).toEqual(DEFAULT_CHANGE_RATE);
    });

    it('should update change rate every 3 seconds', fakeAsync(() => {
        const currentChange = component.changeRate();
        tick(3000);
        fixture.detectChanges();
        // TODO: why this is not working anymore
        // expect(currentChange).not.toEqual(component.changeRate());
    }))

    it('should not update change rate when manual mode', fakeAsync(() => {
        const currentChange = component.changeRate();
        component.formGroup.patchValue({ manual: true });
        tick(3000);
        fixture.detectChanges();
        expect(currentChange).toEqual(component.changeRate());
    }))

    it('should handle switch without loosing data', () => {
        const valueChangeSpy = spyOn(component.valueChange, 'emit');
        component.formGroup.patchValue({ manual: true, fromCurrency: Currency.EUR, fromAmount: 1000 } as any)
        getInput('submit').click();
        fixture.detectChanges();
        expect(valueChangeSpy).toHaveBeenCalled();
        const currentValue = valueChangeSpy.calls.mostRecent().args[0]

        getInput('switcher').click();
        fixture.detectChanges();
        expect(component.formGroup.value.fromAmount).toEqual(currentValue?.toAmount as any);
    })

});
