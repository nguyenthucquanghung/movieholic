<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->




<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Movieholic forum</h3>

  <p align="center">
    This is my personal project for Project II course in Hanoi University of Science and Technology
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This is my personal project for Project II course in Hanoi University of Science and Technology

### Built With

* [ReactJS](https://reactjs.org/)
* [Django](https://www.djangoproject.com/)
* [NodeJS](https://nodejs.org/)
* [Scrapy](https://scrapy.org/)



<!-- GETTING STARTED -->
## Getting Started


### Prerequisites

* npm
* yarn
* Docker
* Docker-compose
* Python 3.6 or above
* Pip
* Virtualenv
* MongoDB

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/nguyenthucquanghung/movieholic
   ```
2. Crawl data
   ```sh
   virtualenv venv
   source venv/bin/activate
   pip install scrapy
   cd crawler
   scrapy crawl movielens
   ```
3. Generate data & run backend server
   ```sh
   cd backend
   docker-compose up
   docker exec -it movieholic_backend /bin/bash
   python populate_data.py
   python manage.py makemigrations migrate
   ```
5. Install NPM packages in backend_movies and frontend
   ```sh
   cd backend_movies
   yarn
   yarn start
   cd ..
   cd frontend
   yarn
   yarnstart
   ```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/nguyenthucquanghung/movieholic/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.


## Contact

Ethan Nguyen - nguyenthucquanghung@gmail.com
