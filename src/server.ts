     import express, { Express } from 'express';
     import bodyParser from 'body-parser';
     import mongoose from 'mongoose';
     import * as memberController from './member.controller';

     const app: Express = express();
     const PORT = 3000;

     // Middleware
     app.use(bodyParser.urlencoded({ extended: true }));
     app.use(bodyParser.json());

     // Connect to MongoDB
     mongoose
       .connect('mongodb://localhost/jitu-community-club', {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       })
       .then(() => console.log('Connected to MongoDB'))
       .catch((error) => console.error(error));

     // Routes
     app.post('/members', memberController.registerMember);
     app.put('/members/:id', memberController.updateMember);
     app.get('/members/:id', memberController.fetchOneMember);
     app.delete('/members/:id', memberController.deleteMember);

     // Start the server
     app.listen(PORT, () => {
       console.log(`Server listening on port ${PORT}`);
     });
    