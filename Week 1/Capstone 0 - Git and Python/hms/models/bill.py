class Bill:
#bill setting up
    def __init__(
        self,
        bill_id,
        patient,
        amount
    ):
        self.bill_id = bill_id
        self.patient = patient
        self.amount = amount

    def __str__(self):
        return (
            f"Bill("
            f"ID={self.bill_id}, "
            f"Patient={self.patient.name}, "
            f"Amount={self.amount})"
        )
#bill setup