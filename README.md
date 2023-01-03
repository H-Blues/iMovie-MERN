# iMovie-MERN

Creator: Zihan Zhang

## Features

### Account

- Implement the user's `signup` and `login` functions using related [Modal](https://mui.com/material-ui/react-modal/) MUI components.
- Profile page showing basic account information.
- Setting page providing updating operation.

### Favourite

- Store favourite list of each user in database, providing `add` and `remove` operations.
- Recommendation page using custom algorithm based on user's favourites. Check more in [Independent learning](#recommend).

### Muti-languages

- Some media contents support mutilanguages (English, Chinese, French).

### Response Handler

- Use error handler to deal with all unknown mistakes in server.
- Design a [response handler](./webApi/api/responseHandler/index.js) to manage the response format sent by server.

```js
const basicResponse = (res, statusCode, data) => res.status(statusCode).json(data);

const success = (res, message, data) =>
  basicResponse(res, 200, { success: true, msg: message, data: data });
const created = (res, message) => basicResponse(res, 201, { success: true, msg: message });
const badRequest = (res, message) => basicResponse(res, 400, { success: false, msg: message });
const unauthorized = (res) => basicResponse(res, 401, { success: false, msg: 'Unathorized' });
const notFound = (res, message) => basicResponse(res, 404, { success: false, msg: message });
const error = (res, message) => basicResponse(res, 500, { success: false, msg: message });
```

### React Redux

- Use [react-redux](https://react-redux.js.org/) to manage `states` instead of context. Check more in [Independent learning](#react-redux).

## Setup requirements

I used `npm` to manage packages in this project, and uploaded the `package.json` file. Enter `npm install` to install all the dependencies needed.

Note that in root directory, there are two folders `reactApp` for client and `webApi` for server. `npm install` should be executed in both folders.

After installing all packages, use `npm start` to run client and server.

- Client URL: http://localhost:3000
- Server URL: http://localhost:8080

## API Configuration

Notice: API Key is necessary to run successfully. File `.env` in `reactApp` and `webApi` folder should be created. Here are the examples:

In `reactApp`:

```
REACT_APP_TMDB_KEY=<<your_tmdb_key>>
FAST_REFRESH=false
```

In `webApi`:

```
NODE_ENV=production
PORT=8080
HOST=localhost
MONGO_DB=<<mongo_driver_address>>
SECRET=<<your_secret>>
REACT_APP_TMDB_KEY=<<your_tmdb_key>>
```

## API Design

I use Swagger to record the API Design. The original yml file is here: [iMovie-API.yml](./webApi/api/doc/iMovie-API.yml)

There are two methods of visiting the graphic content.

1. Open the Swagger Online Editor link: https://editor.swagger.io/, and paste the [iMovie-API.yml](./webApi/api/doc/iMovie-API.yml) content.
2. If you have `docker` in your device, you can visit and test the APIs. (Click `Try it out` button).

If chocing method 1, the APIs cannot be tested since the server hasn't been deployed yet.

If chocing method 2, the related `docker` commends are here:

```cmd
$ systemctl start docker
$ docker pull swaggerapi/swagger-editor
$ docker run -d -p 9090:8080 -v $(pwd):/tmp -e SWAGGER_FILE=/tmp/iMovie-API.yml swaggerapi/swagger-editor
```

Then you can see and test APIs in http://localhost:9090. If that doen't work, use `$ docker run -d -p 9090:8080 swaggerapi/swagger-editor` to replace the last command above and drag yml file in the editor.

The browser will show APIs like these pictures:
![swagger_1](./screenshots/swagger_1.png?raw=true)
![swagger_2](./screenshots/swagger_2.png?raw=true)

## Security and Authentication

### Client

In the client, I use `react-redux` to manage the global states. In the states, `isAuthenticated` is stored for security and authentication.

`isAuthenticated` is a `boolean` value, and it is decided by whether the user has logged in. The pages needed to protected will be rendered in the following way:

```js
const ProtectedPage = () => {
  return <>{isAuthenticated && <div></div>}</>;
};
```

### Server

In the server, passport is applied for protected routes. The detailed rules are defined in [`webApi/authenticate/index.js`](/webApi/authenticate/index.js).

In `app.js` or `index.js`, you can see all protected routes.

```js
app.use(passport.initialize());

app.use('/api/users', usersRouter);
app.use('/api/genres', genresRouter);
app.use('/api/movies', passport.authenticate('jwt', { session: false }), moviesRouter);
app.use('/api/tv', passport.authenticate('jwt', { session: false }), tvRouter);
app.use('/api/people', passport.authenticate('jwt', { session: false }), peopleRouter);
app.use('/api/favourites', passport.authenticate('jwt', { session: false }), favouriteRouter);
app.use('/api/recommend', passport.authenticate('jwt', { session: false }), recommendRouter);
```

## Integrating with React App

In `reactApp` there is a [`customApi.js`](./reactApp/src/api/customApi.js). All API functions are used in the client side. The views (routes) using my own API are as follows:

- /movie
- /tv
- /account/profile
- /account/favourite
- /account/recommend
- /account/setting

Differences with Assignment 1:

- More pages related to users.
- Partly provides muti-languages.
- Yup, Formik, Toast and some other 3rd party tools used to build forms and validate data.

## Independent learning (Learning Note)

<h3 id="recommend"> Recommendation Algorithm </h3>

Two common ways to design a recommender. I used the 2nd one and cosine similarity analysis to implement the simple [recommender](./webApi/api/recommend/index.js).

1. Collaborative filtering
2. Content-based filtering

Collaborative filtering needs to collect a large amount of user rating data and establish a user rating matrix. For the favorite movie selected by the user, all users who have rated the movie can be found, and the similarity with the current user can be calculated. Then, use this similarity information to predict user ratings for unrated movies and recommend movies with the highest similarity.

Content-based filtering needs to collect a large amount of movie information data and extract movie content information, such as actors, genres, directors, etc. Then, for the favorite movies selected by the user, the content information of these movies can be extracted, and the similarity with other movies can be calculated using a similarity measure. Finally, the movie with the highest similarity is used as the recommendation.

<h3 id="react-redux"> React Redux </h3>
Both react-redux and react-context are used to manage states. Here is an article telling how to pick them according to different situations.

[Redux vs. The React Context API](https://daveceddia.com/context-api-vs-redux/)

Normally, if it needs three or more contexts to store states, redux is more recommened for user. (You can image how many nests are in the `index.js` because of ContextProviders)

How to use react-redux ?

1. In redux folder: `store.js` and features subfolder.

```js
// store.js
const store = configureStore({
  reducer: {
    user: userSlice,
    authModal: authModalSlice,
    favourites: favouriteSlice,
    reviews: reviewSlice,
  },
});
```

2. In index.js, import store and use it with one Provider.

```js
<Provider store={store}>
```

3. In components or pages, the common two hooks are `useSelector` and `useDispatch`.

```js
const { userInfo, isAuthenticated } = useSelector((state) => state.user);

dispatch(setUserInfo(result.data.user));
```

### Some Bug Fix Experience :

Problems:

1. Browser's developer tools show the request is to port 3000, not 8080. It looks like the `proxy` defined in `package.json` doesn't work.

2. An API works in Postman, however shows 500 in browser.

3. Two different `Content-Type` in request header.

Reasons and Fix:

1. It displays wrong destination but visits the right url address and routes.

2. It is the `Prettier` problem (a formatter tool used in my VScode), it will add comma at the end of code line, making the body contents cannot be translated into json.

   Fix: Turn off the `"Trailing Comma"` setting in `Prettier`.

3. Fix: create new Header object.

   `headers: new Headers(),`
