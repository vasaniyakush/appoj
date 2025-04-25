# Steps to run

1. Clone this repo.
2. Install Docker Desktop
3. If you have Apple Sillicon chip follow these two steps for Docker.
   1. https://github.com/judge0/judge0/issues/325#issuecomment-1857873210
   2. https://github.com/judge0/judge0/issues/360
4. Install node (v18 to v20)
5. Navigate to judge0 `cd judge0-v1.13.1`
6. Pull the images.
   1. `docker pull -d redis db`
   2. `docker pull -d`
7. Start Judge containers `docker-compose up -d --scale workers=2`
8. Navigate to appoj-next `cd appoj-next`
9. Install node dependencies `npm i`
10. Run the frontend application `npm run dev`
