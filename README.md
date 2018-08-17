# NewsHound
A news service that retrieves links to the latest news items and articles from a variety of news and tech sources.

### Motivation
To waste less time finding, filtering, and taking in the news of the day.  This is a simple, no-nonsense service that can lay the foundation for saving bookmarks to news items, filtering news by tagging or topic, data visualizations of personalized news streams, and much more.


### DEMO & Live code
  * [the root endpoint](https://newshound.glitch.me/)
  * [the `/tech/reuters` endpoint](https://newshound.glitch.me/motley/reuters)
  * [Editable Glitch.com project](https://glitch.com/edit/#!/newshound?path=README.md:1:0)


## API endpoints
#### Motley endpoints
  * `/motley`
  * `/motley/hnews`
  * `/motley/reuters`
  * `/motley/top-medium`
  * `/motley/_meta`


#### Tech endpoints
  * `/tech`
  * `/tech/fefront`
  * `/tech/echo`
  * `/tech/scotch`
  * `/tech/perf-rocks`
  * `/tech/_meta`


#### Sports endpoints
  * `/sports`
  * `/sports/the-ringer`
  * `/sports/si-com`
  * `/sports/sbnation`
  * `/sports/sbn-card`
  * `/sports/_meta`


#### Vue endpoints
  * `/vue`
  * `/vue/vuedevs`
  * `/vue/gator`
  * `/vue/reddit`
  * `/vue/_meta`


#### Response envelope
The response of each endpoint - when succesful - will be an array of article-objects with the following properties for each article:

  * `source` - the news/tech source for this article
  * `title` - the title of the article
  * `url` - the absolute url at the source provided by the news/tech source
  * `sourceId` - an id for the article composed of two parts
    1 - an abbreviated string for the source of the article (e.g. hn for the Hacker News source)
    2 - either an id for the article provided by the source, or one derived from the url of the article
  * `fetchDate` - simple the date for when the article was fetched from the source
  * `rank` - simply the order of the article at the time it was fetched from the source


## Getting Started
### Prerequisites
  * node (version 8+)
  * npm


### Installation

    git clone https://github.com/jose8a/newshound.git
    cd newshound
    npm install


### Launch Server
Launch the server by running either one of the following commands:

    nodemon server.js
    npm run start


### Run Tests
  * tbd


## Built With ...
  * node
  * express
  * cheerio


## Contributing
  * tbd


## Authors
  * [jose8a](https://github.com/jose8a)


## License
  * tbd ..


## Acknowledgements
  * tbd ..
