class Ward:
    def __init__(self, ward_type, total_beds, per_day_charge):
        self.ward_type = ward_type
        self.total_beds = total_beds
        self.beds_occupied = 0
        self.per_day_charge = per_day_charge
    def beds_available(self):
        return self.total_beds - self.beds_occupied
    def if_full(self):
        if self.beds_occupied == self.total_beds:
            return True
        else:
            return False
    def __str__(self):
        return (
            f"Ward(Type={self.ward_type}, "
            f"Total Beds={self.total_beds}, "
            f"Occupied={self.beds_occupied}, "
            f"Per Day Charge={self.per_day_charge})"
        )
#bug fix
    def __len__(self):
        return self.total_beds  #to count total beds

    def __contains__(self, patient):
        return hasattr(patient, "ward_number")

    def __repr__(self): #string rep
        return self.__str__()