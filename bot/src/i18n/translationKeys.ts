export enum translationKeys {
  start_command_intro,
  start_command_error,

  command_text_createwallet,
  command_text_request,
  command_text_send,
  command_text_topup,
  command_text_balance,
  command_text_help,
  command_missing_country,
  command_missing_currency,

  createwallet_command_reply,
  createwallet_command_error_rapyd_ewallet_exists_for_user_id,

  topup_command_amount_reply,
  topup_command_checkout_page_button_text,
  topup_command_invalid_amount_reply,
  topup_command_checkout_page_reply,

  setcountry_command_reply,
  setcountry_command_on_country_select_reply,

  setcurrency_command_reply,
  setcurrency_command_on_currency_change_reply,

  transfer_command_reply_no_user_no_amount,
  transfer_command_reply_username_pending_amount,
  transfer_command_reply_confirmation,
  transfer_command_reply_amount_error,
  transfer_command_reply_username_not_found_error,
  transfer_command_notify_recipient_about_incoming_transfer,
  transfer_command_notify_sender_about_accepted_transfer,
  transfer_command_notify_sender_about_rejected_transfer,
  transfer_command_button_accept,
  transfer_command_button_reject,
  transfer_command_reply_accept_transfer_request,
  transfer_command_reply_reject_transfer_request,
  transfer_command_error_reply_transfer_from_wallet_response_is_not_paid,

  walletbalance_command_error_ewallet_does_not_have_balances,

  help_command_buttons,
}
