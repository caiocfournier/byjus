import cv2

face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

eye_cascade = cv2.CascadeClassifier('C:/Users/preet/AppData/Local/Progamas/Python/Python39/Lib/site-packages/cv2/data/haarcascade_eye.xml')

vid = cv2.VideoCapture(0)

while(True):


    ret, frame = vid.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(gray, 1.1, 5)

    eyes = eye_cascade.detectMultiScale(gray, 1.1, 5)

    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (255, 0, 0), 2)

    for (x, y, w, h) in eyes:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 2)

    cv2.imshow('frame', frame)

    if cv2.waitKey(25) == 32:
        break

vid.release()

cv2.destroyAllWindows()