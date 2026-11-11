# ABOUTME: ECG test recording heart rate and rhythm.
# ABOUTME: Concrete lab test priced at the standard rate.

from hms.models.lab.lab_test import LabTest

#ecg import#S
class ECG(LabTest):

    def __init__(self, cost):
        super().__init__("ECG", cost)

    def get_details(self):
        return f"{self.test_name} - Cost: {self.cost}"
