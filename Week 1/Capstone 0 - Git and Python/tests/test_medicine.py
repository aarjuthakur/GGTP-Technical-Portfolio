import unittest
from hms.models.medicine import Medicine


class TestMedicine(unittest.TestCase):

    def setUp(self):
        self.med = Medicine("Paracetamol", "500mg", 5, 10)

    def test_attributes(self):
        self.assertEqual(self.med.m_name, "Paracetamol")
        self.assertEqual(self.med.m_dose, "500mg")
        self.assertEqual(self.med.m_days, 5)
        self.assertEqual(self.med.m_price, 10)

    def test_get_amount(self):
        self.assertEqual(self.med.get_amount(), 50)

    def test_get_amount_zero_days(self):
        med = Medicine("Aspirin", "100mg", 0, 20)
        self.assertEqual(med.get_amount(), 0)

    def test_str(self):
        result = str(self.med)
        self.assertIn("Paracetamol", result)
        self.assertIn("500mg", result)

#testing file print("hello wwold")
if __name__ == "__main__":
    unittest.main()
