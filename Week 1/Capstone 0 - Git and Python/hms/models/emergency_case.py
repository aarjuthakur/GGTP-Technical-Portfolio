class EmergencyCase:
#emergency casse
    def __init__(self, patient, severity):
        self.patient = patient
        self.severity = severity

    def __lt__(self, other):
        return self.severity > other.severity