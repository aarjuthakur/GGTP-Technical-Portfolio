#operation

class ResourceConflictError(Exception):
    pass


class OperationTheatre:

    def __init__(self, theatre_id):
        self.theatre_id = theatre_id
        self.bookings = []

    def reserve(self, slot):

        if slot in self.bookings:
            raise ResourceConflictError(
                "Theatre already booked"
            )

        self.bookings.append(slot)
