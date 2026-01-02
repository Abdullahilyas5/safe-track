import mongoose, { Schema, model } from 'mongoose';
import { Model, Document } from 'mongoose';


export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'parent' | 'child';
  motherId?: mongoose.Types.ObjectId;
  fatherId?: mongoose.Types.ObjectId;
}   

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['parent', 'child'], default: 'child' },

  // Child-specific:
  motherId: { type: Schema.Types.ObjectId, ref: 'User' },
  fatherId: { type: Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

// Validate: if role === 'child' then both motherId & fatherId required and different
UserSchema.pre('validate', async function () {
  if (this.role === 'child') {
    if (!this.motherId || !this.fatherId) {
      throw new Error('Child must have both motherId and fatherId');
    }
    if (this.motherId.equals(this.fatherId)) {
      throw new Error('motherId and fatherId must be different');
    }
    // Ensure referenced users exist and are parents
    const count = await mongoose.model('User').countDocuments({
      _id: { $in: [this.motherId, this.fatherId] },
      role: 'parent'
    });
    if (count !== 2) throw new Error('Both parents must exist and have role "parent"');
  }
});

const User: Model<IUser> = model<IUser>('User', UserSchema);
export default User;


