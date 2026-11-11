import unittest
from hms.models.bill import Bill
from hms.models.patient import Patient
from hms.services.bill_services import BillService

#testing file print("hello wwold")
class TestBillModel(unittest.TestCase):

    def setUp(self):
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )
        self.bill = Bill("B001", self.patient, 1500)

    def test_attributes(self):
        self.assertEqual(self.bill.bill_id, "B001")
        self.assertEqual(self.bill.patient, self.patient)
        self.assertEqual(self.bill.amount, 1500)

    def test_str(self):
        result = str(self.bill)
        self.assertIn("B001", result)
        self.assertIn("John", result)
        self.assertIn("1500", result)


class TestBillService(unittest.TestCase):

    def test_calculate_bill_basic(self):
        service = BillService(doc_fee=500, medication_cost=200)
        result = service.calculate_bill()
        expected = round((500 + 200) * 1.05, 2)
        self.assertEqual(result, expected)

    def test_calculate_bill_with_ward(self):
        service = BillService(
            doc_fee=500, medication_cost=200, ward_cost=1000
        )
        result = service.calculate_bill()
        expected = round((500 + 200 + 1000) * 1.05, 2)
        self.assertEqual(result, expected)

    def test_calculate_bill_senior_citizen_discount(self):
        service = BillService(
            doc_fee=500, medication_cost=200,
            ward_cost=1000, senior_citizen=True
        )
        result = service.calculate_bill()
        subtotal = 500 + 200 + 1000
        with_tax = subtotal * 1.05
        with_discount = with_tax * 0.9
        self.assertEqual(result, round(with_discount, 2))

    def test_add_two_bills(self):
        bill1 = BillService(doc_fee=500, medication_cost=200)
        bill2 = BillService(doc_fee=300, medication_cost=100)
        total = bill1 + bill2
        expected = bill1.calculate_bill() + bill2.calculate_bill()
        self.assertEqual(total, expected)


if __name__ == "__main__":
    unittest.main()
