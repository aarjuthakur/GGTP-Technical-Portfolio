import unittest
from hms.models.prescription import Prescription
from hms.models.patient import Patient
from hms.models.doctor import Doctor
from hms.models.medicine import Medicine
#testing file print("hello wwold")

class TestPrescription(unittest.TestCase):

    def setUp(self):
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )
        self.doctor = Doctor(
            2, "Dr. Smith", 45, "9876543210", "Male",
            "General", 300
        )
        self.prescription = Prescription(
            "RX001", self.doctor, self.patient
        )

    def test_attributes(self):
        self.assertEqual(self.prescription.prescription_id, "RX001")
        self.assertEqual(self.prescription.doctor, self.doctor)
        self.assertEqual(self.prescription.patient, self.patient)
        self.assertEqual(self.prescription.medicines, [])

    def test_add_medicine(self):
        med = Medicine("Paracetamol", "500mg", 5, 10)
        self.prescription.add_medicine(med)
        self.assertEqual(len(self.prescription.medicines), 1)

    def test_str_with_medicines(self):
        med = Medicine("Paracetamol", "500mg", 5, 10)
        self.prescription.add_medicine(med)
        result = str(self.prescription)
        self.assertIn("RX001", result)
        self.assertIn("Paracetamol", result)

    def test_str_empty_medicines(self):
        result = str(self.prescription)
        self.assertIn("RX001", result)


if __name__ == "__main__":
    unittest.main()
