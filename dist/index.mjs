// src/core/index.ts
import fetch from "cross-fetch";
import { v4 as uuidv4 } from "uuid";
import { z as z25 } from "zod";

// src/shared/schemas/usagePayload.schema.ts
import { z as z23 } from "zod";

// src/shared/constants/features.ts
var AI_FEATURES = [
  "TEXT_GENERATION",
  // for text/LLM usage
  "IMAGE_GENERATION",
  // for image diffusion or gen models
  "DATA_ANALYSIS",
  // for analytical or AI data ops
  "TOKENS",
  // tokens used for text/LLM models
  "COMPUTE_TIME",
  // time spent on CPU/GPU for tasks
  "VRAM_USAGE",
  // GPU memory consumed
  "API_CALL",
  // number of API requests
  "STORAGE",
  // optional: storage used per user/app
  "OTHER"
  // fallback for miscellaneous usage
];

// src/shared/schemas/modelUsage.schema.ts
import { z as z22 } from "zod";

// src/shared/schemas/apiKey.schema.ts
import { z as z21 } from "zod";

// src/shared/schemas/usageLog.schema.ts
import { z as z20 } from "zod";

// src/shared/schemas/app.schema.ts
import { z as z19 } from "zod";

// src/shared/schemas/organization.schema.ts
import { z as z18 } from "zod";

// src/shared/schemas/user.schema.ts
import { z as z17 } from "zod";

// src/shared/schemas/alert.schema.ts
import { z } from "zod";
var AlertBaseSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  appId: z.uuid().optional().nullable(),
  type: z.string(),
  message: z.string(),
  triggeredAt: z.date(),
  isRead: z.boolean().default(false)
});
var AlertReferenceSchema = AlertBaseSchema.pick({
  id: true,
  userId: true,
  appId: true,
  type: true,
  message: true,
  triggeredAt: true,
  isRead: true
});
var AlertDetailedSchema = AlertBaseSchema.extend({
  user: z.lazy(() => UserReferenceSchema),
  app: z.lazy(() => AppReferenceSchema).optional().nullable()
});

// src/shared/schemas/appApiKey.schema.ts
import { z as z2 } from "zod";
var AppApiKeyBaseSchema = z2.object({
  appId: z2.string(),
  key: z2.string(),
  createdByUserId: z2.string().optional(),
  expiresAt: z2.date().optional()
});
var AppApiKeyReferenceSchema = AppApiKeyBaseSchema.extend({
  id: z2.uuid(),
  createdAt: z2.date()
});
var AppApiKeyDetailedSchema = AppApiKeyReferenceSchema.extend({
  app: z2.lazy(() => AppReferenceSchema),
  createdBy: z2.lazy(() => UserReferenceSchema).optional()
});

// src/shared/schemas/auditLog.schema.ts
import { z as z3 } from "zod";
var AuditLogBaseSchema = z3.object({
  id: z3.uuid(),
  userId: z3.uuid(),
  action: z3.string().min(1, "Action is required."),
  details: z3.string().optional(),
  createdAt: z3.date(),
  appId: z3.uuid().optional()
});
var AuditLogReferenceSchema = AuditLogBaseSchema.pick({
  id: true,
  action: true,
  createdAt: true
});
var AuditLogDetailedSchema = AuditLogBaseSchema.extend({
  user: z3.lazy(() => UserReferenceSchema),
  app: z3.lazy(() => AppReferenceSchema).optional()
});

// src/shared/schemas/invoice.schema.ts
import { z as z7 } from "zod";

// src/shared/schemas/charge.schema.ts
import { z as z5 } from "zod";

// src/shared/schemas/endUser.schema.ts
import { z as z4 } from "zod";
var EndUserBaseSchema = z4.object({
  id: z4.uuid(),
  appId: z4.uuid(),
  externalId: z4.string(),
  email: z4.email().optional(),
  createdAt: z4.date(),
  updatedAt: z4.date(),
  deletedAt: z4.date().optional()
});
var EndUserReferenceSchema = EndUserBaseSchema.pick({
  id: true,
  appId: true,
  externalId: true,
  email: true
});
var EndUserDetailedSchema = EndUserBaseSchema.extend({
  app: z4.lazy(() => AppReferenceSchema).optional(),
  invoices: z4.array(z4.lazy(() => InvoiceReferenceSchema)).optional(),
  charges: z4.array(z4.lazy(() => ChargeReferenceSchema)).optional(),
  usageLogs: z4.array(z4.any()).optional(),
  // replace with UsageLogReferenceSchema when available
  eventLogs: z4.array(z4.any()).optional(),
  // replace with EventLogReferenceSchema
  usageLimits: z4.array(z4.any()).optional(),
  // replace with UsageLimitReferenceSchema
  sdkLogs: z4.array(z4.any()).optional()
  // replace with SdkLogReferenceSchema
});

