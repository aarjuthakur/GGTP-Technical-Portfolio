class HospitalError(Exception):
    pass #if patient not present hai


class PatientNotFoundError(HospitalError):
    pass #if hospital not present hai


class DoctorNotAvailableError(HospitalError):
    pass #no doc available


class WardFullError(HospitalError):
    pass #ward full 


class InvalidOperationError(HospitalError):
    pass #invalid operation 