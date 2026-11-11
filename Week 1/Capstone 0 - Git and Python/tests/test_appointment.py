import unittest
from hms.models.appointment import Appointment, AppointmentStatus
from hms.models.patient import Patient
from hms.models.doctor import Doctor

#testing file print("hello wwold")
class TestAppointment(unittest.TestCase):

    def setUp(self):
        self.patient = Patient(
            1, "John", 30, "1234567890", "Male", "P001", "Fever"
        )
        self.doctor = Doctor(
            2, "Dr. Smith", 45, "9876543210", "Male",
            "General", 300
        )
        self.appointment = Appointment(
            "A001", self.patient, self.doctor, "10:00 AM"
        )

    def test_initial_status_is_scheduled(self):
        self.assertEqual(
            self.appointment.status,
            AppointmentStatus.SCHEDULED
        )

    def test_cancel(self):
        self.appointment.cancel()
        self.assertEqual(
            self.appointment.status,
            AppointmentStatus.CANCELLED
        )

    def test_complete(self):
        self.appointment.complete()
        self.assertEqual(
            self.appointment.status,
            AppointmentStatus.COMPLETED
        )

    def test_cancelled_appointment_does_not_conflict(self):
        other = Appointment(
            "A002", self.patient, self.doctor, "10:00 AM"
        )
        self.appointment.cancel()
        self.assertFalse(self.appointment.conflicts_with(other))
        self.assertFalse(other.conflicts_with(self.appointment))

    def test_scheduled_appointments_conflict_for_same_doctor_and_slot(self):
        other = Appointment(
            "A002", self.patient, self.doctor, "10:00 AM"
        )
        self.assertTrue(self.appointment.conflicts_with(other))

    def test_str(self):
        result = str(self.appointment)
        self.assertIn("A001", result)
        self.assertIn("John", result)
        self.assertIn("Dr. Smith", result)
        self.assertIn("Scheduled", result)

    def test_appointment_status_values(self):
        self.assertEqual(AppointmentStatus.SCHEDULED.value, "Scheduled")
        self.assertEqual(AppointmentStatus.COMPLETED.value, "Completed")
        self.assertEqual(AppointmentStatus.CANCELLED.value, "Cancelled")


if __name__ == "__main__":
    unittest.main()