// src/shared/schemas/charge.schema.ts
var ChargeBaseSchema = z5.object({
  id: z5.uuid(),
  invoiceId: z5.uuid().optional(),
  endUserId: z5.uuid().optional(),
  appId: z5.uuid(),
  amount: z5.number().nonnegative(),
  status: z5.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]),
  createdAt: z5.date(),
  paidAt: z5.date().optional(),
  deletedAt: z5.date().optional()
});
var ChargeReferenceSchema = ChargeBaseSchema.pick({
  id: true,
  appId: true,
  amount: true,
  status: true,
  createdAt: true
});
var ChargeDetailedSchema = ChargeBaseSchema.extend({
  invoice: z5.lazy(() => InvoiceReferenceSchema).optional(),
  endUser: z5.lazy(() => EndUserReferenceSchema).optional(),
  app: z5.lazy(() => AppReferenceSchema)
});

// src/shared/schemas/invoiceItem.schema.ts
import { z as z6 } from "zod";
var InvoiceItemBaseSchema = z6.object({
  id: z6.uuid(),
  invoiceId: z6.uuid(),
  description: z6.string(),
  amount: z6.number(),
  quantity: z6.number().default(1),
  createdAt: z6.date()
});
var InvoiceItemReferenceSchema = InvoiceItemBaseSchema.pick({
  id: true,
  description: true,
  amount: true,
  quantity: true
});
var InvoiceItemDetailedSchema = InvoiceItemBaseSchema.extend({
  invoice: z6.lazy(() => InvoiceReferenceSchema).optional()
});

// src/shared/schemas/invoice.schema.ts
var InvoiceBaseSchema = z7.object({
  id: z7.uuid(),
  userId: z7.uuid(),
  appId: z7.uuid().optional(),
  endUserId: z7.uuid().optional(),
  amount: z7.number(),
  currency: z7.string(),
  paid: z7.boolean(),
  createdAt: z7.date(),
  updatedAt: z7.date(),
  dueDate: z7.date().optional(),
  paidAt: z7.date().optional(),
  deletedAt: z7.date().optional()
});
var InvoiceReferenceSchema = InvoiceBaseSchema.pick({
  id: true,
  amount: true,
  currency: true,
  paid: true,
  createdAt: true
});
var InvoiceDetailedSchema = InvoiceBaseSchema.extend({
  user: z7.lazy(() => UserReferenceSchema).optional(),
  app: z7.lazy(() => AppReferenceSchema).optional(),
  endUser: z7.lazy(() => EndUserReferenceSchema).optional(),
  items: z7.array(z7.lazy(() => InvoiceItemReferenceSchema)).optional(),
  charges: z7.array(z7.lazy(() => ChargeReferenceSchema)).optional()
});

// src/shared/schemas/mfa.schema.ts
import { z as z8 } from "zod";
var MFABaseSchema = z8.object({
  id: z8.uuid(),
  userId: z8.uuid(),
  type: z8.string(),
  secret: z8.string(),
  enabled: z8.boolean().default(false),
  createdAt: z8.date(),
  updatedAt: z8.date()
});
var MFAReferenceSchema = MFABaseSchema.pick({
  id: true,
  type: true,
  enabled: true
});
var MFADetailedSchema = MFABaseSchema.extend({
  user: z8.lazy(() => UserReferenceSchema).optional()
});

// src/shared/schemas/plan.schema.ts
import { z as z11 } from "zod";

// src/shared/schemas/organizationPlan.schema.ts
import { z as z9 } from "zod";
var OrganizationPlanBaseSchema = z9.object({
  id: z9.uuid(),
  organizationId: z9.uuid().optional(),
  planId: z9.uuid().optional(),
  startDate: z9.date(),
  endDate: z9.date().nullable().optional(),
  createdAt: z9.date(),
  updatedAt: z9.date()
});
var OrganizationPlanReferenceSchema = OrganizationPlanBaseSchema.pick({
  id: true,
  organizationId: true,
  planId: true,
  startDate: true,
  endDate: true
});
var OrganizationPlanDetailedSchema = OrganizationPlanBaseSchema.extend(
  {
    organization: z9.lazy(() => OrganizationReferenceSchema).optional(),
    plan: z9.lazy(() => PlanReferenceSchema).optional()
  }
);

