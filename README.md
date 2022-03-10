## Akademie Bios Analysis Tool

The frontend project to the numberology calculator project. The main purpose of this application is :

- Allow users to perform numberology calculations on their name(s) and date of birth
- View the results in the browser and take a tour through the description of their analysis
- Register/Login to their own user profile and save analysis
- Buy credits for pdf generation in the shop and spend on short/long versions of detailed pdf analysis documents
- Generate (client side!) and download these pdf documents

## Getting started

- Checkout
- run `npm install` to install packages
- run `npm start` to start dev environment

## Routes

- `/analysisInput` input for personal analysis

## Used Frameworks

- [React](https://reactjs.org/)
- [YUP](https://github.com/jquense/yup)
- [Apollo] https://www.apollographql.com/

## Testing

- run `npm test` to run test cases in `./tests`

## Attribution:

- TBA

## Heroku Deployment

- run `heroku login` to authenticate the heroku cli
- run `heroku git:remote -a dev-numerologie-rechner-front` and `git remote add origin dev-numerologie-rechner-front` for dev deployment
- run `heroku git:remote -a prd-numerologie-rechner-front` and `git remote add origin https://git.heroku.com/prd-numerologie-rechner-front.git` for live deployment
- run `git push heroku development:master` to build and deploy the staging application to heroku
- or run `git push heroku master:master` to build and deploy the master application to heroku

## ENV Variables:

- `IMAGE_INLINE_SIZE_LIMIT`: sets the file size limit until which images are loaded as data url by `ìmport`. Make sure this is bigh enough for all images loaded (cover images etc.).

Thanks for providing these great libraries as open source 🙏 ️❤️

## info multilang

In order to add new languages, checkout the following files:

- `src/contexts/UserContext.jsx`
- `src/utils/constants.js`

Additionally, have a look at the files at `src/translations`. The i18n framework access the files from `src/translations/'languageTag'.json`. Currently there is only german active. For testing purpose we added an english version with a prefix `en_` to all texts to check if everything is working. So feel free to enable Englisch in the files above and the frontend and use the languageSwitch in the frontend.

The current workflow for changes is as following:

- Backend has been updated already (see backend readme)
- Add new json to `src/translations`
- Enable THE SAME langTag as in Backend in Frontend. The code has to match exactly, otherwise the lang might not match and the fallback (DE) is used.
