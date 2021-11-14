from flask import Blueprint, render_template, request

"""     This file handle showing landing page:  """

views = Blueprint('views', __name__)


# Landing Page
@views.route('/', methods=['GET'])
def home():
    if request.method == "GET":
        return render_template("index.html")
