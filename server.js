import express from 'express';
//import https from 'https';
import { customAlphabet } from 'nanoid';
import fs from 'fs';
import landing from './routes/landing.js';
import authRouter from './routes/auth.js';
import adminRouter from './routes/admin.js';
import userRouter from './routes/user.js';
import todoRouter from './routes/todo.js';
import dbroutertest from './tests/routes/dbtest.js';
import usertestrouter from './tests/routes/dbuserstest.js';
import { errorHandler, notFound } from './middleware/ErrorMiddleware.js';
import { successMessage } from './custom_modules/index.js';

/* const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem'); */

const PORT = process.env.PORT || 4000;
const nanoid = customAlphabet('024698ouqtyminv*^#%`~[;>|\\', 13);
const app = express();
//const server = https.createServer({ key: key, cert: cert }, app);

app.use((req, res, next) => {
	res.setHeader('Cache-Control', 'no-cache,no-store,max-age=0,must-revalidate');
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '-1');
	res.setHeader('X-XSS-Protection', '1;mode=block');
	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.setHeader('keep-alive', '-1');
	res.setHeader('X-Frame-Options', 'SAMEORIGIN');
	res.setHeader('Content-Security-Policy', "script-src 'self'");
	res.setHeader('X-Content-Type-Options', 'nosniff');
	res.setHeader('x-powered-by', 'Deez Nuts');
	res.setHeader('ETag', `${nanoid()}`);
	next();
});

// Body parser
app.use(express.json());

// Routers
app.use('/', landing);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/api/todos', todoRouter);
app.use('/user/test', usertestrouter);
app.use('/test', dbroutertest);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
	console.clear();
	successMessage(`\n\tApp listening on port ${PORT}\n`);
});
