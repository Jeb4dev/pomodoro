# Pomodoro - Time Management Web App
### _Made in Python with Flask_


[![N|Solid](https://flask.palletsprojects.com/en/2.0.x/_images/flask-logo.png)](https://flask.palletsprojects.com/en/2.0.x/)

![image](https://user-images.githubusercontent.com/76889226/141989698-56a3125c-c036-4ee9-a726-acd619797067.png)
![image](https://user-images.githubusercontent.com/76889226/142459664-77a09689-aea4-48d6-878b-27c0e49c7e30.png)

[Live Demo](https://jeb-pomodoro.herokuapp.com/)

Pomodoro is Pomodoro timer for better productivity.
This was made as part of the weekly programming challenge hosted by [DevJam].
The project was made for learning purposes.

## About the project
#### 🛠 Difficulty Level: Beginner
📅 Start: November 12th<br>
📅 Deadline: November 18th 16:00 (4PM) GMT

#### 📝 Project Description
The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks - 5 minutes.

##### 📑User Stories
- [x] User can see a timer for 25 minutes - the working session
- [x] After the working session is over, the User can see a timer for 5 minutes - the break session
- [x] User can start / pause, stop and reset the timers

##### 🌟 Bonus features (optional)
- [x] User can hear a sound playing when the timer hits 00:00 - denoting that the session has ended
- [x] User can change / customize the minutes in both sessions before starting
- [x] User can set a long break session of 10 minutes. This will be activated every 4th break session
- [ ] Users can see active pomodoro sessions of other users
- [x] Users can share their pomodoro sessions with other users to do joint sessions


## Tech

Python libraries that VoteApp uses:

- [Flask] - Micro web framework
- [Flask login] - provides user session management for Flask.
- [Flask-SQLAlchemy] - adds support for SQLAlchemy.
- [matplotlib] - data visualization with Python


## Installation and running

This app requires [python 3.7+](https://www.python.org/downloads/) to run.

Clone git repo
```sh
git clone https://github.com/JesperKauppinen/pomodoro.git
```

After cloning or downloading this git repo, install required python libraries

```sh
pip install -r requirements.txt
```

run app.py
```sh
python app.py
```


## Development

Want to contribute? Great!
Give feedback, suggest new features, maybe even create pull request.


## Credits
- [GrapesJS] - Building templates without codings!
- [Wikipedia] - What is Pomodoro?
- [Tomato] - Image used on website.
- [Audio] - Session has ended Notification .
- [Notifications] - Styling for notifications



## License

MIT

   [Flask]: <https://flask.palletsprojects.com/en/2.0.x/>
   [Flask login]: <https://flask-login.readthedocs.io/en/latest/>
   [Flask-SQLAlchemy]: <https://flask-sqlalchemy.palletsprojects.com/en/2.x/>
   [matplotlib]: <https://matplotlib.org/>
   
   [heroku]: <https://www.heroku.com/>
   
   [GrapesJS]: <https://grapesjs.com/>
   
   [Wikipedia]: <https://en.wikipedia.org/wiki/Pomodoro_Technique>
   [Tomato]: <https://www.seekpng.com/ipng/u2t4o0a9a9r5e6w7_guacamole-apple-tomato-vegetable-clip-art-cartoon-tomato/>
   [Notifications]: <https://github.com/MLaritz/Vanilla-Notify>
   [Audio]: <https://themushroomkingdom.net/sounds/wav/smb/smb_world_clear.wavy>

