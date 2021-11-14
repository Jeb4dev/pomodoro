from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_required, current_user


"""     This file handle Authenticated user account logic:
        Showing account page, created votes and
        votes user has voted. """


account = Blueprint('account', __name__)


# Account Page
@account.route('/account', methods=['GET'])
@login_required
def account_logic():
    return render_template("account.html", user=current_user)


# User created votes and user voted votes
@account.route('/account/votes/<name>', methods=['GET'])
@login_required
def user_voted(name):
    if name == "voted":
        return render_template("user_votes.html", user=current_user)
    if name == "created":
        return render_template("user_created.html", user=current_user)

    return redirect(url_for('views.home'))
