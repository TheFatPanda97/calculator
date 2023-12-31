<img width="50px" src="https://github.com/TheFatPanda97/calculator/assets/36747253/4a33b179-44de-40a2-b250-2dcd750b445b"/>

# Pretty Calculator

## Check it out at [here!](https://calculator.shawnhu.com/)

![Screen Recording 2023-07-08 at 4 33 29 AM](https://github.com/TheFatPanda97/calculator/assets/36747253/7daeaaa7-1e6f-451c-bbea-5660f8e2d730)

# Features

- formats math in a human-readable way
- supports variable assignment (simply type the letter you want as a variable)
- stores history of equations (click on the clock icon to see history, each equation is clickable!)
- latex equation insertion

# Tech Stack

- frontend: React.js
- backend: Express.js
- database: sqlite3 (postgresSQL on production)
- host: Render

# Steps to Run the App Locally

### Prerequisites

- operating system: mac/linux/wsl
- node.js 18
- sqlite3

### Steps:

1. clone the repo: `git clone https://github.com/TheFatPanda97/calculator.git`
2. go into the repo: `cd calculator`
3. run the setup script: `./setup.bash`
4. go into the backend directory: `cd backend` and create a `.env` file with the following content:

```bash
DB_TYPE="sqlite3"
CURR_ENV="development"
```

further configuration can be found in `backend/.env.example`

5. run the frontend and backend server script in the root of the repo: `./run.sh`
6. go to http://localhost:5173 to see the application
7. that's it! have fun playing with the calculator :D
