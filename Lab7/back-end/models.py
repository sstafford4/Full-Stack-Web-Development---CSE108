from config import db

class Students(db.Model):
    __tablename__ = 'Students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    grade = db.Column(db.Integer)

    def __init__(self, name, grade):
        self.name = name
        self.grade = grade
