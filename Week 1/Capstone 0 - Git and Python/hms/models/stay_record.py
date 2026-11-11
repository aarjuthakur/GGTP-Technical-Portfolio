class StayRecord:
#adding record details
    def __init__(
        self,
        ward,
        bed,
        from_date,
        to_date=None
    ):
        self.ward = ward
        self.bed = bed
        self.from_date = from_date
        self.to_date = to_date
#end stay
    def close_stay(self, discharge_date):
        self.to_date = discharge_date

    def __str__(self):
        return (
            f"StayRecord("
            f"Ward={self.ward}, "
            f"Bed={self.bed})"
        )