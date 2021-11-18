from __init__ import create_app
from flask_socketio import SocketIO

app, socketio = create_app()

if __name__ == '__main__':
    # socketio.run(app,  debug=True, host="0.0.0.0", port=4999)
    socketio.run(app)
