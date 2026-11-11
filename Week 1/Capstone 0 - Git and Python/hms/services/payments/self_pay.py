from hms.services.payments.payment_policy import PaymentPolicy

#self payS
class SelfPay(PaymentPolicy):

    def apply_payment(self, amount):
        return amount