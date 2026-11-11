# Arju Thakur - Week 1 Projects

Deliverables for Week 1 (Fundamentals and Manual Testing).

## Capstone 0 - Git and Python

**Project:** CityCare Hospital Management System (HMS)

A command-line Hospital Management System built with Python OOP concepts and Git version control. Covers patient and doctor registration, appointment booking, ward management, prescriptions, billing, and surgery scheduling.

| Area | Details |
|------|---------|
| Language | Python 3.10+ |
| OOP Concepts | Abstraction, inheritance, multilevel inheritance, encapsulation, composition, polymorphism, magic methods |
| Testing | Unit tests with unittest (12 test modules) |
| Structure | Models, services, exceptions, CLI entry point |

### Key Files

| File | Description |
|------|-------------|
| [README.md](./Capstone%200%20-%20Git%20and%20Python/README.md) | Full project documentation |
| [PROJECT_INDEX.md](./Capstone%200%20-%20Git%20and%20Python/PROJECT_INDEX.md) | Project index and deliverable list |
| [CHANGELOG.md](./Capstone%200%20-%20Git%20and%20Python/CHANGELOG.md) | Release history |
| [hms/main.py](./Capstone%200%20-%20Git%20and%20Python/hms/main.py) | CLI entry point |
| [hms/cli.py](./Capstone%200%20-%20Git%20and%20Python/hms/cli.py) | CLI module |
| [docs/project-plan.md](./Capstone%200%20-%20Git%20and%20Python/docs/project-plan.md) | Sprint planning document |
| [CP 0 demo video.mp4](./Capstone%200%20-%20Git%20and%20Python/CP%200%20demo%20video.mp4) | Demo video walkthrough |

### How to Run

```bash
cd "Capstone 0 - Git and Python"
python -m hms.main
```

### Run Tests

```bash
python -m unittest discover -s tests -v
```
