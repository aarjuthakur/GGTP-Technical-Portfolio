import unittest
from hms.models.patient import Patient
from hms.models.inpatient import Inpatient
from hms.models.outpatient import Outpatient

#testing file print("hello wwold")
class TestPatient(unittest.TestCase):

    def setUp(self):
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )

    def test_attributes(self):
        self.assertEqual(self.patient.person_id, 1)
        self.assertEqual(self.patient.name, "John")
        self.assertEqual(self.patient.age, 30)
        self.assertEqual(self.patient.phone, "1234567890")
        self.assertEqual(self.patient.gender, "Male")
        self.assertEqual(self.patient.patient_id, "P001")
        self.assertEqual(self.patient.disease, "Fever")

    def test_get_details_returns_string(self):
        details = self.patient.get_details()
        self.assertIsInstance(details, str)
        self.assertIn("P001", details)
        self.assertIn("John", details)
        self.assertIn("Fever", details)

    def test_str(self):
        result = str(self.patient)
        self.assertIn("John", result)

    def test_eq_same_patient_id(self):
        other = Patient(
            2, "Jane", 25, "9876543210", "Female", "P001", "Cold"
        )
        self.assertEqual(self.patient, other)

    def test_eq_different_patient_id(self):
        other = Patient(
            2, "Jane", 25, "9876543210", "Female", "P002", "Cold"
        )
        self.assertNotEqual(self.patient, other)

    def test_repr(self):
        result = repr(self.patient)
        self.assertIsInstance(result, str)

    def test_age_validation_negative(self):
        with self.assertRaises(ValueError):
            Patient(1, "Test", -1, "1234567890", "Male", "P003", "Flu")

    def test_age_validation_too_high(self):
        with self.assertRaises(ValueError):
            Patient(1, "Test", 121, "1234567890", "Male", "P003", "Flu")

    def test_phone_validation_wrong_length(self):
        with self.assertRaises(ValueError):
            Patient(1, "Test", 30, "123", "Male", "P003", "Flu")


class TestInpatient(unittest.TestCase):

    def setUp(self):
        self.inpatient = Inpatient(
            1, "Alice", 40, "1234567890", "Female",
            "P010", "Surgery", "R101", "2024-01-15"
        )

    def test_attributes(self):
        self.assertEqual(self.inpatient.room_number, "R101")
        self.assertEqual(self.inpatient.admission_date, "2024-01-15")
        self.assertEqual(self.inpatient.patient_id, "P010")

    def test_get_details(self):
        details = self.inpatient.get_details()
        self.assertIsInstance(details, dict)
        self.assertEqual(details["Room Number"], "R101")

    def test_str(self):
        result = str(self.inpatient)
        self.assertIsInstance(result, str)
        self.assertIn("Inpatient(ID=P010, Name=Alice", result)
        self.assertNotIn("{", result)
        self.assertNotIn("}", result)


class TestOutpatient(unittest.TestCase):

    def setUp(self):
        self.outpatient = Outpatient(
            2, "Bob", 35, "9876543210", "Male",
            "P020", "Checkup", "2024-02-20", "D001"
        )

    def test_attributes(self):
        self.assertEqual(self.outpatient.appointment_date, "2024-02-20")
        self.assertEqual(self.outpatient.doctor_id, "D001")
        self.assertEqual(self.outpatient.patient_id, "P020")

    def test_get_details(self):
        details = self.outpatient.get_details()
        self.assertIsInstance(details, dict)

    def test_str(self):
        result = str(self.outpatient)
        self.assertIsInstance(result, str)
        self.assertIn("Outpatient(ID=P020, Name=Bob", result)
        self.assertNotIn("{", result)
        self.assertNotIn("}", result)


if __name__ == "__main__":
    unittest.main()
