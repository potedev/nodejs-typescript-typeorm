import { Server } from './config/server'

//Express App
const App = new Server()

const main = async () => {
    try {
        await App.start();
    } catch (err) {
        console.error(err)
    }
}

main();