import cv2
img = cv2.imread("solar-system.jpg")

#cv2.putText(img ,"NAO CURTI", (20,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,255), 3) 
cv2.putText(img,
            "Sol",
            (100,80),
            cv2.FONT_HERSHEY_COMPLEX,
            2,
            (0,0,255),
            3)
            
cv2.putText(img,
            "Mercurio",
            (110,180),
            cv2.FONT_HERSHEY_COMPLEX,
            0.5,
            (255,255,255)
            )

cv2.putText(img,
            "Venus",
            (190,260),
            cv2.FONT_HERSHEY_COMPLEX,
            0.5,
            (255,255,255)
            )

cv2.putText(img,
            "Terra",
            (300,260),
            cv2.FONT_HERSHEY_COMPLEX,
            0.5,
            (255,255,255)
            )

cv2.putText(img,
            "Marte",
            (400,260),
            cv2.FONT_HERSHEY_COMPLEX,
            0.5,
            (255,255,255)
            )

cv2.putText(img,
            "Jupiter",
            (480,80),
            cv2.FONT_HERSHEY_COMPLEX,
            0.5,
            (255,255,255)
            )

cv2.putText(img,
            "Saturno",
            (700,120),
            cv2.FONT_HERSHEY_COMPLEX,
            0.5,
            (255,255,255)
            )

cv2.putText(img,
            "Urano",
            (950,130),
            cv2.FONT_HERSHEY_COMPLEX,
            0.5,
            (255,255,255)
            )

cv2.putText(img,
            "Netuno",
            (1100,130),
            cv2.FONT_HERSHEY_COMPLEX,
            0.5,
            (255,255,255)
            )            

cv2.imshow("resultado",img)
cv2.waitKey(0)