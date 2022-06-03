# holo

Welcome to Holo Website INF-117 ! !

Dependencies (download):

Node.js

mySQL

Steps:

run the schema.sql

Create .env file and paste this:

LOCAL_URL=mysql://root:yourpassword@localhost/holo

SECRET=SECRET

AWS_BUCKET_NAME="holo-rental-images"

AWS_BUCKET_REGION="us-west-1"

AWS_ACCESS_KEY="AKIAVS5DMPMGTRWY73F7"

AWS_SECRET_KEY="CMJr3xweciHlMG4z4JyM2UXPssn/ea1Feh+PNi5n"

Copy and paste node modules folder

Run these in a new terminal in your home directory:

npm install aws-sdk

npm install --save multer

npm install ejs 
