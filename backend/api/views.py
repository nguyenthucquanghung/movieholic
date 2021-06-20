import json

from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, ReactSerializer
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from .models import React, Comment
from .utils import *
from django.core.paginator import Paginator
from django.contrib.auth.models import User


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


class ReactAPI(generics.GenericAPIView):
    serializer_class = ReactSerializer
    queryset = React.objects.all()

    def post(self, request, *args, **kwargs):
        user_id = self.request.user.id
        timestamp = get_current_timestamp()
        data = request.data

        query_set = self.get_queryset().filter(user_id=user_id, movie_id=data["movie_id"])

        if query_set.first() != None:
            query_set.update(react=data["react"], timestamp=timestamp)
            react = query_set.first()
        else:
            react = React.objects.create(movie_id=data["movie_id"],
                                         react=data["react"],
                                         user_id=user_id,
                                         timestamp=timestamp)

        return Response({
            "result": 201,
            "data": react.to_json()
        })

    def delete(self, request, *args, **kwargs):
        user_id = self.request.user.id

        movie_id = request.data["movie_id"]

        query_set = self.get_queryset().filter(user_id=user_id, movie_id=movie_id)

        query_set.delete()

        return Response({
            "result": 201
        })

    def get(self, request, *args, **kwargs):
        # TODO: author
        # print(json.loads(request.GET))
        movie_id = request.GET["movie_id"]
        # movie_id = request.data["movie_id"]
        # page = request.data.get("page", 1)
        # size = request.data.get("size", 10)

        query_set = self.get_queryset().filter(movie_id=movie_id)

        total_vote = 0
        for react in query_set:
            total_vote += react.react

        return Response({
            "result": 200,
            "data": total_vote
        })


class CommentAPI(generics.GenericAPIView):
    queryset = Comment.objects.all()

    def post(self, request, *args, **kwargs):
        user_id = request.user.id
        movie_id = request.data["movie_id"]
        comment = request.data["comment"]
        timestamp = get_current_timestamp()

        comment = Comment.objects.create(user_id=user_id, movie_id=movie_id, comment=comment, timestamp=timestamp)

        return Response({
            "result": 201,
            "data": comment.to_json()
        })

    def get(self, request, *args, **kwargs):
        # movie_id = request.data["movie_id"]
        movie_id = request.GET["movie_id"]
        page = request.GET["page"]
        # page = request.data.get("page", 1)
        size = request.GET["size"]
        # size = request.data.get("size", 10)

        query_set = self.get_queryset().filter(movie_id=movie_id).order_by('-timestamp')

        paginator = Paginator(query_set, size)
        lists = paginator.get_page(page)

        result = []
        for comment in lists:
            cmt = comment.to_json()
            cmt['username'] = User.objects.get(id=comment.user_id).username
            result.append(cmt)


        return Response({
            "result": 200,
            "data": {
                "movie_id": movie_id,
                "total": query_set.count(),
                "page": page,
                "size": size,
                "count": len(result),
                "comments": result
            }
        })
