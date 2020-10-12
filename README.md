# The Wall
This is a social media home page React web application, using AWS serverless backend. Users are able to sign up, sign in, view other users' posts, heart posts and post their own posts.
<br></br>

# Demo

## [Live application](https://master.d2fql6wu504q84.amplifyapp.com)
<br></br>
# Table of Contents
* [Technologies](#technologies)
* [Architecture](#architecture)
* [Pages](#pages)
  * [Sign Up](#sign-up)
  * [Confirm Sign Up](#confirm-sign-up)
  * [Sign In](#sign-in)
  * [Home](#home)
* [AWS Amplify](#aws-amplify)
  * [CI](#ci)
  * [Amazon Cognito](#amazon-cognito)
  * [DynamoDB](#dynamodb)
    * [Posts Table](#posts-table)
  * [API Gateway](#api-gateway)
  * [Lambda Functions](#lambda-functions)
    * [/posts](#/posts)
    * [/heart](#/heart)
* [Possible feature additions](#possible-feature-additions)
<br></br>
# Technologies

* React
* [Material-ui](https://material-ui.com/)
* [React Router](https://reactrouter.com/)
* AWS
  * [AWS Amplify](https://aws.amazon.com/amplify/)
  * Amazon Cognito
  * API Gateway
  * Lambda functions
  * DynamoDB
<br></br>

# Architecture
![The Wall - Architecture](/docs/TheWallArchitecture.jpg?raw=true "The Wall - Architecture")

# Pages

## Sign Up
[SignUp Component](/src/components/SignUp.jsx)
<br></br>
![Sign Up](/docs/images/SignUp.jpg?raw=true "Sign Up")

## Confirm Sign Up
[ConfirmSignUp Component](/src/components/ConfirmSignUp.jsx)
<br></br>
![Confirm Sign Up](/docs/images/VerifyUser.jpg?raw=true "Confirm Sign Up")

## Sign In
[SignIn Component](/src/components/SignIn.jsx)
<br></br>
![Sign In](/docs/images/SignIn.jpg?raw=true "Sign In")

## Home
[Home Component](/src/components/Home.jsx)
<br></br>
![Home](/docs/images/Home.jpg?raw=true "Home")
<br></br>

# AWS Amplify
Framework and web hosting solution for web applications.
The Amplify Framework consists of 3 components, libraries, UI components, and a CLI toolchain. On this project I am using the __libraries__ and the __CLI toolchain__.

The CLI (and the AWS management console) enables me to setup the serverless backend.

The libraries enable me to connect the backend with my frontend web app.
<br></br>
## CI
Any commits made to the master branch, will automatically trigger a new build in the live application (see [Demo](#demo)).
This continuous intergration is set up by AWS amplify using CLI.
<br></br>

## Amazon Cognito
Serverless authentication and authorization service.
The application's authentication flow is as follows:

1. Sign Up with username, email and password. A verification code is sent to the email.
1. Verify the email by entering the verification code
1. Sign In using username and password
<br></br>

## DynamoDB
Fully managed NoSQL database 

### Posts Table
This is the only table we are using on this application. It contains all information that pertain to the posts that users make.

```
Primary partition key: id (String)
Primary sort key: creationDate (Number)

Current Schema: {
  id: String //UUID that is created on the POST method of /posts
  creationDate: int //the creation date in UTC milis
  content: String //the user input text of the post
  hearted: int //the amount of hearts the post has
  heartedUsernames: String[] //the usernames that have hearted the post. PATCH method of /heart
  username: String //the username of the poster
}
```
## API Gateway
The application API, has the Lambda functions connected to serve the paths /posts and /heart as REST.
<br></br>

## Lambda Functions

## `/posts`
Contains HTTP Methods for CRUD on the [postsTable](#posts-table)

## `/heart`

`HTTP PATCH`

This method is called whenever a user clicks on the heart button of a post.

It adds or removes the username from the list of users that have hearted the post.
<br></br>
```
Request Body:
{
  postId : String,
  username: String,
  creationDate: int
}
```
<br></br>
# Possible feature additions

* Post comments
* Show who hearted your post on mouse hover
* Light/Dark mode switch on TItle Bar
* Avatar or profile picture