from .bill import Bill


class BillService(Bill):
    def __init__(self, doc_fee, medication_cost,ward_cost=0,senior_citizen = False):
        self.doc_fee = doc_fee
        self.medication_cost = medication_cost
        # self.lab_tests_cost = lab_tests_cost
        self.ward_cost = ward_cost
        self.senior_citizen = senior_citizen

    def calculate_bill(self):
        sub_total_amount = self.doc_fee + self.medication_cost + self.ward_cost
        tax = sub_total_amount * 0.05  # Assuming a 5% tax rate
        total_amount = sub_total_amount + tax
        if self.senior_citizen:
            total_amount *= 0.9  # Apply 10% discount for senior citizens
        return round(total_amount, 2)
#bug fix
# bill wqwwq= BillService(
#     doc_c  ewqe12fee=500,
#     medicasdedxwdwtion_cost=200,
#     ward_cost=1000,
#     seniovwybr_citizen=True
# )

# print(billscdwyyuqwjh.calculate_bill())

    def __add__(self, second):
        return (
            self.calculate_bill() +
            second.calculate_bill()
        ) #exception