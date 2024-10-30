# Adesso Challenge

**How to run locally?:**

run **"yarn install"** and then **"yarn start"**.

Used Node.js version: v20.18.0

**How to run tests?:**

run **"yarn test"**

**Used Technologies:**

- Expo v51
- Typescript for static type checking
- Expo Router for navigation(file based routing)
- Axios & React Query for data fetching & caching
- Zustand for state management

**Some Notes:**

- **Important!** API is very limited and it doesn't provide an endpoint to fetch random movies(there are only 2 endpoints: for searching with a search text and for fetching a specific movie). That's why I am using "love" as the default search value when app starts to fetch the movies. It can be updated in the store("/src/store/index.ts") file.

- There should be more abstraction in the codebase. As this is a small project it is acceptable to use domain specific classes & objects but in a production-level application there should be more abstraction and separation of concerns(SOLID principles).

- There is env variable only for the development environment. Ideally there should be env files for other environments as well(staging, production etc.).

- I could test the app only on Android. I didn't have chance to test it on iOS as I don't have a Mac & iPhone at the moment.

- I have added accessibility support(with accessbility attributes for React Native).

- A logging service can be used. That way logging logic will be centralized and it will be easier to track the errors inside the application.

- I have added theming & dark mode support. If you change the phone's theme you will see the change on the app automatically.

- UI & UX could be improved if I had more time. For example instead of using the native Alert component we can use a custom popup component for the success & error messages. On the movie details screen more info can be shown even though data is available on the screen.

- Offline mode feature can be implemented in case there isn't internet connection. For now I am showing an error UI and alert message to inform the user.

- I have used some optimization techniques for the FlatList(initialNumToRender, removeClippedSubviews, React.memo for the item component). I have tried to use the getItemLayout prop as well but it caused the items to flash. Position of the items were wrong too. It should be measured correctly and integrated in the future. I have calculated to height of the items with the help of onLayout callback.

- I have followed the Container-Presentational pattern for the screen components but I have used single file component pattern for the reusable components(similar to Vue components). Single file component pattern has some advantages like encapsulation of structure, enhanced reusability, readability etc.

- More unit tests can be added. There are some edge cases which should be catched. Apart from that it would be really nice to add E2E tests. E2E tests are very useful to test the real user behaviour.

- There is a bug regarding settings the initial route with expo router's file based routing system. That's why I have used a workaround, more details here: https://github.com/expo/router/issues/723

**Some Screenshots:**

<img src="https://i.ibb.co/TL1GXMY/Screenshot-20241030-092329-Expo-Go.png" width="300" >

<img src="https://i.ibb.co/NVScT9g/Screenshot-20241030-092522-Expo-Go.png" width="300" >

<img src="https://i.ibb.co/BwCprB9/Screenshot-20241030-092258-Expo-Go.png" width="300" >

<img src="https://i.ibb.co/n3PB25H/Screenshot-20241030-092230-Expo-Go.png" width="300" >
