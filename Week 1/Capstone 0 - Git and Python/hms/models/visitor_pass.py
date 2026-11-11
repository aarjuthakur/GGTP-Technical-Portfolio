#visitor
class VisitorPolicyError(Exception):
    pass


class VisitorPass:

    def __init__(
        self,
        visitor_name,
        patient
    ):
        self.visitor_name = visitor_name
        self.patient = patient
