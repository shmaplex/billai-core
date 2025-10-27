"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Bill: () => Bill,
  BillAIError: () => BillAIError,
  ChargeOptionsSchema: () => ChargeOptionsSchema,
  RevenueSplitSchema: () => RevenueSplitSchema,
  UsageResponseSchema: () => UsageResponseSchema
});
module.exports = __toCommonJS(index_exports);

// src/core/index.ts
var import_cross_fetch = __toESM(require("cross-fetch"));
var import_uuid = require("uuid");
var import_zod25 = require("zod");

// src/shared/schemas/usagePayload.schema.ts
var import_zod23 = require("zod");

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
var import_zod22 = require("zod");

// src/shared/schemas/apiKey.schema.ts
var import_zod21 = require("zod");

// src/shared/schemas/usageLog.schema.ts
var import_zod20 = require("zod");

// src/shared/schemas/app.schema.ts
var import_zod19 = require("zod");

// src/shared/schemas/organization.schema.ts
var import_zod18 = require("zod");

// src/shared/schemas/user.schema.ts
var import_zod17 = require("zod");

// src/shared/schemas/alert.schema.ts
var import_zod = require("zod");
var AlertBaseSchema = import_zod.z.object({
  id: import_zod.z.uuid(),
  userId: import_zod.z.uuid(),
  appId: import_zod.z.uuid().optional().nullable(),
  type: import_zod.z.string(),
  message: import_zod.z.string(),
  triggeredAt: import_zod.z.date(),
  isRead: import_zod.z.boolean().default(false)
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
  user: import_zod.z.lazy(() => UserReferenceSchema),
  app: import_zod.z.lazy(() => AppReferenceSchema).optional().nullable()
});

// src/shared/schemas/appApiKey.schema.ts
var import_zod2 = require("zod");
var AppApiKeyBaseSchema = import_zod2.z.object({
  appId: import_zod2.z.string(),
  key: import_zod2.z.string(),
  createdByUserId: import_zod2.z.string().optional(),
  expiresAt: import_zod2.z.date().optional()
});
var AppApiKeyReferenceSchema = AppApiKeyBaseSchema.extend({
  id: import_zod2.z.uuid(),
  createdAt: import_zod2.z.date()
});
var AppApiKeyDetailedSchema = AppApiKeyReferenceSchema.extend({
  app: import_zod2.z.lazy(() => AppReferenceSchema),
  createdBy: import_zod2.z.lazy(() => UserReferenceSchema).optional()
});

// src/shared/schemas/auditLog.schema.ts
var import_zod3 = require("zod");
var AuditLogBaseSchema = import_zod3.z.object({
  id: import_zod3.z.uuid(),
  userId: import_zod3.z.uuid(),
  action: import_zod3.z.string().min(1, "Action is required."),
  details: import_zod3.z.string().optional(),
  createdAt: import_zod3.z.date(),
  appId: import_zod3.z.uuid().optional()
});
var AuditLogReferenceSchema = AuditLogBaseSchema.pick({
  id: true,
  action: true,
  createdAt: true
});
var AuditLogDetailedSchema = AuditLogBaseSchema.extend({
  user: import_zod3.z.lazy(() => UserReferenceSchema),
  app: import_zod3.z.lazy(() => AppReferenceSchema).optional()
});

// src/shared/schemas/invoice.schema.ts
var import_zod7 = require("zod");

// src/shared/schemas/charge.schema.ts
var import_zod5 = require("zod");

