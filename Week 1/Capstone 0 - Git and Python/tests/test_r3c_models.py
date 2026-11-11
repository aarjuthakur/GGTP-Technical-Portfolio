import unittest
from hms.models.patient import Patient
from hms.models.doctor import Doctor
from hms.models.surgery import Surgery
from hms.models.operation_theatre import (
    OperationTheatre,
    ResourceConflictError
)
from hms.models.diet_plan import DietPlan
from hms.models.visitor_pass import VisitorPass, VisitorPolicyError
from hms.models.referral import Referral
from hms.models.follow_up import FollowUp

#testing file print("hello wwold")
class TestSurgery(unittest.TestCase):

    def setUp(self):
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Heart"
        )
        self.doctor = Doctor(
            2, "Dr. Smith", 45, "9876543210", "Male",
            "Cardiology", 500
        )
        self.surgery = Surgery(
            "S001", self.patient, self.doctor, "Bypass"
        )

    def test_attributes(self):
        self.assertEqual(self.surgery.surgery_id, "S001")
        self.assertEqual(self.surgery.patient, self.patient)
        self.assertEqual(self.surgery.doctor, self.doctor)
        self.assertEqual(self.surgery.surgery_type, "Bypass")

    def test_str(self):
        result = str(self.surgery)
        self.assertIn("S001", result)
        self.assertIn("Bypass", result)


class TestOperationTheatre(unittest.TestCase):

    def setUp(self):
        self.theatre = OperationTheatre("OT1")

    def test_attributes(self):
        self.assertEqual(self.theatre.theatre_id, "OT1")
        self.assertEqual(self.theatre.bookings, [])

    def test_reserve_slot(self):
        self.theatre.reserve("10:00 AM")
        self.assertIn("10:00 AM", self.theatre.bookings)

    def test_reserve_duplicate_slot_raises(self):
        self.theatre.reserve("10:00 AM")
        with self.assertRaises(ResourceConflictError):
            self.theatre.reserve("10:00 AM")

    def test_reserve_multiple_different_slots(self):
        self.theatre.reserve("10:00 AM")
        self.theatre.reserve("2:00 PM")
        self.assertEqual(len(self.theatre.bookings), 2)


class TestDietPlan(unittest.TestCase):

    def setUp(self):
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Diabetes"
        )
        self.diet = DietPlan(self.patient, "Low Sugar")

    def test_attributes(self):
        self.assertEqual(self.diet.patient, self.patient)
        self.assertEqual(self.diet.diet_name, "Low Sugar")

    def test_str(self):
        result = str(self.diet)
        self.assertIn("John", result)
        self.assertIn("Low Sugar", result)


class TestVisitorPass(unittest.TestCase):

    def setUp(self):
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )
        self.visitor = VisitorPass("Jane Doe", self.patient)

    def test_attributes(self):
        self.assertEqual(self.visitor.visitor_name, "Jane Doe")
        self.assertEqual(self.visitor.patient, self.patient)

    def test_visitor_policy_error(self):
        with self.assertRaises(VisitorPolicyError):
            raise VisitorPolicyError("Too many visitors")


class TestReferral(unittest.TestCase):

    def setUp(self):
        self.from_doc = Doctor(
            1, "Dr. A", 40, "1234567890", "Male", "General", 300
        )
        self.to_doc = Doctor(
            2, "Dr. B", 50, "9876543210", "Male", "Cardiology", 500
        )
        self.patient = Patient(
            3, "John", 30, "5555555555", "Male", "P001", "Heart"
        )
        self.referral = Referral(
            self.from_doc, self.to_doc, self.patient
        )

    def test_attributes(self):
        self.assertEqual(self.referral.from_doctor, self.from_doc)
        self.assertEqual(self.referral.to_doctor, self.to_doc)
        self.assertEqual(self.referral.patient, self.patient)


class TestFollowUp(unittest.TestCase):

    def setUp(self):
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )
        self.followup = FollowUp(self.patient, "2024-02-15")

    def test_attributes(self):
        self.assertEqual(self.followup.patient, self.patient)
        self.assertEqual(self.followup.followup_date, "2024-02-15")


if __name__ == "__main__":
    unittest.main()
