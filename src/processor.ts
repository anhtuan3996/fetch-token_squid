import {EvmBatchProcessor, EvmBatchProcessorFields, BlockHeader, Log as _Log, Transaction as _Transaction} from '@subsquid/evm-processor'
import {lookupArchive} from '@subsquid/archive-registry'
import * as contractAbi from './abi/0xaea46a60368a7bd060eec7df8cba43b7ef41ad85'

export const processor = new EvmBatchProcessor()
    .setDataSource({
        archive: lookupArchive('eth-mainnet', {type: 'EVM'}),
    })
    .setFields({
            log: {
                topics: true,
                data: true,
                transactionHash: true,
            },
            transaction: {
                hash: true,
                input: true,
                from: true,
                value: true,
                status: true,
        }
    })
    .addLog({
        address: ['0xaea46a60368a7bd060eec7df8cba43b7ef41ad85'],
        topic0: [
            contractAbi.events['Approval'].topic,
            contractAbi.events['Paused'].topic,
            contractAbi.events['RoleGranted'].topic,
            contractAbi.events['RoleRevoked'].topic,
            contractAbi.events['Transfer'].topic,
            contractAbi.events['Unpaused'].topic,
        ],
        range: {
            from: 10998076,
        },
    })
    .addTransaction({
        to: ['0xaea46a60368a7bd060eec7df8cba43b7ef41ad85'],
        sighash: [
            contractAbi.functions['approve'].sighash,
            contractAbi.functions['burn'].sighash,
            contractAbi.functions['burnFrom'].sighash,
            contractAbi.functions['decreaseAllowance'].sighash,
            contractAbi.functions['grantRole'].sighash,
            contractAbi.functions['increaseAllowance'].sighash,
            contractAbi.functions['mint'].sighash,
            contractAbi.functions['pause'].sighash,
            contractAbi.functions['renounceRole'].sighash,
            contractAbi.functions['revokeRole'].sighash,
            contractAbi.functions['transfer'].sighash,
            contractAbi.functions['transferFrom'].sighash,
            contractAbi.functions['unpause'].sighash,
        ],
        range: {
            from: 10998076,
        },
    })

export type Fields = EvmBatchProcessorFields<typeof processor>
export type Block = BlockHeader<Fields>
export type Log = _Log<Fields>
export type Transaction = _Transaction<Fields>
