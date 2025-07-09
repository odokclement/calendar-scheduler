//define tables

import { DAYS_OF_WEEK_IN_ORDER } from "@/constants";
import { relations } from "drizzle-orm";
import {
  boolean,
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

//define reusable created_at timestamp column with default value now()

const createdAt = timestamp("createdAt").notNull().defaultNow();
//define reusable updated_at timestamp column with default value now() and on update current_timestamp
const updatedAt = timestamp("updatedAt")
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date()); // auto update the timestamp on update

//events table
export const EventTable = pgTable(
  "events", // table name
  {
    id: uuid("id").primaryKey().defaultRandom(), // primary key
    name: text("name").notNull(), // event name
    description: text("description"), //optional event description
    durationInMinutes: integer("duration_in_minutes").notNull(), // event duration in minutes
    clerkUserId: text("clerk_user_id").notNull(), // clerk user id
    isActive: boolean("isActive").default(true), // event status
    createdAt,
    updatedAt,
  },
  (table) => [
    index("clerkUserId").on(table.clerkUserId), // index on clerkUserId for faster lookups
  ]
);

// define schedule table, one per user, with timestamps and timezone
export const ScheduleTable = pgTable("schedules", {
  id: uuid("id").primaryKey().defaultRandom(), // primary key
  clerkUserId: text("clerkUserId").notNull(), // clerk user id
  timezone: text("timezone").notNull(), // user's timezone
  createdAt,
  updatedAt,
});

//define relationships for schedule table: a schedule can have many availability slots
export const scheduleRelationships = relations(ScheduleTable, ({ many }) => ({
    availability: many(ScheduleAvailabilityTable), // one schedule can have many availability slots
    })
);


// define  postgresSql enum for days of the week
export const scheduleDayOfWeekEnum = pgEnum("day",DAYS_OF_WEEK_IN_ORDER);

// schedule availability table , which stores available time slots per day
export const ScheduleAvailabilityTable = pgTable(
  "scheduleAvailability",
  {
    id: uuid("id").primaryKey().defaultRandom(), // primary key
    scheduleId: uuid("scheduleId")// foreign key to schedules table
      .notNull()
      .references(() => ScheduleTable.id, { onDelete: "cascade" }),//cascade delete on schedule deletion
    dayOfWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(), // day of the week (0-6)
    startTime: timestamp("startTime").notNull(), // start time of the availability
    endTime: timestamp("endTime").notNull(), // end time of the availability
    createdAt,
    updatedAt,
  },
  (table) => [
    index("scheduleId").on(table.scheduleId), // index on scheduleId for faster lookups
  ]
);

//define the reverse relationships : each  availability slot belongs to a schedule
export const scheduleAvailabilityRelationships = relations(
  ScheduleAvailabilityTable,
  ({ one }) => ({
    schedule: one(ScheduleTable, {
      fields: [ScheduleAvailabilityTable.scheduleId],
      references: [ScheduleTable.id],// foreign key relationship
    }), // each availability slot belongs to a schedule
  })
); 
