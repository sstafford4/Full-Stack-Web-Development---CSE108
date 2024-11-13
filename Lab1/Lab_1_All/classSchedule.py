# for this activity, i need to make a class that takes in the contents of another file and formats it

# Complete
class CourseSchedule:
    # default constructor
    def __init__(self,course_dept,course_num,course_name,credits,lecture,start,end, average):
        self.course_dept = course_dept
        self.course_num = course_num
        self.course_name = course_name
        self.credits = credits
        self.lecture = lecture
        self.start = start
        self.end = end
        self.average = average
    
    # prints all information in the correct format using f strings
    def class_format(self):
        format = f"{self.course_dept}{self.course_num}: {self.course_name}\n"\
        f"Number of credits: {self.credits}\n"\
        f"Days of Lecture: {self.lecture}\n"\
        f"Lecture time: {self.start} - {self.end}\n"\
        f"Stat: On average, students get {self.average}% in this course\n\n"
    
        return format
    

def reader():
    course_schedule  = []
    with open("classesInput.txt", "r") as file:
        total_courses = int(file.readline()) # records the first line of classesInput as an integer
        for i in range(total_courses):
            dept = file.readline().strip()
            course_num = file.readline().strip() #.strip() removes white space
            course_name = file.readline().strip()
            credits = file.readline().strip()
            lecture = file.readline().strip()
            start = file.readline().strip()
            end = file.readline().strip()
            average = file.readline().strip()

            course = CourseSchedule(dept,course_num, course_name,credits,lecture,start,end, average)
            course_schedule.append(course)

    with open("classesOutput.txt", "w") as file:
        for i,course in enumerate(course_schedule, 1):
            file.write(f"Course {i}: ")
            file.write(course.class_format())


reader()





