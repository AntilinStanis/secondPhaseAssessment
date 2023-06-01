const LambdaService = require('./lambda.service');
const CommonService = require('../common.service');
const ConsolidatedService = require('../consolidated.service');
const ErrorLogService = require('../auditLog/errorLog.service');
const walletTransactionLog = require('../auditLog/walletTransactionLog.service');
const paymentService = require('../orders/payment/payment.service');
const tranLogService = require('../auditLog/transLog.service');
const StoreService = require('../storeSettings/store.service');
const PluginService = require('../storeSettings/plugin.service');
const SignupDiscountService = require('../discounts/signupDiscount.service');
/**
 * Original Author: Priya S.P
 * Author: Priya S.P
 * Created On: 09-03-2022
 * Modified on: 09-03-2022
 * Function: planPayment
 * Method is used to pay the plan payment
 * @param {*} req defines the request value
 * @returns the payment response
 */
const planPayment = async function (req) {
    console.log({ INFO: 'planPayment function is called' });
    let err, customer, makePayment;
    if (req.body.currency === "INR" || req.body.isWallet) {
        let logData = req.body;
        if (logData.errorMessage) {
            logData.status = CONSTANT.failed;
            await (createSubscriptionTransaction(logData));
            return TE(logData.errorMessage);
        } else {
            logData.status = CONSTANT.success;
            await (createSubscriptionTransaction(logData));
            return { success: true };
        }
    } else {
        // req.body.saveCardInDynamo = req.body.isAutoRenewal || req.body.isSaveCard;
        // if (req && req.body && req.body.isCardEntry && req.body.saveCardInDynamo) {
        if (req.body.isCardEntry) {
            req.body.saveCardInDynamo = req.body.isAutoRenewal || req.body.isSaveCard;
            // req.body.saveCardInDynamo = req.body.isAutoRenewal;
            [err, customer] = await to(createUpdateCard(req.body));
            if (err) {
                return TE(err.message);
            };
            // let paymentData = {
            //     type: 'id',
            //     token: customer && customer.id && CommonService.encryptDetails(customer.id, CONFIG.lambda_jwt_encryption),
            //     amount: req && req.body && req.body.amount,
            //     currency: req && req.body && req.body.currency,
            //     capture: true,
            //     isSubscription: true,
            //     isProduction: (CONFIG.app === 'prod' || CONFIG.app === 'us-prod') ? true : false,
            //     transactionType: req && req.body && req.body.transactionType
            // };
            let paymentData = {
                amount: req.body.amount,
                currency: req.body.currency,
                email: req.body.email,
                customerId: customer && customer.id && CommonService.encryptDetails(customer.id, CONFIG.lambda_jwt_encryption),
                isZenProduction: (CONFIG.app === 'prod' || CONFIG.app === 'us-prod') ? true : false
            };
            [err, makePayment] = await to(subscriptionPayment(paymentData, req.body.storeId));
            if (err) {
                return TE(err.message);
            } else if (makePayment.success) {
                return { success: true };
            };
        } else {
            // let paymentData = {
            //     type: req && req.body && req.body.type,
            //     token: req && req.body && req.body.token && CommonService.encryptDetails(req.body.token, CONFIG.lambda_jwt_encryption),
            //     amount: req && req.body && req.body.amount,
            //     currency: req && req.body && req.body.currency,
            //     capture: true,
            //     isSubscription: true,
            //     isProduction: (CONFIG.app === 'prod' || CONFIG.app === 'us-prod') ? true : false,
            //     transactionType: req && req.body && req.body.transactionType
            // };
            let paymentData = {
                amount: req.body.amount,
                currency: req.body.currency,
                email: req.body.email,
                customerId: req.body.customerId && CommonService.encryptDetails(req.body.customerId, CONFIG.lambda_jwt_encryption),
                isZenProduction: (CONFIG.app === 'prod' || CONFIG.app === 'us-prod') ? true : false
            };
            [err, makePayment] = await to(subscriptionPayment(paymentData, req.body.storeId));
            if (err) {
                return TE(err.message);
            } else if (makePayment.success) {
                return { success: true };
            }
        }
    }
}
module.exports.planPayment = planPayment;

