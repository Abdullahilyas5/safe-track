import mongoose, { Schema, model, Document } from 'mongoose';

interface IRelation extends Document {
  parentId: mongoose.Types.ObjectId;
  childIds: mongoose.Types.ObjectId[];
}

const RelationSchema = new Schema<IRelation>({
  parentId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  childIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
}, { timestamps: true });

const Relation = model<IRelation>('Relation', RelationSchema);
export default Relation;