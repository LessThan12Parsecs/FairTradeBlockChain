/*
* Use this file for functional testing of your smart contract.
* Fill out the arguments and return values for a function and
* use the CodeLens links above the transaction blocks to
* invoke/submit transactions.
* All transactions defined in your smart contract are used here
* to generate tests, including those functions that would
* normally only be used on instantiate and upgrade operations.
* This basic test file can also be used as the basis for building
* further functional tests to run as part of a continuous
* integration pipeline, or for debugging locally deployed smart
* contracts by invoking/submitting individual transactions.
*/
/*
* Generating this test file will also trigger an npm install
* in the smart contract project directory. This installs any
* package dependencies, including fabric-network, which are
* required for this test file to be run locally.
*/

'use strict';

const assert = require('assert');
const fabricNetwork = require('fabric-network');
const fs = require('fs-extra');
const yaml = require('js-yaml');
const URL = require('url');

describe('MyContract-FairTrade@0.0.4' , () => {

    const gateway = new fabricNetwork.Gateway();
    const wallet = new fabricNetwork.FileSystemWallet('/Users/ema/.fabric-vscode/local_fabric/wallet');
    let connectionProfile;
    let identityName;

    before(async () => {
        const connectionProfilePath = '/Users/ema/.fabric-vscode/local_fabric/connection.json';

        const connectionProfileContents = await fs.readFile(connectionProfilePath, 'utf8');
        if (connectionProfilePath.endsWith('.json')) {
            connectionProfile = JSON.parse(connectionProfileContents);
        } else if (connectionProfilePath.endsWith('.yaml') || connectionProfilePath.endsWith('.yml')) {
            connectionProfile = yaml.safeLoad(connectionProfileContents);
        };
        const identities = await wallet.list();
        // TODO: edit to use different identities in wallet
        identityName = identities[0].label;

    });

    beforeEach(async () => {

        const discoveryAsLocalhost = hasLocalhostURLs(connectionProfile);
        const discoveryEnabled = !discoveryAsLocalhost;

        const options = {
            wallet: wallet,
            identity: identityName,
            discovery: {
                asLocalhost: discoveryAsLocalhost,
                enabled: discoveryEnabled
            }
        };

        await gateway.connect(connectionProfile, options);
    });

    afterEach(async () => {
        gateway.disconnect();
    });

    it('instantiate', async () => {
        // TODO: Update with parameters of transaction
        const args = [];

        const response = await submitTransaction('instantiate', args); // Returns buffer of transaction return value
        // TODO: Update with return value of transaction
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    it('addTruck', async () => {
        // TODO: Update with parameters of transaction
        const args = [];

        const response = await submitTransaction('addTruck', args); // Returns buffer of transaction return value
        // TODO: Update with return value of transaction
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    it('query', async () => {
        // TODO: Update with parameters of transaction
        const args = [];

        const response = await submitTransaction('query', args); // Returns buffer of transaction return value
        // TODO: Update with return value of transaction
        // assert.equal(JSON.parse(response.toString()), undefined);
    }).timeout(10000);

    async function submitTransaction(functionName, args) {
        // Submit transaction
        const network = await gateway.getNetwork('mychannel');
        const contract = await network.getContract('FairTrade', 'MyContract');
        const responseBuffer = await contract.submitTransaction(functionName, ...args);
        return responseBuffer;
    }

     // Checks if URL is localhost
     function isLocalhostURL(url) {
        const parsedURL = URL.parse(url);
        const localhosts = [
            'localhost',
            '127.0.0.1'
        ];
        return localhosts.indexOf(parsedURL.hostname) !== -1;
    }

    // Used for determining whether to use discovery
    function hasLocalhostURLs(connectionProfile) {
        const urls = [];
        for (const nodeType of ['orderers', 'peers', 'certificateAuthorities']) {
            if (!connectionProfile[nodeType]) {
                continue;
            }
            const nodes = connectionProfile[nodeType];
            for (const nodeName in nodes) {
                if (!nodes[nodeName].url) {
                    continue;
                }
                urls.push(nodes[nodeName].url);
            }
        }
        return urls.some((url) => isLocalhostURL(url));
    }

});
