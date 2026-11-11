# inheritence from patent class
from hms.models.patient import Patient
class Outpatient(Patient):
    def __init__(self, person_id, p_name, p_age, p_phone, p_gender, patient_id, disease, appointment_date, doctor_id):
        super().__init__(person_id, p_name, p_age, p_phone, p_gender, patient_id, disease)
        self.appointment_date = appointment_date
        self.doctor_id = doctor_id
        self.disease = disease

    def get_details(self):
        return {
            "out Patient_ID": self.patient_id,
            "Name": self.name,
            "Age": self.age,
            "Phone": self.phone,
            "Gender": self.gender,
            "Appointment Date": self.appointment_date,
            "Doctor ID": self.doctor_id
        }
    def __str__(self):
        return (
            f"Outpatient(ID={self.patient_id}, "
            f"Name={self.name}, "
            f"Age={self.age}, "
            f"Phone={self.phone}, "
            f"Gender={self.gender}, "
            f"Appointment Date={self.appointment_date}, "
            f"Doctor ID={self.doctor_id})"
        )
    #out