// src/shared/schemas/planFeature.schema.ts
import { z as z10 } from "zod";
var PlanFeatureBaseSchema = z10.object({
  id: z10.uuid(),
  planId: z10.uuid(),
  name: z10.string(),
  limit: z10.number().optional(),
  price: z10.number().optional(),
  metadata: z10.any().optional(),
  createdAt: z10.date()
});
var PlanFeatureReferenceSchema = PlanFeatureBaseSchema.pick({
  id: true,
  name: true
});
var PlanFeatureDetailedSchema = PlanFeatureBaseSchema.extend({
  plan: z10.lazy(() => PlanReferenceSchema).optional()
});

// src/shared/schemas/plan.schema.ts
var PlanBaseSchema = z11.object({
  id: z11.uuid(),
  name: z11.string(),
  price: z11.number(),
  maxUsage: z11.number().optional(),
  interval: z11.string().default("monthly"),
  features: z11.string().optional(),
  createdAt: z11.date(),
  updatedAt: z11.date()
});
var PlanReferenceSchema = PlanBaseSchema.pick({
  id: true,
  name: true,
  price: true,
  maxUsage: true
});
var PlanDetailedSchema = PlanBaseSchema.extend({
  users: z11.array(z11.lazy(() => UserReferenceSchema)).optional(),
  organizationPlans: z11.array(z11.lazy(() => OrganizationPlanReferenceSchema)).optional(),
  planFeatures: z11.array(z11.lazy(() => PlanFeatureReferenceSchema)).optional()
});

// src/shared/schemas/revenueSplit.schema.ts
import { z as z12 } from "zod";
var RevenueSplitBaseSchema = z12.object({
  id: z12.uuid(),
  appId: z12.uuid(),
  recipientId: z12.uuid().optional(),
  percent: z12.number(),
  createdAt: z12.date(),
  deletedAt: z12.date().optional()
});
var RevenueSplitReferenceSchema = RevenueSplitBaseSchema.pick({
  id: true,
  percent: true
});
var RevenueSplitDetailedSchema = RevenueSplitBaseSchema.extend({
  app: z12.lazy(() => AppReferenceSchema),
  recipient: z12.lazy(() => UserReferenceSchema).optional()
});

// src/shared/schemas/review.schema.ts
import { z as z13 } from "zod";
var ReviewStatusEnum = z13.enum(["PENDING", "APPROVED", "REJECTED"]);
var ReviewBaseSchema = z13.object({
  id: z13.uuid(),
  reviewerId: z13.uuid(),
  resourceType: z13.string(),
  resourceId: z13.string(),
  status: ReviewStatusEnum,
  notes: z13.string().nullable().optional(),
  createdAt: z13.date(),
  updatedAt: z13.date()
});
var ReviewReferenceSchema = ReviewBaseSchema.pick({
  id: true,
  status: true,
  resourceType: true,
  resourceId: true
});
var ReviewDetailedSchema = ReviewBaseSchema.extend({
  reviewer: z13.lazy(() => UserReferenceSchema)
});

// src/shared/schemas/role.schema.ts
import { z as z14 } from "zod";
var RoleBaseSchema = z14.object({
  id: z14.uuid(),
  name: z14.string(),
  description: z14.string().optional(),
  permissions: z14.string().optional(),
  createdBy: z14.string().optional(),
  updatedBy: z14.string().optional()
});
var RoleReferenceSchema = RoleBaseSchema.pick({
  id: true,
  name: true
});
var RoleDetailedSchema = RoleBaseSchema.extend({
  users: z14.array(z14.lazy(() => UserReferenceSchema)).optional()
});

// src/shared/schemas/userPreferences.schema.ts
import { z as z15 } from "zod";
var UserPreferencesBaseSchema = z15.object({
  id: z15.uuid(),
  userId: z15.uuid(),
  timezone: z15.string().optional(),
  locale: z15.string().optional(),
  language: z15.string().optional(),
  emailNotifications: z15.boolean().default(true),
  darkMode: z15.boolean().default(false),
  createdAt: z15.date(),
  updatedAt: z15.date()
});
var UserPreferencesReferenceSchema = UserPreferencesBaseSchema.pick({
  id: true,
  userId: true,
  emailNotifications: true,
  darkMode: true
});
var UserPreferencesDetailedSchema = UserPreferencesBaseSchema.extend({
  user: z15.lazy(() => UserReferenceSchema).optional()
});

// src/shared/schemas/userSession.schema.ts
import { z as z16 } from "zod";
var UserSessionBaseSchema = z16.object({
  id: z16.uuid(),
  userId: z16.uuid(),
  expiresAt: z16.date(),
  ipAddress: z16.string().optional(),
  userAgent: z16.string().optional(),
  createdAt: z16.date(),
  updatedAt: z16.date()
});
var UserSessionReferenceSchema = UserSessionBaseSchema.pick({
  id: true,
  userId: true,
  expiresAt: true,
  createdAt: true
});
var UserSessionDetailedSchema = UserSessionBaseSchema.extend({
  user: z16.lazy(() => UserReferenceSchema).optional(),
  usageLogs: z16.array(z16.lazy(() => UsageLogReferenceSchema)).optional()
});

