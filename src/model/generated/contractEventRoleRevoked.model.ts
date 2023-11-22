import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, Index as Index_} from "typeorm"

@Entity_()
export class ContractEventRoleRevoked {
    constructor(props?: Partial<ContractEventRoleRevoked>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Index_()
    @Column_("int4", {nullable: false})
    blockNumber!: number

    @Index_()
    @Column_("timestamp with time zone", {nullable: false})
    blockTimestamp!: Date

    @Index_()
    @Column_("text", {nullable: false})
    transactionHash!: string

    @Index_()
    @Column_("text", {nullable: false})
    contract!: string

    @Index_()
    @Column_("text", {nullable: false})
    eventName!: string

    @Index_()
    @Column_("text", {nullable: false})
    role!: string

    @Index_()
    @Column_("text", {nullable: false})
    account!: string

    @Index_()
    @Column_("text", {nullable: false})
    sender!: string
}
