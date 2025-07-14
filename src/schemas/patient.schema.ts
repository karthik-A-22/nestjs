import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema({ timestamps: true }) // Adds createdAt and updatedAt automatically
export class Patient {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  dateOfBirth: Date;

  @Prop({ required: true })
  ssn: string; // sensitive

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  address?: string;

  @Prop()
  emergencyContact?: string;

  @Prop({ required: true })
  medicalHistory: string; // sensitive

  @Prop()
  allergies?: string;

  @Prop()
  medications?: string;

  @Prop()
  insuranceProvider?: string;

  @Prop()
  insurancePolicyNumber?: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
