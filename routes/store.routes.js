import express from 'express';
import Store from '../models/Store.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tiendas' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ error: 'Tienda no encontrada' });
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la tienda' });
  }
});

router.post('/', async (req, res) => {
  try {
    const store = await Store.create(req.body);
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updated = await Store.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: 'Tienda no encontrada' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//Patch para actualizar solo el número de Twilio
router.patch('/:id', async (req, res) => {
  try {
    const updated = await Store.findByIdAndUpdate(
      req.params.id,
      { twilioPhoneNumber: req.body.twilioPhoneNumber, 
        twilioPhoneNumberSid: req.body.twilioPhoneNumberSid, 
        twilioPhoneNumberFriendlyName: req.body.twilioPhoneNumberFriendlyName },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Tienda no encontrada' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

//get By status active true or false
router.get('/status/:active', async (req, res) => {
  try {
    const stores = await Store.find({
      active: req.params.active,
      $or: [
        { twilioPhoneNumber: { $exists: false } },
        { twilioPhoneNumber: "" }
      ]
    });
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener tiendas' });
  }
});



export default router;
