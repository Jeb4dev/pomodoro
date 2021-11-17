from __init__ import db


# Settings object
class Settings(db.Model):
    __tablename__ = 'settings'

    id = db.Column(db.Integer, primary_key=True)
    music_volume = db.Column(db.Integer,  default=100)
    timer_volume = db.Column(db.Integer,  default=100)
    custom_music = db.Column(db.String(16),  default="")
    custom_background = db.Column(db.String(200),  default="")
    work_time = db.Column(db.Integer,  default=25)
    short_break = db.Column(db.Integer,  default=5)
    long_break = db.Column(db.Integer,  default=15)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