// src/shared/schemas/user.schema.ts
var UserBaseSchema = z17.object({
  id: z17.uuid(),
  email: z17.email(),
  password: z17.string().optional().nullable(),
  fullName: z17.string().optional().nullable(),
  phone: z17.string().optional().nullable(),
  bio: z17.string().optional().nullable(),
  title: z17.string().optional().nullable(),
  authId: z17.string(),
  provider: z17.string(),
  isActive: z17.boolean().default(true),
  isVerified: z17.boolean().default(false),
  avatarUrl: z17.string().optional().nullable(),
  locale: z17.string().optional().nullable(),
  timezone: z17.string().optional().nullable(),
  language: z17.string().optional().nullable(),
  roleId: z17.uuid().nullable().optional(),
  organizationId: z17.uuid().nullable().optional(),
  planId: z17.uuid().nullable().optional(),
  createdAt: z17.date(),
  updatedAt: z17.date(),
  deletedAt: z17.date().optional().nullable()
});
var UserReferenceSchema = UserBaseSchema.pick({
  id: true,
  email: true,
  fullName: true,
  organizationId: true,
  roleId: true
});
var UserDetailedSchema = UserBaseSchema.extend({
  // ─────────── Relations ───────────
  role: z17.lazy(() => RoleReferenceSchema).optional().nullable(),
  organization: z17.lazy(() => OrganizationReferenceSchema).optional().nullable(),
  plan: z17.lazy(() => PlanReferenceSchema).optional().nullable(),
  // ─────────── Nested Collections ───────────
  sessions: z17.array(z17.lazy(() => UserSessionReferenceSchema)).optional(),
  invoices: z17.array(z17.lazy(() => InvoiceReferenceSchema)).optional(),
  apiKeys: z17.array(z17.lazy(() => ApiKeyReferenceSchema)).optional(),
  auditLogs: z17.array(z17.lazy(() => AuditLogReferenceSchema)).optional(),
  preferences: z17.lazy(() => UserPreferencesReferenceSchema).optional().nullable(),
  mfaSettings: z17.array(z17.lazy(() => MFAReferenceSchema)).optional(),
  reviews: z17.array(z17.lazy(() => ReviewReferenceSchema)).optional(),
  modelUsages: z17.array(z17.lazy(() => ModelUsageReferenceSchema)).optional(),
  revenueSplits: z17.array(z17.lazy(() => RevenueSplitReferenceSchema)).optional(),
  apps: z17.array(z17.lazy(() => AppReferenceSchema)).optional(),
  alerts: z17.array(z17.lazy(() => AlertReferenceSchema)).optional(),
  appApiKeys: z17.array(z17.lazy(() => AppApiKeyReferenceSchema)).optional(),
  usageLogs: z17.array(z17.lazy(() => UsageLogReferenceSchema)).optional()
});

// src/shared/schemas/organization.schema.ts
var OrganizationBaseSchema = z18.object({
  id: z18.uuid(),
  name: z18.string(),
  domain: z18.string().nullable().optional(),
  createdAt: z18.date(),
  updatedAt: z18.date()
});
var OrganizationReferenceSchema = OrganizationBaseSchema.pick({
  id: true,
  name: true,
  domain: true
});
var OrganizationDetailedSchema = OrganizationBaseSchema.extend({
  users: z18.array(z18.lazy(() => UserReferenceSchema)).optional(),
  apps: z18.array(z18.lazy(() => AppReferenceSchema)).optional(),
  modelUsages: z18.array(z18.lazy(() => ModelUsageReferenceSchema)).optional()
});
var CreateOrganizationInputSchema = z18.object({
  name: z18.string().min(1),
  domain: z18.string().optional()
});
var UpdateOrganizationInputSchema = z18.object({
  name: z18.string().min(1).optional(),
  domain: z18.string().optional()
});

// src/shared/schemas/app.schema.ts
var AppBaseSchema = z19.object({
  id: z19.uuid(),
  name: z19.string(),
  description: z19.string().optional(),
  ownerId: z19.string().optional(),
  organizationId: z19.string().optional(),
  createdAt: z19.date(),
  updatedAt: z19.date(),
  deletedAt: z19.date().optional(),
  isActive: z19.boolean().default(true)
});
var AppReferenceSchema = AppBaseSchema.extend({
  owner: z19.lazy(() => UserReferenceSchema).optional(),
  organization: z19.lazy(() => OrganizationReferenceSchema).optional()
});
var AppDetailedSchema = AppBaseSchema.extend({
  owner: z19.lazy(() => UserDetailedSchema).optional(),
  organization: z19.lazy(() => OrganizationDetailedSchema).optional()
});

