const Homepage = require('../models/Homepage');

const getHomepageContent = async (req, res) => {
  try {
    let homepage = await Homepage.findOne();
    
    if (!homepage) {
      // Create default homepage content
      homepage = new Homepage({
        banners: [],
        videos: [],
        faqs: [
          {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for all unused items in original packaging.",
            order: 1
          },
          {
            question: "How long does shipping take?",
            answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 day delivery.",
            order: 2
          }
        ],
        policies: [
          {
            title: "Free Shipping",
            content: "Free shipping on orders over $50",
            icon: "Truck"
          },
          {
            title: "30-Day Returns",
            content: "Easy returns within 30 days",
            icon: "RefreshCw"
          },
          {
            title: "Secure Payment",
            content: "Your payment information is safe",
            icon: "Shield"
          }
        ],
        whatsappNumber: process.env.WHATSAPP_NUMBER || "+1234567890"
      });
      await homepage.save();
    }

    res.json({ homepage });
  } catch (error) {
    console.error('Get homepage content error:', error);
    res.status(500).json({ error: 'Server error fetching homepage content' });
  }
};

const updateHomepageContent = async (req, res) => {
  try {
    let homepage = await Homepage.findOne();
    
    if (!homepage) {
      homepage = new Homepage(req.body);
    } else {
      Object.assign(homepage, req.body);
    }
    
    await homepage.save();

    res.json({
      message: 'Homepage content updated successfully',
      homepage
    });
  } catch (error) {
    console.error('Update homepage content error:', error);
    res.status(500).json({ error: 'Server error updating homepage content' });
  }
};

module.exports = {
  getHomepageContent,
  updateHomepageContent
};