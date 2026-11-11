from hms.services.payments.payment_policy import PaymentPolicy
#gov scheme

class GovernmentScheme(PaymentPolicy):

    def apply_payment(self, amount):
        return amount * 0.50