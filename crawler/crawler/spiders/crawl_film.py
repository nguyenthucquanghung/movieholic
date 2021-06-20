# f = open('ml-latest-small/movies.csv', encoding='utf-8')
# data = f.read()
# films = data.split('\n')
#
# # Login
# login_url = 'https://movielens.org/api/sessions'
# import requests
#
# payload = {'userName': "thienanh", 'password': "thienanh1"}
# response = requests.post(login_url, json=payload)
# cookie = response.headers['Set-Cookie']
# cookie = cookie.split(';')[0].split('=')
#
# # Get film
# base_url = 'https://movielens.org/api/movies/'
# for i in range(1, len(films)):
#     film_data = films[i].split(',')
#     film_id = film_data[0]
#     film_title = film_data[1]
#     film_genre = film_data[2]
#     response = requests.get(base_url+film_id, cookies={cookie[0]: cookie[1]})
#     print(response.json()['data'])
#
