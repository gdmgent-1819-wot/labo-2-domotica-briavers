import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from sense_hat import SenseHat
from time import time, sleep
import os
import sys
import subprocess




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
    characters = db.reference('arcades/538398996695/data')
    ref = db.reference('arcades')
    #print(ref.get())

except:
    print('Unable to initialize Firebase: {}'.format(sys.exc_info()[0]))
    sys.exit(1)
    

def main():
  #the colors 
  code = ref.get();
  data = (code.get('1538401139044'));
  colors = (data.get('data'));
  print(colors[0]);
  colorTest = ['(255,0,0)', '(255,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(255,0,0)', '(255,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)', '(0,0,0)'];

  sense.set_pixels(colors)
  sleep(5)
  sense.clear();

if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, SystemExit):
        print('Interrupt received! Stopping the application...')
    finally:
        print('Cleaning up the mess...')
        sys.exit(0)