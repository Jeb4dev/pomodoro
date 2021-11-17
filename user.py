from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

from __init__ import db
from tasks import Tasks
from settings import Settings


# User object
class User(db.Model, UserMixin):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(32), nullable=False)
    password_hash = db.Column(db.String(200))
    authenticated = db.Column(db.Boolean, default=False)
    focus_time = db.Column(db.String(32), default="None")

    settings = db.relationship('Settings', backref='user')
    tasks = db.relationship("Tasks", backref="user")

    def set_password(self, password):
        self.password_hash = generate_password_hash(password, method='sha256')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
