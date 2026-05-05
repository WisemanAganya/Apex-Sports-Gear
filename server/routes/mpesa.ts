import express from 'express';
import axios from 'axios';
import crypto from 'crypto';
import { db } from '../server.js';

const router = express.Router();

// M-Pesa Configuration
const MPESA_CONFIG = {
  consumerKey: process.env.MPESA_CONSUMER_KEY || '',
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
  shortcode: process.env.MPESA_SHORTCODE || '',
  passkey: process.env.MPESA_PASSKEY || '',
  baseUrl: process.env.MPESA_ENV === 'production'
    ? 'https://api.safaricom.co.ke'
    : 'https://sandbox.safaricom.co.ke',
};

// Get M-Pesa access token
const getAccessToken = async (): Promise<string> => {
  const auth = Buffer.from(`${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`).toString('base64');

  try {
    const response = await axios.get(`${MPESA_CONFIG.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to get M-Pesa access token');
  }
};

// STK Push (Lipa na M-Pesa Online)
router.post('/stkpush', async (req, res) => {
  try {
    const { phoneNumber, amount, orderId } = req.body;

    // Format phone number (remove + and ensure it starts with 254)
    const formattedPhone = phoneNumber.replace(/^\+/, '').replace(/^0/, '254');

    // Generate timestamp
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);

    // Generate password
    const password = Buffer.from(
      `${MPESA_CONFIG.shortcode}${MPESA_CONFIG.passkey}${timestamp}`
    ).toString('base64');

    const accessToken = await getAccessToken();

    const stkPushData = {
      BusinessShortCode: MPESA_CONFIG.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: MPESA_CONFIG.shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: `${process.env.BASE_URL}/api/mpesa/callback`,
      AccountReference: `Order-${orderId}`,
      TransactionDesc: 'Payment for Apex Sports Order',
    };

    const response = await axios.post(
      `${MPESA_CONFIG.baseUrl}/mpesa/stkpush/v1/processrequest`,
      stkPushData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Store transaction in database
    await db.collection('mpesa_transactions').doc(response.data.CheckoutRequestID).set({
      orderId,
      checkoutRequestId: response.data.CheckoutRequestID,
      phoneNumber: formattedPhone,
      amount,
      status: 'pending',
      createdAt: new Date(),
    });

    res.json({
      success: true,
      checkoutRequestId: response.data.CheckoutRequestID,
      responseCode: response.data.ResponseCode,
      message: 'STK Push sent successfully',
    });

  } catch (error: any) {
    console.error('STK Push error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to initiate payment',
      details: error.response?.data || error.message,
    });
  }
});

// PayBill (Customer initiates payment)
router.post('/paybill', async (req, res) => {
  try {
    const { amount, orderId, accountNumber } = req.body;

    const accessToken = await getAccessToken();

    // For PayBill, we typically use C2B (Customer to Business) API
    // This would be set up with Safaricom to receive payments
    // For now, we'll simulate the process

    const transactionId = `PB${Date.now()}`;

    await db.collection('mpesa_transactions').doc(transactionId).set({
      orderId,
      transactionId,
      amount,
      accountNumber,
      type: 'paybill',
      status: 'pending',
      createdAt: new Date(),
    });

    res.json({
      success: true,
      transactionId,
      message: 'PayBill payment initiated. Customer should pay using their phone.',
      instructions: `Pay KES ${amount} to ${MPESA_CONFIG.shortcode} Account: ${accountNumber}`,
    });

  } catch (error: any) {
    console.error('PayBill error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initiate PayBill payment',
    });
  }
});

// Pochi la Biashara (Buy Goods)
router.post('/buygoods', async (req, res) => {
  try {
    const { amount, orderId, tillNumber } = req.body;

    const accessToken = await getAccessToken();

    // For Buy Goods, we use the till number provided
    const transactionId = `BG${Date.now()}`;

    await db.collection('mpesa_transactions').doc(transactionId).set({
      orderId,
      transactionId,
      amount,
      tillNumber,
      type: 'buygoods',
      status: 'pending',
      createdAt: new Date(),
    });

    res.json({
      success: true,
      transactionId,
      message: 'Buy Goods payment initiated.',
      instructions: `Pay KES ${amount} to Till: ${tillNumber}`,
    });

  } catch (error: any) {
    console.error('Buy Goods error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to initiate Buy Goods payment',
    });
  }
});

// M-Pesa Callback
router.post('/callback', async (req, res) => {
  try {
    const callbackData = req.body;

    console.log('M-Pesa Callback:', JSON.stringify(callbackData, null, 2));

    if (callbackData.Body?.stkCallback) {
      const { CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = callbackData.Body.stkCallback;

      let status = 'failed';
      let transactionId = null;
      let amount = null;

      if (ResultCode === 0 && CallbackMetadata) {
        status = 'success';
        // Extract transaction details from metadata
        const amountItem = CallbackMetadata.Item.find((item: any) => item.Name === 'Amount');
        const receiptItem = CallbackMetadata.Item.find((item: any) => item.Name === 'MpesaReceiptNumber');

        amount = amountItem?.Value;
        transactionId = receiptItem?.Value;
      }

      // Update transaction in database
      await db.collection('mpesa_transactions').doc(CheckoutRequestID).update({
        status,
        transactionId,
        amount,
        resultCode: ResultCode,
        resultDesc: ResultDesc,
        callbackData,
        updatedAt: new Date(),
      });

      // If payment successful, update order status
      if (status === 'success') {
        // Find order by checkoutRequestId and update status
        const transactionsRef = db.collection('mpesa_transactions');
        const transactionDoc = await transactionsRef.doc(CheckoutRequestID).get();
        const transactionData = transactionDoc.data();

        if (transactionData?.orderId) {
          await db.collection('orders').doc(transactionData.orderId).update({
            status: 'processing',
            paymentMethod: 'mpesa',
            paymentId: transactionId,
            updatedAt: new Date(),
          });
        }
      }
    }

    res.json({ success: true });

  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).json({ error: 'Callback processing failed' });
  }
});

// Query transaction status
router.get('/query/:checkoutRequestId', async (req, res) => {
  try {
    const { checkoutRequestId } = req.params;

    const accessToken = await getAccessToken();

    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const password = Buffer.from(
      `${MPESA_CONFIG.shortcode}${MPESA_CONFIG.passkey}${timestamp}`
    ).toString('base64');

    const queryData = {
      BusinessShortCode: MPESA_CONFIG.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    };

    const response = await axios.post(
      `${MPESA_CONFIG.baseUrl}/mpesa/stkpushquery/v1/query`,
      queryData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      success: true,
      status: response.data,
    });

  } catch (error: any) {
    console.error('Query error:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to query transaction status',
    });
  }
});

export default router;