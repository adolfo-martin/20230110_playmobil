import PlaymobilRepositoryMock from './repositories/PlaymobilRepositoryMock.js';
import PlaymobilServer from './servers/PlaymobilServer.js';

class App {
    
    run() {
        const playmobilRepository = new PlaymobilRepositoryMock();
        const playmobilServer = new PlaymobilServer(
            process.env.PORT || 80, 
            playmobilRepository
        );

        playmobilServer.listen();
    }
}


const app = new App();
app.run();