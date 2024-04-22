import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

let baseUrl = 'https://api-m.sandbox.paypal.com';
const base64 = require('base-64');

let clientId = 'AdS3nGI7pF0Byey-D1SzIRIQ4HIZtLY7jDKyXhIkcTSiXQZxyagDbCWAn4F_hHYZU7FlmjNSSph4bqVH';
let secretKey = 'EA1CnpViYO7qWk2QdT8X9gMZEliUZPE-Z5hnuz1QcEpZPNgkVHU2bOUhb2xBH7rIrjVukwrFT2YmdVYD';

const generateToken = () => {
    var headers = new Headers()
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + base64.encode(`${clientId}:${secretKey}`));

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: 'grant_type=client_credentials',
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result => {
            const { access_token } = JSON.parse(result)
            resolve(access_token)
            resolve(result)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const createOrder = (total, token = '') => {
    let orderDetail = {
        "intent": "CAPTURE",
        "purchase_units": [
            {
                "amount": {
                    "currency_code": "USD",
                    "value": total.toFixed(2),
                }
            }
        ],
        "application_context": {
            "return_url": "https://example.com/return",
            "cancel_url": "https://example.com/cancel"
        }
    };

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderDetail)
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v2/checkout/orders', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const res = JSON.parse(result)
            resolve(res)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

const capturePayment = (id, token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result)
            const res = JSON.parse(result)
            resolve(res)
        }).catch(error => {
            console.log("error raised", error)
            reject(error)
        })
    })
}

export default {
    generateToken,
    createOrder,
    capturePayment
}
