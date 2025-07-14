import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/guards/roles.guard';
import { CreatePatientDto } from './dto/create-patient.dto';
import { ObjectId } from 'mongoose';
import { Roles } from 'src/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  // Only admin or doctor can create
  @Post()
  @Roles('ADMIN', 'DOCTOR')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  // Admin and doctor can view patients
  @Get(':id')
  @Roles('ADMIN', 'DOCTOR')
  findOne(@Param('id') id: ObjectId, @Req() req) {
    return this.patientsService.findById(id, req.user);
  }

  // Only admin can view all patients
  @Get()
  @Roles('ADMIN')
  findAll() {
    return this.patientsService.findAll();
  }
}
