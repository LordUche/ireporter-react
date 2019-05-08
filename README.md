[![Build Status](https://travis-ci.com/LordUche/ireporter-react.svg?branch=develop)](https://travis-ci.com/LordUche/ireporter-react) [![Maintainability](https://api.codeclimate.com/v1/badges/8e286e73f151123f91dd/maintainability)](https://codeclimate.com/github/LordUche/ireporter-react/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/8e286e73f151123f91dd/test_coverage)](https://codeclimate.com/github/LordUche/ireporter-react/test_coverage)

# ireporter-react

iReporter enables any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You must have

[Node.js](https://nodejs.org/) (_v11.13.0 or higher_) and npm (_v6.9.0 or higher_) installed on your local machine. Run `node -v` and `npm -v` in your terminal to confirm that you have them installed

### Installing

To get started, clone this repository on your local machine using the following steps:

Open your terminal and navigate to the folder you want the project to be and enter the the following commands:

```bash
git clone https://github.com/LordUche/ireporter-react.git
cd ireporter-react
npm install
```

Create a `.env` file and enter values for the `CLOUD_NAME` and `UPLOAD_PRESET` environment variables for `cloudinary`, `MAPS_API_KEY` for Google Maps, and `API_BASE_URL`=`https://uche-ireporter.herokuapp.com/api/v1`

## Starting the dev server

```bash
npm run serve
```

## Running the tests

```bash
npm test -- -u
```

## Built With

- [ReactJS](https://reactjs.org/) - JavaScript library for building user interfaces
- [Redux](https://redux.js.org/) - For predictable state management
- [NPM](https://www.npmjs.com/) - Dependency Management
- [Eslint](https://eslint.org/) - Javascript Linting
- [Babel](https://babeljs.io/) - Javascript compiler
- [Enzyme](https://airbnb.io/enzyme/) - The JavaScript Testing utility
- [Jest](https://jestjs.io/) - JavaScript Testing Framework
- [Travis CI](https://travis-ci.com/) - Continuous Integration
- [Code Climate](https://codeclimate.com/) - Maintainability & Test coverage checks
- [Nodemon](https://nodemon.io/) - Code monitoring and automatic server restart utility
- [Webpack](https://webpack.js.org/) - Module bundler

## Author

- **Uchenna A. Iheanacho** - _Initial work_ - [Andela](https://andela.com/)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- Wale Ayandiran


## Heroku app
URL: https://uche-ireporter-react-staging.herokuapp.com/

## Pivotal Tracker board
URL:  https://www.pivotaltracker.com/n/projects/2312748