// src/shared/schemas/endUser.schema.ts
var import_zod4 = require("zod");
var EndUserBaseSchema = import_zod4.z.object({
  id: import_zod4.z.uuid(),
  appId: import_zod4.z.uuid(),
  externalId: import_zod4.z.string(),
  email: import_zod4.z.email().optional(),
  createdAt: import_zod4.z.date(),
  updatedAt: import_zod4.z.date(),
  deletedAt: import_zod4.z.date().optional()
});
var EndUserReferenceSchema = EndUserBaseSchema.pick({
  id: true,
  appId: true,
  externalId: true,
  email: true
});
var EndUserDetailedSchema = EndUserBaseSchema.extend({
  app: import_zod4.z.lazy(() => AppReferenceSchema).optional(),
  invoices: import_zod4.z.array(import_zod4.z.lazy(() => InvoiceReferenceSchema)).optional(),
  charges: import_zod4.z.array(import_zod4.z.lazy(() => ChargeReferenceSchema)).optional(),
  usageLogs: import_zod4.z.array(import_zod4.z.any()).optional(),
  // replace with UsageLogReferenceSchema when available
  eventLogs: import_zod4.z.array(import_zod4.z.any()).optional(),
  // replace with EventLogReferenceSchema
  usageLimits: import_zod4.z.array(import_zod4.z.any()).optional(),
  // replace with UsageLimitReferenceSchema
  sdkLogs: import_zod4.z.array(import_zod4.z.any()).optional()
  // replace with SdkLogReferenceSchema
});

// src/shared/schemas/charge.schema.ts
var ChargeBaseSchema = import_zod5.z.object({
  id: import_zod5.z.uuid(),
  invoiceId: import_zod5.z.uuid().optional(),
  endUserId: import_zod5.z.uuid().optional(),
  appId: import_zod5.z.uuid(),
  amount: import_zod5.z.number().nonnegative(),
  status: import_zod5.z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]),
  createdAt: import_zod5.z.date(),
  paidAt: import_zod5.z.date().optional(),
  deletedAt: import_zod5.z.date().optional()
});
var ChargeReferenceSchema = ChargeBaseSchema.pick({
  id: true,
  appId: true,
  amount: true,
  status: true,
  createdAt: true
});
var ChargeDetailedSchema = ChargeBaseSchema.extend({
  invoice: import_zod5.z.lazy(() => InvoiceReferenceSchema).optional(),
  endUser: import_zod5.z.lazy(() => EndUserReferenceSchema).optional(),
  app: import_zod5.z.lazy(() => AppReferenceSchema)
});

// src/shared/schemas/invoiceItem.schema.ts
var import_zod6 = require("zod");
var InvoiceItemBaseSchema = import_zod6.z.object({
  id: import_zod6.z.uuid(),
  invoiceId: import_zod6.z.uuid(),
  description: import_zod6.z.string(),
  amount: import_zod6.z.number(),
  quantity: import_zod6.z.number().default(1),
  createdAt: import_zod6.z.date()
});
var InvoiceItemReferenceSchema = InvoiceItemBaseSchema.pick({
  id: true,
  description: true,
  amount: true,
  quantity: true
});
var InvoiceItemDetailedSchema = InvoiceItemBaseSchema.extend({
  invoice: import_zod6.z.lazy(() => InvoiceReferenceSchema).optional()
});

// src/shared/schemas/invoice.schema.ts
var InvoiceBaseSchema = import_zod7.z.object({
  id: import_zod7.z.uuid(),
  userId: import_zod7.z.uuid(),
  appId: import_zod7.z.uuid().optional(),
  endUserId: import_zod7.z.uuid().optional(),
  amount: import_zod7.z.number(),
  currency: import_zod7.z.string(),
  paid: import_zod7.z.boolean(),
  createdAt: import_zod7.z.date(),
  updatedAt: import_zod7.z.date(),
  dueDate: import_zod7.z.date().optional(),
  paidAt: import_zod7.z.date().optional(),
  deletedAt: import_zod7.z.date().optional()
});
var InvoiceReferenceSchema = InvoiceBaseSchema.pick({
  id: true,
  amount: true,
  currency: true,
  paid: true,
  createdAt: true
});
var InvoiceDetailedSchema = InvoiceBaseSchema.extend({
  user: import_zod7.z.lazy(() => UserReferenceSchema).optional(),
  app: import_zod7.z.lazy(() => AppReferenceSchema).optional(),
  endUser: import_zod7.z.lazy(() => EndUserReferenceSchema).optional(),
  items: import_zod7.z.array(import_zod7.z.lazy(() => InvoiceItemReferenceSchema)).optional(),
  charges: import_zod7.z.array(import_zod7.z.lazy(() => ChargeReferenceSchema)).optional()
});

