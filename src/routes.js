const express = require('express');
const validate = require('express-validation');
const handle = require('express-async-handler');

const routes = express.Router();
const controllers = require('./app/controllers');
const validators = require('./app/validators');

const authMiddleware = require('./app/middleware/auth');

routes.post('/users', validate(validators.User), handle(controllers.UserController.store));
routes.post('/sessions', validate(validators.Session), handle(controllers.SessionController.store));

routes.use(authMiddleware);

/**
 * Rotas de Ads
 */
routes.get('/ads', handle(controllers.AdController.index));
routes.get('/ads/:id', handle(controllers.AdController.show));
routes.post('/ads', validate(validators.Ad), handle(controllers.AdController.store));
routes.put('/ads/:id', validate(validators.Ad), handle(controllers.AdController.update));
routes.delete('/ads/:id', handle(controllers.AdController.destroy));

/**
 * Rotas de Purchases
 */
routes.get('/purchases', handle(controllers.PurchaseController.index));
routes.post(
  '/purchases',
  validate(validators.Purchase),
  handle(controllers.PurchaseController.store),
);

/**
 * Rotas de Sales
 */
routes.put('/sales/:id', handle(controllers.SaleController.update));

module.exports = routes;