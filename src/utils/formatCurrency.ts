import CURRENCY_FORMATTER from "../constants/currencyFormat";

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number);
}