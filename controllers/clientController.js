const ClientRepository = require('../repository/sequelize/ClientRepository');

exports.showClientList = (req, res, next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.render('pages/client/list', {
                clients: clients,
                navLocation: 'client'
            });
        });
};

exports.showAddClientForm = (req, res, next) => {
    res.render('pages/client/form', {
        _client: {},
        pageTitle: 'New client',
        formMode: 'createNew',
        btnLabel: 'Add new client',
        formAction: '/clients/add',
        navLocation: 'client',
        validationErrors: []
    });
};

exports.showClientDetails = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(client => {
            res.render('pages/client/form', {
                _client: client,
                formMode: 'showDetails',
                pageTitle: 'Client details',
                formAction: '',
                navLocation: 'client',
                validationErrors: []
            });
        });
};

exports.showEditClientForm = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.getClientById(clientId)
        .then(client => {
            res.render('pages/client/form', {
                _client: client,
                formMode: 'edit',
                pageTitle: 'Client edit',
                btnLabel: 'Edit client',
                formAction: '/clients/edit',
                navLocation: 'client',
                validationErrors: []
            });
        });
};

exports.addClient = (req, res, next) => {
    const clientData = { ...req.body };
    console.log(clientData);
    ClientRepository.createClient(clientData)
        .then( result => {
            res.redirect('/clients');
        })
        .catch(err => {
            err.errors.forEach (e => {
                if (e.path.includes('PESEL') && e.type === 'unique violation') {
                    e.message = "Pesel already being used";
                }
            });
            res.render('pages/client/form', {
                _client: clientData,
                pageTitle: 'New client',
                formMode: 'invalid',
                btnLabel: 'Add new client',
                formAction: '/clients/add',
                navLocation: 'client',
                validationErrors: err.errors
            })
        });
};

exports.updateClient = (req, res, next) => {
    const clientId = req.body._id;
    const clientData = { ...req.body };
    ClientRepository.updateClient(clientId, clientData)
        .then( result => {
            res.redirect('/clients');
        })
        .catch(err => {
            err.errors.forEach (e => {
                if (e.path.includes('_PESEL') && e.type === 'unique violation') {
                    e.message = "Pesel already being used";
                }
            });
            res.render('pages/client/form', {
                _client: clientData,
                formMode: 'invalid',
                pageTitle: 'Client edit',
                btnLabel: 'Edit client',
                formAction: '/clients/edit',
                navLocation: 'client',
                validationErrors: err.errors
            });
        });
};

exports.deleteClient = (req, res, next) => {
    const clientId = req.params.clientId;
    ClientRepository.deleteClient(clientId)
        .then( () => {
            res.redirect('/clients');
        });
};