/**
 * Original Author: Priya S.P
 * Author: Priya S.P
 * Created On: 09-03-2022
 * Modified on: 09-03-2022
 * Function: createUpdateCard
 * Method is create or update the card
 * @param {*} body defines the card data 
 * @returns the card creation / updation response
 */

const createUpdateCard = async function (body) {
    console.log({ INFO: 'createUpdateCard function is called' });
    let err, getSavedCard, customer, cardCreation, updateCard, customerInfo, updateUrl;
    [err, getSavedCard] = await to(LambdaService.callSubscriptionMicroservice(null, '/payment/PAYMENT%23' + body.storeUuid, 'GET'));
    if (err || (getSavedCard && getSavedCard.err)) {
        return TE(err ? err.message : getSavedCard.err);
    } else {
        let data = getSavedCard && getSavedCard.result && getSavedCard.result.length ? {
            customerId: getSavedCard.result[0].paymentCustomerId && CommonService.encryptDetails(getSavedCard.result[0].paymentCustomerId, CONFIG.lambda_jwt_encryption),
            source: body.token && CommonService.encryptDetails(body.token, CONFIG.lambda_jwt_encryption),
            isZenProduction: (CONFIG.app === 'prod' || CONFIG.app === 'us-prod') ? true : false
        } : {
            source: body.token && CommonService.encryptDetails(body.token, CONFIG.lambda_jwt_encryption),
            email: body.email,
            name: body.name,
            isZenProduction: (CONFIG.app === 'prod' || CONFIG.app === 'us-prod') ? true : false
        };
        updateUrl = (getSavedCard && getSavedCard.result && getSavedCard.result.length) ? 'update-customer' : 'create-customer';
        [err, customer] = await to(LambdaService.callPaymentMicroService(CONFIG.stripe_payment_microservice.url + updateUrl, 'POST', data));
        if (err) {
            return TE(err.message);
        }
        else if (customer && customer.success) {
            customer = customer.response;
        } else {
            return TE(customer.error ? customer.error : customer.message);
        }
    }
    //  else {
    //     let data = {
    //         type: 'token',
    //         token: body && body.token && CommonService.encryptDetails(body.token, CONFIG.lambda_jwt_encryption),
    //         name: body && body.name,
    //         email: body && body.email,
    //         storeName: body && body.storeName,
    //         isDefault: true,
    //         isSubscription: true,
    //         isProduction: (CONFIG.app === 'prod' || CONFIG.app === 'us-prod') ? true : false
    //     };
    //     [err, customer] = await to(LambdaService.callPaymentMicroService(CONFIG.checkoutDotCom_payment_microservice.url + 'card', 'POST', data));
    //     if (err) {
    //         return TE(err.message);
    //     }
    //     else if (customer && customer.success) {
    //         customer = customer && customer.response;
    //     } else {
    //         return TE(customer.error ? customer.error : customer.message);
    //     }
    // }
    if (body.saveCardInDynamo) {
        if (!(getSavedCard && getSavedCard.result && getSavedCard.result.length)) {
            [err, cardCreation] = await to(LambdaService.callSubscriptionMicroservice(null, '/payment/' + body.storeUuid, 'POST', { paymentCustomerId: customer && customer.id }));
            if (err || (cardCreation && cardCreation.err)) {
                return TE(err ? err.message : cardCreation.err);
            }
        }
        if (body.subscriptionId) {
            [err, customerInfo] = await to(LambdaService.callSubscriptionMicroservice(null, '/subscriptionMember/' + body.subscriptionId, 'PUT', { IsAutoRenewal: true }));
            if (err) {
                return TE(err.message);
            }
        }
    }
    return customer;
}
module.exports.createUpdateCard = createUpdateCard;
/**
 * Original Author: Priya S.P
 * Author: Priya S.P
 * Created On: 09-03-2022
 * Modified on: 09-03-2022
 * Function: subscriptionPayment
 * Method is used to call the microservice payment
 * @param {*} paymentData defines the payment data
 * @param {*} storeId defines the store id
 * @returns the payment response
 */
