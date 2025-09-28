import type { KVStoreInterface } from "../../modules/kvstore/KVStoreInterfaceService";
import type { Actor } from "../auth/Actor";


const USAGE_TYPE_MAPS = {
    // Map with unit to cost measurements in microcent
    'kv.read': 1,
    'kv.write': 2
}

interface UsageByType {
    total: number
    [serviceName: string]: number
}
interface ActiveUsageByType {
    today: UsageByType
    thisWeek: UsageByType
    thisMonth: UsageByType
}

const POLICY_TYPES = {
    'free': {} // TODO DS: define what needs to go here
}

/**
 * Handles usage metering and supports stubbs for billing methods for current scoped actor
 */
export class MeteringAndBillingService {

    kvClientWrapper: KVStoreInterface
    constructor(kvClientWrapper: KVStoreInterface) {

        this.kvClientWrapper = kvClientWrapper;
    }
    incrementUsage(actor: Actor, usageType: string, usageAmount: number) {
        this.kvClientWrapper.incr({
            key, path,
        })
        // TODO DS: this should increment the cost for the given type of operation, and the total cost for daily, weekly and monthly usage
    }
    getAllActiveUsage(actor: Actor): ActiveUsageByType {
        // TODO DS: get total usage given an actor for today, this week, and this month
    }
    getMaxAllowedUsage(actor: Actor): number {
        // TODO DS: return the allowed usages for a given actor, currently we do monthly, could eventually support smaller timeframes
    }
    #updateAllowedUsage(actor: Actor, tokenAmount: number) {

    }
    handlePolicyPurchase(actor: Actor, policyType: keyof typeof POLICY_TYPES) {
        // TODO DS: this should leverage extensions to call billing implementations
    }
    handleTokenPurchase(actor: Actor, tokenAmount: number) {
        // TODO DS: this should leverage extensions to call billing implementations

        this.#updateAllowedUsage(actor, tokenAmount);
    }

}