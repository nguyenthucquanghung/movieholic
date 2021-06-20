from django.db import models


class Movie(models.Model):
    title = models.CharField(max_length=255)
    genres = models.CharField(max_length=1000, default=[])

    class Meta:
        db_table = "movie"
        indexes = [
            models.Index(fields=["title"], name="idx_name")
        ]


class React(models.Model):
    react = models.SmallIntegerField()
    user_id = models.IntegerField()
    movie_id = models.IntegerField()
    timestamp = models.BigIntegerField()

    class Meta:
        db_table = "react"
        indexes = [
            models.Index(fields=["movie_id", "user_id"], name="react_idx_movie_id_user_id"),
            models.Index(fields=["movie_id", "timestamp"], name="react_idx_movie_id_timestamp")
        ]

    def to_json(self):
        return {
            "react": self.react,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
            "timestamp": self.timestamp
        }


class Comment(models.Model):
    user_id = models.IntegerField()
    movie_id = models.IntegerField()
    timestamp = models.BigIntegerField()
    comment = models.CharField(max_length=1000, null=False)

    class Meta:
        db_table = "comment"
        indexes = [
            models.Index(fields=["movie_id", "user_id"], name="comment_idx_movie_id_user_id"),
            models.Index(fields=["movie_id", "timestamp"], name="comment_idx_movie_id_timestamp")
        ]

    def to_json(self):
        return {
            "comment": self.comment,
            "user_id": self.user_id,
            "movie_id": self.movie_id,
            "timestamp": self.timestamp
        }
