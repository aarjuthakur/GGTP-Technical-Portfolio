#admited patient inhetits from patient class
from hms.models.patient import Patient
class Inpatient(Patient):
    def __init__(self, person_id, p_name, p_age, p_phone, p_gender, patient_id, disease, room_number, admission_date):
        super().__init__(person_id, p_name, p_age, p_phone, p_gender, patient_id,disease)
        self.room_number = room_number
        self.admission_date = admission_date

    def get_details(self):
        return {
            "Inpatient_ID": self.patient_id,
            "Name": self.name,
            "Age": self.age,
            "Phone": self.phone,
            "Gender of patient": self.gender,
            "Room Number": self.room_number,
            "Admission Date": self.admission_date
        }
    def __str__(self):
        return (
            f"Inpatient(ID={self.patient_id}, "
            f"Name={self.name}, "
            f"Age={self.age}, "
            f"Phone={self.phone}, "
            f"Gender={self.gender}, "
            f"Room={self.room_number}, "
            f"Admission Date={self.admission_date})"
        )