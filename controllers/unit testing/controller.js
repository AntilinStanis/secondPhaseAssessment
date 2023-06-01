const tranLogService=require('./../../services/testingSchema/common service');
const CommonService=require('./../../services/testingSchema/common service');
const SubcriptionService=require('./../../services/testingSchema/subscription service')

/**
 * Original Author : Vigneshwaran R
 * Author	       : Vigneshwaran R
 * Created On	   : 25-06-2022
 * Modified on     : 25-06-2022
 * Function        : generateSubscriptionDetails
 * generateSubscriptionDetails function is used  fetch Subscription Details Of User 
 * Returns the customerInfo if the function is success.
 * Returns error if function   is failed.
 * @param {*} req
 * @param {*} res
 */
const generateSubscriptionDetails = async function (req, res) {

  console.log({ INFO: 'generateSubscriptionDetails function is called' });
  req.body = JSON.parse(CommonService.decryptDetails(req.body.data));
  const processData = {
    payment: false,
    walletUpdate: false,
    subscriptionCreation: false,
    oldSubscription: false,
    storeConfig: false,
    walletCreation: false,
    pluginConfig: false,
    invoiceCreation: false,
    subscriptionDiscount: false
  };
  [err, createTransaction] = await to(tranLogService.createSubscriptionLog(req.body, processData, true));
  if (err) {
    console.log({ INFO: 'failed to create a transaction' }, err);
    return ReE(res, { details: "failed to create a transaction" }, 422);
  }
  [err, generate] = await to(SubcriptionService.generateSubscription(req.body, processData, createTransaction));
  if (err) {
    console.log({ INFO: 'failed to create a transaction' }, JSON.parse(err.message));
    return ReE(res, Object.assign(message.UPDATE_PLAN_FAILED, JSON.parse(err.message)), 422);
  }
  console.log({ INFO: 'generateSubscriptionDetails function is Success' });
  return ReS(res, Object.assign(message.UPDATE_PLAN_SUCCESS), 200);
}
module.exports.generateSubscriptionDetails=generateSubscriptionDetails;