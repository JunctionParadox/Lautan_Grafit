const Koa = require('koa');
const serve = require ('koa-static');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const path = require('path');
const loginUser = require('./src/api/loginuserapi');
const storeImage = require('./src/api/saveapi');
const loadPaths = require('./src/api/loadapi');
const loadImage = require('./src/api/loadapi_image');
const storeTemp = require('./src/api/storetemp');
const loadTemp = require('./src/api/loadtemp');
const checkSessionId = require('./src/auth/sessionauth');
const checkAuthToken = require('./src/auth/checkauthtoken');
const generateSessionToken = require('./src/token/sessionid');
const con = require('./data/db_connection');
const cors = require('@koa/cors');

const app = module.exports = new Koa();
const router = new Router();
app.use(koaBody({jsonLimit: "50mb", formLimit: "50mb", textLimit: "50mb", multipart: true}));
app.use(cors());
app.use(serve('./public'));

router.get('/')
router.post('/login/', async (ctx) => {
	ctx.body = await loginUser(ctx.request.body)
})
router.get('/session/', async (ctx) => {
	ctx.body = await generateSessionToken()
})
router.get('/images/', async (ctx) => {
	//console.log(ctx.request.header.userauth);
	console.log(await checkAuthToken(ctx.request.header.userauth))
	ctx.body = await loadPaths(await checkAuthToken(ctx.request.header.userauth));
})
router.get('/images/:filename', async (ctx) => {
	ctx.body = await loadImage(ctx.request.url)
})
router.post('/images/:filename', async (ctx) => {
	ctx.body = ctx.request.body,
	console.log(ctx.request),
	storeImage(ctx.body, ctx.request.url, await checkAuthToken(ctx.request.header.userauth));
})
router.get('/temp/:cookie', async (ctx) => {
	//if (checkSessionId(ctx.request.headers['sessionId']) != false) {
		ctx.body = await loadTemp(ctx.request.url)
	//}
})
router.post('/temp/:cookie', async (ctx) => {
	//if (checkSessionId(ctx.request.headers['sessionId']) != false) {
		ctx.body = ctx.request.body,
		storeTemp(ctx.body, ctx.request.url)
	//}
})
app.use(router.routes());
app.use(router.routes()).use(router.allowedMethods());

//async function index(ctx) {
//	await ctx.render('index');
//}

app.listen(3000, () => {
	console.log('Connection succesfull')
})
