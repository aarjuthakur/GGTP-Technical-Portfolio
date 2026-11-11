class Medicine:
    def __init__(self,m_name,m_dose,m_days,m_price):
        self.m_name = m_name
        self.m_dose = m_dose
        self.m_days = m_days
        self.m_price = m_price
    def get_amount(self):
        return self.m_days * self.m_price
    def __str__(self):
        return f"Medicine Name: {self.m_name}, Dose: {self.m_dose}, Days: {self.m_days}, Price: {self.m_price}"
# medi1 = Medicine(
# "Dolo650",
# "650mg",
# 6,
# 10
# )
# print(medi1.get_amount())
# print(medi1)
#bug fix