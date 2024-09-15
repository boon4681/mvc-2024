
import { useEffect, type FC } from 'hono/jsx'
import { css, cx, keyframes, Style } from 'hono/css'

export const Layout: FC = ({ children }) => {
    return (
        <html>
            <head>
                <title>Cow Milking Program</title>
                <style>{`
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                    form { margin-bottom: 20px; }
                    input, button { font-size: 16px; padding: 5px;margin-bottom: 8px; }
                    .error { color: red; }
                    .success { color: green; }
                `}</style>
                <Style />
            </head>
            <body>{children}</body>
        </html>
    )
}

export const HomePage: FC<{ message: any }> = ({ message }) => {
    const formCss = css`
        padding: 1rem;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border: 1px solid gray;
        border-radius: 12px; 
    `
    return (
        <Layout>
            <form class={formCss} method="post" action="/process">
                <h1>Cow Milking Program</h1>
                <input type="text" name="id" placeholder="Enter 8-digit animal ID" required />
                <button type="submit">Process Animal</button>
            </form>
        </Layout>
    )
}

export const GoatPage: FC = () => {
    return <Layout>
        <h1 class="error">This is a goat!</h1>
        <form action="/" method='get'>
            <button>
                Send it back to the mountains.
            </button>
        </form>
        <img src={"/static/goat.png"}></img>
    </Layout>
}

export const AnimalNotFoundPage: FC = () => {
    return <Layout>
        <a href="/">Back to Home</a>
        <h1 class="error">Animal not found</h1>
    </Layout>
}

export const CowPage: FC<{ message: any }> = ({ message }) => {
    return <Layout>
        <a href="/">Back to Home</a>
        <h1 class={message.success ? 'success' : 'error'}>{message.message}</h1>
        <img src={"/static/cow.png"}></img>
    </Layout>
}