const ClientsModel = require('@/models/coreEntityModels/clientModel');
const expenseModel = require('@/models/entityModels/expenseModel');
const expenseCoreModel = require('@/models/coreEntityModels/expenseModel');
const vendorPaymentModel = require('@/models/entityModels/vendorPaymentModel');
const contractorPaymentModel = require('@/models/entityModels/contractorPaymentModel');

class ExpenseCoreController {
   static async findWithAllDate(req, res) {
      try {
         const expenses = await expenseCoreModel.findAllWithAll_Date();
         return res.status(200).send({ status: true, msg: 'Expenses retrieved successfully', data: expenses });
      } catch (error) {
         console.error('Error fetching expenses:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
   static async add_Expense_and_dist(req, res) {
      const { exp_date, exp_name, exp_remark, exp_amount, contractor, vendor } = req.body;
      const exp_mode = req.body.exp_mode ? req.body.exp_mode : 'UPI';
      if (!exp_amount || !exp_date) {
         return res.status(400).json({
            status: false,
            msg: 'Amount and Date of Expense are required',
            data: null,
         });
      }

      try {
         const newExpense = await expenseModel.create(exp_name, exp_amount, exp_mode, exp_remark, exp_date, 'Project');
         const expenseId = newExpense.exp_id;
         let contractorPayments = [];
         let vendorPayments = [];
         if (Array.isArray(contractor) && contractor.length > 0) {
            contractorPayments = await ExpenseCoreController._processContractorExpenses(
               expenseId,
               exp_mode,
               contractor
            );
         }
         if (Array.isArray(vendor) && vendor.length > 0) {
            vendorPayments = await ExpenseCoreController._processVendorExpenses(expenseId, exp_mode, vendor);
         }
         const fullResponse = {
            exp_id: expenseId,
            exp_name: newExpense.exp_name,
            exp_amount: newExpense.exp_amount,
            exp_mode: newExpense.exp_mode,
            exp_remark: newExpense.exp_remark,
            exp_date: newExpense.exp_date,
            contractor: contractorPayments,
            vendor: vendorPayments,
         };

         return res.status(201).json({
            status: true,
            msg: 'Expense & payments created successfully',
            data: fullResponse,
         });
      } catch (error) {
         console.error('Error in add_Expense_and_dist:', error);
         return res.status(500).json({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }
   static async _processContractorExpenses(expenseId, exp_mode, contractorExpenses) {
      const promises = contractorExpenses.map((exp) =>
         contractorPaymentModel.create(
            exp.pay_con_id,
            exp.pay_project_id,
            exp.pay_amount,
            exp.pay_note,
            expenseId,
            exp_mode
         )
      );
      return Promise.all(promises);
   }

   static async _processVendorExpenses(expenseId, exp_mode, vendorExpenses) {
      const promises = vendorExpenses.map((exp) =>
         vendorPaymentModel.create(
            exp.pay_vendor_id,
            exp.pay_project_id,
            exp.pay_amount,
            exp.pay_note,
            expenseId,
            exp_mode
         )
      );
      return Promise.all(promises);
   }

   static async getExpenseDetails(req, res) {
      const { exp_id } = req.params;
      if (!exp_id) {
         return res.status(400).send({
            status: false,
            msg: 'All (exp_id) Fields are required',
            data: null,
         });
      }
      try {
         const getExpensedetails = await expenseCoreModel.getExpenseDetails(exp_id);
         return res.status(201).send({
            status: true,
            msg: 'Expense details retrievd successfully',
            data: { contractor: getExpensedetails[0], vendor: getExpensedetails[1] },
         });
      } catch (error) {
         console.error('Error fetching clients:', error);
         return res.status(500).send({ status: false, msg: 'Internal Server Error', data: null });
      }
   }
   static async updateExpense(req, res) {
      const { exp_id, exp_date, exp_name, exp_remark, exp_amount, contractor, vendor } = req.body;
      const exp_mode = req.body.exp_mode ? req.body.exp_mode : 'Cash';
      try {
         const UpdateData = await expenseCoreModel.updateExpenseWithTransaction(
            exp_id,
            {
               exp_name: exp_name,
               exp_amount: exp_amount,
               exp_remark: exp_remark,
               exp_date: exp_date,
               exp_mode: exp_mode,
            },
            contractor,
            vendor
         );
         if (UpdateData.affectedRow) {
            return res.status(200).json({
               status: true,
               msg: 'Expense updated successfully!',
               data: {
                  exp_id: exp_id,
                  exp_name: exp_name,
                  exp_amount: exp_amount,
                  exp_mode: exp_mode,
                  exp_remark: exp_remark,
                  exp_date: exp_date,
                  contractor: contractor,
                  vendor: vendor,
               },
            });
         }
      } catch (err) {
         console.error(err);
         return res.status(500).json({ status: false, msg: 'Failed to update expense', error: err.message });
      }
   }
}

module.exports = ExpenseCoreController;
