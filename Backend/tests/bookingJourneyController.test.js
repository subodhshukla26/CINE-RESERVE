import test from 'node:test';
import assert from 'node:assert/strict';
import BookingJourney from '../models/bookingJourney.model.js';
import BookingActivity from '../models/bookingActivity.model.js';

test('booking journey schema accepts phase 3 movie selection payload', () => {
  const doc = new BookingJourney({
    selectedMovieId: '507f1f77bcf86cd799439011',
    selectedMovieName: 'Meg 2: The Trench',
    event: 'Movie Selected',
  });

  const validationError = doc.validateSync();

  assert.equal(validationError, undefined);
  assert.equal(doc.selectedMovieName, 'Meg 2: The Trench');
  assert.equal(doc.event, 'Movie Selected');
});

test('booking journey schema accepts schedule selection payload', () => {
  const doc = new BookingJourney({
    selectedMovieId: '507f1f77bcf86cd799439011',
    selectedMovieName: 'Meg 2: The Trench',
    event: 'Movie Selected',
    selectedMovieFormat: '3D',
    selectedShowTime: '10:00 AM',
  });

  const validationError = doc.validateSync();

  assert.equal(validationError, undefined);
  assert.equal(doc.selectedMovieFormat, '3D');
  assert.equal(doc.selectedShowTime, '10:00 AM');
});

test('booking activity schema accepts select schedule events', () => {
  const doc = new BookingActivity({
    selectedMovieId: '507f1f77bcf86cd799439011',
    eventName: 'Movie Format Selected',
  });

  const validationError = doc.validateSync();

  assert.equal(validationError, undefined);
  assert.equal(doc.eventName, 'Movie Format Selected');
});

test('booking journey schema accepts seat selection payload', () => {
  const doc = new BookingJourney({
    selectedMovieId: '507f1f77bcf86cd799439011',
    selectedMovieName: 'Meg 2: The Trench',
    event: 'Movie Selected',
    selectedMovieFormat: '3D',
    selectedShowTime: '10:00 AM',
    selectedSeats: ['J9', 'J10'],
    totalSelectedSeats: 2,
  });

  const validationError = doc.validateSync();

  assert.equal(validationError, undefined);
  assert.deepEqual([...doc.selectedSeats], ['J9', 'J10']);
  assert.equal(doc.totalSelectedSeats, 2);
});

test('booking activity schema accepts seat selection and deselection events', () => {
  const selectDoc = new BookingActivity({
    selectedMovieId: '507f1f77bcf86cd799439011',
    eventName: 'Seat Selected',
  });
  const selectError = selectDoc.validateSync();
  assert.equal(selectError, undefined);
  assert.equal(selectDoc.eventName, 'Seat Selected');

  const deselectDoc = new BookingActivity({
    selectedMovieId: '507f1f77bcf86cd799439011',
    eventName: 'Seat Deselected',
  });
  const deselectError = deselectDoc.validateSync();
  assert.equal(deselectError, undefined);
  assert.equal(deselectDoc.eventName, 'Seat Deselected');
});
