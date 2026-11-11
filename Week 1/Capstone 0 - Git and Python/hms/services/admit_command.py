class AdmitCommand:

    def __init__(self, hospital, patient, ward):
        self.hospital = hospital
        self.patient = patient
        self.ward = ward

    def execute(self):
        self.hospital.admit_patient(
            self.patient,
            self.ward
        )

    def undo(self):

        self.hospital.discharge_patient(
            self.ward
        )
#nurse sevices