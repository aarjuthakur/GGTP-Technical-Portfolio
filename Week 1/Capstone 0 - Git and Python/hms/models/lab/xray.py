# ABOUTME: X-Ray imaging test with body part and findings reporting.
# ABOUTME: Concrete lab test priced at the standard rate.

from hms.models.lab.lab_test import LabTest

#imort
class XRay(LabTest):

    def __init__(self, cost):
        super().__init__("X-Ray", cost)
#xray
    def get_details(self):
        return f"{self.test_name} - Cost: {self.cost}"
