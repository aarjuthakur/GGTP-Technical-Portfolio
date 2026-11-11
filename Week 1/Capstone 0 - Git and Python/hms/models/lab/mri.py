# ABOUTME: MRI scan requiring doctor approval before scheduling.
# ABOUTME: Concrete lab test priced at the standard rate.

from hms.models.lab.lab_test import LabTest
#mri import

class MRI(LabTest):

    def __init__(self, cost):
        super().__init__("MRI", cost)

    def get_details(self):
        return f"{self.test_name} - Cost: {self.cost}"
