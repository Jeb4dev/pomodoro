from flask_socketio import send, emit, join_room, leave_room, rooms
from flask import request, redirect, url_for, flash, render_template

from __init__ import socketio

usernames = []
user_ids = []
session_names = []
session_users = []


@socketio.on('defineIntervals')
def handle_message(data):
    print('received message: ' + str(data))
    room = data['room']
    username = data['username']
    emit('uploadIntervals', data, to=room)
    emit('notify', f"{username} updated the timer", to=room)


@socketio.on('play')
def handle_message(data):
    # print('received message: ' + str(data))
    room = data['room']
    username = data['username']
    pause = data['pause']
    emit('uploadPause', pause, to=room)
    state = "Pause"
    if pause:
        state = "Play"
    emit('notify', f"{username} set timer to {state}", to=room)


@socketio.on('reset')
def handle_message(data):
    # print('received message: ' + str(data))
    room = data['room']
    username = data['username']
    emit('resetTimer', to=room)
    emit('notify', f"{username} reset the timer", to=room)


@socketio.on('active')
def handle_message(data):
    # print('received message: ' + str(data))
    room = data['room']
    username = data['username']
    active = data['active']
    emit('changeActive', active,  to=room)
    emit('notify', f"{username} changed timer state to {active}", to=room)


@socketio.on('message')
def handle_message(message):
    # print('received message: ' + str(message))
    emit('some event', message, broadcast=True)


@socketio.on('join')
def on_join(data):
    try:
        # most terrible code I've ever written, sorry :(
        username = data['username']
        room = data['room']
        if room not in session_names:
            session_names.append(room)
            session_users.append([])
        join_room(room)
        if username not in session_users[session_names.index(room)]:
            session_users[session_names.index(room)].append(username)
        emit('connectedusers', session_users[session_names.index(room)], to=room)
        emit('notify', f"{username} has entered the room.", to=room)
    except Exception as e:
        print("An Error Occurred:", e)
        print("While user joining room")
        emit('notify', f"An error occurred while joining session")


@socketio.on_error()        # Handles the default namespace
def error_handler(e):
    print("ERROR:", e)


@socketio.on('connect')
def test_connect():
    emit("greetings", "Hello!")


@socketio.on('greetings')
def connect_cb(data):
    user = data["username"]
    user_id = data["userId"]
    usernames.append(user)
    user_ids.append(user_id)
    # print(f"New Connection: [{user}] [{user_id}]")
    on_join(data)


@socketio.on('disconnect')
def on_disconnect():
    try:
        user_id = request.sid
        index = user_ids.index(user_id)

        # user_id = user_ids.pop(index)
        # username = usernames.pop(index)
        user_id = user_ids[index]
        username = usernames[index]
        allrooms = rooms(sid=user_id)
        for i in range(0, len(allrooms), 2):
            roomId = allrooms[i]
            roomName = allrooms[i+1]
            if roomName not in session_names:
                roomId = allrooms[i+1]
                roomName = allrooms[i]
            emit('notify', f"{username} has left the room.", to=roomName)
            if username in session_users[session_names.index(roomName)]:
                session_users[session_names.index(roomName)].remove(username)
            emit('connectedusers', session_users[session_names.index(roomName)], to=roomName)
            leave_room(roomName, roomId)
        # print(f"{username} disconnected")
    except Exception as e:
        print(f"{request.sid} disconnected")
        print("An Error Occurred:",e)
        print("While disconnecting user")

