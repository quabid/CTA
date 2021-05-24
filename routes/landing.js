import { Router } from 'express';

import * as Landing from '../controllers/landingController.js';

const landing = Router();

landing.route('/').get(Landing.getIndex).post(Landing.postIndex);

landing.route('/about').get(Landing.getAbout);

landing.route('/contact').get(Landing.getContact).post(Landing.postContact);

export default landing;