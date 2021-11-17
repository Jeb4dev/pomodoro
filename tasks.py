from __init__ import db


# Settings object
class Tasks(db.Model):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    user_tasks = db.Column(db.String(1024),  default="")
    task_done = db.Column(db.Boolean,  default=None)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

    # def get_tasks(self):
    #     return self.user_tasks
    #
    # def clear_all_tasks(self):
    #     self.user_tasks = ""
    #     self.task_done = None
    #     return True

