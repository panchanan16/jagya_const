const VendorModels = require('@/models/coreEntityModels/vendorModel');

class VendorCoreController {
   // Get Last +1 Controller clients
   static async getVendorLastRef(req, res) {
      try {
         const [data] = await VendorModels.getLastClientRef();
         let lastNum = parseInt(data['client_ref_no'].slice(-4));
         let newRef = data['client_ref_no'].replace(lastNum, lastNum + 1);
         return res.status(200).send({
            status: true,
            msg: 'Clients Ref retrieved successfully',
            data: { lastRefNo: data['client_ref_no'], newRefNo: newRef },
         });
      } catch (error) {
         console.error('Error fetching clients:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }

   static async getVendor_Purch_Payment(req, res) {
      const { vendor_id } = req.query;
      if (!vendor_id) {
         return res.status(400).send({
            status: false,
            msg: 'Missing required field: vendor_id',
            data: null,
         });
      }
      try {
         const financeData = await VendorModels.getVendor_Purcheses_Payments(vendor_id);

         return res.status(200).send({
            status: true,
            msg: 'Vendor` Purcheses_Payments retrieved successfully.',
            data: { total_amount:financeData[2][0]
                  ,  payments: financeData[0], purcheses: financeData[1] 
                  },
         });
      } catch (error) {
         console.error('Error fetching Vendor Purcheses_Payments:', error);
         return res.status(500).send({
            status: false,
            msg: 'Internal Server Error retrieving Vendor Purcheses_Payments.',
            data: null,
         });
      }
   }
}

module.exports = VendorCoreController;
