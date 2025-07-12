const InvoiceModel = require('@/models/invoice');
const InvoiceConfigDetails =require('@/config/invoice.cofig')

const InvoiceController = {
   async create(req, res) {
      try {
         const { invoiceData, invoice_items } = req.body;
         const created = await InvoiceModel.createInvoiceWithItems(invoiceData, invoice_items);
         res.status(201).send({ status: true, msg: 'Invoice created successfully', data: created });
      } catch (err) {
         console.error('Error creating invoice:', err);
         res.status(500).send({ status: false, msg: 'Server error', data: null });
      }
   },

   async findAll(req, res) {
      try {
         const data = await InvoiceModel.findAll();
         res.status(200).send({ status: true, msg: 'All invoices fetched', data });
      } catch (err) {
         console.error('Error fetching invoices:', err);
         res.status(500).send({ status: false, msg: 'Server error', data: null });
      }
   },

   async findOne(req, res) {
      try {
         const data = await InvoiceModel.findOne(req.params.invoice_id);
         res.status(200).send({ status: true, msg: 'Invoice fetched', data });
      } catch (err) {
         console.error('Error fetching invoice:', err);
         res.status(500).send({ status: false, msg: 'Server error', data: null });
      }
   },

   async update(req, res) {
      try {
         const updated = await InvoiceModel.update(req.params.invoice_id, req.body);
         res.status(200).send({ status: true, msg: updated ? 'Invoice updated' : 'No changes made', data: null });
      } catch (err) {
         console.error('Error updating invoice:', err);
         res.status(500).send({ status: false, msg: 'Server error', data: null });
      }
   },

   async remove(req, res) {
      try {
         const deleted = await InvoiceModel.remove(req.params.invoice_id);
         res.status(200).send({ status: true, msg: deleted ? 'Invoice deleted' : 'Invoice not found', data: null });
      } catch (err) {
         console.error('Error deleting invoice:', err);
         res.status(500).send({ status: false, msg: 'Server error', data: null });
      }
   },

   async updateInvoiceItem(req, res) {
      const invoice_item_id = req.params.invoice_item_id;
      try {
         const result = await InvoiceModel.updateInvoiceItem(invoice_item_id, req.body);
         res.json({ msg: 'Invoice item updated successfully', result });
      } catch (err) {
         res.status(500).json({ msg: 'Error updating invoice item', error: err });
      }
   },

   async deleteInvoiceItem(req, res) {
      const invoice_item_id = req.params.invoice_item_id;
      try {
         const result = await InvoiceModel.deleteInvoiceItem(invoice_item_id);
         res.json({ msg: 'Invoice item deleted successfully', result });
      } catch (err) {
         res.status(500).json({ msg: 'Error deleting invoice item', error: err });
      }
   },

   async getInvoiceConfigDetails(req, res) {
      try {
         res.json({ status:true,  msg: 'Invoice item deleted successfully', data: InvoiceConfigDetails});
      } catch (err) {
         res.status(500).json({status:true, msg: 'Error deleting invoice item', error: err });
      }
   },


};

module.exports = InvoiceController;