const subscriptionPayment = async function (paymentData, storeId) {
    let err, payment;
    let data = { storeId, amount: paymentData.amount, transactionType: paymentData.transactionType };
    [err, payment] = await to(LambdaService.callPaymentMicroService(CONFIG.stripe_payment_microservice.url + 'make-payment', 'POST', paymentData));
    // [err, payment] = await to(LambdaService.callPaymentMicroService(CONFIG.checkoutDotCom_payment_microservice.url + 'payment', 'POST', paymentData));
    if (payment && payment.success) {
        data.status = CONSTANT.success;
        await (createSubscriptionTransaction(data));
        return payment;
    } else {
        data.status = CONSTANT.failed;
        data.errorMessage = err ? err.message : payment && payment.error ? payment.error : payment.message;
        await (createSubscriptionTransaction(data));
        return TE(err ? err.message : payment && payment.error ? payment.error : payment.message);
    }
}
module.exports.subscriptionPayment = subscriptionPayment;

/**
 * Original Author: Priya S.P
 * Author: Priya S.P
 * Created On: 09-03-2022
 * Modified on: 09-03-2022
 * Function: createSubscriptionTransaction
 * Method is used to enter the transaction log
 * @param {*} data defines the data for transaction log
 * @returns the log response
 */
const createSubscriptionTransaction = async function (data) {
    console.log({ INFO: 'createSubscriptionTransaction function is called' });
    let errLog, transaction;
    [errLog, transaction] = await to(ConsolidatedService.callOtherSchema(paymentService, 'createTranstionLog', {
        storeId: data.storeId,
        amount: data.amount,
        status: data.status,
        transactionPhase: CONSTANT.PAID,
        reasonForFailure: data.errorMessage,
        isClientSubscriptionPlan: true,
        type: data.transactionType
    }));
    if (errLog) {
        await ConsolidatedService.callOtherSchema(ErrorLogService, 'createErrorLog', {
            errorObject: {
                instance: "planPayment",
                statusCode: "Plan-payment-transaction-err-002",
                message: 'Failed to enter transaction during payment- ' + errLog.message
            }, storeId: data.storeId
        }, true);
    }
}
module.exports.createSubscriptionTransaction = createSubscriptionTransaction;

/**
 * Original Author: Priya S.P
 * Author: Priya S.P
 * Created On: 09-03-2022
 * Modified on: 09-03-2022
 * Function: walletUpdateAndTransactionEntry
 * Method is used to enter the wallet transaction log
 * @param {*} data defines the data for wallet transaction log
 * @returns the log response
 */
const walletUpdateAndTransactionEntry = async function (data) {
    console.log({ INFO: 'walletUpdateAndTransactionEntry function is called' });
    let walletErr, walletResponse, errLog, walletTransaction;
    [walletErr, walletResponse] = await to(LambdaService.callSubscriptionMicroservice(null, '/wallet/WALLET%23' + data.storeUuid, 'PUT', { WalletAmount: (data.walletBalance).toString() }));
    if (walletErr) {
        [errLog, walletTransaction] = await to(ConsolidatedService.callOtherSchema(walletTransactionLog, 'walletTranscationCreate', {
            description: data.walletDescription,
            transactionType: data.walletTransactionType,
            storeId: data.storeId,
            amount: data.changedWalletAmount,
            status: CONSTANT.failed,
            failureReason: walletErr.message
        }));
        return TE(walletErr.message);
    } else if (walletResponse) {
        [errLog, walletTransaction] = await to(ConsolidatedService.callOtherSchema(walletTransaction, 'walletTranscationCreate', {
            description: data.walletDescription,
            transactionType: data.walletTransactionType,
            storeId: data.storeId,
            amount: data.changedWalletAmount,
            status: CONSTANT.success
        }));
        return { success: true };
    }
}
module.exports.walletUpdateAndTransactionEntry = walletUpdateAndTransactionEntry;

