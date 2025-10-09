const Subscriber = require('../models/Subscriber');

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      if (existingSubscriber.active) {
        return res.status(400).json({ error: 'Email already subscribed' });
      } else {
        existingSubscriber.active = true;
        existingSubscriber.subscribedAt = new Date();
        await existingSubscriber.save();
        return res.json({ message: 'Subscription reactivated successfully' });
      }
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: 'Subscribed successfully' });
  } catch (error) {
    console.error('Subscribe error:', error);
    res.status(500).json({ error: 'Server error during subscription' });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const { page = 1, limit = 20, active = 'true' } = req.query;

    const query = {};
    if (active !== 'all') {
      query.active = active === 'true';
    }

    const subscribers = await Subscriber.find(query)
      .sort({ subscribedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const totalSubscribers = await Subscriber.countDocuments(query);
    const totalPages = Math.ceil(totalSubscribers / limit);

    const activeCount = await Subscriber.countDocuments({ active: true });
    const inactiveCount = await Subscriber.countDocuments({ active: false });

    res.json({
      subscribers,
      currentPage: parseInt(page),
      totalPages,
      totalSubscribers,
      activeCount,
      inactiveCount
    });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ error: 'Server error fetching subscribers' });
  }
};

const unsubscribe = async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.id);
    
    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    subscriber.active = false;
    await subscriber.save();

    res.json({ message: 'Unsubscribed successfully' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ error: 'Server error during unsubscription' });
  }
};

const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    
    if (!subscriber) {
      return res.status(404).json({ error: 'Subscriber not found' });
    }

    res.json({ message: 'Subscriber deleted successfully' });
  } catch (error) {
    console.error('Delete subscriber error:', error);
    res.status(500).json({ error: 'Server error deleting subscriber' });
  }
};

module.exports = {
  subscribe,
  getAllSubscribers,
  unsubscribe,
  deleteSubscriber
};