from flask import Flask, render_template, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_login import LoginManager

db = SQLAlchemy()
DB_NAME = "database.db"


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = environ.get('SECRET_KEY') or 'nald%!nldKLQWH19GBD2ldfkwADZ612EMN'
    db_url = environ.get("DATABASE_URL")
    if db_url is not None:
        db_url = f"postgresql{db_url[8:]}"
    else:
        db_url = f"sqlite:///{DB_NAME}"
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url
    # app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)

    from views import views
    from account import account
    from auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(account, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from models import User, Vote

    create_database(app)

    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(identifier):
        return User.query.get(int(identifier))

    # Error Management
    @app.errorhandler(404)
    def page_not_found(error):
        return render_template('error_template.html'), 404

    # Error Management
    @login_manager.unauthorized_handler
    def page_not_found():
        flash("The content you tried to reach requires authentication", category="error")
        return redirect(url_for('auth.login'))

    return app


def create_database(app):
    crete_db = False
    if crete_db:
        db.create_all(app=app)
    # if not path.exists('VoteApp/' + DB_NAME):
    #     db.create_all(app=app)
    #     print('Created Database!')



