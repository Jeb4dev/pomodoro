from os import environ

from __init__ import create_app

app, socketio = create_app()

if __name__ == '__main__':
    socketio.run(
        app,
        debug=environ.get("FLASK_DEBUG") or True,
        host="127.0.0.1",
        port=environ.get("BIND_PORT") or 8000,
        allow_unsafe_werkzeug=True
    )