// src/shared/schemas/usageLog.schema.ts
var FeatureEnum = z20.enum(AI_FEATURES);
var UsageLogBaseSchema = z20.object({
  id: z20.uuid(),
  userId: z20.string().nullable().optional(),
  organizationId: z20.string().nullable().optional(),
  appId: z20.string().nullable().optional(),
  endUserId: z20.string().nullable().optional(),
  apiKeyId: z20.string().nullable().optional(),
  feature: FeatureEnum.default("OTHER"),
  usage: z20.number(),
  unitCost: z20.number().nullable().optional(),
  billed: z20.boolean().default(false),
  sessionId: z20.string().nullable().optional(),
  createdAt: z20.date(),
  openMeterReported: z20.boolean().nullable().optional(),
  openMeterId: z20.string().nullable().optional(),
  deletedAt: z20.date().nullable().optional(),
  metadata: z20.record(z20.string(), z20.any()).optional()
});
var UsageLogReferenceSchema = UsageLogBaseSchema.pick({
  id: true,
  feature: true,
  usage: true,
  billed: true,
  createdAt: true,
  sessionId: true,
  appId: true,
  organizationId: true
});
var UsageLogDetailedSchema = UsageLogBaseSchema.extend({
  user: z20.lazy(() => UserReferenceSchema).nullable().optional(),
  organization: z20.lazy(() => OrganizationReferenceSchema).nullable().optional(),
  apiKey: z20.lazy(() => ApiKeyReferenceSchema).nullable().optional(),
  app: z20.lazy(() => AppReferenceSchema).nullable().optional(),
  endUser: z20.lazy(() => EndUserReferenceSchema).nullable().optional(),
  session: z20.lazy(() => UserSessionReferenceSchema).nullable().optional()
});

// src/shared/schemas/apiKey.schema.ts
var ApiKeyBaseSchema = z21.object({
  id: z21.uuid(),
  userId: z21.uuid().nullable().optional(),
  keyPrefix: z21.string(),
  hashedKey: z21.string(),
  name: z21.string().nullable().optional(),
  environment: z21.string().default("live"),
  revoked: z21.boolean().default(false),
  createdAt: z21.date(),
  updatedAt: z21.date()
});
var ApiKeyReferenceSchema = ApiKeyBaseSchema.pick({
  id: true,
  userId: true,
  keyPrefix: true,
  hashedKey: true,
  name: true,
  environment: true,
  revoked: true,
  createdAt: true,
  updatedAt: true
});
var ApiKeyDetailedSchema = ApiKeyBaseSchema.extend({
  scopes: z21.string().nullable().optional(),
  expiresAt: z21.date().nullable().optional(),
  lastUsedAt: z21.date().nullable().optional(),
  user: z21.lazy(() => UserReferenceSchema).optional().nullable(),
  usageLogs: z21.array(z21.lazy(() => UsageLogReferenceSchema)).optional(),
  modelUsages: z21.array(z21.lazy(() => ModelUsageReferenceSchema)).optional()
});
var CreateApiKeyInputSchema = z21.object({
  userId: z21.uuid(),
  name: z21.string().optional(),
  scopes: z21.array(z21.string()).optional(),
  environment: z21.enum(["test", "live"]).default("live")
});