/**
 * Original Author: LAKSHMANAN S
 * Author: Vigneshwaran R
 * Created On: 09-03-2022
 * Modified on: 09-03-2022
 * Function:
 * Method is used to get plan details of particular store
 * @param {*} clientId hold the store uuid
 * @param {*} featureCode have the features name of the particular plan
 * @param {*} planId holds the selected planId of particular store
 * @returns true/false
 */
const getPlanDetails = async (clientId, featureCode, planId = null) => {
    let clientInfoErr, clientInfo, planInfoErr, planInfo, planDetails;
    if (!planId) {
        [clientInfoErr, clientInfo] = await to(LambdaService.callSubscriptionMicroservice(null, '/currentplan/' + clientId, 'GET'));
        if (clientInfoErr)
            return TE(clientInfoErr.message);
    }
    if ((clientInfo && clientInfo.result && clientInfo.result[0] && clientInfo.result[0].SubscriptionPlans && clientInfo.result[0].SubscriptionPlans.PlanId) || planId) {
        planId = planId ? planId : clientInfo.result[0].SubscriptionPlans.PlanId;
        [planInfoErr, planInfo] = await to(LambdaService.callSubscriptionMicroservice(null, '/planFeature/' + planId, 'GET'));
        if (planInfo && planInfo.result && planInfo.result.length && featureCode) {
            planDetails = planInfo.result.find(item => item && item.FeatureCode === featureCode);
        }
        if (planInfoErr)
            return TE(planInfoErr.message);
    }
    return planDetails;
}
module.exports.getPlanDetails = getPlanDetails;

/**
 * Original Author: Vigneshwaran R
 * Author: Vigneshwaran R
 * Created On: 28-12-2022
 * Modified on: 28-12-2022
 * Function:
 * Method is used to generate a subscription for a store 
 * @param {*} body hold the data for subscription
 * @param {*} status have the status of the subscription
 * @returns true/false
 */
