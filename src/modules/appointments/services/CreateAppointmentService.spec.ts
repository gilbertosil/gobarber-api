import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentsService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentsService(
      fakeAppointmentRepository,
    );
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '121212',
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.id).toBe('121212');
  });

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentsService(
      fakeAppointmentRepository,
    );
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
