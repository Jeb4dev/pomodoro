from flask import Flask, render_template
from os import environ


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = environ.get('SECRET_KEY') or 'nald%!nldKLQWH19GBD2ldfkwADZ612EMN'

    from views import views

    app.register_blueprint(views, url_prefix='/')

    # Error Management
    @app.errorhandler(404)
    def page_not_found(error):
        return render_template('error_template.html'), 404

    return app
