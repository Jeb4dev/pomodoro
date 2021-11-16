from flask import Blueprint, render_template, request, flash

"""     This file handle showing landing page:  """

views = Blueprint('views', __name__)


# Landing Page
@views.route('/', methods=['GET', 'POST'])
def home():
    # get user agent, used to define if user is mobile or desktop user
    user_agent = request.headers.get('User-Agent')

    if request.method == "POST":
        # TODO: login, account creation, flask-sql, flask-login
        # Get post request type
        post_type = request.form.get('post-type')

        # Check post request type
        # Check if post request was about registering
        if post_type == "register":
            # get values
            username = request.form.get('uname')
            password = request.form.get('psw')
            password_confirm = request.form.get('psw2')
            if len(username) < 1:
                flash('Username must be longer than 1 character.', category='error')
            elif len(username) > 32:
                flash('Username must be shorter than 31 character.', category='error')
            elif password != password_confirm:
                flash('Passwords don\'t match.', category='error')
            else:
                flash(f"Hello, {username}. Registering was successful", "success")
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
    return render_template("index.html")
