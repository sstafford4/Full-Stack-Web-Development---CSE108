from flask import Flask, request, render_template, jsonify
from config import app, db
from models import Students

# Ive seperated out the DB functionality into config.py and models.py
# I learned that from my capstone project

# Serve the HTML page
@app.route('/')
def index():
    return render_template('Grades.html')  # Your HTML file goes here

# Endpoint to add a new student
@app.route('/students', methods=['POST'])
def add_student():
    if request.method == 'POST':
        data = request.json
        name = data.get('name').lower()  # Convert name to lowercase for consistency
        grade = data.get('grade')

        student = Students(name, grade)
        db.session.add(student)
        db.session.commit()
        return jsonify({'message': f"Student {name} added to the database"}), 200

# Endpoint to delete a student by name
@app.route('/students/<string:name>', methods=['DELETE'])
def delete_student(name):
    name = name.lower()

    student = Students.query.filter_by(name=name).first()
    if student is None:
        return jsonify({"message": f"Student {name} not found"}), 404
    db.session.delete(student)
    db.session.commit()    
    return jsonify({"message": f"Student {name} deleted"}), 200

# Endpoint to edit a student's grade
@app.route('/students/<string:name>', methods=['PUT'])
def edit_student(name):
    name = name.lower()
    data = request.json
    new_grade = data.get('grade')
    
    if new_grade is None:
        return jsonify({"error": "Grade is required"}), 400

    #Query for student by name
    student = Students.query.filter_by(name=name).first()

    if student is None:
        return jsonify({'message': 'Student not found'}), 404

    student.grade = new_grade
    db.session.commit()

    return jsonify({"message": f"Student {name} updated"})

# Endpoint to retrieve all students
@app.route('/students', methods=['GET'])
def get_students():
    students = Students.query.all() #querying for all students

    s_list = [
        {"name" : student.name, "grade": student.grade} for student in students
    ]

    return jsonify(s_list)

# Run the app
if __name__ == '__main__':
    with app.app_context():  # this stuff would be what adds the new table. I dont think we will be needing this, but i left it anyway.
        db.create_all()
    app.run(debug=True)
