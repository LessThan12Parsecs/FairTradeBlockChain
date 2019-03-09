/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class MyContract extends Contract {

    //update ledger with a greeting to show that the function was called
    async instantiate(ctx) {
        let greeting = { text: 'Instantiate was called!' };
        await ctx.stub.putState('GREETING', Buffer.from(JSON.stringify(greeting)));
    }
    //add a member along with their email, name, address, and number
    async addTruck(ctx, truckId, driver, fair1, fair2) {
        let member = {
            name: driver,
            fair1: fair1,
            fair2: fair2,
            truckId: truckId
        };
        await ctx.stub.putState(truckId, Buffer.from(JSON.stringify(member)));
        return JSON.stringify(member);
    }
    // look up data by key
    async query(ctx, key) {
        console.info('querying for product key: ' + key  );
        let returnAsBytes = await ctx.stub.getState(key);
        let result = JSON.parse(returnAsBytes);
        return JSON.stringify(result);
    }
}

module.exports = MyContract;
