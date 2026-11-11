from abc import ABC, abstractmethod

#payment policy added
class PaymentPolicy(ABC):

    @abstractmethod
    def apply_payment(self, amount):
        pass