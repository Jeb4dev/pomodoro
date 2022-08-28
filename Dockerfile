# Start by pulling the python image
# The alpine version was not able to get greenlet packet
FROM python:3.10.6

# Copy the requirements file into the image
COPY ./requirements.txt /app/requirements.txt

# Switch working directory
WORKDIR /app

# Install the dependencies and packages in the requirements file
RUN pip install -r requirements.txt

# Dopy every content from the local file to the image
COPY . /app

# Donfigure the container to run in an executed manner
ENTRYPOINT [ "python" ]

# Define enviroment variables
# Connect to database
ENV DATABASE_URL mysql+pymysql://USERNAME:PASSWORD@IP_ADDRESS:PORT/DATABASE_NAME
ENV SECRET_KEY EDIT_THIS_SECRET_KEY
ENV FLASK_DEBUG False
ENV BIND_PORT 80

# Run app
CMD ["app.py" ]