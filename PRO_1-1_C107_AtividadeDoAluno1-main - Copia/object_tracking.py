import cv2
import time
import math

video = cv2.VideoCapture("bb3.mp4")

while True:
    
    check, img = video.read()   

    cv2.imshow("resultado", img)
            
    if key == 32:
        print("Interrompido")
        break

video.release()
cv2.destroyALLwindows()