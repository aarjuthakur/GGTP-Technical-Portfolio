#Blood test with haemoglobin, WBC and platelet reporting.
#Concrete lab test priced at the standard rate.

from hms.models.lab.lab_test import LabTest

#import
class BloodTest(LabTest):

    def __init__(self, cost):
        super().__init__("Blood Test", cost)

    def get_details(self):
        return f"{self.test_name} - Cost: {self.cost}"
#bllod test