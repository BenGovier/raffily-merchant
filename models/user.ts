import mongoose, { Schema } from "mongoose"
import bcrypt from "bcryptjs"

// Define the user schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    role: {
      type: String,
      enum: ["admin", "merchant", "user"],
      default: "user",
    },
    stripeCustomerId: {
      type: String,
    },
    defaultPaymentMethodId: {
      type: String,
    },
    hasPaymentMethod: {
      type: Boolean,
      default: false,
    },
    isDemo: {
      type: Boolean,
      default: false,
    },
    company: { type: String },
    companyLogo: { type: String },
    website: { type: String },
    industry: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    postalCode: { type: String },
    country: { type: String },
    phone: { type: String },
    billingEmail: { type: String },
  },
  {
    timestamps: true,
  },
)

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error: any) {
    next(error)
  }
})

// Method to compare password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password)
}

// Static method to find user by email
userSchema.statics.findByEmail = async function (email: string) {
  return this.findOne({ email })
}

// Static method to find user by ID
userSchema.statics.findById = async function (id: string | mongoose.Types.ObjectId) {
  return this.findOne({ _id: id })
}

// Static method to update password
userSchema.statics.updatePassword = async function (id: string | mongoose.Types.ObjectId, password: string) {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const result = await this.findByIdAndUpdate(id, { password: hashedPassword })
  return !!result
}

userSchema.statics.list = async function (page = 1, limit = 20, role?: string) {
  const query = role ? { role } : {}
  const skip = (page - 1) * limit
  return this.find(query).skip(skip).limit(limit).sort({ createdAt: -1 })
}

// Static method for authentication
userSchema.statics.authenticate = async function (email: string, password: string) {
  const user = await this.findByEmail(email)
  if (!user) return null
  const isMatch = await user.comparePassword(password)
  return isMatch ? user : null
}

// Create the model
const UserModel = mongoose.models.User || mongoose.model("User", userSchema)

export { UserModel }