// src/shared/schemas/mfa.schema.ts
var import_zod8 = require("zod");
var MFABaseSchema = import_zod8.z.object({
  id: import_zod8.z.uuid(),
  userId: import_zod8.z.uuid(),
  type: import_zod8.z.string(),
  secret: import_zod8.z.string(),
  enabled: import_zod8.z.boolean().default(false),
  createdAt: import_zod8.z.date(),
  updatedAt: import_zod8.z.date()
});
var MFAReferenceSchema = MFABaseSchema.pick({
  id: true,
  type: true,
  enabled: true
});
var MFADetailedSchema = MFABaseSchema.extend({
  user: import_zod8.z.lazy(() => UserReferenceSchema).optional()
});

// src/shared/schemas/plan.schema.ts
var import_zod11 = require("zod");

// src/shared/schemas/organizationPlan.schema.ts
var import_zod9 = require("zod");
var OrganizationPlanBaseSchema = import_zod9.z.object({
  id: import_zod9.z.uuid(),
  organizationId: import_zod9.z.uuid().optional(),
  planId: import_zod9.z.uuid().optional(),
  startDate: import_zod9.z.date(),
  endDate: import_zod9.z.date().nullable().optional(),
  createdAt: import_zod9.z.date(),
  updatedAt: import_zod9.z.date()
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
    organization: import_zod9.z.lazy(() => OrganizationReferenceSchema).optional(),
    plan: import_zod9.z.lazy(() => PlanReferenceSchema).optional()
  }
);

// src/shared/schemas/planFeature.schema.ts
var import_zod10 = require("zod");
var PlanFeatureBaseSchema = import_zod10.z.object({
  id: import_zod10.z.uuid(),
  planId: import_zod10.z.uuid(),
  name: import_zod10.z.string(),
  limit: import_zod10.z.number().optional(),
  price: import_zod10.z.number().optional(),
  metadata: import_zod10.z.any().optional(),
  createdAt: import_zod10.z.date()
});
var PlanFeatureReferenceSchema = PlanFeatureBaseSchema.pick({
  id: true,
  name: true
});
var PlanFeatureDetailedSchema = PlanFeatureBaseSchema.extend({
  plan: import_zod10.z.lazy(() => PlanReferenceSchema).optional()
});

// src/shared/schemas/plan.schema.ts
var PlanBaseSchema = import_zod11.z.object({
  id: import_zod11.z.uuid(),
  name: import_zod11.z.string(),
  price: import_zod11.z.number(),
  maxUsage: import_zod11.z.number().optional(),
  interval: import_zod11.z.string().default("monthly"),
  features: import_zod11.z.string().optional(),
  createdAt: import_zod11.z.date(),
  updatedAt: import_zod11.z.date()
});
var PlanReferenceSchema = PlanBaseSchema.pick({
  id: true,
  name: true,
  price: true,
  maxUsage: true
});
var PlanDetailedSchema = PlanBaseSchema.extend({
  users: import_zod11.z.array(import_zod11.z.lazy(() => UserReferenceSchema)).optional(),
  organizationPlans: import_zod11.z.array(import_zod11.z.lazy(() => OrganizationPlanReferenceSchema)).optional(),
  planFeatures: import_zod11.z.array(import_zod11.z.lazy(() => PlanFeatureReferenceSchema)).optional()
});