const generateSubscription = async (body, status, logId) => {
    console.log({ INFO: "generateSubscription Service Called" });
    let transerr, tranLog;
    [err, paymentStatus] = await to(createPayment(body && body.paymentData, !status.payment));
    if (err) {
        console.log({ INFO: 'failed to create a payment' }, err);
        [transerr, tranLog] = await to(tranLogService.updateSubscriptionLog(body, logId, status, err.message, false));
        return TE(JSON.stringify({ details: err.message, payment: false }));
    }
    status.payment = true;
    [walleterr, walletpaymentStatus] = await to(createWalletPayment(body, !status.walletUpdate));
    if (walleterr) {
        console.log({ INFO: 'failed to create a WalletPayment' }, walleterr.message);
        [transerr, tranLog] = await to(tranLogService.updateSubscriptionLog(body, logId, status, walleterr.message, true));
        return TE(JSON.stringify({ details: walleterr.message, payment: true }));
    }
    status.walletUpdate = true;
    [invoiceError, invoiceUrl] = await to(createInvoice(body, !status.subscriptionCreation));
    if (invoiceUrl && invoiceUrl.fileName) {
        body.subscriptionData['InvoiceUrl'] = invoiceUrl.fileName;
    }
    status.invoiceCreation = true;
    [subscriptionError, subscriptionSuccess] = await to(createSubscription(body.subscriptionData, !status.subscriptionCreation));
    if (subscriptionError) {
        console.log({ INFO: 'failed to create a subscription' }, subscriptionError);
        [transerr, tranLog] = await to(tranLogService.updateSubscriptionLog(body, logId, status, subscriptionError.message, true));
        return TE(JSON.stringify({ details: subscriptionError.message, payment: true }));
    }
    status.subscriptionCreation = true;
    [oldSubscriptionError, oldSubscription] = await to(updateoldSubscription(body.oldData, !status.oldSubscription));
    if (oldSubscriptionError) {
        console.log({ INFO: 'failed to update old Subscription' }, oldSubscriptionError.message);
        [transerr, tranLog] = await to(tranLogService.updateSubscriptionLog(body, logId, status, oldSubscriptionError.message, true));
        return TE(JSON.stringify({ details: oldSubscriptionError.message, payment: true }));
    }
    status.oldSubscription = true;
    [configErr, config] = await to(updateStoreConfig(body, !status.storeConfig));
    if (configErr) {
        console.log({ INFO: 'failed to create a subscription' }, configErr.message);
        [transerr, tranLog] = await to(tranLogService.updateSubscriptionLog(body, logId, status, configErr.message, true));
        return TE(JSON.stringify({ details: configErr.message, payment: true }));
    }
    status.storeConfig = true;

    //Subscription discount entry
    let [disountError, discountSuccess] = await to(createSubscriptionDiscountMapping(body && body.discount, !status.subscriptionDiscount));
    if (disountError) {
        console.log({ ERROR: 'While creating subscription plan disocunt details entry.' }, disountError.message);
        [transerr, tranLog] = await to(tranLogService.updateSubscriptionLog(body, logId, status, disountError.message, true));
        return TE(JSON.stringify({ details: disountError.message, payment: true }));
    }
    status.subscriptionDiscount = true;


    [walletError, walletSuccess] = await to(createWallet(body, !status.walletCreation));
    if (walletError) {
        console.log({ INFO: 'failed to create a wallet' }, walletError.message);
        [transerr, tranLog] = await to(tranLogService.updateSubscriptionLog(body, logId, status, walletError.message, true));
        return TE(JSON.stringify({ details: walletError.message, payment: true }));
    }
    status.walletCreation = true;
    [pluginError, plugin] = await to(updatePluginData(body, !status.pluginConfig));
    if (pluginError) {
        console.log({ INFO: 'failed to update Plugin Data' }, pluginError);
        [transerr, tranLog] = await to(tranLogService.updateSubscriptionLog(body, logId, status, pluginError.message, true));
        return TE(JSON.stringify({ details: pluginError.message, payment: true }));
    }
    status.pluginConfig = true;
    [transerr, tranLog] = await to(tranLogService.updateSubscriptionLog(body, logId, status, null, false));
    if (transerr) {
        console.log(transerr);
        return TE(JSON.stringify({ details: transerr.message, payment: true }));
    }
    return true;
}
module.exports.generateSubscription = generateSubscription;

const updatePluginData = async (data, allow) => {
    console.log({ INFO: 'updatePluginData function is called' });
    if (data && allow) {
        let code = [];
        [err, feature] = await to(LambdaService.callSubscriptionMicroservice(null, '/planFeature/' + data.PlanId, 'GET'));
        if (err) {
            console.log('error while fetching ', err);
            return TE(err.message);
        } else {
            feature.result.forEach((item) => {
                if (item.FeatureEnabled) {
                    code.push(item.FeatureCode);
                }
            });
        }
        [pluginErr, pluginList] = await to(ConsolidatedService.callOtherSchema(PluginService, 'updatePluginBasedonPlan', { storeId: data.subscriptionData.CustomerId, code: code }, true));
        if (pluginErr) {
            console.log({ ERROR: 'Failed to update plan  ' + pluginErr.message });
            return TE(pluginErr.message);
            // return ReE(res, Object.assign(message.UPDATE_PLAN_FAILED, { details: walletError.message }), 422);
        }
    } else {
        console.log({ INFO: 'updatePluginData function is Success' });
        return true;
    }
}
module.exports.updatePluginData = updatePluginData;

