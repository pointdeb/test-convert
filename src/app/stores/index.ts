import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { Convert, Currency, DEFAULT_CHANGE_RATE } from '../models';

type ConvertState = {
    convertions: Convert[];
}

const initialState: ConvertState = {
    convertions: [
        { changeRate: DEFAULT_CHANGE_RATE, manual: true, fromCurrency: Currency.EUR, fromAmount: 1000, toCurrency: Currency.USD, toAmount: 1000 * DEFAULT_CHANGE_RATE },
        { changeRate: DEFAULT_CHANGE_RATE, manual: true, fromCurrency: Currency.EUR, fromAmount: 1000, toCurrency: Currency.USD, toAmount: 1000 * DEFAULT_CHANGE_RATE },
        { changeRate: DEFAULT_CHANGE_RATE, manual: false, fromCurrency: Currency.EUR, fromAmount: 1000, toCurrency: Currency.USD, toAmount: 1000 * DEFAULT_CHANGE_RATE },
    ]
}

export const convertStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        saveConvertion(payload: Convert) {
            const current = store.convertions();
            if (current.length == 5) {
                current.pop()
            }
            patchState(store, { convertions: [payload, ...current] })
        }
    }))
);