from flask import Blueprint, render_template, request, flash

"""     This file handle showing landing page:  """

views = Blueprint('views', __name__)


# Landing Page
@views.route('/', methods=['GET', 'POST'])
def home():
    user_agent = request.headers.get('User-Agent')

    if request.method == "POST":
        pass

    if 'mobile' in user_agent.lower():
        flash(f"Hello Mobile user, Welcome to use pomodoro clock. Hopefully you have productive time.", "notify")
        return render_template("mobile.html")

    flash(f"Hello Desktop user, Welcome to use pomodoro clock. Hopefully you have productive time.", "info")
    return render_template("index.html")
