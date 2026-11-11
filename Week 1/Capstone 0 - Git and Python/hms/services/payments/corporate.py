from hms.services.payments.payment_policy import PaymentPolicy

#tie up
class CorporateTieUp(PaymentPolicy):

    def apply_payment(self, amount):
        return amount * 0.10