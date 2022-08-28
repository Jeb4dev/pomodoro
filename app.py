from os import environ

from __init__ import create_app

app, socketio = create_app()

if __name__ == '__main__':
    socketio.run(app,  debug=environ.get("FLASK_DEBUG") or True, host="0.0.0.0", port=environ.get("BIND_PORT") or 8000)