// src/shared/schemas/revenueSplit.schema.ts
var import_zod12 = require("zod");
var RevenueSplitBaseSchema = import_zod12.z.object({
  id: import_zod12.z.uuid(),
  appId: import_zod12.z.uuid(),
  recipientId: import_zod12.z.uuid().optional(),
  percent: import_zod12.z.number(),
  createdAt: import_zod12.z.date(),
  deletedAt: import_zod12.z.date().optional()
});
var RevenueSplitReferenceSchema = RevenueSplitBaseSchema.pick({
  id: true,
  percent: true
});
var RevenueSplitDetailedSchema = RevenueSplitBaseSchema.extend({
  app: import_zod12.z.lazy(() => AppReferenceSchema),
  recipient: import_zod12.z.lazy(() => UserReferenceSchema).optional()
});

// src/shared/schemas/review.schema.ts
var import_zod13 = require("zod");
var ReviewStatusEnum = import_zod13.z.enum(["PENDING", "APPROVED", "REJECTED"]);
var ReviewBaseSchema = import_zod13.z.object({
  id: import_zod13.z.uuid(),
  reviewerId: import_zod13.z.uuid(),
  resourceType: import_zod13.z.string(),
  resourceId: import_zod13.z.string(),
  status: ReviewStatusEnum,
  notes: import_zod13.z.string().nullable().optional(),
  createdAt: import_zod13.z.date(),
  updatedAt: import_zod13.z.date()
});
var ReviewReferenceSchema = ReviewBaseSchema.pick({
  id: true,
  status: true,
  resourceType: true,
  resourceId: true
});
var ReviewDetailedSchema = ReviewBaseSchema.extend({
  reviewer: import_zod13.z.lazy(() => UserReferenceSchema)
});

// src/shared/schemas/role.schema.ts
var import_zod14 = require("zod");
var RoleBaseSchema = import_zod14.z.object({
  id: import_zod14.z.uuid(),
  name: import_zod14.z.string(),
  description: import_zod14.z.string().optional(),
  permissions: import_zod14.z.string().optional(),
  createdBy: import_zod14.z.string().optional(),
  updatedBy: import_zod14.z.string().optional()
});
var RoleReferenceSchema = RoleBaseSchema.pick({
  id: true,
  name: true
});
var RoleDetailedSchema = RoleBaseSchema.extend({
  users: import_zod14.z.array(import_zod14.z.lazy(() => UserReferenceSchema)).optional()
});

// src/shared/schemas/userPreferences.schema.ts
var import_zod15 = require("zod");
var UserPreferencesBaseSchema = import_zod15.z.object({
  id: import_zod15.z.uuid(),
  userId: import_zod15.z.uuid(),
  timezone: import_zod15.z.string().optional(),
  locale: import_zod15.z.string().optional(),
  language: import_zod15.z.string().optional(),
  emailNotifications: import_zod15.z.boolean().default(true),
  darkMode: import_zod15.z.boolean().default(false),
  createdAt: import_zod15.z.date(),
  updatedAt: import_zod15.z.date()
});
var UserPreferencesReferenceSchema = UserPreferencesBaseSchema.pick({
  id: true,
  userId: true,
  emailNotifications: true,
  darkMode: true
});
var UserPreferencesDetailedSchema = UserPreferencesBaseSchema.extend({
  user: import_zod15.z.lazy(() => UserReferenceSchema).optional()
});

// src/shared/schemas/userSession.schema.ts
var import_zod16 = require("zod");
var UserSessionBaseSchema = import_zod16.z.object({
  id: import_zod16.z.uuid(),
  userId: import_zod16.z.uuid(),
  expiresAt: import_zod16.z.date(),
  ipAddress: import_zod16.z.string().optional(),
  userAgent: import_zod16.z.string().optional(),
  createdAt: import_zod16.z.date(),
  updatedAt: import_zod16.z.date()
});
var UserSessionReferenceSchema = UserSessionBaseSchema.pick({
  id: true,
  userId: true,
  expiresAt: true,
  createdAt: true
});
var UserSessionDetailedSchema = UserSessionBaseSchema.extend({
  user: import_zod16.z.lazy(() => UserReferenceSchema).optional(),
  usageLogs: import_zod16.z.array(import_zod16.z.lazy(() => UsageLogReferenceSchema)).optional()
});

