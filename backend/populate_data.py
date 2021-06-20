import django
import os
from itertools import islice

import pandas as pd


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "app.settings")
django.setup()
from django.contrib.auth.models import User
from api.models import *
from knox.models import AuthToken
from api.serializers import RegisterSerializer

if __name__ == '__main__':
    batch_size = 1000

    '''     movie bulk update        '''

    print("Populating movies")
    movies_data = pd.read_csv('static/movies.csv', names=['movieId', 'title', 'genres'])
    movies = []
    for i, row in movies_data.iterrows():
        if i != 0:
            movies.append(Movie(
                id=row['movieId'],
                title=row['title'],
                genres=row['genres'])
            )

    offset = 0
    while True:
        batch = list(islice(movies[offset:], batch_size))
        offset += batch_size
        if not batch:
            break
        Movie.objects.bulk_create(batch, batch_size)
        print("Populated " + str(offset) + " movies")
    print("Populated movies")

    '''     comment bulk update      '''

    print("Populating comments")
    comments_data = pd.read_csv('static/tags.csv', names=['userId', 'movieId', 'tag', 'timestamp'])
    comments = []
    for i, row in comments_data.iterrows():
        if i != 0:
            comments.append(Comment(
                comment=row['tag'],
                movie_id=row['movieId'],
                user_id=row['userId'],
                timestamp=row['timestamp'])
            )

    offset = 0
    while True:
        batch = list(islice(comments[offset:], batch_size))
        offset += batch_size
        if not batch:
            break
        Comment.objects.bulk_create(batch, batch_size)
        print("Populated " + str(offset) + " comments")
    print("Populated all comments")

    '''     react bulk update       '''

    print("Populating reacts")
    ratings_data = pd.read_csv('static/ratings.csv', names=['userId','movieId','rating','timestamp'])
    head = 1
    tail = 1000001
    while head < 26000000:
        reacts = []
        for i, row in ratings_data.iloc[head:tail].iterrows():
            react = 0
            if float(row['rating']) > 2.9:
                react = 1
            else:
                react = -1
            reacts.append(React(
                react=react,
                movie_id=row['movieId'],
                user_id=row['userId'],
                timestamp=row['timestamp'])
            )

        offset = 0
        while True:
            batch = list(islice(reacts[offset:], batch_size))
            offset += batch_size
            if not batch:
                break
            React.objects.bulk_create(batch, batch_size)
        head += 1000000
        tail += 1000000
        print("Populated " + str(head) + " reacts")

    '''     populate users      '''
    print("Populating users")
    for i in range(0, 163000): 
        user = {
            "username": "populated_user_" + str(i),
            "password": "Password@1"
            }
        serializer = RegisterSerializer(data=user)
        serializer.is_valid(raise_exception=True)
        AuthToken.objects.create(serializer.save())
        print("Populated " + str(i) + " users")
    print("Populated users")
