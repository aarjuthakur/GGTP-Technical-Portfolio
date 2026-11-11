import unittest
from hms.models.nurse import Nurse
from hms.models.receptionist import Receptionist

#testing file print("hello wwold")
class TestNurse(unittest.TestCase):

    def setUp(self):
        self.nurse = Nurse(
            1, "Nurse Joy", 30, "1234567890", "Female",
            "N001", "Emergency"
        )

    def test_attributes(self):
        self.assertEqual(self.nurse.nurse_id, "N001")
        self.assertEqual(self.nurse.department, "Emergency")
        self.assertEqual(self.nurse.name, "Nurse Joy")

    def test_get_details(self):
        details = self.nurse.get_details()
        self.assertIsInstance(details, dict)
        self.assertEqual(details["Department"], "Emergency")

    def test_str(self):
        result = str(self.nurse)
        self.assertIsInstance(result, str)
        self.assertIn("Nurse(ID=N001, Name=Nurse Joy", result)
        self.assertNotIn("{", result)
        self.assertNotIn("}", result)


class TestReceptionist(unittest.TestCase):

    def setUp(self):
        self.receptionist = Receptionist(
            2, "Ravi", 28, "9876543210", "Male",
            "R001", "Morning"
        )

    def test_attributes(self):
        self.assertEqual(self.receptionist.receptionist_id, "R001")
        self.assertEqual(self.receptionist.shift, "Morning")

    def test_get_details(self):
        details = self.receptionist.get_details()
        self.assertIsInstance(details, dict)
        self.assertEqual(details["Shift"], "Morning")

    def test_str(self):
        result = str(self.receptionist)
        self.assertIsInstance(result, str)
        self.assertIn("Receptionist(ID=R001, Name=Ravi", result)
        self.assertNotIn("{", result)
        self.assertNotIn("}", result)


if __name__ == "__main__":
    unittest.main()
