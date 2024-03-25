# Valant

This project was generated using [Nx](https://nx.dev).

[Nx Documentation](https://nx.dev/getting-started/nx-and-angular)

[Interactive Tutorial](https://nx.dev/angular-tutorial/01-create-application)

## Get started

Run `npm install` to install the UI project dependencies. Grab a cup of coffee or your beverage of choice.
You may also need to run `npm install start-server-and-test` and `npm install cross-env`

As you build new controller endpoints you can auto generate the api http client code for angular using `npm run generate-client:server-app`

## Development server

Run `npm run start` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g component my-component --project=demo` to generate a new component.

## Build

Run `ng build demo` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

- Run `ng test demo` to execute the unit tests via [Jest](https://jestjs.io).
- Run `nx affected:test` to execute the unit tests affected by a change.
- Run `npm run test:all` to run all unit tests in watch mode. They will re-run automatically as you make changes that affect the tests.


## Start Maze Navigator Aplication

To start the aplication follow the next steps:
- Run `npm install` to install dependencies
- Run `npm run start` to start the project

Maze Navigator uses "Microsoft.EntityFrameworkCore.InMemory" to store the maze formats when user is using the application.

```
dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 5.0.0
```

## Getting started with Maze Navigator

When the application starts it creates the "first" maze format in the database, this format is loaded so that the user can see the maze on the screen and be able to navigate.

The user can upload new maze formats, using a txt file with the following format:

First.txt
```sh
SOXXXXXXXX|OOOXXXXXXX|OXOOOXOOOO|XXXXOXOXXO|OOOOOOOXXO|OXXOXXXXXO|OOOOXXXXXE
```

Second.txt
```sh
XXSXXXXXXXXX|XOOXXXXXXXOX|OXOOOXOOOOX0|XXXXOXOXXOX0|OOOOOOOXXO0X|OXXOXXXXXOX0|EOOOXXXXXX0X
```

Third.txt
```sh
SOXXXXXXXX|OOOXXXXXXX|OXOOOXOOOO|XXXXOXOXXO|OOOOOOOXXO|OXXOXXXXXO|OOOOXXXXXE
```

To consider
- The pipe character in the text format is used as a line separator
- The number of characters for each line must be the same
- The application uses the Name of the file as the Primary Key
- When the application starts it create the First Format.

### How to navigate

To navigate the maze the user must use the control buttons located below the maze by clicking on them.


## Maze Client App 

The application's scaffolding includes:
- The **shared** folder where the elements that can be reused are located.
- The **components** folder where the maze component is located.
- The **models** folder where the maze models and classes are located.
- The **services** folder where the maze services are located.

## Maze Api

The application's scaffolding includes:
- The **Controllers** folder where the controllers are located.
- The **Data** folder that represents the application repository
- The **Models** folder where the maze API models are located.


### API Controller

Repository is injected as an Interface in Controller using Dependency injection.
ValantDemoApiContext located in Data Layer is used to manage comunication with database.
The MazeRepository and ValantDemoApiContext are configured in Startup.cs.
