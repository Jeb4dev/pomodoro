from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, login_required, logout_user, current_user

from user import User
from __init__ import db
"""     This file handle showing landing page:  """

views = Blueprint('views', __name__)


# Landing Page
@views.route('/', methods=['GET', 'POST'])
def home():
    # get user agent, used to define if user is mobile or desktop user
    user_agent = request.headers.get('User-Agent')

    if current_user.is_authenticated:
        if 'mobile' in user_agent.lower():
            flash(f"Hello Mobile user, Welcome to use pomodoro clock. Hopefully you have productive time.",
                  "notify")
            return render_template("mobile.html")
        else:
            return render_template("authenticated.html")

    if request.method == "POST":
        # Get post request type
        post_type = request.form.get('post-type')

        # Check post request type
        # Check if post request is about registering
        if post_type == "register":
            # get values
            username = request.form.get('uname')
            password = request.form.get('psw')
            password_confirm = request.form.get('psw2')
            remember = request.form.get('remember')
            if remember:
                remember = True
            else: remember = False

            user = User.query.filter_by(username=username).first()

            if len(username) < 1:
                flash('Username must be longer than 1 character.', category='error')
            elif len(username) > 32:
                flash('Username must be shorter than 31 character.', category='error')
            elif password != password_confirm:
                flash('Passwords don\'t match.', category='error')
            elif user:
                flash('Username already exists.', category='error')
            else:

                new_user = User(username=username)
                new_user.set_password(password)
                db.session.add(new_user)
                db.session.commit()
                login_user(user, remember=remember)

                flash(f"Hello, {username}. Registering was successful", "success")
                return redirect(url_for('views.home'))

        # Check if post request is about logging in
        elif post_type == "login":
            # get values
            username = request.form.get('uname')
            password = request.form.get('psw')
            remember = request.form.get('remember')
            if remember:
                remember = True
            else: remember = False

            # Try find username from database
            user = User.query.filter_by(username=username).first()

            if user:
                # if password is correct, log user in
                if user.check_password(password=password):
                    flash('Logged in successfully!', category='success')
                    login_user(user, remember=remember)
                    return redirect(url_for('views.home'))
                else:
                    # If password was incorrect show error message and reload the site
                    flash('Incorrect password, try again.', category='error')

                # If username was not found show error message and reload the site
            else:
                flash('Username does not exist.', category='error')

        # If post request title was not defined
        elif not post_type:
            flash(f"POST REQUEST TYPE WAS NOT DEFINED", "error")
        # If post request title was invalid, for example user edited its value with inspect element
        # or it was miss typed / there is not defined logic for it
        else:
            flash(f"POST REQUEST WAS INVALID or not defined", "error")
            print(post_type, "Was invalid Post Request")

    if 'mobile' in user_agent.lower():
        flash(f"Hello Mobile user, Welcome to use pomodoro clock. Hopefully you have productive time.", "notify")
        return render_template("mobile.html")

    flash(f"Hello Desktop user, Welcome to use pomodoro clock. Hopefully you have productive time.", "info")
    flash(f"You are not signed in, your settings will not save.", "info")
    return render_template("index.html")

# Logout page: Logout user and redirect to homepage.
@views.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Successfully logged out', category='success')
    return redirect(url_for('views.home'))
