let integrationGateway: string = 'http://localhost:8081';
let policyCenter: string = 'http://localhost:8180/pc/rest/beazley'

export const urls:{[Key:string]:string} = {
    createAccount: `${integrationGateway}/api/process`,
    getAccountsAllDeatils: `${integrationGateway}/api/getAccountAllDetails`,
    getAccountfromAcctNumber: `${integrationGateway}/api/getAccountfromAcctNumber`,
    accountAPIGetAccount: `${policyCenter}/account/`
}

export const dirPath: {[Key:string]:string} = {
    requestDir: 'src/shared/data/requests',
    responseDir: 'src/shared/data/responses'
}

export const igHeaders: {[Key:string]:string} = {
    "accept": "application/json"
}

export const accApiHeaders: {[Key:string]:string} = {
    accept: "application/json",
    authorization: "Basic c3U6Z3c="
}