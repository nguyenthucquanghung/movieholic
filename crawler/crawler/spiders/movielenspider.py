import scrapy
import json
import pymongo
import requests


class MovielensSpider(scrapy.Spider):
    # scrapy default variable
    name = 'movielens'

    # List url needed
    loginUrl = 'https://movielens.org/api/sessions'
    movieDetailUrl = 'https://movielens.org/api/movies/{movieId}'

    # Get list of movieId
    f = open('./../static/movies.csv', encoding='utf-8')
    moviesFileData = f.read()
    movieIdList = moviesFileData.split('\n')
    movieIdList = [movieId.split(',')[0] for movieId in movieIdList]
    movieIdList.pop()
    movieIdList.remove('movieId')

    # Request credentials
    headers = {
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36'
    }
    loginPayload = {'userName': "nguyenthucquanghung", 'password': "hula3alaka3"}
    loginResponse = requests.post(loginUrl, json=loginPayload)
    loginCookie = loginResponse.headers['Set-Cookie']
    loginCookie = loginCookie.split(';')[0].split('=')
    cookies = {loginCookie[0]: loginCookie[1]}

    # Connect with mongodb
    mongoClient = pymongo.MongoClient("mongodb://localhost:27017/")
    db = mongoClient['movieholic']
    moviesCollection = db['movies']

    # Start request
    def start_requests(self):
        for movieId in self.movieIdList:
            yield scrapy.Request(
                url=self.movieDetailUrl.format(movieId=movieId),
                headers=self.headers,
                cookies=self.cookies,
                callback=self.parse
            )

    def parse(self, response, **kwargs):
        movie = json.loads(response.body)['data']['movieDetails']['movie']
        self.moviesCollection.insert_one(movie)
        movie['_id'] = 0
        yield movie
