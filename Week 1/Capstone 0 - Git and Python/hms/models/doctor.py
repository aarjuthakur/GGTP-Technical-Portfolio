#Inheritence
from hms.models.person import Person
class Doctor(Person):
    def __init__(self, person_id, p_name, p_age, p_phone, p_gender, specialization, consultation_fee):
        super().__init__(person_id, p_name, p_age, p_phone, p_gender)
        self.specialization = specialization
        self.consultation_fee = consultation_fee
    def get_details(self):
        return {
            "ID": self.person_id,
            "Name": self.name,
            "Age": self.age,
            "Phone": self.phone,
            "Gender": self.gender,
            "Specialization": self.specialization,
            "Consultation Fee": self.consultation_fee
        }
    def __str__(self):
        return (
            f"Doctor(ID={self.person_id}, "
            f"Name={self.name}, "
            f"Age={self.age}, "
            f"Phone={self.phone}, "
            f"Gender={self.gender}, "
            f"Specialization={self.specialization}, "
            f"Consultation Fee={self.consultation_fee})"
        )
#bug fix
    def __lt__(self, second):
        return self.consultation_fee < second.consultation_fee
    #exception

    def __repr__(self):
        return self.__str__()