from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
#CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})# this would allow for integration with a React app, as theyre both hosted on different ports
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:12263899@localhost/postgres'
db = SQLAlchemy(app)