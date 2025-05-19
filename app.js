const Koa = require('koa');
const serve = require ('koa-static');
const Router = require('koa-router');
const { koaBody } = require('koa-body');
const path = require('path')
const storeImage = require('./src/api/saveapi');

const app = module.exports = new Koa();
const router = new Router();
app.use(koaBody());

app.use(serve('./public'));
router.get('/')
router.post('/images/:filename', (ctx) => {
	ctx.body = ctx.request.body,
	console.log(ctx.request),
	storeImage(ctx.body, ctx.request.url);
})
app.use(router.routes());

//async function index(ctx) {
//	await ctx.render('index');
//}

app.listen(3000, () => {
	console.log('Connection succesfull')
})