// src/shared/schemas/user.schema.ts
var UserBaseSchema = import_zod17.z.object({
  id: import_zod17.z.uuid(),
  email: import_zod17.z.email(),
  password: import_zod17.z.string().optional().nullable(),
  fullName: import_zod17.z.string().optional().nullable(),
  phone: import_zod17.z.string().optional().nullable(),
  bio: import_zod17.z.string().optional().nullable(),
  title: import_zod17.z.string().optional().nullable(),
  authId: import_zod17.z.string(),
  provider: import_zod17.z.string(),
  isActive: import_zod17.z.boolean().default(true),
  isVerified: import_zod17.z.boolean().default(false),
  avatarUrl: import_zod17.z.string().optional().nullable(),
  locale: import_zod17.z.string().optional().nullable(),
  timezone: import_zod17.z.string().optional().nullable(),
  language: import_zod17.z.string().optional().nullable(),
  roleId: import_zod17.z.uuid().nullable().optional(),
  organizationId: import_zod17.z.uuid().nullable().optional(),
  planId: import_zod17.z.uuid().nullable().optional(),
  createdAt: import_zod17.z.date(),
  updatedAt: import_zod17.z.date(),
  deletedAt: import_zod17.z.date().optional().nullable()
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
  role: import_zod17.z.lazy(() => RoleReferenceSchema).optional().nullable(),
  organization: import_zod17.z.lazy(() => OrganizationReferenceSchema).optional().nullable(),
  plan: import_zod17.z.lazy(() => PlanReferenceSchema).optional().nullable(),
  // ─────────── Nested Collections ───────────
  sessions: import_zod17.z.array(import_zod17.z.lazy(() => UserSessionReferenceSchema)).optional(),
  invoices: import_zod17.z.array(import_zod17.z.lazy(() => InvoiceReferenceSchema)).optional(),
  apiKeys: import_zod17.z.array(import_zod17.z.lazy(() => ApiKeyReferenceSchema)).optional(),
  auditLogs: import_zod17.z.array(import_zod17.z.lazy(() => AuditLogReferenceSchema)).optional(),
  preferences: import_zod17.z.lazy(() => UserPreferencesReferenceSchema).optional().nullable(),
  mfaSettings: import_zod17.z.array(import_zod17.z.lazy(() => MFAReferenceSchema)).optional(),
  reviews: import_zod17.z.array(import_zod17.z.lazy(() => ReviewReferenceSchema)).optional(),
  modelUsages: import_zod17.z.array(import_zod17.z.lazy(() => ModelUsageReferenceSchema)).optional(),
  revenueSplits: import_zod17.z.array(import_zod17.z.lazy(() => RevenueSplitReferenceSchema)).optional(),
  apps: import_zod17.z.array(import_zod17.z.lazy(() => AppReferenceSchema)).optional(),
  alerts: import_zod17.z.array(import_zod17.z.lazy(() => AlertReferenceSchema)).optional(),
  appApiKeys: import_zod17.z.array(import_zod17.z.lazy(() => AppApiKeyReferenceSchema)).optional(),
  usageLogs: import_zod17.z.array(import_zod17.z.lazy(() => UsageLogReferenceSchema)).optional()
});

// src/shared/schemas/organization.schema.ts
var OrganizationBaseSchema = import_zod18.z.object({
  id: import_zod18.z.uuid(),
  name: import_zod18.z.string(),
  domain: import_zod18.z.string().nullable().optional(),
  createdAt: import_zod18.z.date(),
  updatedAt: import_zod18.z.date()
});
var OrganizationReferenceSchema = OrganizationBaseSchema.pick({
  id: true,
  name: true,
  domain: true
});
var OrganizationDetailedSchema = OrganizationBaseSchema.extend({
  users: import_zod18.z.array(import_zod18.z.lazy(() => UserReferenceSchema)).optional(),
  apps: import_zod18.z.array(import_zod18.z.lazy(() => AppReferenceSchema)).optional(),
  modelUsages: import_zod18.z.array(import_zod18.z.lazy(() => ModelUsageReferenceSchema)).optional()
});
var CreateOrganizationInputSchema = import_zod18.z.object({
  name: import_zod18.z.string().min(1),
  domain: import_zod18.z.string().optional()
});
var UpdateOrganizationInputSchema = import_zod18.z.object({
  name: import_zod18.z.string().min(1).optional(),
  domain: import_zod18.z.string().optional()
});

