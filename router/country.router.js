const router = require('express').Router();

const mongoose = require('mongoose');
var status = require('http-status');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/countries', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Country = require('../models/country.model');

module.exports = () => {
    /** Insertar países */
    router.post('/', (req, res) => {
        country = req.body;

        //console.log(req);

        Country.create(country)
            .then(
                (data) => {
                    //console.log(data);
                    res.json(
                        {
                            code: status.OK,
                            msg: 'Se insertó correctamente',
                            data: data
                        }
                    )
                    //console.log(res);
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json(
                            {
                                code: status.BAD_REQUEST,
                                msg: 'Ocurrió un error',
                                err: err.name,
                                detal: err.message
                            }
                        )
                }
            );
    });

    /** Consulta general de países */
    router.get('/', (req, res) => {
        Country.find({})
            .then(
                (countries) => {
                    res.json({
                        code: status.OK,
                        msg: 'Consulta correcta',
                        data: countries
                    })
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la petición',
                            err: err.name,
                            detail: err.message
                        })
                }
            )
    });

    /** Consulta de un país por _id */
    router.get('/:id', (req, res) => {

        const id = req.params.id;

        Country.findOne({ _id: id })
            .then(
                (country) => {
                    if (country)
                        res.json({
                            code: status.OK,
                            msg: 'Consulta correcta',
                            data: country
                        });
                    else
                        res.status(status.NOT_FOUND)
                            .json({
                                code: status.NOT_FOUND,
                                msg: 'No se encontró el elemento'
                            });

                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la petición',
                            err: err.name,
                            detail: err.message
                        })
                }
            )
    });

    /** Actualización */
    router.put('/:id', (req, res) => {
        id = req.params.id;
        country = req.body;
        Country.findByIdAndUpdate(id, country, { new: true })
            .then(
                (data) => {
                    console.log(data);
                    res.json({
                        code: status.OK,
                        msg: 'Se actualizó correctamente',
                        data: data
                    });
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                    res.status(status.BAD_REQUEST);
                    res.json({
                        code: status.BAD_REQUEST,
                        msg: 'Error en la petición',
                        err: err.name,
                        detail: err.message
                    })
                }
            )
    });

    /** Eliminar */
    router.delete('/:id', (req, res) => {
        id = req.params.id;
        Country.findByIdAndRemove(id)
            .then(
                (data) => {
                    if(data)
                        res.json({
                            code: status.OK,
                            msg: 'Se eliminó correctamente',
                            data: data
                        })
                    else 
                        res.status(status.NOT_FOUND)
                        .json({
                            code: status.NOT_FOUND,
                            msg: 'No se encontró el elemento'
                        })
                }
            )
            .catch(
                (err) => {
                    res.status(status.BAD_REQUEST)
                        .json({
                            code: status.BAD_REQUEST,
                            msg: 'Error en la petición',
                            err: err.name,
                            detail: err.message
                        })
                }
            )
    })

    return router;
}