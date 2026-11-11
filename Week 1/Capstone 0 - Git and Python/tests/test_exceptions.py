import unittest
from hms.exceptions.hospital_exception import (
    HospitalError,
    PatientNotFoundError,
    DoctorNotAvailableError,
    WardFullError,
    InvalidOperationError
)
#testing file print("hello wwold")

class TestExceptionHierarchy(unittest.TestCase):

    def test_hospital_error_is_exception(self):
        self.assertTrue(issubclass(HospitalError, Exception))

    def test_patient_not_found_inherits_hospital_error(self):
        self.assertTrue(
            issubclass(PatientNotFoundError, HospitalError)
        )

    def test_doctor_not_available_inherits_hospital_error(self):
        self.assertTrue(
            issubclass(DoctorNotAvailableError, HospitalError)
        )

    def test_ward_full_inherits_hospital_error(self):
        self.assertTrue(
            issubclass(WardFullError, HospitalError)
        )

    def test_invalid_operation_inherits_hospital_error(self):
        self.assertTrue(
            issubclass(InvalidOperationError, HospitalError)
        )

    def test_raise_patient_not_found(self):
        with self.assertRaises(PatientNotFoundError):
            raise PatientNotFoundError("Patient not found")

    def test_raise_doctor_not_available(self):
        with self.assertRaises(DoctorNotAvailableError):
            raise DoctorNotAvailableError("Doctor not available")

    def test_raise_ward_full(self):
        with self.assertRaises(WardFullError):
            raise WardFullError("Ward is full")

    def test_raise_invalid_operation(self):
        with self.assertRaises(InvalidOperationError):
            raise InvalidOperationError("Invalid operation")

    def test_catch_all_with_hospital_error(self):
        with self.assertRaises(HospitalError):
            raise PatientNotFoundError("caught by parent")


if __name__ == "__main__":
    unittest.main()
