class User:
    def __init__(self):
        self.budget = None
        self.destination = None
        self.departure = None
        self.date = None

    def set_budget(self, budget):
        self.budget = budget

    def set_destination(self, destination):
        self.destination = destination

    def set_departure(self, departure):
        self.departure = departure

    def set_date(self,date):
        self.date=date

    def get_preferences(self):
        return {
            "budget": self.budget,
            "destination": self.destination,
            "departure": self.departure,
            "date":self.date
        }

    def reset(self):
        self.budget = None
        self.destination = None
        self.departure = None
        self.date = None


user = User()