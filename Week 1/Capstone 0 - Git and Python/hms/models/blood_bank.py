class BloodUnavailableError(Exception):
    pass
#blood

class BloodBank:
#bank
    def __init__(self):
        self.stock = {}

    def add_blood(self, blood_group, units):

        self.stock[blood_group] = (
            self.stock.get(blood_group, 0) + units
        )

    def issue_blood(self, blood_group, units):

        available = self.stock.get(blood_group, 0)

        if available < units:
            raise BloodUnavailableError(
                f"Insufficient blood units for {blood_group}"
            )
#setup
        self.stock[blood_group] -= units
