export enum IntentAction {
  WalletCreate = "wallet_create",
  WalletDelete = "wallet_delete",
  WalletTransfer = "wallet_transfer",
  WalletTransferSelf = "wallet_transfer_self",
  WalletSetCountryCode = "wallet_set_country_code",
  WalletSetCurrencyCode = "wallet_set_currency_code",
  WalletRead = "wallet_read",

  PaymentsRequest = "payments_request",
  PaymentsLink = "payments_link",

  TransactionsLatest = "transactions_latest",
  TransactionsFrom = "transactions_from",
  TransactionsTo = "transactions_to",
  TransactionsWhen = "transactions_when",
  TransactionsCard = "transactions_card",
  TransactionsIn = "transactions_in",

  CardsCreate = "cards_create",
  CardsRead = "cards_read",
  CardsDelete = "cards_delete",
  CardsBlock = "cards_block",
  CardsUnblock = "cards_unblock",

  ContactsAdd = "contacts_add",
  ContactsDelete = "contacts_delete",
  ContactsEdit = "contacts_edit",

  LoansRequest = "loans_request",
  LoansInquiry = "loans_inquiry",
}
