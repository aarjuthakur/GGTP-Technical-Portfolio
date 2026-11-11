from hms.models.person import Person
class Receptionist(Person):
    def __init__(self, person_id, p_name, p_age, p_phone, p_gender, receptionist_id, shift):
        super().__init__(person_id, p_name, p_age, p_phone, p_gender)
        self.receptionist_id = receptionist_id
        self.shift = shift

    def get_details(self):
        return {"Receptionist_ID": self.receptionist_id,
                "Name": self.name,
                "Age": self.age,
                "Phone": self.phone,
                "Gender": self.gender,
                "Shift": self.shift}
    def __str__(self):
        return (
            f"Receptionist(ID={self.receptionist_id}, "
            f"Name={self.name}, "
            f"Age={self.age}, "
            f"Phone={self.phone}, "
            f"Gender={self.gender}, "
            f"Shift={self.shift})"
        )