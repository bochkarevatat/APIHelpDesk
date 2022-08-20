const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();
var bodyParser = require('koa-bodyparser');
app.use(bodyParser());
const cors = require('@koa/cors');
const {
    v4: uuidv4
} = require('uuid');
// console.log(uuidv4());
const formatDate = require('./formatDate');

const tickets = [{
        id: uuidv4(),
        name: 'Поменять краску в принтере, ком. 404',
        description: 'Принтер HP LJ-1210, картриджи на складе',
        status: false,
        created: formatDate(new Date())
    },
    {
        id: uuidv4(),
        name: 'Переустановить Windows, PC-Hall24',
        description: '',
        status: false,
        created: formatDate(new Date())
    },
    {
        id: uuidv4(),
        name: 'Установить обновление KB-31642dv3875',
        description: 'Вышло критическое обновление для Windows',
        status: false,
        created: formatDate(new Date())
    }
];
app.use(
    cors({
        origin: '*',
        allowMethods: [
            'GET',
            'POST',
            'DELETE',
            'OPTIONS',
            'PUT',
            'allTickets',
            'createTicket',
            'deleteById',
            'editTicket',
        ],
        allowHeaders: ['Content-Type'],
    })
);
router.get('/allTickets', async (ctx, next) => {
    ctx.response.body = tickets;
    next();
});
router.post('/createTicket', async (ctx, next) => {
    const createData = ctx.request.body;
    const newTicket = {
        id: uuidv4(),
        name: createData.name,
        status: false,
        description: createData.description || '',
        created: formatDate(new Date()),
    };
    tickets.push(newTicket);
    ctx.response.body = [newTicket];
    console.log(newTicket)

});
router.delete('/deleteById', (ctx, next) => {
    const id = uuidv4();
    const deleteIndx = tickets.findIndex(ticket => ticket.id === id);

    if (deleteIndx) {
        tickets.splice(deleteIndx, 1);
        ctx.response.body = {
            success: true
        };
    } else {
        ctx.response.body = {
            success: false
        };
    }
});

router.put('/editTicket', (ctx, next) => {
    const updIndex = tickets.findIndex((ticket) => ticket.id === id);
      const updTicketData = ctx.request.body;
      const ticket = {
        ...tickets[updIndex],
        ...updTicketData,
      };
      tickets.splice(updIndex, 1, ticket);
      ctx.response.body = tickets;
      return;
});

app.use(router.routes());
app.listen(7080)