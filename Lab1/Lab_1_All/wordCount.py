import re
import string

def wordCount():
    user_word = input("Please enter the word that you want counted in PythonSummary.txt: ")
    user_word_lower = user_word.lower().strip(string.punctuation) 
    
    with open("PythonSummary.txt", "r") as file:
        lines = file.read()
        lines_lower = lines.lower()

    words = re.findall(r'\b' + re.escape(user_word_lower) + r'[\b\s.;:-]*', lines_lower)

    total = len(words)

    print("The word %s occurs %d times." %(user_word, total))


wordCount()