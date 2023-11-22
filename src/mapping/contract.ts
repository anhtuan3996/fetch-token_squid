import {DataHandlerContext} from '@subsquid/evm-processor'
import {Store} from '../db'
import {EntityBuffer} from '../entityBuffer'
import {ContractEventApproval, ContractEventPaused, ContractEventRoleGranted, ContractEventRoleRevoked, ContractEventTransfer, ContractEventUnpaused, ContractFunctionApprove, ContractFunctionBurn, ContractFunctionBurnFrom, ContractFunctionDecreaseAllowance, ContractFunctionGrantRole, ContractFunctionIncreaseAllowance, ContractFunctionMint, ContractFunctionPause, ContractFunctionRenounceRole, ContractFunctionRevokeRole, ContractFunctionTransfer, ContractFunctionTransferFrom, ContractFunctionUnpause} from '../model'
import * as spec from '../abi/0xaea46a60368a7bd060eec7df8cba43b7ef41ad85'
import {Log, Transaction} from '../processor'

const address = '0xaea46a60368a7bd060eec7df8cba43b7ef41ad85'


export function parseEvent(ctx: DataHandlerContext<Store>, log: Log) {
    try {
        switch (log.topics[0]) {
            case spec.events['Approval'].topic: {
                let e = spec.events['Approval'].decode(log)
                EntityBuffer.add(
                    new ContractEventApproval({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Approval',
                        owner: e[0],
                        spender: e[1],
                        value: e[2],
                    })
                )
                break
            }
            case spec.events['Paused'].topic: {
                let e = spec.events['Paused'].decode(log)
                EntityBuffer.add(
                    new ContractEventPaused({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Paused',
                        account: e[0],
                    })
                )
                break
            }
            case spec.events['RoleGranted'].topic: {
                let e = spec.events['RoleGranted'].decode(log)
                EntityBuffer.add(
                    new ContractEventRoleGranted({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'RoleGranted',
                        role: e[0],
                        account: e[1],
                        sender: e[2],
                    })
                )
                break
            }
            case spec.events['RoleRevoked'].topic: {
                let e = spec.events['RoleRevoked'].decode(log)
                EntityBuffer.add(
                    new ContractEventRoleRevoked({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'RoleRevoked',
                        role: e[0],
                        account: e[1],
                        sender: e[2],
                    })
                )
                break
            }
            case spec.events['Transfer'].topic: {
                let e = spec.events['Transfer'].decode(log)
                EntityBuffer.add(
                    new ContractEventTransfer({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Transfer',
                        from: e[0],
                        to: e[1],
                        value: e[2],
                    })
                )
                break
            }
            case spec.events['Unpaused'].topic: {
                let e = spec.events['Unpaused'].decode(log)
                EntityBuffer.add(
                    new ContractEventUnpaused({
                        id: log.id,
                        blockNumber: log.block.height,
                        blockTimestamp: new Date(log.block.timestamp),
                        transactionHash: log.transactionHash,
                        contract: log.address,
                        eventName: 'Unpaused',
                        account: e[0],
                    })
                )
                break
            }
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: log.block.height, blockHash: log.block.hash, address}, `Unable to decode event "${log.topics[0]}"`)
    }
}

export function parseFunction(ctx: DataHandlerContext<Store>, transaction: Transaction) {
    try {
        switch (transaction.input.slice(0, 10)) {
            case spec.functions['approve'].sighash: {
                let f = spec.functions['approve'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionApprove({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'approve',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        spender: f[0],
                        amount: f[1],
                    })
                )
                break
            }
            case spec.functions['burn'].sighash: {
                let f = spec.functions['burn'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionBurn({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'burn',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        amount: f[0],
                    })
                )
                break
            }
            case spec.functions['burnFrom'].sighash: {
                let f = spec.functions['burnFrom'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionBurnFrom({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'burnFrom',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        account: f[0],
                        amount: f[1],
                    })
                )
                break
            }
            case spec.functions['decreaseAllowance'].sighash: {
                let f = spec.functions['decreaseAllowance'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionDecreaseAllowance({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'decreaseAllowance',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        spender: f[0],
                        subtractedValue: f[1],
                    })
                )
                break
            }
            case spec.functions['grantRole'].sighash: {
                let f = spec.functions['grantRole'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionGrantRole({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'grantRole',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        role: f[0],
                        account: f[1],
                    })
                )
                break
            }
            case spec.functions['increaseAllowance'].sighash: {
                let f = spec.functions['increaseAllowance'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionIncreaseAllowance({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'increaseAllowance',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        spender: f[0],
                        addedValue: f[1],
                    })
                )
                break
            }
            case spec.functions['mint'].sighash: {
                let f = spec.functions['mint'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionMint({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'mint',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        to: f[0],
                        amount: f[1],
                    })
                )
                break
            }
            case spec.functions['pause'].sighash: {
                let f = spec.functions['pause'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionPause({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'pause',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                    })
                )
                break
            }
            case spec.functions['renounceRole'].sighash: {
                let f = spec.functions['renounceRole'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRenounceRole({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'renounceRole',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        role: f[0],
                        account: f[1],
                    })
                )
                break
            }
            case spec.functions['revokeRole'].sighash: {
                let f = spec.functions['revokeRole'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionRevokeRole({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'revokeRole',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        role: f[0],
                        account: f[1],
                    })
                )
                break
            }
            case spec.functions['transfer'].sighash: {
                let f = spec.functions['transfer'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionTransfer({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'transfer',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        recipient: f[0],
                        amount: f[1],
                    })
                )
                break
            }
            case spec.functions['transferFrom'].sighash: {
                let f = spec.functions['transferFrom'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionTransferFrom({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'transferFrom',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                        sender: f[0],
                        recipient: f[1],
                        amount: f[2],
                    })
                )
                break
            }
            case spec.functions['unpause'].sighash: {
                let f = spec.functions['unpause'].decode(transaction.input)
                EntityBuffer.add(
                    new ContractFunctionUnpause({
                        id: transaction.id,
                        blockNumber: transaction.block.height,
                        blockTimestamp: new Date(transaction.block.timestamp),
                        transactionHash: transaction.hash,
                        contract: transaction.to!,
                        functionName: 'unpause',
                        functionValue: transaction.value,
                        functionSuccess: transaction.status != null ? Boolean(transaction.status) : undefined,
                    })
                )
                break
            }
        }
    }
    catch (error) {
        ctx.log.error({error, blockNumber: transaction.block.height, blockHash: transaction.block.hash, address}, `Unable to decode function "${transaction.input.slice(0, 10)}"`)
    }
}
