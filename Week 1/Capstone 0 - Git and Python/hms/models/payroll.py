class Payroll:
#payment handling
    def __init__(self, employee_name, salary):
        self.employee_name = employee_name
        self.salary = salary

    def calculate_salary(self):
        return self.salary
#calculation
    def __str__(self):
        return (
            f"Payroll("
            f"Employee={self.employee_name}, "
            f"Salary={self.salary})"
        )
