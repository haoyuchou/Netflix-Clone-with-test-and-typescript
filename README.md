# Project Title
Netflix Clone

## Demo Link

[Youtube](https://www.youtube.com/watch?v=j_ZjsM2b0iQQ)

## About the app

Netflix Clone is a wen application that mimic Netflix. When going to the website, users have to click sign in, which will prompt user sign in with their Facebook account. If a user did not sign in, they will not be able to see the website's content. Once sign in, user will see the home page. Users can also switch to movie page or tv page. Each page have multiple rows of movie or tv poster. If users click any poster, a modal will show on screen, which contain the name, the rate, the overview and a play icon. If users click the play icon, they will able to see the trailer of the movie or tv. This website also offer users to search for movies or tv. Once users click the search icon at the header, an input box will show and users will be able to type search keyword. Users will see the backdrop of all movies and tv that fit the search result. If users click the search result they will see a modal again. 

## Screenshots

https://user-images.githubusercontent.com/76396976/204764673-1e25fd22-6998-4724-b74b-b78ba1cb2c23.mp4

https://user-images.githubusercontent.com/76396976/204765132-8ace5b29-f9f1-4e27-8ce2-1d6403ce8b50.mp4

https://user-images.githubusercontent.com/76396976/204766739-ad0c7cf3-34d2-4360-9733-a0abcc718819.mp4

https://user-images.githubusercontent.com/76396976/204768122-a48821d8-f26c-49c4-a881-7e1572aa64e9.mp4

https://user-images.githubusercontent.com/76396976/204768368-546aaf0c-3504-4cd5-850e-980dc274ed3f.mp4

https://user-images.githubusercontent.com/76396976/204769303-1c0eda4e-541d-4895-9394-00288163b288.mp4



## The project is built with:


‧ Next.js <br />
‧ NextAuth for Facebook login <br />
‧ TMDB API for information <br />
‧ TypeScript for type checking <br />
‧ Jest and React Testing Library for unit testing [Example 1](https://medium.com/@haoyuchou/react-testing-library-and-jest-in-next-js-1-228704a5a3dc) [Example 2](https://medium.com/@haoyuchou/react-testing-library-and-jest-in-next-js-2-c6fc2417444a)<br />
‧ Tailwindcss for styling <br />
‧ GitHub Actions for Continuous Integration [Example](https://medium.com/@haoyuchou/react-testing-library-and-jest-in-next-js-2-c6fc2417444a)

## Approach
Before starting this project, I took time to plan the function I want this project to have. Everytime I wrote a new function, I opened a new local branch to write the function. After testing and satisfied with the loca branch, I merged it into the main branch. Everytime push to the main branch, github actions run automated unit test for continuous integration.

## Status

Netflix Clone is mostly finished. If I had more time, I would add functions to allow user save a list of video they want to watch. In addition, I would also add a function to keep a list of continue watch for users. Both functions will save information by using local storage.


## Getting Started

This project is built with Next.js, TypeScript, React Testing Library & Tailwindcss among others. To start working on the project, first clone the repository and install the dependencies.

```bash
npm install
```

Then run the development server:

```bash
npm run dev
```

Now you can open [http://localhost:3000](http://localhost:3000) with your browser to see the application.
