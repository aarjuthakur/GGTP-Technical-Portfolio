from hms.services.payments.payment_policy import PaymentPolicy
#private payS

class PrivateInsurance(PaymentPolicy):

    def apply_payment(self, amount):
        return amount * 0.20