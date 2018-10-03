#THE ALARM THAT DOESN'T WORK YET
    # while(evaluation == ['ALARM']): 
    #     def alarm(): 
    #         sense.clear((000, 000, 255))
    #         sleep(sleeping)
    #         sense.clear((30, 30, 255))
    #         sleep(sleeping)
    #         alarm()

import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from sense_hat import SenseHat
from time import time, sleep
import os
import sys
import subprocess
import numpy as np
from ast import literal_eval
import threading



serviceAccountKey = '../keys/labo02/wot-1819-briavers-firebase-adminsdk-v4lus-b49128834d.json'
databaseURL = 'https://wot-1819-briavers.firebaseio.com'

sense = SenseHat();
sense.clear()

try:
    # Fetch the service account key JSON file contents
    firebase_cred = credentials.Certificate(serviceAccountKey)

    # Initalize the app with a service account; granting admin privileges
    firebase_admin.initialize_app(firebase_cred, {
    'databaseURL': databaseURL
    })

    # As an admin, the app has access to read and write all data
    ref = db.reference('domotica/liveExample')
    #print(ref.get())

except:
    print('Unable to initialize Firebase: {}'.format(sys.exc_info()[0]))
    sys.exit(1)
    


def main():
  #the colors 
  code = ref.get();
# for key in code.keys():
#   print(key)
#   print(code[key]['data'])
#   data = (code.get('1538401139044'));
#   colors = (data.get('data'));
#   toPrintColors = []

# #create a array of tulp types out of the list of strings
#   for i in range(len(colors)): 
#     toPrintColors.append(literal_eval(colors[i]))
#   #print(toPrintColors)
# #print the pixels out on the led display
#   sense.set_pixels(toPrintColors)
# #keep them on there for 5 seconds
#   sleep(2)
# #clear the screen 
#   sense.clear();

#play them all
  #loop trough every key that is received from the database
  for key in code.keys():
    print("key")
    print(key)
    #create a variable for the dataset 
    evaluation = code[key]
    # print(evaluation)

    #create an empty array in wich we will put the led matrix
    toPrintColors = []
    # create a array of tulp types out of the list of strings
    for j in range(len(evaluation)): 
      #for every value in the list create a tulp value in the new array
      toPrintColors.append(literal_eval(evaluation[j]))
    #set the array to display to the led screen for 5 seconds   
    sense.set_pixels(toPrintColors)
    sleep(1)
    sense.clear();
  #rerun main to create the loop
  main()






if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        sense.clear();
        print('Interrupt received! Stopping the application...')
    finally:
        print('Cleaning up the mess...')
        sys.exit(0)