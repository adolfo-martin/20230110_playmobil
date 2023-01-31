import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

export default class PlaymobilServer {

    constructor(port, repository) {
        this._port = port;
        this._repository = repository;

        this._app = new express();
        this._app.use(cors());

        this._setupRoutes();
    }


    listen() {
        this._app.listen(
            this._port,
            () => console.log(`Playmobil server listening on port ${this._port}`)
        );
    }


    _setupRoutes() {
        this._app.get('/api/series', this._validateTokenMiddleware.bind(this), this._retrieveAndSendSeries.bind(this));
        this._app.get('/api/serie/:serieUuid', this._validateTokenMiddleware.bind(this), this._retrieveAndSendSerieByUuid.bind(this));
        this._app.get('/api/boxes', this._validateTokenMiddleware.bind(this), this._retrieveAndSendBoxes.bind(this));
        this._app.get('/api/box/:boxUuid', this._validateTokenMiddleware.bind(this), this._retrieveAndSendBoxByUuid.bind(this));
        this._app.get('/api/serie/:serieUuid/boxes', this._validateTokenMiddleware.bind(this), this._retrieveAndSendBoxesBySerieUuid.bind(this));
        this._app.get('/api/figures', this._validateTokenMiddleware.bind(this), this._retrieveAndSendFigures.bind(this));
        this._app.get('/api/figure/:figureUuid', this._validateTokenMiddleware.bind(this), this._retrieveAndSendFigureByUuid.bind(this));
        this._app.get('/api/box/:boxUuid/figures', this._validateTokenMiddleware.bind(this), this._retrieveAndSendFiguresByBoxUuid.bind(this));
        this._app.get('*', this._sendMessagePleaseUseOurApi.bind(this));
    }


    _sendMessagePleaseUseOurApi(req, res) {
        setTimeout(
            () => {
                res.status(400)
                    .send({ ok: false, message: 'Please, use our API.' });
            },
            2000
        );
    }


    async _retrieveAndSendSeries(req, res, next) {
        const series = await this._repository.retrieveSeries();

        setTimeout(
            () => {
                if (PlaymobilServer._isSomeError()) {
                    res.status(500).json({
                        ok: false,
                        message: 'Cannot retrieve the series.'
                    });
                    return;
                }

                res.status(200).json({
                    ok: true,
                    series: series.map(({ uuid, denomination }) => ({ uuid, denomination }))
                });
            },
            2000
        );
    }


    async _retrieveAndSendBoxes(req, res, next) {
        const boxes = await this._repository.retrieveBoxes();

        setTimeout(
            () => {
                res.status(200).json({
                    ok: true,
                    boxes: boxes.map(({ uuid, denomination, serie, description, price }) => 
                        ({ uuid, denomination, serie, description, price })
                    )
                });
            },
            2000
        );
    }


    async _retrieveAndSendFigures(req, res, next) {
        const figures = await this._repository.retrieveFigures();

        setTimeout(
            () => {
                res.status(200).json({
                    ok: true,
                    figures: figures.map(({ uuid, denomination, barcode }) => 
                        ({ uuid, denomination, barcode })
                    )
                });
            },
            2000
        );
    }


    async _retrieveAndSendSerieByUuid(req, res, next) {
        const serieUuid = req.params.serieUuid;
        if (!serieUuid) {
            res.status(400).json({
                ok: false,
                message: 'Cannot retrieve the serie. Serie UUID has not been sended.'
            });
            return;
        }

        const serie = await this._repository.retrieveSerieByUuid(serieUuid);

        if (!serie) {
            res.status(404).json({
                ok: false,
                message: `Cannot retrieve the serie. Serie UUID "${serieUuid}" is wrong.`
            });
            return;
        }

        setTimeout(
            () => {
                res.status(200).json({
                    ok: true,
                    serie
                });
            },
            1000
        );
    }


