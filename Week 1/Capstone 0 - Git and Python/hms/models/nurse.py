
from hms.models.person import Person


class Nurse(Person):
    def __init__(self, person_id, p_name, p_age, p_phone, p_gender, nurse_id, department):
        super().__init__(person_id, p_name, p_age, p_phone, p_gender)
        self.nurse_id = nurse_id
        self.department = department
        self.shift = None
    def assign_shift(self, shift):
        self.shift = shift
    def get_details(self):
        return {"Nurse_ID": self.nurse_id, 
                "Name": self.name, 
                "Age": self.age, 
                "Phone": self.phone, 
                "Gender": self.gender, 
                "Department": self.department}
    def __str__(self):
        return (
            f"Nurse(ID={self.nurse_id}, "
            f"Name={self.name}, "
            f"Age={self.age}, "
            f"Phone={self.phone}, "
            f"Gender={self.gender}, "
            f"Department={self.department})"
        )