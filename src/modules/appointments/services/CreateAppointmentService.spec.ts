import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentsService;
describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentsService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '121212',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('121212');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 3, 23, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '121212',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '121212',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
