const Notification = require('../models/Notification');

class NotificationController {
    async renderDetailNotify(req, res) {
        const { id } = req.params;
        const notification = await Notification.findById(id);
        res.status(200).send({ notification });
    }
}