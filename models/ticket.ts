import mongoose, { Schema, type Document } from "mongoose"

export interface ITicket extends Document {
  userId: mongoose.Types.ObjectId
  subject: string
  description: string
  urgency: "low" | "medium" | "high" | "critical"
  category: string
  status: "open" | "in-progress" | "resolved" | "closed"
  createdAt: Date
  updatedAt: Date
  responses: Array<{
    userId: mongoose.Types.ObjectId
    isAdmin: boolean
    message: string
    createdAt: Date
  }>
}

const TicketResponseSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  isAdmin: { type: Boolean, default: false },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
})

const TicketSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    urgency: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    category: {
      type: String,
      enum: ["account", "billing", "technical", "feature-request", "raffle", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    responses: [TicketResponseSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

export default mongoose.models.Ticket || mongoose.model<ITicket>("Ticket", TicketSchema)

