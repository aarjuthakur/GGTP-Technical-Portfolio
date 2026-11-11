#updating person class for better abstraction and encapsulation
import re
from abc import ABC, abstractmethod
#bug fix

class Person(ABC):

    def __init__(self, person_id, p_name, p_age, p_phone, p_gender):
        self.person_id = person_id
        self.name = p_name
        self.age = p_age
        self.phone = p_phone
        self.gender = p_gender
    #encapsulation
    @property
    def name(self):
        return self.__name

    @name.setter
    def name(self, value):
        value = str(value).strip()
        if not value:
            raise ValueError("Name cannot be empty.")
        if not re.fullmatch(r"[A-Za-z][A-Za-z .'-]*", value):
            raise ValueError(
                "Name must contain only letters, spaces, apostrophes, hyphens, and periods."
            )
        self.__name = value

    @property
    def age(self):
        return self.__age
    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative.")
        elif value > 120:
            raise ValueError("Age cannot be greater than 120.")
        else:
            self.__age = value
    #decorator
    @property
    def phone(self):
        return self.__phone

    @phone.setter
    def phone(self, value):
        value = str(value)
        if len(value) != 10:
            raise ValueError("Phone number must be a 10-digit number.")
        elif not value.isdigit():
            raise ValueError("Phone number must contain only digits.")
        else:
            self.__phone = value

    @abstractmethod
    def get_details(self):
        pass

    def __str__(self):
        return (
            f"Person(ID={self.person_id}, "
            f"Name={self.name}, "
            f"Age={self.age}, "
            f"Phone={self.phone}, "
            f"Gender={self.gender})"
        )
    