// src/shared/schemas/app.schema.ts
var AppBaseSchema = import_zod19.z.object({
  id: import_zod19.z.uuid(),
  name: import_zod19.z.string(),
  description: import_zod19.z.string().optional(),
  ownerId: import_zod19.z.string().optional(),
  organizationId: import_zod19.z.string().optional(),
  createdAt: import_zod19.z.date(),
  updatedAt: import_zod19.z.date(),
  deletedAt: import_zod19.z.date().optional(),
  isActive: import_zod19.z.boolean().default(true)
});
var AppReferenceSchema = AppBaseSchema.extend({
  owner: import_zod19.z.lazy(() => UserReferenceSchema).optional(),
  organization: import_zod19.z.lazy(() => OrganizationReferenceSchema).optional()
});
var AppDetailedSchema = AppBaseSchema.extend({
  owner: import_zod19.z.lazy(() => UserDetailedSchema).optional(),
  organization: import_zod19.z.lazy(() => OrganizationDetailedSchema).optional()
});

// src/shared/schemas/usageLog.schema.ts
var FeatureEnum = import_zod20.z.enum(AI_FEATURES);
var UsageLogBaseSchema = import_zod20.z.object({
  id: import_zod20.z.uuid(),
  userId: import_zod20.z.string().nullable().optional(),
  organizationId: import_zod20.z.string().nullable().optional(),
  appId: import_zod20.z.string().nullable().optional(),
  endUserId: import_zod20.z.string().nullable().optional(),
  apiKeyId: import_zod20.z.string().nullable().optional(),
  feature: FeatureEnum.default("OTHER"),
  usage: import_zod20.z.number(),
  unitCost: import_zod20.z.number().nullable().optional(),
  billed: import_zod20.z.boolean().default(false),
  sessionId: import_zod20.z.string().nullable().optional(),
  createdAt: import_zod20.z.date(),
  openMeterReported: import_zod20.z.boolean().nullable().optional(),
  openMeterId: import_zod20.z.string().nullable().optional(),
  deletedAt: import_zod20.z.date().nullable().optional(),
  metadata: import_zod20.z.record(import_zod20.z.string(), import_zod20.z.any()).optional()
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
  user: import_zod20.z.lazy(() => UserReferenceSchema).nullable().optional(),
  organization: import_zod20.z.lazy(() => OrganizationReferenceSchema).nullable().optional(),
  apiKey: import_zod20.z.lazy(() => ApiKeyReferenceSchema).nullable().optional(),
  app: import_zod20.z.lazy(() => AppReferenceSchema).nullable().optional(),
  endUser: import_zod20.z.lazy(() => EndUserReferenceSchema).nullable().optional(),
  session: import_zod20.z.lazy(() => UserSessionReferenceSchema).nullable().optional()
});

// src/shared/schemas/apiKey.schema.ts
var ApiKeyBaseSchema = import_zod21.z.object({
  id: import_zod21.z.uuid(),
  userId: import_zod21.z.uuid().nullable().optional(),
  keyPrefix: import_zod21.z.string(),
  hashedKey: import_zod21.z.string(),
  name: import_zod21.z.string().nullable().optional(),
  environment: import_zod21.z.string().default("live"),
  revoked: import_zod21.z.boolean().default(false),
  createdAt: import_zod21.z.date(),
  updatedAt: import_zod21.z.date()
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
  scopes: import_zod21.z.string().nullable().optional(),
  expiresAt: import_zod21.z.date().nullable().optional(),
  lastUsedAt: import_zod21.z.date().nullable().optional(),
  user: import_zod21.z.lazy(() => UserReferenceSchema).optional().nullable(),
  usageLogs: import_zod21.z.array(import_zod21.z.lazy(() => UsageLogReferenceSchema)).optional(),
  modelUsages: import_zod21.z.array(import_zod21.z.lazy(() => ModelUsageReferenceSchema)).optional()
});
var CreateApiKeyInputSchema = import_zod21.z.object({
  userId: import_zod21.z.uuid(),
  name: import_zod21.z.string().optional(),
  scopes: import_zod21.z.array(import_zod21.z.string()).optional(),
  environment: import_zod21.z.enum(["test", "live"]).default("live")
});

