import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Patient } from 'src/schemas/patient.schema';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
  ) {}

  async create(createDto: CreatePatientDto): Promise<Patient> {
    const createdPatient = new this.patientModel(createDto);
    return createdPatient.save();
  }

  async findById(id: ObjectId, user: any): Promise<any> {
    const patient = await this.patientModel.findById(id).exec();
    if (!patient) {
      throw new NotFoundException(`Patient not found`);
    }

    const full = patient.toObject();

    if (user.role === 'ADMIN') {
      return full;
    }

    if (user.role === 'DOCTOR') {
      return {
        name: full.name,
        gender: full.gender,
        phone: full.phone,
        address: full.address,
        emergencyContact: full.emergencyContact,
        medicalHistory: full.medicalHistory,
        allergies: full.allergies,
        medications: full.medications,
        insuranceProvider: full.insuranceProvider,
        insurancePolicyNumber: full.insurancePolicyNumber,
      };
    }

    return { message: 'Access denied' };
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().exec();
  }
}
