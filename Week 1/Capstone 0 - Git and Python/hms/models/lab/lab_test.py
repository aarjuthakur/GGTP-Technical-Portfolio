# Abstract base class for all laboratory tests.
# Defines the contract that concrete lab tests must follow.

from abc import ABC, abstractmethod

#abstract base class genereraye
class LabTest(ABC):

    def __init__(self, test_name, cost):
        self.test_name = test_name
        self.cost = cost

    @abstractmethod
    def get_details(self):
        pass
