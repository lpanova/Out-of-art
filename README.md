# Out of Art

Out of art is a web application for non professional artists.

Out of art helps users quickly and easily upload their paintings. They can also add descriptions of the paintings.
They can update and delete their own paintings.
Users can look at the paintings of the other artists and can like it.

## Technologies

#### Frontend

1. React.js - https://github.com/facebook/react - Version 17.0.1
2. React Router Dom - https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom - Version 5.2.0
3. React Facebook Login - https://www.npmjs.com/package/react-facebook-login - Version 4.1.1

#### Backend

1. Kinvey - https://devcenter.kinvey.com/rest/guides/files

## Getting

1. git clone - https://github.com/lpanova/Out-of-art
2. cd .\Out-of-art
3. npm install
4. npm start
5. Runs the app in the development mode.
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

.

## How to use

1. The User have to register in the application throw Registration form page - http://localhost:3000/register. There are two options - The user can register throw username and password or throw Facebook account.
2. The User have to login in the application throw Login form page - http://localhost:3000/login.
3. The User can look at the all published paintings in the application in the Paintings view page - http://localhost:3000/paintings. There the user can sort paintings by likes and by authors.
4. Users can look at the each one painting in detail throw cliking on them. This action will redidrect user to Details view page - http://localhost:3000/details. There is large view of the painting, including name, description and likes properties.
5. Users can look at their own paintings in My Paintings view page -http://localhost:3000/mypaintings. When the authors click on the painting, this action will redidrect the user to Details view Page. There is large view of the painting, including name, description and likes properties. There are also like button, delete button and edit button. When user click on delete button, the painting will be delete permanently. When user click on the edit button, the user will look Edit view page - http://localhost:3000/edit, when he can edit the painting.
