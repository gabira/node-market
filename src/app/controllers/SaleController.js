const Purchase = require('../models/Purchase');

class SaleController {
  async update(req, res) {
    const { id } = req.params;

    const { ad, user } = await Purchase.findById(id)
      .populate('user')
      .populate('ad');

    if (!ad || ad.purchasedBy) {
      return res.status(400).json({ error: 'This ad is no more available.' });
    }

    if (ad.author.toString() !== req.userId) {
      return res.status(401).json({ error: 'This ad is not yours.' });
    }

    ad.purchasedBy = user.id;
    ad.save();

    return res.json({ ad, user });
  }
}

module.exports = new SaleController();
