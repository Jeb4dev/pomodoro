# Start by pulling the python image
FROM python:3.10.6

# Copy the requirements file into the image
COPY ./requirements.txt /app/requirements.txt

# Switch working directory
WORKDIR /app

# Install the dependencies and packages in the requirements file
RUN pip install --no-cache-dir -r requirements.txt

# Copy every content from the local file to the image
COPY . /app

# Define environment variables
ENV DATABASE_URL=mysql+pymysql://USERNAME:PASSWORD@IP_ADDRESS:PORT/DATABASE_NAME
ENV SECRET_KEY=EDIT_THIS_SECRET_KEY
ENV FLASK_DEBUG=False
ENV BIND_PORT=80

# Use Gunicorn to run the app
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:80", "app:app"]
