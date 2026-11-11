class DoctorLeave:
#leave
    def __init__(self, doctor, leave_date):
        self.doctor = doctor
        self.leave_date = leave_date
#doctor
    def notify_patients(self, appointments):
        for appointment in appointments:
            if appointment.doctor == self.doctor:
                appointment.status = "RESCHEDULE_PENDING"