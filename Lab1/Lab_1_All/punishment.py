# Python prgram that takes in a sentence and an integer n, then writes the given sentence to a different txt file n times, with line seperation. 

# Completed
def punishment():
    sentence = input("Please Enter the sentence to be repeated: ")
    n = input("Please enter the amount of times you want it repeated: ")
    n = int(n)

    f = open("CompletedPunishment.txt", "w")

    if (len(sentence) > 3):
        for i in range(n):
            f.write(sentence +"\n")
    else:
        print ("Not a sentence!")
        
    f.close()

punishment()
