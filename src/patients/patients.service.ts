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

  async findById(id: ObjectId): Promise<Patient> {
    const patient = await this.patientModel.findById(id).exec();
    if (!patient) {
      throw new NotFoundException(`Patient not found`);
    }
    return patient;
  }

  async findAll(): Promise<Patient[]> {
    return this.patientModel.find().exec();
  }
}
