const AnalyticsCoreModel = require('@/models/coreEntityModels/analyticsModel');

class AnalyticsCoreController {
   static async getDashboardSummary(req, res) {
      try {
         const [
            totalProjects,
            totalRevenue,
            totalExpenses,
            totalUsers,
            totalClients,
            totalVendors,
            totalContractors,
            totalLabours,
            totalBranches,
         ] = await Promise.all([
            AnalyticsCoreModel.getTotalProjects(),
            AnalyticsCoreModel.getTotalRevenue(),
            AnalyticsCoreModel.getTotalExpenses(),
            AnalyticsCoreModel.getTotalUsers(),
            AnalyticsCoreModel.getTotalClients(),
            AnalyticsCoreModel.getTotalVendors(),
            AnalyticsCoreModel.getTotalContractors(),
            AnalyticsCoreModel.getTotalLabours(),
            AnalyticsCoreModel.getTotalBranches(),
         ]);

         res.status(200).send({
            status: true,
            msg: 'Dashboard summary retrieved successfully',
            data: {
               totalProjects,
               totalRevenue,
               totalExpenses,
               totalUsers,
               totalClients,
               totalVendors,
               totalContractors,
               totalLabours,
               totalBranches,
            },
         });
      } catch (error) {
         console.error('Error fetching dashboard summary:', error);
         res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }

   static async getProjectsOverview(req, res) {
      try {
         const projectsByStatus = await AnalyticsCoreModel.getProjectsByStatus();
         const projectsByType = await AnalyticsCoreModel.getProjectsByType();
         const projectsTimeline = await AnalyticsCoreModel.getProjectsTimeline();

         res.status(200).send({
            status: true,
            msg: 'Projects overview retrieved successfully',
            data: {
               byStatus: projectsByStatus,
               byType: projectsByType,
               timeline: projectsTimeline,
            },
         });
      } catch (error) {
         console.error('Error fetching projects overview:', error);
         res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }

   static async getFinancialOverview(req, res) {
      try {
         const revenueByMonth = await AnalyticsCoreModel.getRevenueByMonth();
         const expensesByMonth = await AnalyticsCoreModel.getExpensesByMonth();
         const expenseCategories = await AnalyticsCoreModel.getExpenseCategories();

         res.status(200).send({
            status: true,
            msg: 'Financial overview retrieved successfully',
            data: {
               revenueByMonth,
               expensesByMonth,
               expenseCategories,
            },
         });
      } catch (error) {
         console.error('Error fetching financial overview:', error);
         res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }

   static async getRecentActivities(req, res) {
      try {
         const recentProjects = await AnalyticsCoreModel.getRecentProjects();
         const recentClients = await AnalyticsCoreModel.getRecentClients();
         const recentExpenses = await AnalyticsCoreModel.getRecentExpenses();
         const recentCollections = await AnalyticsCoreModel.getRecentCollections();

         res.status(200).send({
            status: true,
            msg: 'Recent activities retrieved successfully',
            data: {
               recentProjects,
               recentClients,
               recentExpenses,
               recentCollections,
            },
         });
      } catch (error) {
         console.error('Error fetching recent activities:', error);
         res.status(500).send({
            status: false,
            msg: 'Internal Server Error',
            data: null,
         });
      }
   }
}

module.exports = AnalyticsCoreController;
