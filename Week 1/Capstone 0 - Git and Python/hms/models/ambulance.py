class Ambulance:
#ambulance
    def __init__(self, ambulance_id, ambulance_type):
        self.ambulance_id = ambulance_id
        self.ambulance_type = ambulance_type
#str rep
    def __str__(self):

        return (
            f"Ambulance("
            f"ID={self.ambulance_id}, "
            f"Type={self.ambulance_type})"
        )