const createWallet = async (data, allow) => {
    console.log({ INFO: 'createWallet function is called' });
    if (data && data.newUser && allow) {
        [walletError, walletSuccess] = await to(LambdaService.callSubscriptionMicroservice(null, '/wallet/' + (data.subscriptionData.CustomerId), 'POST', { WalletAmount: "0" }));
        if (walletError) {
            console.log({ ERROR: 'Failed to update plan  ' + walletError.message });
            return TE(walletError.message);
        }

    } else {
        console.log({ INFO: 'createWallet function is Success' });
        return true;
    }
}
module.exports.createWallet = createWallet;

const updateStoreConfig = async (data, allow) => {
    console.log({ INFO: 'updateStoreConfig function is called' });
    if (data && allow) {
        [err, storeInfo] = await to(ConsolidatedService.callOtherSchema(StoreService, 'updateStoreData', { data: data.storeData, whereCondition: { storeId: data.subscriptionData.CustomerId } }));
        if (err) {
            console.log({ ERROR: 'Failed to update plan  ' + err.message });
            return TE(err.message);
        }
        console.log({ INFO: 'updateStoreConfig function is Success' });
        return storeInfo;
    } else {
        console.log({ INFO: 'updateStoreConfig function is Success' });
        return true;
    }
}
module.exports.updateStoreConfig = updateStoreConfig
/**
 * Original Author: Chermaselvi T
 * Author:Chermaselvi T
 * Created On: 16-02-2023
 * Modified on: 16-02-2023
 * Function: createSubscriptionDiscountMapping
 * Method which is used to create subscrption plan discount details
 * @param {*} data which holds the data to store.
 * @returns created createSubscriptionDiscountMapping details
*/
const createSubscriptionDiscountMapping = async (data, allow) => {
    console.log({ INFO: 'createSubscriptionDiscountMapping function is called' });
    if (data && allow) {
        let [err, success] = await to(ConsolidatedService.callOtherSchema(SignupDiscountService, 'createSubscriptionPlanDiscountMapping', data));
        if (err) {
            console.log({ ERROR: 'Failed to create discount mapping entry  ' + err.message });
            return TE(err.message);
        }
        console.log({ INFO: 'createSubscriptionDiscountMapping function is Success' });
        return success;
    } else {
        console.log({ INFO: 'createSubscriptionDiscountMapping function is Success' });
        return true;
    }
}
module.exports.createSubscriptionDiscountMapping = createSubscriptionDiscountMapping

const updateoldSubscription = async (data, allow) => {
    console.log({ INFO: 'updateoldSubscription function is called' });
    if (data && allow) {
        [err, customerInfo] = await to(LambdaService.callSubscriptionMicroservice(null, '/subscriptionMember/' + data.SK, 'PUT', data.update));
        if (err) {
            console.log({ ERROR: 'Failed to update plan  ' + err.message });
            return TE(err.message);
        }
    }
    else {
        console.log({ INFO: 'updateoldSubscription function is Success' });
        return true;
    }
}
module.exports.updateoldSubscription = updateoldSubscription;

const createPayment = async (data, allow) => {
    console.log({ INFO: 'createPayment function is called' });
    if (data && data.amount && allow) {
        let paymentError, paymentResponse;
        data['transactionType'] = "SUBSCRIPTION PLAN";
        [paymentError, paymentResponse] = await to(planPayment({ body: data }));
        if (paymentError) {
            console.log({ ERROR: 'Failed to make payment - ' + paymentError.message });
            return TE(paymentError.message);
        }
    } else {
        return true;
    }

};
module.exports.createPayment = createPayment;

