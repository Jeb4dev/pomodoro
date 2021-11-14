from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

from models import User
from __init__ import db


"""     This file handle Authentication:
        creating account, saving credentials to database,
        hashing passwords, login and logout. """


auth = Blueprint('auth', __name__)


# Login page: Handle login logic.
@auth.route('/login', methods=['GET', 'POST'])
def login():
    # if user is already signed in redirect account page
    if current_user.is_authenticated:
        flash('You are already logged in', category='error')
        return redirect(url_for('account.account_logic'))

    # If user try login
    if request.method == 'POST':
        # get username and password from form
        username = request.form.get('username')
        password = request.form.get('password')

        # Try find username from database
        user = User.query.filter_by(username=username).first()

        # If username is found, check if password is correct
        if user:
            # if password is correct, log user in
            if check_password_hash(user.password, password):
                flash('Logged in successfully!', category='success')
                login_user(user, remember=True)
                return redirect(url_for('views.home'))
            else:
                # If password was incorrect show error message and reload the site
                flash('Incorrect password, try again.', category='error')

        # If username was not found show error message and reload the site
        else:
            flash('Username does not exist.', category='error')

    # If user loads /login page
    return render_template("login.html", user=current_user)


# Logout page: Logout user and redirect to homepage.
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Successfully logged out', category='success')
    return redirect(url_for('views.home'))


# Sign-up page: Handle registering logic
@auth.route('/sign-up', methods=['GET', 'POST'])
def sign_up():
    # if user is already signed in redirect account page
    if current_user.is_authenticated:
        flash('You are already logged in', category='error')
        return redirect(url_for('account.account_logic'))

    # If user press "Create account" button (post request).
    if request.method == 'POST':
        username = request.form.get('name')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

        # Try find username from database
        user = User.query.filter_by(username=username).first()

        # If username found, give error
        if user:
            flash('Username already exists.', category='error')
        elif 2 > len(username) > 24:
            flash('First name must be greater than 1 character and shorter than 24', category='error')
        # Check if passwords match and are long enough
        elif password1 != password2:
            flash('Passwords don\'t match.', category='error')
        elif len(password1) < 8:
            flash('Password must be at least 8 characters.', category='error')
        else:
            # if username and passwords were ok, create new db instance, login user and redirect landing page
            new_user = User(username=username,
                            password=generate_password_hash(password1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            flash('Account created!', category='success')
            return redirect(url_for('views.home'))
    return render_template("sign-up.html", current_user=current_user)


