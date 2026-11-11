# Bundles multiple lab tests into a discounted health check-up package.
# Supports nested packages and uniform pricing via aggregation.
#different health package

class HealthPackage:

    def __init__(self, package_name):
        self.package_name = package_name
        self.tests = []

    def add_test(self, test):
        self.tests.append(test)

    def total_cost(self):
        return sum(test.cost for test in self.tests)

    def __str__(self):
        return (
            f"Health Package: {self.package_name}, "
            f"Tests: {len(self.tests)}, "
            f"Cost: {self.total_cost()}"
        )
