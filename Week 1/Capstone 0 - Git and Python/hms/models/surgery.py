class Surgery:
#surgery
    def __init__(
        self,
        surgery_id,
        patient,
        doctor,
        surgery_type
    ):
        self.surgery_id = surgery_id
        self.patient = patient
        self.doctor = doctor
        self.surgery_type = surgery_type

    def __str__(self):

        return (
            f"Surgery("
            f"ID={self.surgery_id}, "
            f"Type={self.surgery_type})"
        )
