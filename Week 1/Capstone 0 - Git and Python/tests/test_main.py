import unittest
from unittest.mock import patch

from hms.main import main
#main test

class TestHospitalMenu(unittest.TestCase):
    def test_startup_has_data_for_every_view_option(self):
        responses = ["3", "4", "5", "P1001", "12", "13", "15", "16", "0"]
        with patch("builtins.input", side_effect=responses):
            with patch("builtins.print") as print_output:
                main()

        printed = "\n".join(
            " ".join(str(arg) for arg in call.args)
            for call in print_output.call_args_list
        )#main test
        self.assertIn("Demo data loaded.", printed)
        self.assertIn("Dr. Avery Morgan", printed)
        self.assertIn("Jordan Lee", printed)
        self.assertIn("Patient ID: P1001", printed)
        self.assertIn("General: 1/10 occupied", printed)
        self.assertIn("Bill(ID=B1001", printed)
        self.assertIn("Appointment(ID=A1001", printed)
        self.assertIn("Prescription(ID=RX1001", printed)
        self.assertNotIn("No doctors available.", printed)
        self.assertNotIn("No patients available.", printed)
        self.assertNotIn("No bills available.", printed)
        self.assertNotIn("No appointments available.", printed)
        self.assertNotIn("No prescriptions available.", printed)

    def test_demo_data_populates_records_for_menu_operations(self):
        responses = [
            "17",
            "3",
            "4",
            "5", "P1001",
            "6", "P1002", "D1001", "A1002", "2026-10-08 11:00 AM",
            "7", "A1001",
            "8", "P1002", "2",
            "12",
            "9", "P1001",
            "10", "P1002", "D1002", "RX1002",
            "Aspirin", "100 mg", "2", "5", "done",
            "11", "P1002", "D1002", "20", "0", "no", "B1002",
            "13",
            "15",
            "16",
            "17",
            "0",
        ]
        with patch("builtins.input", side_effect=responses):
            with patch("builtins.print") as print_output:
                main()

        printed = "\n".join(
            " ".join(str(arg) for arg in call.args)
            for call in print_output.call_args_list
        )#main test
        self.assertIn("Demo data loaded.", printed)
        self.assertIn("P1001", printed)
        self.assertIn("Dr. Avery Morgan", printed)
        self.assertIn("A1002", printed)
        self.assertIn("Appointment cancelled.", printed)
        self.assertIn("Sam Patel admitted to Cardiology.", printed)
        self.assertIn("Patient P1001 discharged.", printed)
        self.assertIn("RX1002", printed)
        self.assertIn("B1002", printed)
        self.assertIn("Demo data has already been loaded.", printed)

    def test_menu_workflows_and_invalid_input(self):
        responses = [
            "x",  # Invalid menu choice
            "1", "person-1", "Alex", "not-a-number", "35",
            "123", "1234567890", "Other", "P001", "Checkup",
            "2", "D001", "Dr. Smith", "45", "9876543210",
            "Other", "General", "250",
            "6", "P001", "D001", "A001", "2026-10-07 10:00",
            "7", "A001",
            "14", "Test Ward", "2", "500",
            "8", "P001", "3",
            "12",
            "9", "P001",
            "10", "P001", "D001", "RX001",
            "Paracetamol", "500mg", "3", "10", "done",
            "11", "P001", "D001", "100", "0", "no", "B001",
            "13",
            "15",
            "16",
            "0",
        ]  #main test
        with patch("builtins.input", side_effect=responses):
            with patch("builtins.print") as print_output:
                main()

        printed = "\n".join(
            " ".join(str(arg) for arg in call.args)
            for call in print_output.call_args_list
        )  #main test
        self.assertIn("Invalid choice.", printed)
        self.assertIn("Please enter a whole number.", printed)
        self.assertIn("Phone number must contain exactly 10 digits.", printed)
        self.assertIn("Patient registered successfully.", printed)
        self.assertIn("Appointment booked:", printed)
        self.assertIn("Appointment cancelled.", printed)
        self.assertIn("admitted to Test Ward.", printed)
        self.assertIn("Test Ward: 1/2 occupied", printed)
        self.assertIn("Patient P001 discharged.", printed)
        self.assertIn("Prescription added:", printed)
        self.assertIn("Bill generated:", printed)
        self.assertIn("Thank you for using CityCare HMS.", printed)

#main test
if __name__ == "__main__":
    unittest.main()
