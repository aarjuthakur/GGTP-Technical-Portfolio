from hms.models.patient_state import PatientState
from hms.models.person import Person

#bug fux
from hms.models.status import ipd_status
from hms.models.status.opd_status import OPDStatus

class Patient(Person):

    def __init__(
        self,
        person_id,
        p_name,
        p_age,
        p_phone,
        p_gender,
        patient_id,
        disease,
        status = OPDStatus()
    ):
        super().__init__(
            person_id,
            p_name,
            p_age,
            p_phone,
            p_gender
        )
        self.state = PatientState.ADMITTED
        self.patient_id = patient_id
        self.disease = disease
        self.status = status
    def get_details(self):
        return (
            f"Patient ID: {self.patient_id}, "
            f"Name: {self.name}, "
            f"Disease: {self.disease}"
        )
    def convert_to_ipd(self, ipd_status):
        self.status = ipd_status
#opd status and ipd status 
    def __str__(self):
        return self.get_details()

    def __eq__(self, second): #acesing patient id
        return self.patient_id == second.patient_id
#equation
def __eq__(self, second): #acesing patient id
    return self.patient_id == second.patient_id


    def __repr__(self): #represent string
        return self.__str__()