const createWalletPayment = async (data, allow) => {
    console.log({ INFO: 'createWalletPayment function is called' });
    if (data && data.paymentData && data.paymentData && data.paymentData.changedWalletAmount && allow) {
        let walletErr, walletResponse;
        [walletErr, walletResponse] = await to(walletUpdateAndTransactionEntry(data.paymentData));
        if (walletErr) {
            console.log({ ERROR: 'Failed to update wallet - ' + walletErr.message });
            return TE(walletErr.message);
        }
        try {
            const mailData = {
                "templateUniqueId": data.walletUsed.templateUniqueId,
                "companyId": data.walletUsed.companyId,
                "mailContent": {
                    "sender": CONFIG.mail_from,
                    "recipients": [
                        {
                            "recipient": data.walletUsed.recipient,
                            "templateContent": data.walletUsed.templateContent
                        }
                    ]
                }
            };
            await LambdaService.callMailMicroService(null, 'sendEmail', 'POST', mailData);
        }
        catch (err) {
            console.log('Error in mail service - ', err);
        }
        console.log({ INFO: 'createWalletPayment function is Success' });
        return true;

    } else {
        console.log({ INFO: 'createWalletPayment function is Success' });
        return true;
    }
}
module.exports.createWalletPayment = createWalletPayment;

const createInvoice = async (data, allow) => {
    console.log({ INFO: 'createWalletPayment function is called' });
    if (allow) {
        [invoiceError, invoiceUrl] = await to(LambdaService.callInvoiceMicroService({}, 'generateInvoice', 'POST', data.invoiceData))
        if (invoiceError) {
            console.log({ ERROR: 'Failed to generate invoice - ' + invoiceError.message });
            invoiceUrl = null
            // return Res(res, Object.assign(message.INVOICE_PDF_CREATION_FAILED, { details: invoiceError.message }, 422));
        }
        if (invoiceUrl && invoiceUrl.fileName) {
            data.subscriptionData['InvoiceUrl'] = invoiceUrl.fileName;
            try {
                const data1 = {
                    "templateUniqueId": data.mailData.templateUniqueId,
                    "companyId": data.mailData.companyId,
                    "mailContent": {
                        "sender": CONFIG.mail_from,
                        "recipients": [
                            {
                                "recipient": data.mailData.recipient,
                                "attachments": [
                                    {
                                        "filename": "invoice.pdf",
                                        "path": invoiceUrl.url,
                                        "contentType": "application/pdf"
                                    }
                                ],
                                "templateContent": data.mailData.templateContent
                            }
                        ]
                    }
                };
                await LambdaService.callMailMicroService(null, 'sendEmail', 'POST', data1);
            }
            catch (err) {
                console.log({ ERROR: 'Error in mail service - ' + err.message });
            }
            return invoiceUrl;
        } else {
            console.log({ INFO: 'createInvoice function is Success' });
            return true;
        }
    } else {
        console.log({ INFO: 'createInvoice function is Success' });
        return true;
    }

}
module.exports.createInvoice = createInvoice;

const createSubscription = async (data, allow) => {
    console.log({ INFO: 'createSubscription function is called' });
    if (data && allow) {
        [subscriptionError, subscriptionSuccess] = await to(LambdaService.callSubscriptionMicroservice(null, '/subscriptionMember', 'POST', data));
        if (subscriptionError) {
            console.log({ ERROR: 'Failed to update plan  ' + subscriptionError.message });
            return TE(subscriptionError.message);
        }
    } else {
        console.log({ INFO: 'createSubscription function is Success' });
        return true;
    }
}
module.exports.createSubscription = createSubscription;

/**
 * Original Author: sneka G
 * Author:  sneka G
 * Created On: 02-01-2023
 * Modified on: 02-01-2023
 * Function:
 * Method is used to get Feature Limit of plan
 * @param {*} headers holds the headers
 * @param {*} planId holds the selected planId of particular store
 * @returns featureLimit
 */
const getFeatureLimit = async (planId, headers) => {
    let err, limits;
    if (planId) {
        [err, limits] = await to(LambdaService.callSubscriptionMicroservice(headers, '/planFeature/' + planId, 'GET'));
        if (err) {
            console.log('while fetching get all limits ', err);
            return TE(err.message);
        }
        return limits.result;
    }
}
module.exports.getFeatureLimit = getFeatureLimit;


