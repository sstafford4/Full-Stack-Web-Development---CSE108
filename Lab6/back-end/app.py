from flask import Flask, request, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Store students as a list of dictionaries
students = []

# Serve the HTML page
@app.route('/')
def index():
    return render_template('Grades.html')  

# Endpoint to add a new student
@app.route('/students', methods=['POST'])
def add_student():
    data = request.get_json()
    name = data.get('name').lower()  # Convert name to lowercase for consistency
    grade = data.get('grade')

    if not name or grade is None:
        return jsonify({"error": "Name and grade are required"}), 400

    # Check if student already exists
    if any(student['name'] == name for student in students):
        return jsonify({"error": "Student already exists"}), 400

    new_student = {"name": name, "grade": grade}
    students.append(new_student)
    return jsonify(new_student), 201

# Endpoint to delete a student by name
@app.route('/students/<string:name>', methods=['DELETE'])
def delete_student(name):
    global students
    name = name.lower()
    students = [student for student in students if student['name'] != name]
    
    return jsonify({"message": f"Student {name} deleted"}), 200

# Endpoint to edit a student's grade
@app.route('/students/<string:name>', methods=['PUT'])
def edit_student(name):
    name = name.lower()
    data = request.get_json()
    new_grade = data.get('grade')
    
    if new_grade is None:
        return jsonify({"error": "Grade is required"}), 400

    # Find the student and update their grade
    for student in students:
        if student['name'] == name:
            student['grade'] = new_grade
            return jsonify(student)

    return jsonify({"error": "Student not found"}), 404

# Endpoint to retrieve all students
@app.route('/students', methods=['GET'])
def get_students():
    return jsonify(students)

# Run the app
if __name__ == "__main__":
    app.run(debug=True)
