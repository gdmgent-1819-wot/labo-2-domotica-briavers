import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from sense_hat import SenseHat
from time import time, sleep
import os
import sys
import subprocess
import json




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
    ref = db.reference('users/')
    print(ref.get())

except:
    print('Unable to initialize Firebase: {}'.format(sys.exc_info()[0]))
    sys.exit(1)
    
def main():
  #the colors 
  user = ref.get();
  
  print('jsonData'); 
  print(type(user)); 

  jsonData = json.loads(user)
  print(jsonData); 

  print('lights'); 
  print(jsonData["kcHAmoS4bQQ8AARlHNJyAoVmTLy1"]["data"]["door"]["door1"]);
  
if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        print('Interrupt received! Stopping the application...')
    finally:
        print('Cleaning up the mess...')
        sys.exit(0)