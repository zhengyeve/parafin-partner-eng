const PARAFIN_ADDRESS_PAYLOAD = {
      "line1": "301 Howard St",
      "line2": "",
      "city": "San Francisco",
      "state": "CA",
      "country": "US",
      "postal_code": "94105"
    };

const PARAFIN_SANDBOX_CREATE_BUSINESS_PAYLOAD = {
   "capital_product_offer": {
      "max_offer_amount": "30000",
      "product_type": "flex_loan",
      "include_fee_discount": false
   },
   "person": {
      "address": {
         "city": "San Francisco",
         "country": "US",
         "state": "CA",
         "postal_code": "94105",
         "line1": "301 Howard St"
      },
      "contact_email": "e.leroy@cornergas.com",
      "contact_phone": "6502228888",
      "first_name": "Test",
      "last_name": "Test"
   },
   "business": {
      "address": {
         "city": "San Francisco",
         "country": "US",
         "state": "CA",
         "postal_code": "94105",
         "line1": "301 Howard St"
      },
      "dba_name": "cornergas",
      "established_date": "2022-10-10",
      "incorporation_state": "CA",
      "incorporation_type": "corporation",
      "legal_name": "Corner Gas Inc",
      "mcc": "5541"
   },
   "bank_account": {
      "account_number": {
         "last4": "5678"
      },
      "routing_number": "021000021",
      "currency": "USD",
      "is_verified": true
   }
};

module.exports = {
   PARAFIN_ADDRESS_PAYLOAD,
   PARAFIN_SANDBOX_CREATE_BUSINESS_PAYLOAD
};