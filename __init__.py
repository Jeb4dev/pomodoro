from flask import Flask, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_socketio import SocketIO
from flask_cors import CORS
from os import path

db = SQLAlchemy()
login_manager = LoginManager()
# socketio = SocketIO(logger=True, engineio_logger=True)
socketio = SocketIO()


def create_app():
    app = Flask(__name__, instance_relative_config=False)

    # Application Configuration
    app.config.from_object('config.Config')

    # Initialize Plugins
    db.init_app(app)
    login_manager.init_app(app)
    socketio.init_app(app)
    CORS(app)

    with app.app_context():
        from views import views

        # Register Blueprints
        app.register_blueprint(views, url_prefix='/')

        from user import User

        # Create Database Models
        db.create_all()

        @login_manager.user_loader
        def load_user(identifier):
            return User.query.get(int(identifier))

        # Error Management
        @app.errorhandler(404)
        def page_not_found(error):
            return redirect(url_for('views.home'))
        return app, socketio