// src/shared/schemas/modelUsage.schema.ts
var SessionMetricsSchema = import_zod22.z.object({
  count: import_zod22.z.number().nonnegative().default(0),
  avgLatencyMs: import_zod22.z.number().nonnegative().default(0),
  p50LatencyMs: import_zod22.z.number().nonnegative().default(0),
  p90LatencyMs: import_zod22.z.number().nonnegative().default(0),
  p99LatencyMs: import_zod22.z.number().nonnegative().default(0)
});
var CountMetricsSchema = import_zod22.z.object({
  successCount: import_zod22.z.number().int().nonnegative().default(0),
  failureCount: import_zod22.z.number().int().nonnegative().default(0)
});
var ModelUsageBaseSchema = import_zod22.z.object({
  id: import_zod22.z.uuid(),
  userId: import_zod22.z.uuid().optional(),
  organizationId: import_zod22.z.uuid().optional(),
  apiKeyId: import_zod22.z.uuid().optional(),
  appId: import_zod22.z.uuid().optional(),
  model: import_zod22.z.string(),
  vendor: import_zod22.z.string(),
  modelVersion: import_zod22.z.string().optional(),
  requestType: import_zod22.z.string(),
  usageCount: import_zod22.z.number().default(1),
  success: import_zod22.z.boolean().default(true),
  successCount: import_zod22.z.number().default(0),
  failureCount: import_zod22.z.number().default(0),
  avgLatencyMs: import_zod22.z.number().optional(),
  p50LatencyMs: import_zod22.z.number().optional(),
  p90LatencyMs: import_zod22.z.number().optional(),
  p99LatencyMs: import_zod22.z.number().optional(),
  latencyMs: import_zod22.z.number().optional(),
  throughput: import_zod22.z.number().optional(),
  queueTimeMs: import_zod22.z.number().optional(),
  errorType: import_zod22.z.string().optional(),
  retryCount: import_zod22.z.number().optional(),
  region: import_zod22.z.string().optional(),
  promptLengthTokens: import_zod22.z.number().optional(),
  responseLengthTokens: import_zod22.z.number().optional(),
  unitCost: import_zod22.z.number().optional(),
  totalCost: import_zod22.z.number().optional(),
  billed: import_zod22.z.boolean().default(false),
  discountApplied: import_zod22.z.number().optional(),
  planTier: import_zod22.z.string().optional(),
  temperature: import_zod22.z.number().optional(),
  maxTokens: import_zod22.z.number().optional(),
  totalTokens: import_zod22.z.number().optional(),
  topP: import_zod22.z.number().optional(),
  stopSequences: import_zod22.z.array(import_zod22.z.string()).optional(),
  embeddingDimension: import_zod22.z.number().optional(),
  imageResolution: import_zod22.z.string().optional(),
  sdkVersion: import_zod22.z.string().optional(),
  userAgent: import_zod22.z.string().optional(),
  language: import_zod22.z.string().optional(),
  sessionId: import_zod22.z.string().optional(),
  promptCategory: import_zod22.z.string().optional(),
  responseQualityScore: import_zod22.z.number().optional(),
  resourceConsumption: import_zod22.z.number().optional(),
  concurrentRequests: import_zod22.z.number().optional(),
  createdAt: import_zod22.z.date(),
  updatedAt: import_zod22.z.date(),
  deletedAt: import_zod22.z.date().nullable().optional()
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
  user: import_zod22.z.lazy(() => UserReferenceSchema).optional(),
  organization: import_zod22.z.lazy(() => OrganizationReferenceSchema).optional(),
  apiKey: import_zod22.z.lazy(() => ApiKeyReferenceSchema).optional(),
  app: import_zod22.z.lazy(() => AppReferenceSchema).optional()
});

