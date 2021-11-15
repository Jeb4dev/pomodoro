from flask import Blueprint, render_template, request

"""     This file handle showing landing page:  """

views = Blueprint('views', __name__)


# Landing Page
@views.route('/', methods=['GET'])
def home():
    if request.method == "GET":
        user_agent = request.headers.get('User-Agent')
        if 'mobile' in user_agent.lower():
            return render_template("mobile.html")
        return render_template("index.html")
