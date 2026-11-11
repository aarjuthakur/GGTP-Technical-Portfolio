import unittest
from hms.models.doctor import Doctor
from hms.models.senior_doc import SeniorDoctor


class TestDoctor(unittest.TestCase):

    def setUp(self):
        self.doctor = Doctor(
            1, "Dr. Smith", 45, "1234567890", "Male",
            "Cardiology", 500
        )

    def test_attributes(self):
        self.assertEqual(self.doctor.person_id, 1)
        self.assertEqual(self.doctor.name, "Dr. Smith")
        self.assertEqual(self.doctor.specialization, "Cardiology")
        self.assertEqual(self.doctor.consultation_fee, 500)

    def test_get_details_returns_dict(self):
        details = self.doctor.get_details()
        self.assertIsInstance(details, dict)
        self.assertEqual(details["Name"], "Dr. Smith")
        self.assertEqual(details["Specialization"], "Cardiology")

    def test_str_returns_string(self):
        result = str(self.doctor)
        self.assertIsInstance(result, str)
        self.assertIn("Doctor(ID=1, Name=Dr. Smith", result)
        self.assertNotIn("{", result)
        self.assertNotIn("}", result)

    def test_lt_comparison(self):
        cheaper = Doctor(
            2, "Dr. Jones", 38, "9876543210", "Female",
            "Dermatology", 300
        )
        self.assertTrue(cheaper < self.doctor)
        self.assertFalse(self.doctor < cheaper)

    def test_repr(self):
        result = repr(self.doctor)
        self.assertIsInstance(result, str)


class TestSeniorDoctor(unittest.TestCase):

    def setUp(self):
        self.senior = SeniorDoctor(
            3, "Dr. Senior", 60, "5555555555", "Male",
            "Neurology", 1000, 25
        )

    def test_attributes(self):
        self.assertEqual(self.senior.experience_years, 25)
        self.assertEqual(self.senior.specialization, "Neurology")

    def test_get_details_returns_string(self):
        details = self.senior.get_details()
        self.assertIsInstance(details, str)
        self.assertIn("Dr. Senior", details)
        self.assertIn("Neurology", details)
        self.assertIn("25", details)

    def test_str(self):
        result = str(self.senior)
        self.assertIn("Dr. Senior", result)

    def test_inherits_from_doctor(self):
        self.assertIsInstance(self.senior, Doctor)


if __name__ == "__main__":
    unittest.main()
