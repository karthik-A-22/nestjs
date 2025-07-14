import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true }) // Automatically adds createdAt and updatedAt
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  ssn: string; // sensitive

  @Prop({ required: true })
  medicalHistory: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
