/**
 * async function for decrypting the tokens and id details
 */
const decryptDetails = (data) => {
  if (data) {
    const bytes = CryptoJS.AES.decrypt(data.toString(), CONFIG.secret_key);
    const result = bytes.toString(CryptoJS.enc.Utf8).replace('|', /\\/g);
    // console.log('result', result);
    return result;
  } else {
    return null;
  }
}
module.exports.decryptDetails = decryptDetails;

// const SubscriptionPaymentLog = require('../../../models').subscriptionPaymentLog;
// const LambdaService = require('../microservice/lambda.service');
require('./../../global_functions');
const createSubscriptionLog = async (data, process, status) => {
    console.log({ INFO: 'createSubscriptionLog function is called' });
    const Data = {
        storeId: data.subscriptionData.CustomerId,
        orderId: data.subscriptionData.OrderCode,
        processStatus: process,
        data: data,
        isActive: false,
        createdAt: new Date(),
        modifiedAt: new Date()
    };
    [errLog, transactionLog] = await to(SubscriptionPaymentLog.create(Data));
    if (errLog) {
        console.log(errLog);
        // await ErrorLogService.createErrorLog({
        //     instance: "walletUpdate",
        //     statusCode: "Wallet-transaction-err-002",
        //     message: 'Failed to enter transaction during wallet update- ' + errLog.message
        // }, data.storeId);
        return TE(errLog.message);
    } else {
        console.log({ INFO: 'createSubscriptionLog function is Success' });

        return transactionLog.id;
    }
};
module.exports.createSubscriptionLog = createSubscriptionLog;

const updateSubscriptionLog = async (body, id, process, err, status) => {
    console.log({ INFO: 'updateSubscriptionLog function is called' });
    const data = {
        modifiedAt: new Date(),
        errorMessage: err, isActive: status
    };
    if (process) {
        data['processStatus'] = process
    }
    if (!status) {
        data['data'] = null;
    }
    else {
        const mailData = {
            "templateUniqueId": "AUTO_RENEWAL_PLAN_FAILURE",
            "companyId": body.mailData.companyId,
            "mailContent": {
                "sender": CONFIG.mail_from,
                "recipients": [
                    {
                        "recipient": CONFIG.mail_from,
                        "templateContent": {
                            "companyName": "Zenbasket Phase 2 Application",
                            "message": err,
                            "date": new Date(),
                            "hostName": "Zenbasket Phase 2"
                        }
                    }
                ]
            }
        };
        await LambdaService.callMailMicroService(null, 'sendEmail', 'POST', mailData);
    }
    [errLog, transactionLog] = await to(SubscriptionPaymentLog.update(data, {
        where: {
            id: id
        }
    }));
    if (errLog) {
        // await ErrorLogService.createErrorLog({
        //     instance: "walletUpdate",
        //     statusCode: "Wallet-transaction-err-002",
        //     message: 'Failed to enter transaction during wallet update- ' + errLog.message
        // }, data.storeId);
        return TE(errLog.message);
    } else {
        console.log({ INFO: 'updateSubscriptionLog function is Success' });
        return transactionLog;
    }
};
module.exports.updateSubscriptionLog = updateSubscriptionLog;




