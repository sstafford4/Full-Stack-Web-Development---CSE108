# Python program that takes in a string of integers seperated by spaces and adds them

# Completed
def add():
    total = 0
    user_input = input("Please enter numbers seperated by spaces: ")
    indiv = user_input.split()
    
    if user_input.isdigit():
        for i in range(len(indiv)):
            total += float(indiv[i])

        print("The total is:", total)
    else:
        print("Not an int")


add()




