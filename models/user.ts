import { ObjectId } from "mongodb"
import { getDatabase } from "../lib/db-init"
import { hashPassword, comparePassword } from "../lib/password-utils"

export interface User {
  _id?: ObjectId
  firstName: string
  lastName: string
  email: string
  password: string
  role: "admin" | "merchant"
  company?: string
  companyLogo?: string
  billingEmail?: string
  phone?: string
  country?: string
  status?: "active" | "inactive" | "suspended"
  plan?: string
  createdAt: Date
  updatedAt: Date
  // Address fields
  street?: string
  city?: string
  state?: string
  postalCode?: string
}

export class UserModel {
  static async findByEmail(email: string): Promise<User | null> {
    const db = await getDatabase()
    return db.collection("users").findOne({ email }) as Promise<User | null>
  }

  static async findById(id: string | ObjectId): Promise<User | null> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id
    return db.collection("users").findOne({ _id }) as Promise<User | null>
  }

  static async create(userData: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User> {
    const db = await getDatabase()

    // Hash the password before storing
    const hashedPassword = await hashPassword(userData.password)

    const now = new Date()
    const newUser = {
      ...userData,
      password: hashedPassword,
      status: userData.status || "active", // Default status
      plan: userData.plan || "Starter", // Default plan
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection("users").insertOne(newUser)
    return { ...newUser, _id: result.insertedId } as User
  }

  static async update(id: string | ObjectId, userData: Partial<User>): Promise<boolean> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    // If password is being updated, hash it
    if (userData.password) {
      userData.password = await hashPassword(userData.password)
    }

    const result = await db.collection("users").updateOne(
      { _id },
      {
        $set: {
          ...userData,
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }

  static async list(
    page = 1,
    limit = 20,
    role?: "admin" | "merchant",
    status?: User["status"],
    search?: string,
  ): Promise<User[]> {
    const db = await getDatabase()
    const query: any = {}

    if (role) query.role = role
    if (status) query.status = status

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ]
    }

    return db
      .collection("users")
      .find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as Promise<User[]>
  }

  static async count(role?: "admin" | "merchant", status?: User["status"], search?: string): Promise<number> {
    const db = await getDatabase()
    const query: any = {}

    if (role) query.role = role
    if (status) query.status = status

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ]
    }

    return db.collection("users").countDocuments(query)
  }

  static async authenticate(email: string, password: string): Promise<User | null> {
    const user = await this.findByEmail(email)

    if (!user) {
      return null
    }

    const isPasswordValid = await comparePassword(password, user.password)

    if (!isPasswordValid) {
      return null
    }

    return user
  }

  static async delete(id: string | ObjectId): Promise<boolean> {
    const db = await getDatabase()
    const _id = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection("users").deleteOne({ _id })
    return result.deletedCount > 0
  }

  static async changePassword(id: string | ObjectId, newPassword: string): Promise<boolean> {
    const hashedPassword = await hashPassword(newPassword)
    return this.update(id, { password: hashedPassword })
  }
}

// Export both the interface and the model
export default UserModel