// src/shared/schemas/usagePayload.schema.ts
var UsagePayloadSchema = import_zod23.z.object({
  feature: import_zod23.z.enum(AI_FEATURES),
  usage: import_zod23.z.number().min(0),
  sessionId: import_zod23.z.uuid().optional(),
  appId: import_zod23.z.string().optional(),
  endUserId: import_zod23.z.string().optional(),
  organizationId: import_zod23.z.string().optional(),
  ipAddress: import_zod23.z.string().optional(),
  userAgent: import_zod23.z.string().optional(),
  modelUsage: ModelUsageInputSchema.partial().optional(),
  metadata: import_zod23.z.record(import_zod23.z.string(), import_zod23.z.any()).optional()
});

// src/utils/modelUsage.ts
var import_zod24 = require("zod");
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
var RequestDataSchema = import_zod24.z.object({
  model: import_zod24.z.string(),
  modelVersion: import_zod24.z.string().optional(),
  requestType: import_zod24.z.string(),
  maxTokens: import_zod24.z.number().optional(),
  temperature: import_zod24.z.number().optional(),
  topP: import_zod24.z.number().optional(),
  stopSequences: import_zod24.z.array(import_zod24.z.string()).optional(),
  prompt: import_zod24.z.union([import_zod24.z.string(), import_zod24.z.array(import_zod24.z.string())]).optional(),
  messages: import_zod24.z.array(import_zod24.z.object({ role: import_zod24.z.string(), content: import_zod24.z.string() })).optional(),
  sdkVersion: import_zod24.z.string().optional(),
  userAgent: import_zod24.z.string().optional(),
  promptCategory: import_zod24.z.string().optional(),
  region: import_zod24.z.string().optional()
});
var ResponseDataSchema = import_zod24.z.object({
  promptLengthTokens: import_zod24.z.number().optional(),
  responseLengthTokens: import_zod24.z.number().optional(),
  totalTokens: import_zod24.z.number().optional(),
  retryCount: import_zod24.z.number().optional(),
  errorType: import_zod24.z.string().optional()
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
var UsagePayloadArraySchema = import_zod25.z.array(UsagePayloadSchema);
var UsageResponseSchema = import_zod25.z.object({
  success: import_zod25.z.boolean().default(false),
  log: import_zod25.z.any().optional(),
  logs: import_zod25.z.array(import_zod25.z.any()).optional(),
  error: import_zod25.z.string().optional()
});
var RevenueSplitSchema = import_zod25.z.object({
  id: import_zod25.z.string(),
  percent: import_zod25.z.number().min(0).max(1)
});
var ChargeOptionsSchema = import_zod25.z.object({
  usage: import_zod25.z.number().nonnegative(),
  revSplit: import_zod25.z.array(RevenueSplitSchema).optional(),
  appId: import_zod25.z.string().optional(),
  organizationId: import_zod25.z.string().optional(),
  endUserId: import_zod25.z.string().optional(),
  metadata: import_zod25.z.record(import_zod25.z.string(), import_zod25.z.any()).optional()
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
        const res = await (0, import_cross_fetch.default)(`${this.baseUrl}${endpoint}`, {
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
        sessionId: parsed.sessionId ?? (0, import_uuid.v4)(),
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
      sessionId: e.sessionId ?? (0, import_uuid.v4)()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bill,
  BillAIError,
  ChargeOptionsSchema,
  RevenueSplitSchema,
  UsageResponseSchema
});
//# sourceMappingURL=index.js.map