// src/shared/schemas/modelUsage.schema.ts
var SessionMetricsSchema = z22.object({
  count: z22.number().nonnegative().default(0),
  avgLatencyMs: z22.number().nonnegative().default(0),
  p50LatencyMs: z22.number().nonnegative().default(0),
  p90LatencyMs: z22.number().nonnegative().default(0),
  p99LatencyMs: z22.number().nonnegative().default(0)
});
var CountMetricsSchema = z22.object({
  successCount: z22.number().int().nonnegative().default(0),
  failureCount: z22.number().int().nonnegative().default(0)
});
var ModelUsageBaseSchema = z22.object({
  id: z22.uuid(),
  userId: z22.uuid().optional(),
  organizationId: z22.uuid().optional(),
  apiKeyId: z22.uuid().optional(),
  appId: z22.uuid().optional(),
  model: z22.string(),
  vendor: z22.string(),
  modelVersion: z22.string().optional(),
  requestType: z22.string(),
  usageCount: z22.number().default(1),
  success: z22.boolean().default(true),
  successCount: z22.number().default(0),
  failureCount: z22.number().default(0),
  avgLatencyMs: z22.number().optional(),
  p50LatencyMs: z22.number().optional(),
  p90LatencyMs: z22.number().optional(),
  p99LatencyMs: z22.number().optional(),
  latencyMs: z22.number().optional(),
  throughput: z22.number().optional(),
  queueTimeMs: z22.number().optional(),
  errorType: z22.string().optional(),
  retryCount: z22.number().optional(),
  region: z22.string().optional(),
  promptLengthTokens: z22.number().optional(),
  responseLengthTokens: z22.number().optional(),
  unitCost: z22.number().optional(),
  totalCost: z22.number().optional(),
  billed: z22.boolean().default(false),
  discountApplied: z22.number().optional(),
  planTier: z22.string().optional(),
  temperature: z22.number().optional(),
  maxTokens: z22.number().optional(),
  totalTokens: z22.number().optional(),
  topP: z22.number().optional(),
  stopSequences: z22.array(z22.string()).optional(),
  embeddingDimension: z22.number().optional(),
  imageResolution: z22.string().optional(),
  sdkVersion: z22.string().optional(),
  userAgent: z22.string().optional(),
  language: z22.string().optional(),
  sessionId: z22.string().optional(),
  promptCategory: z22.string().optional(),
  responseQualityScore: z22.number().optional(),
  resourceConsumption: z22.number().optional(),
  concurrentRequests: z22.number().optional(),
  createdAt: z22.date(),
  updatedAt: z22.date(),
  deletedAt: z22.date().nullable().optional()
});
var ModelUsageInputSchema = ModelUsageBaseSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true
});
var ModelUsageReferenceSchema = ModelUsageBaseSchema.pick({
  id: true,
  model: true,
  vendor: true,
  requestType: true,
  createdAt: true,
  updatedAt: true
});
var ModelUsageDetailedSchema = ModelUsageBaseSchema.extend({
  user: z22.lazy(() => UserReferenceSchema).optional(),
  organization: z22.lazy(() => OrganizationReferenceSchema).optional(),
  apiKey: z22.lazy(() => ApiKeyReferenceSchema).optional(),
  app: z22.lazy(() => AppReferenceSchema).optional()
});

// src/shared/schemas/usagePayload.schema.ts
var UsagePayloadSchema = z23.object({
  feature: z23.enum(AI_FEATURES),
  usage: z23.number().min(0),
  sessionId: z23.uuid().optional(),
  appId: z23.string().optional(),
  endUserId: z23.string().optional(),
  organizationId: z23.string().optional(),
  ipAddress: z23.string().optional(),
  userAgent: z23.string().optional(),
  modelUsage: ModelUsageInputSchema.partial().optional(),
  metadata: z23.record(z23.string(), z23.any()).optional()
});

