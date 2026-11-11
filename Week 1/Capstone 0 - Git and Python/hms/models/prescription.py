from hms.exceptions.allergy_alert_error import AllergyAlertError


class Prescription:
#bug fix
    def __init__(
        self,
        prescription_id,
        doctor,
        patient
    ):
        self.allergies = []
        self.prescription_id = prescription_id
        self.doctor = doctor
        self.patient = patient
        self.medicines = []
    def check_allergy(self, medicine_name):

        if medicine_name in self.allergies:
            raise AllergyAlertError(
                f"Allergy detected: {medicine_name}"
            )
    def add_medicine(self, medicine):
        self.medicines.append(medicine)
#adding medecine
    def __str__(self):

        medicine_names = [
            medicine.m_name
            for medicine in self.medicines
        ]
#str representation
        return (
            f"Prescription("
            f"ID={self.prescription_id}, "
            f"Medicines={medicine_names})"
        )
#adding prescriptin details