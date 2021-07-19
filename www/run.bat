@echo off
set FLASK_APP=run.py
set FLASK_DEBUG=1
rem flask run
python -m flask run --port 5000