// src/utils/modelUsage.ts
import { z as z24 } from "zod";
function extractRequestFromFn(fn) {
  const fnStr = fn.toString();
  const argsMatch = fnStr.match(/\(\s*({[\s\S]*?})\s*\)/);
  if (!argsMatch) return {};
  let argStr = argsMatch[1];
  argStr = argStr.replace(/\/\/.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, "");
  argStr = argStr.replace(/([a-zA-Z0-9_]+)\s*:/g, '"$1":');
  argStr = argStr.replace(/,(\s*[}\]])/g, "$1");
  let braceCount = 0;
  let endIndex = 0;
  for (let i = 0; i < argStr.length; i++) {
    if (argStr[i] === "{") braceCount++;
    else if (argStr[i] === "}") braceCount--;
    if (braceCount === 0) {
      endIndex = i + 1;
      break;
    }
  }
  argStr = argStr.slice(0, endIndex);
  try {
    return JSON.parse(argStr);
  } catch (err) {
    console.warn("Failed to parse request object:", err);
    return {};
  }
}
function inferVendorFromModel(model) {
  const m = model.toLowerCase();
  if (m.startsWith("gpt-") || m.startsWith("text-") || m.startsWith("code-"))
    return "openai";
  if (m.startsWith("claude")) return "anthropic";
  if (m.startsWith("command-") || m.startsWith("xlarge-")) return "cohere";
  if (m.startsWith("palm-") || m.startsWith("gemini-")) return "google";
  if (m.startsWith("mistral-") || m.startsWith("mix-")) return "mistral";
  if (m.startsWith("cog-")) return "cogent";
  if (m.startsWith("jurassic-") || m.startsWith("j1-")) return "ai21";
  if (m.startsWith("llama-") || m.startsWith("alpaca-")) return "llama";
  return "unknown";
}
var RequestDataSchema = z24.object({
  model: z24.string(),
  modelVersion: z24.string().optional(),
  requestType: z24.string(),
  maxTokens: z24.number().optional(),
  temperature: z24.number().optional(),
  topP: z24.number().optional(),
  stopSequences: z24.array(z24.string()).optional(),
  prompt: z24.union([z24.string(), z24.array(z24.string())]).optional(),
  messages: z24.array(z24.object({ role: z24.string(), content: z24.string() })).optional(),
  sdkVersion: z24.string().optional(),
  userAgent: z24.string().optional(),
  promptCategory: z24.string().optional(),
  region: z24.string().optional()
});
var ResponseDataSchema = z24.object({
  promptLengthTokens: z24.number().optional(),
  responseLengthTokens: z24.number().optional(),
  totalTokens: z24.number().optional(),
  retryCount: z24.number().optional(),
  errorType: z24.string().optional()
});
function estimateTokens(input) {
  if (!input) return 0;
  if (Array.isArray(input))
    return input.map((p) => p.length).reduce((a, b) => a + b, 0) / 4;
  return input.length / 4;
}
async function captureModelUsage(fn) {
  const start = Date.now();
  const requestPayload = extractRequestFromFn(fn);
  const modelName = requestPayload.model ?? "unknown";
  const vendor = inferVendorFromModel(modelName);
  try {
    const result = await fn();
    const duration = Date.now() - start;
    let respData = result?.usage ?? {};
    if (respData.promptLengthTokens === void 0 && (requestPayload.prompt || requestPayload.messages)) {
      const promptTokens = estimateTokens(requestPayload.prompt) + estimateTokens(requestPayload.messages?.map((m) => m.content));
      respData = {
        promptLengthTokens: promptTokens,
        responseLengthTokens: 0,
        totalTokens: promptTokens
      };
    }
    const modelUsage = {
      model: modelName,
      vendor,
      modelVersion: requestPayload.modelVersion ?? result?.modelVersion,
      requestType: requestPayload.requestType ?? "unknown",
      sdkVersion: requestPayload.sdkVersion,
      userAgent: requestPayload.userAgent,
      promptCategory: requestPayload.promptCategory,
      region: requestPayload.region,
      maxTokens: requestPayload.maxTokens,
      promptLengthTokens: respData.promptLengthTokens ?? 0,
      responseLengthTokens: respData.responseLengthTokens ?? 0,
      totalTokens: respData.totalTokens,
      latencyMs: duration,
      errorType: void 0,
      retryCount: respData.retryCount
    };
    return { result, modelUsage };
  } catch (error) {
    const duration = Date.now() - start;
    const modelUsage = {
      model: modelName,
      vendor,
      modelVersion: requestPayload.modelVersion,
      requestType: requestPayload.requestType ?? "unknown",
      sdkVersion: requestPayload.sdkVersion,
      userAgent: requestPayload.userAgent,
      promptCategory: requestPayload.promptCategory,
      region: requestPayload.region,
      maxTokens: requestPayload.maxTokens,
      latencyMs: duration,
      errorType: error?.name ?? "Error",
      retryCount: void 0
    };
    const msg = error?.message ?? error?.statusText ?? "Unknown API error";
    const wrappedError = new Error(`BillAI API error: ${msg}`);
    wrappedError.modelUsage = modelUsage;
    throw wrappedError;
  }
}

