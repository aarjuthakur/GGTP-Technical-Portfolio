import unittest
from hms.models.ward import Ward
#testing file print("hello wwold")

class TestWard(unittest.TestCase):

    def setUp(self):
        self.ward = Ward("General", 10, 500)

    def test_attributes(self):
        self.assertEqual(self.ward.ward_type, "General")
        self.assertEqual(self.ward.total_beds, 10)
        self.assertEqual(self.ward.beds_occupied, 0)
        self.assertEqual(self.ward.per_day_charge, 500)

    def test_beds_available(self):
        self.assertEqual(self.ward.beds_available(), 10)
        self.ward.beds_occupied = 3
        self.assertEqual(self.ward.beds_available(), 7)

    def test_if_full_when_not_full(self):
        self.assertFalse(self.ward.if_full())

    def test_if_full_when_full(self):
        self.ward.beds_occupied = 10
        self.assertTrue(self.ward.if_full())

    def test_str_returns_string(self):
        result = str(self.ward)
        self.assertIsInstance(result, str)
        self.assertIn("General", result)

    def test_len_returns_total_beds(self):
        self.assertEqual(len(self.ward), 10)

    def test_repr(self):
        result = repr(self.ward)
        self.assertIsInstance(result, str)


if __name__ == "__main__":
    unittest.main()
