from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *


# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'], password=validated_data['password'])
        return user


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ('movie_id', 'user_id')

    def create(self, validated_data):
        react = React.objects.create(validated_data)
        return react


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"