// src/core/index.ts
var UsagePayloadArraySchema = z25.array(UsagePayloadSchema);
var UsageResponseSchema = z25.object({
  success: z25.boolean().default(false),
  log: z25.any().optional(),
  logs: z25.array(z25.any()).optional(),
  error: z25.string().optional()
});
var RevenueSplitSchema = z25.object({
  id: z25.string(),
  percent: z25.number().min(0).max(1)
});
var ChargeOptionsSchema = z25.object({
  usage: z25.number().nonnegative(),
  revSplit: z25.array(RevenueSplitSchema).optional(),
  appId: z25.string().optional(),
  organizationId: z25.string().optional(),
  endUserId: z25.string().optional(),
  metadata: z25.record(z25.string(), z25.any()).optional()
});
var BillAIError = class extends Error {
  status;
  details;
  causeType;
  constructor(message, options) {
    super(message);
    this.name = "BillAIError";
    this.status = options?.status;
    this.details = options?.details;
    this.causeType = options?.causeType ?? "unknown";
  }
};
var Bill = class {
  apiKey;
  baseUrl;
  retries;
  timeoutMs;
  constructor(config) {
    this.apiKey = config.apiKey;
    this.baseUrl = config.baseUrl ?? "https://billai-api.shmaplex.com/v1";
    this.retries = config.retries ?? 1;
    this.timeoutMs = config.timeoutMs ?? 1e4;
  }
  async fetchWithRetry(endpoint, options) {
    let attempt = 0;
    let lastError;
    while (attempt <= this.retries) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
        const res = await fetch(`${this.baseUrl}${endpoint}`, {
          ...options,
          signal: controller.signal
        });
        clearTimeout(timeout);
        return res;
      } catch (err) {
        lastError = err;
        attempt++;
        if (attempt > this.retries) break;
      }
    }
    throw new BillAIError("Network request failed", {
      details: lastError,
      causeType: "network"
    });
  }
  async handleResponse(response) {
    let json;
    try {
      json = await response.json();
    } catch (err) {
      throw new BillAIError("Invalid JSON response from BillAI API", {
        status: response.status,
        causeType: "api"
      });
    }
    if (!response.ok) {
      const msg = json?.error ?? `${response.status} ${response.statusText}`;
      throw new BillAIError(msg, {
        status: response.status,
        details: json,
        causeType: "api"
      });
    }
    try {
      return UsageResponseSchema.parse(json);
    } catch (err) {
      throw new BillAIError("Response validation failed", {
        details: err,
        causeType: "validation"
      });
    }
  }
  /**
   * Reports a single usage entry.
   */
  async reportUsage(data) {
    try {
      const parsed = UsagePayloadSchema.parse(data);
      const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : data.userAgent ?? "unknown";
      const ipAddress = data.ipAddress ?? "unknown";
      const payload = {
        feature: parsed.feature,
        usage: parsed.usage,
        sessionId: parsed.sessionId ?? uuidv4(),
        appId: parsed.appId,
        organizationId: parsed.organizationId,
        endUserId: parsed.endUserId,
        userAgent,
        ipAddress,
        modelUsage: parsed.modelUsage,
        metadata: parsed.metadata
      };
      const res = await this.fetchWithRetry("/usage", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const statusMessage = `${res.status} ${res.statusText}`.trim();
        throw new BillAIError(`BillAI API error: ${statusMessage}`, {
          status: res.status,
          causeType: "api",
          details: await res.json().catch(() => ({}))
        });
      }
      return this.handleResponse(res);
    } catch (err) {
      if (err instanceof BillAIError) throw err;
      const msg = err?.message ?? err?.statusText ?? "Unknown API error";
      throw new BillAIError(`BillAI API error: ${msg}`, {
        causeType: "client",
        details: err
      });
    }
  }
  /**
   * Reports multiple usage entries in bulk.
   */
  async reportUsageBulk(entries) {
    let parsedEntries;
    try {
      parsedEntries = UsagePayloadArraySchema.parse(entries);
    } catch (err) {
      throw new BillAIError("Invalid bulk usage payload", {
        details: err,
        causeType: "validation"
      });
    }
    const payload = parsedEntries.map((e) => ({
      ...e,
      sessionId: e.sessionId ?? uuidv4()
    }));
    const res = await this.fetchWithRetry("/usage/bulk", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    return this.handleResponse(res);
  }
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
  async trackUsage(fn, opts) {
    const { result, modelUsage } = await captureModelUsage(fn);
    const modelUsagePayload = {
      ...modelUsage,
      latencyMs: modelUsage.latencyMs ?? 0,
      avgLatencyMs: modelUsage.latencyMs ?? 0,
      billed: true,
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "node"
    };
    const usagePayload = {
      feature: opts.metric,
      usage: modelUsage.usageCount ?? 1,
      // fallback if usageCount not available
      sessionId: modelUsage.sessionId,
      appId: opts.appId,
      organizationId: opts.organizationId,
      endUserId: opts.userId,
      modelUsage: modelUsagePayload,
      metadata: opts.metadata
    };
    this.reportUsage(usagePayload).catch((err) => {
      console.error("BillAI usage reporting failed:", err);
    });
    return {
      result,
      duration: modelUsagePayload.latencyMs ?? 0,
      usage: usagePayload.usage > 0 ? usagePayload.usage : void 0
    };
  }
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
  async charge(opts) {
    const payload = {
      usage: opts.usage,
      revSplit: opts.revSplit,
      appId: opts.appId,
      organizationId: opts.organizationId,
      endUserId: opts.endUserId,
      metadata: opts.metadata
    };
    const res = await this.fetchWithRetry("/charge", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    return this.handleResponse(res);
  }
};
export {
  Bill,
  BillAIError,
  ChargeOptionsSchema,
  RevenueSplitSchema,
  UsageResponseSchema
};
//# sourceMappingURL=index.mjs.map