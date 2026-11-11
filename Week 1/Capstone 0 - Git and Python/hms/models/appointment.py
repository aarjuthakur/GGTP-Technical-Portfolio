from enum import Enum
#implementing appointment class model

class AppointmentStatus(Enum):
    SCHEDULED = "Scheduled"
    COMPLETED = "Completed"
    CANCELLED = "Cancelled"
#3 types of appointment
#appointment
class Appointment:

    def __init__(
        self,
        appointment_id,
        patient,
        doctor,
        slot
    ):#appointment
        self.appointment_id = appointment_id
        self.patient = patient
        self.doctor = doctor
        self.slot = slot
        self.status = AppointmentStatus.SCHEDULED
#cancel hai
    def cancel(self):
        self.status = AppointmentStatus.CANCELLED

    def complete(self):
        self.status = AppointmentStatus.COMPLETED
    def conflicts_with(self, other):

        return (
            self.doctor == other.doctor and
            self.slot == other.slot and
            self.status != AppointmentStatus.CANCELLED and
            other.status != AppointmentStatus.CANCELLED
        )#appointment
#appointment conflict
#complete
    def __str__(self):
        return (
            f"Appointment("
            f"ID={self.appointment_id}, "
            f"Patient={self.patient.name}, "
            f"Doctor={self.doctor.name}, "
            f"Status={self.status.value})"
        )
    #str representation