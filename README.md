
# Best-Buy

It is an ecommerce website with features such as user authentication and add to cart.


## Run Locally

Clone the project

```bash
  git clone https://github.com/KGan31/Best-Buy
```

Go to the project directory

```bash
  cd Best-Buy
```

Setting up backend

```bash
  cd backend
```
Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Setting up frontend

```bash
  cd frontend
```
Install dependencies

```bash
  npm install
```
Connect backend to frontend

```bash
  cd components/helper.js
  Change BASE_URL = ADDRESS_OF_SERVER
```
Upload images to cloudinary

```bash
  cd pages/Sell.js
  Change cloudinary_response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`)
```

Start the server

```bash
  npm run start
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file


Setup environment variables for backend

```bash
  cd backend
  type nul> .env
```

Add the following variables: 

`PORT`

`MONGO_URI`

`SECRET`

`CLOUD_NAME` (Cloudinary cloud name)

`CLOUD_KEY` (Cloudinary cloud key)

`CLOUD_KEY_SECRET` (Cloudinary cloud key secret)



## Deployment

To checkout the project visit:

https://64da3a4b708b8048a8d1c425--stellular-cendol-13d4af.netlify.app/#/


## Demo

![](https://github.com/KGan31/Best-Buy/blob/main/ezgif.com-video-to-gif.gif)

Video Demo Link:
https://youtu.be/5no363zm1N8

