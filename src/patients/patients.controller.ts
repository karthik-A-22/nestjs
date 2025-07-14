import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ObjectId } from 'mongoose';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get(':id')
  findOne(@Param('id') id: ObjectId) {
    return this.patientsService.findById(id);
  }

  @Get()
  findAll() {
    return this.patientsService.findAll();
  }
}
