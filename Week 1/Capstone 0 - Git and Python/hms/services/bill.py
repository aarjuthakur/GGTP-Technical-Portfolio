#implementation of bill service
from abc import ABC, abstractmethod
class Bill(ABC):
    @abstractmethod
    def calculate_bill(self):
        pass