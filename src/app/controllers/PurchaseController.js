const Ad = require('../models/Ad');
const User = require('../models/User');
const Purchase = require('../models/Purchase');
const PurchaseMail = require('../jobs/PurchaseMail');
const Queue = require('../services/Queue');

class PurchaseController {
  async index(req, res) {
    const purchases = await Purchase.paginate(
      {},
      {
        page: req.query.page || 1,
        limit: 20,
        populate: ['user', 'ad'],
        sort: '-createdAt',
      },
    );
    return res.json(purchases);
  }

  async store(req, res) {
    const { id, content } = req.body;

    const purchaseAd = await Ad.findById(id).populate('author');
    const user = await User.findById(req.userId);

    Queue.create(PurchaseMail.key, {
      ad: purchaseAd,
      user,
      content,
    }).save();

    const purchase = await Purchase.create({
      content,
      user: user.id,
      ad: purchaseAd.id,
    });

    res.json({ message: 'Email sent', purchase });
  }
}

module.exports = new PurchaseController();
