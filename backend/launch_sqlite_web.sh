#!/bin/sh

# Install pip for Python
#apk add --no-cache py3-pip

# Install sqlite-web
#pip install sqlite-web --break-system-packages

# Run sqlite-web on the specified database
sqlite_web /app/database.sqlite --host 0.0.0.0 --port 5050