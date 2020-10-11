export interface MetarInfo {
    type:                    string;
    symbol:                  string;
    network_confirmations:   number;
    sort_order:              number;
    crypto_address_link:     string;
    crypto_transaction_link: string;
    push_payment_methods:    string[];
    group_types:             string[];
}
