class Bed:
#bed avail
    AVAILABLE = "AVAILABLE"
    OCCUPIED = "OCCUPIED"
    CLEANING = "CLEANING"
    MAINTENANCE = "MAINTENANCE"

    def __init__(self, bed_number):
        self.bed_number = bed_number
        self.status = Bed.AVAILABLE

    def change_status(self, status):
        self.status = status
#change setup
    def __str__(self):

        return (
            f"Bed("
            f"Number={self.bed_number}, "
            f"Status={self.status})"
        )
