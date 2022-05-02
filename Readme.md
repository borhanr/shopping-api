# Shopping market APIs

> A sample market using express and mongodb with authentication and shopping cart.

## Running the project

<!-- With Docker -->
### With Docker
Make sure that Docker is up and running on your local machine.
Then run the following command:
```sh
npm run build
```

<!-- Without Docker -->
### Without Docker
Make sure that Mongodb is up and running on your local machine.
Then run the following commands:

#### 1.Generate .env
```sh
npm run build:env:local
```

#### 2.Seed database
```sh
npm run seed
```

#### 3.Run the server
Once you've set up , run this command:
```sh
npm run start:prod
```

### Note
Project by default use port 7080.
If you want to change it, please modify APPLICATION_PORT environment in
env.local or env.production.

