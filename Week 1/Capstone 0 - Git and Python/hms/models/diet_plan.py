#diet
class DietPlan:

    def __init__(
        self,
        patient,
        diet_name
    ):
        self.patient = patient
        self.diet_name = diet_name

    def __str__(self):

        return (
            f"DietPlan("
            f"Patient={self.patient.name}, "
            f"Diet={self.diet_name})"
        )
