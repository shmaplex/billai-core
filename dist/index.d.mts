import { z } from 'zod';

/**
 * Features enum placeholder
 */
declare const FeatureEnum: z.ZodEnum<{
    TEXT_GENERATION: "TEXT_GENERATION";
    IMAGE_GENERATION: "IMAGE_GENERATION";
    DATA_ANALYSIS: "DATA_ANALYSIS";
    TOKENS: "TOKENS";
    COMPUTE_TIME: "COMPUTE_TIME";
    VRAM_USAGE: "VRAM_USAGE";
    API_CALL: "API_CALL";
    STORAGE: "STORAGE";
    OTHER: "OTHER";
}>;
type FeatureType = z.infer<typeof FeatureEnum>;

/**
 * Schema for what the SDK or external clients send
 * when reporting usage events to BillAI.
 */
declare const UsagePayloadSchema: z.ZodObject<{
    feature: z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>;
    usage: z.ZodNumber;
    sessionId: z.ZodOptional<z.ZodUUID>;
    appId: z.ZodOptional<z.ZodString>;
    endUserId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    ipAddress: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    modelUsage: z.ZodOptional<z.ZodObject<{
        userId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        appId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        language: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        organizationId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        success: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        userAgent: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        apiKeyId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        unitCost: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        billed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        sessionId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        model: z.ZodOptional<z.ZodString>;
        vendor: z.ZodOptional<z.ZodString>;
        modelVersion: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        requestType: z.ZodOptional<z.ZodString>;
        usageCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        successCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        failureCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        avgLatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        p50LatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        p90LatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        p99LatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        latencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        throughput: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        queueTimeMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        errorType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        retryCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        region: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        promptLengthTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        responseLengthTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        totalCost: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        discountApplied: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        planTier: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        temperature: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        maxTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        totalTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        topP: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        stopSequences: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        embeddingDimension: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        imageResolution: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        sdkVersion: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        promptCategory: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        responseQualityScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        resourceConsumption: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        concurrentRequests: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
/**
 * Type used by the npm SDK and API endpoints for usage reporting.
 */
type UsagePayload = z.infer<typeof UsagePayloadSchema>;

/**
 * Schema for validating bulk payload arrays
 */
declare const UsagePayloadArraySchema: z.ZodArray<z.ZodObject<{
    feature: z.ZodEnum<{
        TEXT_GENERATION: "TEXT_GENERATION";
        IMAGE_GENERATION: "IMAGE_GENERATION";
        DATA_ANALYSIS: "DATA_ANALYSIS";
        TOKENS: "TOKENS";
        COMPUTE_TIME: "COMPUTE_TIME";
        VRAM_USAGE: "VRAM_USAGE";
        API_CALL: "API_CALL";
        STORAGE: "STORAGE";
        OTHER: "OTHER";
    }>;
    usage: z.ZodNumber;
    sessionId: z.ZodOptional<z.ZodUUID>;
    appId: z.ZodOptional<z.ZodString>;
    endUserId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    ipAddress: z.ZodOptional<z.ZodString>;
    userAgent: z.ZodOptional<z.ZodString>;
    modelUsage: z.ZodOptional<z.ZodObject<{
        userId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        appId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        language: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        organizationId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        success: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        userAgent: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        apiKeyId: z.ZodOptional<z.ZodOptional<z.ZodUUID>>;
        unitCost: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        billed: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
        sessionId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        model: z.ZodOptional<z.ZodString>;
        vendor: z.ZodOptional<z.ZodString>;
        modelVersion: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        requestType: z.ZodOptional<z.ZodString>;
        usageCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        successCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        failureCount: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
        avgLatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        p50LatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        p90LatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        p99LatencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        latencyMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        throughput: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        queueTimeMs: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        errorType: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        retryCount: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        region: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        promptLengthTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        responseLengthTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        totalCost: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        discountApplied: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        planTier: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        temperature: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        maxTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        totalTokens: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        topP: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        stopSequences: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
        embeddingDimension: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        imageResolution: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        sdkVersion: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        promptCategory: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        responseQualityScore: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        resourceConsumption: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
        concurrentRequests: z.ZodOptional<z.ZodOptional<z.ZodNumber>>;
    }, z.core.$strip>>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>>;
/**
 * Zod schema for API responses
 */
declare const UsageResponseSchema: z.ZodObject<{
    success: z.ZodDefault<z.ZodBoolean>;
    log: z.ZodOptional<z.ZodAny>;
    logs: z.ZodOptional<z.ZodArray<z.ZodAny>>;
    error: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type UsageResponse = z.infer<typeof UsageResponseSchema>;
/**
 * Type for parsed bulk entries
 */
type ParsedEntries = z.infer<typeof UsagePayloadArraySchema>;
/** Revenue split schema */
declare const RevenueSplitSchema: z.ZodObject<{
    id: z.ZodString;
    percent: z.ZodNumber;
}, z.core.$strip>;
type RevenueSplit = z.infer<typeof RevenueSplitSchema>;
/** Charge options schema */
declare const ChargeOptionsSchema: z.ZodObject<{
    usage: z.ZodNumber;
    revSplit: z.ZodOptional<z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        percent: z.ZodNumber;
    }, z.core.$strip>>>;
    appId: z.ZodOptional<z.ZodString>;
    organizationId: z.ZodOptional<z.ZodString>;
    endUserId: z.ZodOptional<z.ZodString>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodAny>>;
}, z.core.$strip>;
type ChargeOptions = z.infer<typeof ChargeOptionsSchema>;
/**
 * Custom SDK error wrapper
 */
declare class BillAIError extends Error {
    status?: number;
    details?: unknown;
    causeType: "client" | "network" | "validation" | "api" | "unknown";
    constructor(message: string, options?: {
        status?: number;
        details?: unknown;
        causeType?: "client" | "network" | "validation" | "api" | "unknown";
    });
}
/**
 * BillAI SDK configuration
 */
interface BillAIConfig {
    apiKey: string;
    baseUrl?: string;
    retries?: number;
    timeoutMs?: number;
}
/**
 * Main SDK class for interacting with the BillAI API.
 */
declare class Bill {
    private apiKey;
    private baseUrl;
    private retries;
    private timeoutMs;
    constructor(config: BillAIConfig);
    private fetchWithRetry;
    private handleResponse;
    /**
     * Reports a single usage entry.
     */
    reportUsage(data: UsagePayload): Promise<UsageResponse>;
    /**
     * Reports multiple usage entries in bulk.
     */
    reportUsageBulk(entries: UsagePayload[]): Promise<UsageResponse>;
    /**
     * Track usage for any async function and automatically capture detailed model usage.
     *
     * This function wraps an async call (e.g., an AI SDK request) and records:
     * - Execution duration (latency)
     * - Inferred model information (vendor, version, tokens)
     * - Usage count for billing (tokens or generic metric)
     *
     * All model usage data is inferred from the SDK response and/or the function call,
     * so the client does NOT need to provide any model details.
     *
     * Usage reporting to Bill AI is **non-blocking** and will not delay the function result.
     * This ensures minimal latency impact for client AI requests.
     *
     * Supports all AI vendors (OpenAI, Anthropic, Cogent, or any future vendors),
     * by inferring vendor from the model string returned by the SDK.
     *
     * @template T - Return type of the function being tracked
     * @param fn - Async function to execute (e.g., `openai.chat.completions.create(...)`)
     * @param opts - Options for usage tracking
     * @param opts.metric - Feature or metric type, e.g., "TOKENS" or "TEXT_GENERATION"
     * @param opts.appId - Optional app identifier for reporting
     * @param opts.organizationId - Optional org identifier
     * @param opts.userId - Optional user identifier for per-user tracking
     * @param opts.metadata - Optional metadata object to attach to usage event
     *
     * @returns Promise resolving with:
     *   - `result`: the original result of the async function
     *   - `duration`: execution duration in milliseconds
     *   - `usage`: usage count for billing (e.g., tokens used)
     *
     * @example
     * const { result, duration, usage } = await bill.trackUsage(
     *   () => openai.chat.completions.create({
     *     model: "gpt-4o-mini",
     *     messages: [{ role: "user", content: "Explain quantum physics simply." }]
     *   }),
     *   { metric: "TEXT_GENERATION", appId: "my-ai-writer", userId: "customer_123" }
     * );
     */
    trackUsage<T>(fn: () => Promise<T>, opts: {
        metric: FeatureType;
        appId?: string;
        organizationId?: string;
        userId?: string;
        metadata?: Record<string, any>;
    }): Promise<{
        result: T;
        duration: number;
        usage: number | undefined;
    }>;
    /**
     * Charge a user based on usage and optionally split revenue among partners.
     *
     * Sends a request to the `/charge` endpoint with the specified usage and revenue split details.
     *
     * @async
     * @param {ChargeOptions} opts - The charge options.
     * @param {number} opts.usage - The numeric usage amount to charge (e.g., tokens used).
     * @param {RevenueSplit[]} [opts.revSplit] - Optional array of revenue splits. Each entry should include an `id` and a `percent` (0-1).
     * @param {string} [opts.appId] - Optional application ID associated with this charge.
     * @param {string} [opts.organizationId] - Optional organization ID associated with this charge.
     * @param {string} [opts.endUserId] - Optional end user ID for tracking charges per user.
     * @param {Record<string, any>} [opts.metadata] - Optional additional metadata to attach to the charge.
     *
     * @returns {Promise<UsageResponse>} A promise that resolves with the usage response from the API,
     * which includes success status and any relevant logs or errors.
     *
     * @example
     * const response = await bill.charge({
     *   usage: 120,
     *   revSplit: [
     *     { id: "creator_123", percent: 0.3 },
     *     { id: "partner_456", percent: 0.1 }
     *   ],
     *   appId: "my-ai-writer",
     *   endUserId: "customer_123"
     * });
     */
    charge(opts: ChargeOptions): Promise<UsageResponse>;
}

export { Bill, type BillAIConfig, BillAIError, type ChargeOptions, ChargeOptionsSchema, type ParsedEntries, type RevenueSplit, RevenueSplitSchema, type UsageResponse, UsageResponseSchema };
