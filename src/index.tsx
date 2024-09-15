import { serveStatic } from '@hono/node-server/serve-static'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { FarmModel } from './farm/farm.model';
import { AnimalNotFoundPage, CowPage, GoatPage, HomePage } from './farm/farm.view';
import { FarmContoller } from './farm/farm.controller';


const app = new Hono()
const model = new FarmModel('data/animals.csv');
const controller = new FarmContoller(model);

app.use('/static/*', serveStatic({ root: '.' }))

app.get('/', (c) => {
    return c.render(<HomePage message={undefined} />)
})

app.post('/process', async (c) => {
    const { id } = await c.req.parseBody();
    const result = controller.processAnimal({ id });
    if (!result) {
        return c.render(<AnimalNotFoundPage />)
    }
    if (result.goat) {
        return c.redirect('/goat')
    }
    return c.render(<CowPage message={result} />);
});

app.get('/goat', async (c) => {
    return c.html(<GoatPage />);
})

const port = 3000
console.log(`Server is running on port ${port}; http://localhost:${port}`)

serve({
    fetch: app.fetch,
    port
})