    async _retrieveAndSendBoxByUuid(req, res, next) {
        const boxUuid = req.params.boxUuid;
        if (!boxUuid) {
            res.status(400).json({
                ok: false,
                message: 'Cannot retrieve the box. Box UUID has not been sended.'
            });
            return;
        }

        const box = await this._repository.retrieveBoxByUuid(boxUuid);

        if (!box) {
            res.status(404).json({
                ok: false,
                message: `Cannot retrieve the box. Box UUID "${boxUuid}" is wrong.`
            });
            return;
        }

        setTimeout(
            () => {
                res.status(200).json({
                    ok: true,
                    box
                });
            },
            1000
        );
    }


    async _retrieveAndSendFigureByUuid(req, res, next) {
        const figureUuid = req.params.figureUuid;
        if (!figureUuid) {
            res.status(400).json({
                ok: false,
                message: 'Cannot retrieve the box. Figure UUID has not been sended.'
            });
            return;
        }

        const figure = await this._repository.retrieveFigureByUuid(figureUuid);
        
        if (!figure) {
            res.status(404).json({
                ok: false,
                message: `Cannot retrieve the box. Figure UUID "${figureUuid}" is wrong.`
            });
            return;
        }
        
        const { uuid, denomination, barcode } = figure;

        setTimeout(
            () => {
                res.status(200).json({
                    ok: true,
                    figure: { uuid, denomination, barcode }
                });
            },
            1000
        );
    }


    async _retrieveAndSendBoxesBySerieUuid(req, res, next) {
        const serieUuid = req.params.serieUuid;
        if (!serieUuid) {
            res.status(400).json({
                ok: false,
                message: 'Cannot retrieve the boxes. Serie UUID has not been sended.'
            });
            return;
        }

        const boxes = await this._repository.retrieveBoxesBySerieUuid(serieUuid);

        if (!boxes || boxes.length === 0) {
            res.status(404).json({
                ok: false,
                message: `Cannot retrieve the boxes. Serie UUID "${serieUuid}" is wrong.`
            });
            return;
        }

        setTimeout(
            () => {
                res.status(200).json({
                    ok: true,
                    boxes: boxes.map(({ uuid, denomination, serie, description, price }) => uuid)
                });
            },
            2000
        );
    }


    async _retrieveAndSendFiguresByBoxUuid(req, res, next) {
        const boxUuid = req.params.boxUuid;
        if (!boxUuid) {
            res.status(400).json({
                ok: false,
                message: 'Cannot retrieve the figures. Box UUID has not been sended.'
            });
            return;
        }

        const figures = await this._repository.retrieveFiguresByBoxUuid(boxUuid);

        if (!figures || figures.length === 0) {
            res.status(404).json({
                ok: false,
                message: `Cannot retrieve the figures. Box UUID "${boxUuid}" is wrong.`
            });
            return;
        }

        setTimeout(
            () => {
                res.status(200).json({
                    ok: true,
                    figures: figures.map(({ figure, quantity }) => ({ figure: figure.uuid, quantity }))
                });
            },
            2000
        );
    }


    static _isSomeError() {
        return Math.random() < 0.5 ? true : false;
    }


    async _validateTokenMiddleware(req, res, next) {
        const token = getBearerToken(req);
        if (!token) {
            res.status(401)
                .json({ ok: false, message: 'There is no token.' });
            return;
        }

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET || 'a91a848960fd61cb6240d06679c2ba14bbb753502cce7c62093aed36ff6d3fa7704f60e6f89b6159e156a8b758bad943d220ae9484221532f7fb440478ec580a',
            (err, user) => {
                if (err) {
                    res.status(401)
                        .json({ ok: false, message: 'The access token is not valid.' });
                    return;
                }

                req.user = user;
                next();
            })

        function getBearerToken(req) {
            const authHeader = req.headers['authorization'];
            const token = authHeader && authHeader.split(' ')[1];
            return token;
        }
    }
}