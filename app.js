const Koa = require('koa');
const serve = require ('koa-static');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const path = require('path')
const storeImage = require('./src/api/saveapi');
const loadPaths = require('./src/api/loadapi');
const loadImage = require('./src/api/loadapi_image');
const con = require('./data/db_connection');
const cors = require('@koa/cors');

const app = module.exports = new Koa();
const router = new Router();
app.use(koaBody({jsonLimit: "50mb", formLimit: "50mb", textLimit: "50mb"}));

app.use(cors());
app.use(serve('./public'));
router.get('/')
router.get('/images/', async (ctx) => {
	ctx.body = await loadPaths()
    console.log(ctx.body)
	//ctx.body = "wawa";
})
router.get('/images/:filename', async (ctx) => {
	ctx.body = await loadImage()
	console.log(ctx.body)
})
router.post('/images/:filename', (ctx) => {
	ctx.body = ctx.request.body,
	console.log(ctx.request),
	storeImage(ctx.body, ctx.request.url);
})
app.use(router.routes());
app.use(router.routes()).use(router.allowedMethods());

//async function index(ctx) {
//	await ctx.render('index');
//}

app.listen(3000, () => {
	console.log('Connection succesfull')
})