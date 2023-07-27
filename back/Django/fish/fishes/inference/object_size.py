# import the necessary packages
from numpy import random
from scipy.spatial import distance as dist
from imutils import perspective
from imutils import contours
import numpy as np
import argparse
import imutils
import cv2

# from .yolo import runYOLODetection
from .yolo import runYOLODetection

def midpoint(ptA, ptB):
    return ((ptA[0] + ptB[0]) * 0.5, (ptA[1] + ptB[1]) * 0.5)


# construct the argument parse and parse the arguments
# ap = argparse.ArgumentParser()
# ap.add_argument("-i", "--image", required=True,
#                 help="path to the input image")
# ap.add_argument("-w", "--width", type=float, required=True,
#                 help="width of the left-most object in the image (in inches)")
# args = vars(ap.parse_args())
#

def get_fish_length(file_path):
    # width 는 기준이 되는 object의 가로 길이이다.
    # file_path = 'C:/Users/SSAFY/Desktop/woluck.jpg'
    # file_path = "C:/Users/SSAFY/Desktop/image.png"
    # file_path = "C:/Users/SSAFY/Desktop/fisheeee.jpg"
    width = 30

    # load the image, convert it to grayscale, and blur it slightly
    image = cv2.imread(file_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    gray = cv2.GaussianBlur(gray, (7, 7), 0)
    # perform edge detection, then perform a dilation + erosion to
    # close gaps in between object edges
    edged = cv2.Canny(gray, 50, 85)
    # cv2.imshow("Canny", edged)
    edged = cv2.dilate(edged, None, iterations=2)
    edged = cv2.erode(edged, None, iterations=1)
    # cv2.imshow("erode", edged)

    # cv2.waitKey(0)

    # find contours in the edge map
    cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL,
                            cv2.CHAIN_APPROX_SIMPLE)

    cnts = imutils.grab_contours(cnts)
    # sort the contours from left-to-right and initialize the
    # 'pixels per metric' calibration variable
    (cnts, _) = contours.sort_contours(cnts, method="bottom-to-top")
    pixelsPerMetric = None

    # 가장 아래에 있는 obj 가 기준이 되는 obj 이다.
    # 추후에 기준 물체 학습 시켜서 있는지 없는지 판단 하고 해야할 듯?
    c = list(cnts)[0]

    # compute the bounding box of the contour and use it to draw
    # the contour on the image
    x, y, w, h = cv2.boundingRect(c)
    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    # compute the midpoint of the bounding box
    mid_x, mid_y = midpoint((x, y), (x + w, y + h))
    # draw the midpoint on the image
    cv2.circle(image, (int(mid_x), int(mid_y)), 5, (255, 0, 0), -1)

    # compute the size of the object
    if pixelsPerMetric is None:
        pixelsPerMetric = w / width

    # compute the bounding box of the contour and use it to draw
    # the contour on the image

    # 여기서 fish detect한 결과를 받아서 x,y,w,h 좌표를 뿌린다
    # x, y, w, h = cv2.boundingRect(c)
    x, y, w, h = runYOLODetection(file_path, "yolo-fish")

    cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    # compute the midpoint of the bounding box
    mid_x, mid_y = midpoint((x, y), (x + w, y + h))
    # draw the midpoint on the image
    cv2.circle(image, (int(mid_x), int(mid_y)), 5, (255, 0, 0), -1)

    # compute the size of the object
    if pixelsPerMetric is None:
        pixelsPerMetric = w / width

    dimA = w / pixelsPerMetric
    dimB = h / pixelsPerMetric

    # dimA가 가로의 길이
    return dimA

    # # loop over the contours individually
    # for c in cnts:
    #     # if the contour is not sufficiently large, ignore it
    #     if cv2.contourArea(c) < 1000:
    #         continue
    #     # compute the bounding box of the contour and use it to draw
    #     # the contour on the image
    #     x, y, w, h = cv2.boundingRect(c)
    #     cv2.rectangle(image, (x, y), (x + w, y + h), (0, 255, 0), 2)
    #     # compute the midpoint of the bounding box
    #     mid_x, mid_y = midpoint((x, y), (x + w, y + h))
    #     # draw the midpoint on the image
    #     cv2.circle(image, (int(mid_x), int(mid_y)), 5, (255, 0, 0), -1)
    #
    #     # compute the size of the object
    #     if pixelsPerMetric is None:
    #         pixelsPerMetric = w / width
    #
    #     dimA = w / pixelsPerMetric
    #     dimB = h / pixelsPerMetric
    #
    #     # dimA가 가로의 길이
    #     print(dimA)
    #
    #     # draw the object sizes on the image
    #     cv2.putText(image, "{:.1f}cm".format(dimA),
    #                 (int(mid_x - 15), int(mid_y - 10)), cv2.FONT_HERSHEY_SIMPLEX,
    #                 0.65, (255, 255, 255), 2)
    #     cv2.putText(image, "{:.1f}cm".format(dimB),
    #                 (int(mid_x + 10), int(mid_y)), cv2.FONT_HERSHEY_SIMPLEX,
    #                 0.65, (255, 255, 255), 2)
    #     # show the output image
    #     cv2.imshow("Image", image)
    #     cv2.waitKey(0)
