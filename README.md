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
- run `heroku git:remote -a dev-numerologie-rechner-front` and `git remote add origin https://git.heroku.com/dev-numerologie-rechner-front.git` for dev deployment
- run `heroku git:remote -a prd-numerologie-rechner-front` and `git remote add origin https://git.heroku.com/prd-numerologie-rechner-front.git` for live deployment
- run `git push heroku development:master` to build and deploy the staging application to heroku
- or run `git push heroku master:master` to build and deploy the master application to heroku

## ENV Variables:

- `IMAGE_INLINE_SIZE_LIMIT`: sets the file size limit until which images are loaded as data url by `ìmport`. Make sure this is bigh enough for all images loaded (cover images etc.).

Thanks for providing these great libraries as open source 🙏 ️❤️
