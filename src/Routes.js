'use strict';


const Routes = [
    // Home
    {
        regex: /^$/,
        partial: null,
        page: 'Home',
        props: {}
    },

    // Affiliate
    {
        regex: /^affiliates\/[a-z0-9]+$/,
        partial: null,
        page: 'Affiliate',
        props: {}
    },

    // Affiliates
    {
        regex: /^affiliates(#a=.*)?$/,
        partial: null,
        page: 'Affiliates',
        props: {}
    },

    // Contests
    {
        regex: /^contests(#a=.*)?$/,
        partial: null,
        page: 'Contests',
        props: {}
    },

    {
        regex: /^contests\/\w+$/,
        partial: null,
        page: 'Contest',
        props: {}
    },

    // Payments
    {
        regex: /^payments(#a=.*)?$/,
        partial: null,
        page: 'Payments',
        props: {}
    },

    {
        regex: /^payments\/\w+$/,
        partial: null,
        page: 'Payment',
        props: {}
    },

    // Users
    {
        regex: /^users(#a=.*)?$/,
        partial: null,
        page: 'Users',
        props: {}
    },

    // User
    {
        regex: /^users\/\w+$/,
        partial: null,
        page: 'User',
        props: {}
    },

    // Wallet
    {
        regex: /^wallet(#a=.*)?$/,
        partial: null,
        page: 'Wallet',
        props: {}
    }
];


module.exports = Routes;
