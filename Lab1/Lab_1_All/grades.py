import json

class Student:
     
    def __init__(self,name,grade):
        self.name = name
        self.grade = grade

    # adds student profile to the dictionary in grades.txt
    def addStudentProf(self):
        with open("grades.txt","r") as file:
            data = json.load(file)
            data[self.name] = float(self.grade)
        with open("grades.txt","w") as file:
            json.dump(data,file)

    # Deletes student grade from dictionary
    def deleteStudentGrade(self):
        with open("grades.txt", "r") as file:
            data = json.load(file)
            for i in data:
                if i == self.name:
                    data[self.name] = None # Makes grade = NULL
                    with open("grades.txt","w") as file:
                        json.dump(data,file)
    
    # Edits the grade in the dictionary
    def editStudentGrade(self):
        with open("grades.txt","r") as file:
            data = json.load(file)
            for i in data:
                if i == self.name:
                    new_grade = input("Please enter this student's new grade: ")
                    data[self.name] = float(new_grade)
                    with open("grades.txt","w") as file:
                        json.dump(data,file)

    # Prints the name and grade of desired student from the dictionary
    def viewStudentGrade(self):
        with open("grades.txt","r") as file:
            data = json.load(file)
            for i in data:
                if i == self.name:
                    print("The current grade of %s is: %f" %(self.name,data[self.name]))
                    with open("grades.txt","w") as file:
                        json.dump(data,file)

# --------------------------------------------------------------------------
def main(): # gonna allow user to input CREATE, DELETE, EDIT, VIEW
    flag = True
    while flag:
        user_option = input("Please enter your desired option: ").upper().strip()
        if user_option == "CREATE":
            add_name = input("Please Enter the desired name: ").strip()
            add_grade = input("Please Enter this student's grade: ").strip()
            add_student = Student(add_name,float(add_grade))
            add_student.addStudentProf()
#----------------------------------------------------------------------------
        elif user_option == "DELETE":
            del_name = input("Please Enter the desired name whose grade you would like to delete: ").strip()
            del_student = Student(del_name,0.0)
            del_student.deleteStudentGrade()
#----------------------------------------------------------------------------
        elif user_option == "EDIT":
            edit_name = input("Please Enter the desired name whose grade you would like to edit: ").strip()
            edit_stud = Student(edit_name,0.0)
            edit_stud.editStudentGrade()
#----------------------------------------------------------------------------
        elif user_option == "VIEW":
            view_name = input("Please enter the name of the student you want to view: ").strip()
            view_stud = Student(view_name,0.0)
            view_stud.viewStudentGrade()
#----------------------------------------------------------------------------
        else:
            if user_option != "CREATE" and user_option != "DELETE" and user_option != "EDIT" and user_option != "VIEW":
                print("Valid commands: 'create', 'delete', 'edit', or 'view'")
        
        cont = input("Would you like to do anything else? y/n: ").strip()
        if cont.lower() != "y":
            flag = False
#----------------------------------------------------------------------------         
if __name__ == "__main__":
    main()
