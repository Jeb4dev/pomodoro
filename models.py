from flask_login import UserMixin
from sqlalchemy.sql import func

from __init__ import db


"""     This file handle db objects:
        Define db objects. """


# Vote object
class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(100), default="Question Not Added")
    answers = db.Column(db.String(1000), default="[]")
    user_answers = db.Column(db.String(1000), default="[]")
    popularity = db.Column(db.Integer, default=0)
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    creator = db.Column(db.Integer, db.ForeignKey('user.id'))
    auth_required = db.Column(db.Boolean, default=False)


# User object
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(128))
    username = db.Column(db.String(64), unique=True)
    votes = db.relationship('Vote', backref="user")
