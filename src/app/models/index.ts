export enum Currency {
    EUR = 'EUR',
    USD = 'USD',
}

export interface Convert {
    changeRate?: number;
    manual?: boolean;
    fromCurrency?: Currency | string;
    fromAmount?: number;
    toCurrency?: Currency | string;
    toAmount?: number;
}

export const DEFAULT_CHANGE_RATE = 1.1;