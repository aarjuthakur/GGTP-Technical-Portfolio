from abc import ABC
#patient status abs

class PatientStatus(ABC):

    def __str__(self):
        return self.__class__.__name__