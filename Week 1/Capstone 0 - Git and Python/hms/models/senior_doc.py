#ineritence from doctor class
from hms.models.doctor import Doctor


class SeniorDoctor(Doctor):

    def __init__(
        self, person_id, p_name,p_age, p_phone, p_gender, specialization, consultation_fee, experience_years):
        super().__init__(person_id,p_name,p_age,p_phone,p_gender,specialization,consultation_fee)

        self.experience_years = experience_years

    def get_details(self):
        return (
            f"Senior Doctor: {self.name}, "
            f"Specialization: {self.specialization}, "
            f"Experience: {self.experience_years} years"
        )
#doc
    def __str__(self):
        return self.get_details()