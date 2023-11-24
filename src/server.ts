     import express, { Express } from 'express';
     import bodyParser from 'body-parser';
     import * as memberController from './member.controller';

     const app: Express = express();
     const PORT = 3000;

   
     app.use(bodyParser.urlencoded({ extended: true }));
     app.use(bodyParser.json());

     app.post('/members', memberController.registerMember);
     app.put('/members/:id', memberController.updateMember);
     app.get('/members/:id', memberController.fetchOneMember);
     app.delete('/members/:id', memberController.deleteMember);

    
     app.listen(PORT, () => {
       console.log(`Server listening on port ${PORT}`);
     });
    